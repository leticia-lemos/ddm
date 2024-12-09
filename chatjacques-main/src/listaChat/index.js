import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { firestore, auth } from '../../firebase'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);  // Para armazenar o usuário logado
  const navigation = useNavigation();

  // Monitorando o estado de autenticação do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);  // Atualiza o usuário logado
      } else {
        setCurrentUser(null);  // Se não estiver logado, define como null
      }
    });

    return () => unsubscribe(); // Cleanup ao desmontar o componente
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;  // Se não houver usuário logado, não faz nada

      try {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        const usersData = querySnapshot.docs
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .filter(user => user.id !== currentUser.uid); // Filtrando o próprio usuário logado

        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao carregar usuários: ', error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const startChat = (user) => {
    // Navegar para a tela de chat com o usuário selecionado
    navigation.navigate('ChatDetails', { user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Conversas</Text>
      {users.map(user => (
        <TouchableOpacity
          key={user.id}
          style={styles.userItem}
          onPress={() => startChat(user)}
        >
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#020916',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginTop: 15,
    marginBottom: 20,
    color: 'white',
  },
  userItem: {
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    marginHorizontal: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Chats;
