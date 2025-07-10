# 🚀 Guia Rápido - Configuração Firebase

## ⚡ Configuração Rápida (5 minutos)

### 1. 🔥 Configurar Regras do Firestore (PRIMEIRO PASSO)

**IMPORTANTE:** Antes de executar qualquer script, configure as regras básicas do Firestore.

1. Acesse: [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto: `nutriplan-app-75faa`
3. Vá em **Firestore Database** > **Rules**
4. Substitua as regras por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // REGRAS TEMPORÁRIAS PARA SETUP - MUDE DEPOIS!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Clique em **Publish**

⚠️ **ATENÇÃO:** Essas são regras temporárias para o setup inicial. Mude depois!

### 2. 📦 Instalar Dependências

```bash
npm install firebase
```

### 3. 🔧 Executar Configuração

```bash
npm run firebase:setup
```

### 4. 🧪 Testar Configuração

```bash
npm run firebase:test
```

### 5. 🔐 Configurar Autenticação

1. No Firebase Console > **Authentication**
2. Clique em **Get started**
3. Vá em **Sign-in method**
4. Habilite **Email/Password**
5. Vá em **Users** > **Add user**
6. Crie usuário:
   - Email: `admin@nutriapp.com`
   - Password: `[sua_senha_segura]`
7. Copie o **UID** gerado

### 6. 📝 Atualizar Documento do Usuário

1. No Firestore > **users** > **example**
2. Edite o campo `uid` com o UID copiado
3. Salve

### 7. 🛡️ Configurar Regras de Segurança (IMPORTANTE!)

Após o setup, substitua as regras temporárias por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Outras coleções - apenas usuários autenticados com role adequado
    match /{document=**} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'nutritionist'];
    }
  }
}
```

## 🎯 Comandos Disponíveis

```bash
# Instalar Firebase
npm run firebase:install

# Configurar coleções automaticamente
npm run firebase:setup

# Configuração completa (script bash)
npm run firebase:setup-auto

# Testar configuração
npm run firebase:test
```

## 🔍 Verificar se Funcionou

Após executar `npm run firebase:test`, você deve ver:

```
✅ Conexão com Firebase estabelecida
✅ Coleção 'users' encontrada com dados
✅ Coleção 'clients' encontrada com dados
✅ Coleção 'diets' encontrada com dados
...
✅ CONFIGURAÇÃO COMPLETA - Firebase pronto para uso!
```

## 🚨 Problemas Comuns

### Erro: "Missing or insufficient permissions"
**Solução:** Configure as regras temporárias do Firestore (passo 1)

### Erro: "Collection not found"
**Solução:** Execute `npm run firebase:setup` novamente

### Erro: "Firebase config not found"
**Solução:** Verifique se o arquivo `src/config/index.js` existe e tem as credenciais corretas

## 📱 Próximos Passos

Após configurar o Firebase:

1. ✅ Testar login no app
2. ✅ Criar tela de administração
3. ✅ Implementar CRUD de clientes
4. ✅ Implementar geração de dietas
5. ✅ Configurar relatórios

---

**🎉 Pronto! Seu Firebase está configurado e funcionando!**

Para mais detalhes, consulte: `README-FIREBASE-SETUP.md`