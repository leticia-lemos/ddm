import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase'; // Importando a configuração do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuário logado com sucesso');
      navigation.navigate('Chats'); // Redireciona para a página de chats
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatApp</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
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
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonPrimary: {
    width: '100%',
    padding: 10,
    backgroundColor: '#0c3255',
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonSecondary: {
    width: '100%',
    padding: 10,
    backgroundColor: '#09243c',
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
