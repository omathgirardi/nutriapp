# 🔥 Configuração Automática do Firebase - NutriApp

Este guia explica como configurar automaticamente todas as coleções do Firebase para o NutriApp.

## 📋 Pré-requisitos

1. **Projeto Firebase criado** no [Firebase Console](https://console.firebase.google.com/)
2. **Firestore Database** habilitado
3. **Authentication** habilitado
4. **Node.js** instalado na máquina

## 🚀 Configuração Automática

### Passo 1: Instalar Dependências

```bash
npm install firebase
```

### Passo 2: Executar Script de Configuração

```bash
node firebase-setup.js
```

### Passo 3: Verificar no Firebase Console

Após executar o script, verifique no Firebase Console se as seguintes coleções foram criadas:

- ✅ `users` - Usuários do sistema (admin, nutricionistas)
- ✅ `clients` - Clientes/pacientes
- ✅ `diets` - Dietas criadas
- ✅ `foods` - Base de alimentos
- ✅ `dietTemplates` - Templates de dieta
- ✅ `appointments` - Consultas agendadas
- ✅ `payments` - Controle de pagamentos
- ✅ `reports` - Relatórios gerados
- ✅ `settings` - Configurações do sistema

## 🔐 Configuração de Autenticação

### 1. Habilitar Provedores de Autenticação

No Firebase Console > Authentication > Sign-in method, habilite:
- ✅ Email/Password
- ✅ Google (opcional)

### 2. Criar Usuário Administrador

```bash
# No Firebase Console > Authentication > Users
# Clique em "Add user" e crie:
Email: admin@nutriapp.com
Password: [sua_senha_segura]
```

### 3. Atualizar UID do Usuário

Após criar o usuário, copie o UID gerado e atualize no documento `users/example`:

```javascript
// No Firestore > users > example
{
  "uid": "COLE_O_UID_AQUI",
  "email": "admin@nutriapp.com",
  // ... resto dos dados
}
```

## 🛡️ Regras de Segurança

### Configurar Firestore Rules

No Firebase Console > Firestore Database > Rules, substitua por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Clientes - apenas nutricionistas podem acessar
    match /clients/{clientId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'nutritionist'];
    }
    
    // Dietas - apenas nutricionistas podem acessar
    match /diets/{dietId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'nutritionist'];
    }
    
    // Outras coleções seguem o mesmo padrão
    match /{document=**} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'nutritionist'];
    }
  }
}
```

## 📊 Índices Recomendados

### Criar Índices Automaticamente

No Firebase Console > Firestore Database > Indexes, crie os seguintes índices compostos:

#### Coleção `clients`
- Campo: `nutritionistId` (Ascending) + `isActive` (Ascending)
- Campo: `nutritionistId` (Ascending) + `createdAt` (Descending)

#### Coleção `diets`
- Campo: `clientId` (Ascending) + `status` (Ascending)
- Campo: `nutritionistId` (Ascending) + `status` (Ascending)
- Campo: `nutritionistId` (Ascending) + `createdAt` (Descending)

#### Coleção `appointments`
- Campo: `clientId` (Ascending) + `date` (Ascending)
- Campo: `nutritionistId` (Ascending) + `date` (Ascending)
- Campo: `status` (Ascending) + `date` (Ascending)

#### Coleção `payments`
- Campo: `clientId` (Ascending) + `status` (Ascending)
- Campo: `nutritionistId` (Ascending) + `status` (Ascending)
- Campo: `status` (Ascending) + `dueDate` (Ascending)

## 🔧 Configuração do Storage

### Habilitar Firebase Storage

1. No Firebase Console > Storage
2. Clique em "Get started"
3. Configure as regras de segurança:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Apenas usuários autenticados podem fazer upload
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    // Limitar tamanho dos arquivos (10MB)
    match /{allPaths=**} {
      allow write: if request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

## 🧪 Testando a Configuração

### 1. Testar Autenticação

```javascript
import { authService } from './src/services/firebase.js';

// Fazer login
const result = await authService.login('admin@nutriapp.com', 'sua_senha');
console.log('Login:', result);
```

### 2. Testar Firestore

```javascript
import { dbService } from './src/services/firebase.js';

// Buscar usuários
const users = await dbService.getAll('users');
console.log('Usuários:', users);

// Criar cliente
const newClient = await dbService.create('clients', {
  name: 'Teste Cliente',
  email: 'teste@email.com',
  phone: '+5535999999999'
});
console.log('Cliente criado:', newClient);
```

## 🚨 Troubleshooting

### Erro: "Permission denied"
- Verifique se as regras de segurança estão configuradas corretamente
- Confirme se o usuário está autenticado
- Verifique se o role do usuário está correto

### Erro: "Collection not found"
- Execute novamente o script `firebase-setup.js`
- Verifique se o projeto Firebase está correto no config

### Erro: "Index not found"
- Crie os índices manualmente no Firebase Console
- Aguarde alguns minutos para os índices serem criados

## 📱 Próximos Passos

Após configurar o Firebase:

1. ✅ Testar login no app
2. ✅ Criar primeiro cliente
3. ✅ Gerar primeira dieta
4. ✅ Configurar tela de administração
5. ✅ Implementar relatórios

## 🆘 Suporte

Se encontrar problemas:

1. Verifique o console do navegador para erros
2. Confirme as configurações no Firebase Console
3. Teste a conectividade com o Firebase
4. Verifique se todas as dependências estão instaladas

---

**🎉 Parabéns! Seu Firebase está configurado e pronto para uso!**