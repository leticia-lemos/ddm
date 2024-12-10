import { ref, set } from 'firebase/database';
import { database } from './firebase'; // Importe o Firebase já configurado

// Função para adicionar um usuário ao Firebase
export const addUserToFirebase = (userId, email) => {
  const userRef = ref(database, 'users/' + userId);  // Caminho para o nó do usuário

  set(userRef, {
    email: email,
  })
  .then(() => {
    console.log('Usuário adicionado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao adicionar usuário:', error);
  });
};
