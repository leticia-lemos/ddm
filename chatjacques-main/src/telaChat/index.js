import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Image } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import Balloon from '../../components/balloon/';
import { firestore, auth, storage } from '../../firebase';
import { doc, setDoc, updateDoc, arrayUnion, onSnapshot, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const Chat = ({ route }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser || !user.id) return;

    const chatId = [currentUser.uid, user.id].sort().join('_');
    const chatDoc = doc(firestore, 'chats', chatId);

    const unsubscribe = onSnapshot(chatDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setMessages(docSnapshot.data().messages || []);
        const typingUser = docSnapshot.data().typingUser;
        setIsTyping(typingUser !== currentUser.uid && typingUser !== undefined);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleTyping = (value) => {
    setNewMessage(value);

    if (value.trim() !== '') {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      updateTypingStatus(true);

      const timeout = setTimeout(() => {
        updateTypingStatus(false);
      }, 1000);

      setTypingTimeout(timeout);
    } else {
      updateTypingStatus(false);
    }
  };

  const updateTypingStatus = (typing) => {
    if (!currentUser || !user.id) return;

    const chatId = [currentUser.uid, user.id].sort().join('_');
    const chatDoc = doc(firestore, 'chats', chatId);

    updateDoc(chatDoc, {
      typingUser: typing ? currentUser.uid : null,
    });
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const chatId = [currentUser.uid, user.id].sort().join('_');
    const chatDoc = doc(firestore, 'chats', chatId);

    const newMessageObj = {
      id: new Date().getTime().toString(),
      sentBy: currentUser.uid,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      const chatSnapshot = await getDoc(chatDoc);

      if (!chatSnapshot.exists()) {
        await setDoc(chatDoc, { users: [currentUser.uid, user.id], messages: [newMessageObj] });
      } else {
        await updateDoc(chatDoc, { messages: arrayUnion(newMessageObj) });
      }

      setNewMessage('');
      updateTypingStatus(false);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const chatId = [currentUser.uid, user.id].sort().join('_');
    const chatDoc = doc(firestore, 'chats', chatId);

    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const imageRef = ref(storage, `chatImages/${chatId}/${new Date().getTime()}`);
      await uploadBytes(imageRef, blob);

      const imageUrl = await getDownloadURL(imageRef);

      const newMessageObj = {
        id: new Date().getTime().toString(),
        sentBy: currentUser.uid,
        content: imageUrl,
        type: 'image',
        timestamp: new Date().toISOString(),
      };

      const chatSnapshot = await getDoc(chatDoc);

      if (!chatSnapshot.exists()) {
        await setDoc(chatDoc, { users: [currentUser.uid, user.id], messages: [newMessageObj] });
      } else {
        await updateDoc(chatDoc, { messages: arrayUnion(newMessageObj) });
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat com {user.name}</Text>
      <ScrollView>
        {messages.map((message) => (
          <Balloon key={message.id} message={message} currentUser={currentUser?.uid} />
        ))}
      </ScrollView>

      <View style={styles.messageContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Icon name="image" size={24} color="#0c3255" />
        </TouchableOpacity>
        <TextInput
          style={styles.messageInput}
          value={newMessage}
          onChangeText={handleTyping}
          placeholder="Mensagem"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.emojiButton} onPress={() => setEmojiPickerVisible(!emojiPickerVisible)}>
        <Text style={styles.emojiText}></Text>
      </TouchableOpacity>

      {emojiPickerVisible && (
        <EmojiSelector onEmojiSelected={(emoji) => setNewMessage(newMessage + emoji)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#001220',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  messageInput: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#0c3255',
    padding: 12,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    padding: 12,
  },
  emojiButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 18,
  },
});

export default Chat;
