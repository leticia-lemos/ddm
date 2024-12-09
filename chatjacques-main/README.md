# Implementação de Funcionalidades no Aplicativo de Chat

## Objetivo

Este projeto tem como objetivo implementar funcionalidades específicas em um aplicativo de chat. A funcionalidade obrigatória, **envio de imagens**, foi parcialmente implementada, enquanto a funcionalidade adicional, **envio de emojis**, foi totalmente concluída para aumentar a interatividade da experiência.

O projeto foi desenvolvido utilizando:

- **React Native** com Expo
- **TailwindCSS** (via NativeWind) para estilização
- **Firebase** (Firestore e Storage) para backend

## Funcionalidades Implementadas

### Envio de Imagens (Funcionalidade Obrigatória)

- A funcionalidade inclui:
  - Seleção de imagens da galeria do dispositivo.
  - Integração com o **Firebase Storage** para upload.
  - Exibição da URL da imagem no chat.
- **Limitação**: Devido a mudanças nas permissões do Firebase Storage, a funcionalidade não está completa. Especificamente, o envio de imagens requer configurações avançadas de autenticação no Firebase, que não foram implementadas nesta versão.

### Envio de Emojis (Funcionalidade Adicional)

- Emojis são enviados diretamente para o chat e exibidos como mensagens.
- Implementado para melhorar a interatividade do chat e facilitar a comunicação visual.

## Tecnologias Utilizadas

### Frontend

- **React Native** com Expo para desenvolvimento móvel.
- **TailwindCSS** (via NativeWind) para estilização responsiva e dinâmica.

### Backend

- **Firebase Firestore** para armazenamento de mensagens.
- **Firebase Storage** para uploads de imagens.

## Instruções de Uso

### Pré-requisitos

- Instalar o [Expo Go](https://expo.dev/client) no dispositivo móvel.
- Clonar este repositório:

  ```
  git clone https://github.com/leticia-lemos/ddm.git
  ```

- Instalar dependências:

```
npm install
```

```
npm start
```

## Testando o APK

Link para o APK ().
