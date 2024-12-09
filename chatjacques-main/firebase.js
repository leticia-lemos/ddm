// Importando o SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_YvnUHpx_Br9LLrZyO-xyvvBEPtSu-TY",
  authDomain: "chatapp-1c847.firebaseapp.com",
  projectId: "chatapp-1c847",
  storageBucket: "chatapp-1c847.firebasestorage.app",
  messagingSenderId: "791542905150",
  appId: "1:791542905150:web:fb49c65135919227ded46f",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando os serviços necessários
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

// Exportando as referências
export { auth, firestore, database };
