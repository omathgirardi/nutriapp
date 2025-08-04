# 🔥 Configuração Firebase + Vercel

## 📋 Checklist Completo

### 1. ✅ Variáveis de Ambiente na Vercel

Na Vercel Dashboard > Settings > Environment Variables, adicione:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=AIzaSyCyJLIOs4LuUg3wMkxkK9UOzGDBF2tQgHE
REACT_APP_FIREBASE_AUTH_DOMAIN=nutriplan-app-75faa.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=nutriplan-app-75faa
REACT_APP_FIREBASE_STORAGE_BUCKET=nutriplan-app-75faa.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=162618694330
REACT_APP_FIREBASE_APP_ID=1:162618694330:web:56f8cfbb93290bac904083

# Environment
NODE_ENV=production
REACT_APP_USE_MOCK_DATA=false

# Evolution API
REACT_APP_EVOLUTION_BASE_URL=https://dev-studiogirardi-evolution-api.lt0sh0.easypanel.host
REACT_APP_EVOLUTION_API_KEY=02314644FB70-4D08-A756-A53CED8621A9
REACT_APP_EVOLUTION_INSTANCE_NAME=teste_nutriplan
REACT_APP_EVOLUTION_PHONE=+553591619970
```

### 2. 🔐 Firebase Console - Domínios Autorizados

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto: `nutriplan-app-75faa`
3. Vá em **Authentication > Settings > Authorized domains**
4. Adicione os domínios:
   ```
   localhost (já existe)
   seu-app-name.vercel.app
   seu-dominio-personalizado.com (se tiver)
   ```

### 3. 📊 Firestore Database - Regras

1. Vá em **Firestore Database > Rules**
2. Configure as regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acesso a todos os documentos (desenvolvimento)
    match /{document=**} {
      allow read, write: if true;
    }
    
    // Para produção, use regras mais restritivas:
    // match /users/{userId} {
    //   allow read, write: if request.auth != null && request.auth.uid == userId;
    // }
    // match /tenants/{tenantId} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

### 4. 🌐 CORS Configuration

Se houver problemas de CORS, configure no Firebase:

1. **Storage CORS** (se usar Firebase Storage):
   ```json
   [
     {
       "origin": ["https://seu-app.vercel.app"],
       "method": ["GET", "POST", "PUT", "DELETE"],
       "maxAgeSeconds": 3600
     }
   ]
   ```

### 5. 🔍 Verificação de Funcionamento

Após o deploy, teste:

1. **Acesso ao Firestore**: Verifique se os dados carregam
2. **Authentication**: Teste login/logout
3. **WhatsApp**: Use a aba de diagnóstico
4. **Console do Browser**: Verifique se não há erros

### 6. 🚨 Troubleshooting

#### Erro: "Firebase: Error (auth/unauthorized-domain)"
**Solução**: Adicione o domínio da Vercel nos domínios autorizados

#### Erro: "Firestore: Missing or insufficient permissions"
**Solução**: Verifique as regras do Firestore

#### Erro: "CORS policy"
**Solução**: Configure CORS no Firebase ou verifique headers

#### Erro: "Environment variables not defined"
**Solução**: Verifique se todas as variáveis estão na Vercel

### 7. 📱 Teste do WhatsApp

1. Acesse: `https://seu-app.vercel.app`
2. Vá na aba "📱 WhatsApp"
3. Clique em "Verificar Status"
4. Se necessário, escaneie o QR Code
5. Teste envio de mensagem

### 8. 🔄 Redeploy

Se fizer alterações:
```bash
git add .
git commit -m "Configurar Firebase para produção"
git push origin main
```

A Vercel fará redeploy automaticamente.

---

## 🎯 Resultado Esperado

✅ **Firebase conectado**  
✅ **Dados carregando**  
✅ **WhatsApp funcionando**  
✅ **Sem erros no console**  
✅ **HTTPS automático**  

**🚀 Sua aplicação estará 100% funcional em produção!**