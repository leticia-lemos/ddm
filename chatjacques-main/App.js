import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/login/';   
import Cadastro from './src/cadastro';  // Caminho correto para sua tela de Cadastro
import Chats from './src/listaChat';  
import Chat from './src/telaChat/';   

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />  
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="ChatDetails" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
