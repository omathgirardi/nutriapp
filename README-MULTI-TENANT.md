# Sistema Multi-Tenant NutriApp

## Visão Geral
O NutriApp agora suporta múltiplos personal trainers (tenants), onde cada um tem seu próprio espaço isolado com clientes, dietas e templates.

## Configuração do Ambiente

### 1. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Ambiente (development ou production)
NODE_ENV=development

# Flag para usar dados mockados em desenvolvimento
REACT_APP_USE_MOCK_DATA=true

# Configurações do Firebase
REACT_APP_FIREBASE_API_KEY=sua_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu_projeto
REACT_APP_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
REACT_APP_FIREBASE_APP_ID=seu_app_id

# URL da API (opcional - padrão: http://localhost:3000)
REACT_APP_API_URL=http://localhost:3000
```

### 2. Firebase Setup
1. Crie um projeto no Firebase Console
2. Ative Authentication e Firestore
3. Configure as regras de segurança do Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para coleção de usuários
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Regras para dados do tenant
    match /tenants/{tenantId}/{document=**} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.tenantId == tenantId;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.tenantId == tenantId;
    }
  }
}
```

## Estrutura de Dados

### Firestore Collections

1. **users/**
   - Dados do usuário
   - Referência ao tenant (tenantId)
   - Role (owner, admin, etc)

2. **tenants/{tenantId}/**
   - Configurações do tenant
   - Plano (basic, pro, premium)
   - Dados isolados por tenant:
     - **/clients** - Clientes do tenant
     - **/diets** - Dietas criadas
     - **/templates** - Templates salvos

## Planos e Limites

### Basic
- 25 clientes
- 50 dietas
- 10 templates
- Relatórios básicos

### Pro
- 100 clientes
- 200 dietas
- 30 templates
- Relatórios básicos
- Integração WhatsApp
- Templates personalizados

### Premium
- 500 clientes
- 1000 dietas
- 100 templates
- Todos os recursos Pro
- Analytics avançado
- Suporte prioritário

## Desenvolvimento vs Produção

### Modo Desenvolvimento
- Set `REACT_APP_USE_MOCK_DATA=true`
- Usa dados mockados de `src/data/`
- Não requer Firebase configurado
- Perfeito para desenvolvimento local

### Modo Produção
- Set `REACT_APP_USE_MOCK_DATA=false`
- Requer Firebase configurado
- Dados isolados por tenant
- Autenticação real
- Limites de plano aplicados

## Componentes Principais

### AuthContext
- Gerencia autenticação
- Mantém estado do usuário e tenant
- Fornece métodos de login/registro

### TenantDataService
- CRUD para dados do tenant
- Isolamento automático de dados
- Fallback para dados mockados

### Hooks Personalizados
- `useClients()` - Gerencia clientes
- `useDiets()` - Gerencia dietas
- `useTemplates()` - Gerencia templates
- `useTenantStats()` - Estatísticas do tenant

## Como Testar

1. **Desenvolvimento Local**
```bash
# Usar dados mockados
REACT_APP_USE_MOCK_DATA=true npm start
```

2. **Teste com Firebase**
```bash
# Configurar Firebase
cp .env.example .env
# Editar .env com suas credenciais
REACT_APP_USE_MOCK_DATA=false npm start
```

## Fluxo de Registro

1. Usuário se registra
2. Tenant é criado automaticamente
3. Plano basic é atribuído
4. Workspace isolado é configurado
5. Pronto para uso

## Segurança

- Dados totalmente isolados por tenant
- Autenticação Firebase
- Regras Firestore por tenant
- Validação de limites do plano
- Sem acesso cruzado entre tenants

## Próximos Passos

1. Implementar upgrade de plano
2. Adicionar mais relatórios
3. Melhorar analytics
4. Implementar notificações
5. Adicionar integrações (WhatsApp, Email) 