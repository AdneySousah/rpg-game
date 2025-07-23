
# ⚔️ Waior RPG - Projeto Pessoal

> Um mini sistema de RPG com autenticação e criação de personagem feito com React e Firebase.

---

## 🧪 Tecnologias

- React.js
- Firebase Auth
- Firebase Firestore
- React Router DOM
- Context API
- CSS Modules

---

## 📌 Funcionalidades implementadas

- [x] Cadastro e login de usuários com Firebase Auth
- [x] Armazenamento dos dados do usuário com Firestore
- [x] Criação de personagem (nome, cabelo, corpo, classe)
- [x] Exibição das informações do personagem no painel do usuário
- [x] Exclusão de personagem
- [x] Rotas protegidas com componente `<Private />`
- [x] Salvamento e carregamento automático dos dados via `onSnapshot`

---

## 🚧 Funcionalidades em desenvolvimento

- [ ] Edição de personagem
- [ ] Sistema de slots de equipamento (capa, elmo, espada, armadura)
- [ ] Sistema de batalha com monstros e ganho de XP
- [ ] Barra de progresso de nível

---

## 🧠 Aprendizados

Este projeto me ajudou a entender na prática:
- Como lidar com autenticação no front-end
- Como usar `useContext` e `useEffect` de forma estratégica
- Como persistir e sincronizar dados em tempo real com Firebase
- Como proteger rotas no React com base na autenticação
- Como pensar em estrutura de dados e modularização de componentes

---

## 📁 Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/waior-rpg.git

Instale as dependências:

npm install
Crie um projeto no Firebase Console e ative Authentication (modo email/senha) e Firestore Database.

Adicione seu arquivo de configuração Firebase em src/services/coneccts.js com as credenciais:

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SUA_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
Rode o projeto:

npm run dev
🔖 Licença
Projeto de estudo pessoal — uso livre para fins educacionais.
