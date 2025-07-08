# 🚀 Deploy NutriApp na Vercel

## Pré-requisitos

1. **Conta na Vercel**: Crie uma conta em [vercel.com](https://vercel.com)
2. **GitHub/GitLab**: Tenha o projeto em um repositório Git
3. **Variáveis de Ambiente**: Configure as variáveis necessárias

## 📋 Passos para Deploy

### 1. Preparar o Repositório

```bash
# Adicionar arquivos ao Git (se ainda não estiver)
git add .
git commit -m "Preparar para deploy na Vercel"
git push origin main
```

### 2. Conectar com Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub/GitLab
4. Selecione o projeto `nutriapp`

### 3. Configurar Variáveis de Ambiente na Vercel

Na Vercel, vá em **Settings > Environment Variables** e adicione **TODAS** as seguintes variáveis:

#### 🔧 Variáveis Essenciais
```
NODE_ENV=production
REACT_APP_USE_MOCK_DATA=false
```

#### 🔥 Firebase (OBRIGATÓRIAS para produção)
```
REACT_APP_FIREBASE_API_KEY=AIzaSyCyJLIOs4LuUg3wMkxkK9UOzGDBF2tQgHE
REACT_APP_FIREBASE_AUTH_DOMAIN=nutriplan-app-75faa.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=nutriplan-app-75faa
REACT_APP_FIREBASE_STORAGE_BUCKET=nutriplan-app-75faa.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=162618694330
REACT_APP_FIREBASE_APP_ID=1:162618694330:web:56f8cfbb93290bac904083
```

#### 📱 Evolution API (WhatsApp)
```
REACT_APP_EVOLUTION_BASE_URL=https://dev-studiogirardi-evolution-api.lt0sh0.easypanel.host
REACT_APP_EVOLUTION_API_KEY=02314644FB70-4D08-A756-A53CED8621A9
REACT_APP_EVOLUTION_INSTANCE_NAME=teste_nutriplan
REACT_APP_EVOLUTION_PHONE=+553591619970
```

#### ⚠️ IMPORTANTE: Configuração do Firebase

1. **Domínio Autorizado**: No Firebase Console, vá em:
   - Authentication > Settings > Authorized domains
   - Adicione seu domínio da Vercel: `seu-app.vercel.app`

2. **Firestore Rules**: Verifique se as regras permitem acesso:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // Para desenvolvimento
         // Em produção, implemente regras mais restritivas
       }
     }
   }
   ```

3. **CORS**: Configure CORS no Firebase se necessário

### 4. Deploy Automático

A Vercel fará o deploy automaticamente. O processo inclui:

- ✅ Detecção automática do tipo de projeto
- ✅ Build dos arquivos estáticos
- ✅ Deploy em CDN global
- ✅ HTTPS automático
- ✅ Domínio personalizado

## 🔧 Configurações Importantes

### Arquivo `vercel.json`

Já configurado com:
- Roteamento SPA (Single Page Application)
- Variáveis de ambiente de produção
- Configuração de funções serverless

### Arquivo `.vercelignore`

Exclui arquivos desnecessários:
- `node_modules`
- Logs e arquivos temporários
- Credenciais do Firebase
- Scripts de desenvolvimento

## 🌐 Após o Deploy

1. **URL de Produção**: A Vercel fornecerá uma URL como `https://nutriapp-xxx.vercel.app`
2. **Domínio Personalizado**: Configure em Settings > Domains
3. **Monitoramento**: Acesse Analytics na Vercel

## 🔍 Testando o WhatsApp

1. Acesse a aba "📱 WhatsApp" na aplicação
2. Verifique se a Evolution API está conectada
3. Teste o envio de mensagens

## 🚨 Troubleshooting

### Erro de CORS
- Verifique se `REACT_APP_API_URL` está correto
- Configure CORS na Evolution API para aceitar o domínio da Vercel

### WhatsApp não funciona
- Verifique as variáveis `REACT_APP_EVOLUTION_*`
- Use o diagnóstico integrado na aplicação

### Erro 404 em rotas
- O `vercel.json` já está configurado para SPA
- Todas as rotas redirecionam para `index.html`

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs na Vercel (Functions > View Function Logs)
2. Use o diagnóstico do WhatsApp na aplicação
3. Verifique as variáveis de ambiente

---

**✨ Sua aplicação estará disponível 24/7 com performance global!**