import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Balloon = ({ message, currentUser }) => {
  const isCurrentUser = message.sentBy === currentUser;

  return (
    <View style={[styles.bubble, isCurrentUser ? styles.currentUser : styles.otherUser]}>
      <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
        {message.content}
      </Text>
      {message.image && <Image source={{ uri: message.image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  currentUser: {
    backgroundColor: '#436a8e', // Azul escuro para o usuário atual
    alignSelf: 'flex-end',
  },
  otherUser: {
    backgroundColor: '#e5e5ea', // Cor padrão para outros usuários
    alignSelf: 'flex-start',
  },
  currentUserText: {
    color: 'white', // Texto branco para as mensagens enviadas
    fontSize: 15, // Aumentando o tamanho da fonte para 15
  },
  otherUserText: {
    color: 'black', // Texto preto para as mensagens de outros usuários
    fontSize: 15, // Aumentando o tamanho da fonte para 15
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
  },
});


export default Balloon;
