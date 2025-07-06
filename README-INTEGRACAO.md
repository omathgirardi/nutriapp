# 🔥 Integração Firebase e Evolution API - NutriApp

## 📋 Visão Geral

Este documento detalha a integração completa entre o **Firebase** e a **Evolution API** no NutriApp, permitindo:

- 🔐 Autenticação de usuários
- 📊 Armazenamento de dados (clientes, dietas, consultas)
- 📁 Upload de arquivos
- 📱 Envio de mensagens via WhatsApp
- 🤖 Automação de notificações

## 🚀 Configuração Inicial

### 1. Dependências

As seguintes dependências foram adicionadas ao projeto:

```json
{
  "firebase": "^10.7.1",
  "axios": "^1.6.2"
}
```

### 2. Configuração do Firebase

```javascript
// src/config/index.js
firebase: {
  apiKey: "AIzaSyCyJLIOs4LuUg3wMkxkK9UOzGDBF2tQgHE",
  authDomain: "nutriplan-app-75faa.firebaseapp.com",
  projectId: "nutriplan-app-75faa",
  storageBucket: "nutriplan-app-75faa.firebasestorage.app",
  messagingSenderId: "162618694330",
  appId: "1:162618694330:web:56f8cfbb93290bac904083"
}
```

### 3. Configuração da Evolution API

```javascript
// src/config/index.js
evolution: {
  baseURL: "https://dev-studiogirardi-evolution-api.lt0sh0.easypanel.host",
  apiKey: "02314644FB70-4D08-A756-A53CED8621A9",
  instanceName: "teste_nutriplan",
  enabled: true,
  phone: "+553591619970"
}
```

## 📁 Estrutura dos Serviços

```
src/
├── services/
│   ├── firebase.js          # Serviços Firebase
│   ├── evolutionApi.js      # Serviços Evolution API
│   └── index.js             # Serviço integrado
├── hooks/
│   └── useNutriService.js   # Hooks personalizados
└── config/
    └── index.js             # Configurações
```

## 🔧 Como Usar

### 1. Inicialização dos Serviços

```javascript
import { useNutriService } from '../hooks/useNutriService';

function App() {
  const { loading, error, services, nutriService } = useNutriService();
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  return (
    <div>
      <p>Firebase: {services.firebase.initialized ? '✅' : '❌'}</p>
      <p>WhatsApp: {services.evolution.connected ? '✅' : '❌'}</p>
    </div>
  );
}
```

### 2. Gerenciamento de Clientes

```javascript
import { useClients } from '../hooks/useNutriService';

function ClientsPage() {
  const { 
    clients, 
    loading, 
    error, 
    createClient, 
    updateClient, 
    deleteClient 
  } = useClients();

  const handleCreateClient = async (data) => {
    const result = await createClient({
      name: data.name,
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate,
      goals: data.goals
    });
    
    if (result.success) {
      alert('Cliente criado com sucesso!');
    }
  };

  return (
    <div>
      {clients.map(client => (
        <div key={client.id}>
          <h3>{client.name}</h3>
          <p>{client.email}</p>
          <p>{client.phone}</p>
        </div>
      ))}
    </div>
  );
}
```

### 3. Criação de Dietas

```javascript
import { useDiets } from '../hooks/useNutriService';

function DietsPage() {
  const { diets, createDiet } = useDiets();

  const handleCreateDiet = async (clientId, planData) => {
    const result = await createDiet({
      clientId: clientId,
      name: planData.name,
      plan: planData.plan,
      duration: planData.duration,
      calories: planData.calories,
      meals: planData.meals
    });
    
    if (result.success) {
      alert('Dieta criada e enviada via WhatsApp!');
    }
  };

  return (
    <div>
      {/* Interface para criar dietas */}
    </div>
  );
}
```

### 4. Envio de Mensagens WhatsApp

```javascript
import { useWhatsApp } from '../hooks/useNutriService';

function WhatsAppPage() {
  const { 
    status, 
    checkStatus, 
    getQRCode, 
    sendMessage, 
    sendNutritionalTips 
  } = useWhatsApp();

  const handleSendMessage = async (clientId, message) => {
    const result = await sendMessage(clientId, message);
    
    if (result.success) {
      alert('Mensagem enviada com sucesso!');
    }
  };

  const handleSendTips = async (clientId, tips) => {
    const result = await sendNutritionalTips(clientId, tips);
    
    if (result.success) {
      alert('Dicas enviadas com sucesso!');
    }
  };

  return (
    <div>
      <p>Status: {status.connected ? '🟢 Conectado' : '🔴 Desconectado'}</p>
      <button onClick={checkStatus}>Verificar Status</button>
      
      {!status.connected && (
        <div>
          <h3>Escaneie o QR Code:</h3>
          <button onClick={getQRCode}>Obter QR Code</button>
        </div>
      )}
    </div>
  );
}
```

### 5. Autenticação

```javascript
import { useAuth } from '../hooks/useNutriService';

function LoginPage() {
  const { user, login, register, logout, isAuthenticated } = useAuth();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    
    if (result.success) {
      alert('Login realizado com sucesso!');
    }
  };

  const handleRegister = async (email, password, userData) => {
    const result = await register(email, password, {
      name: userData.name,
      profession: userData.profession,
      phone: userData.phone
    });
    
    if (result.success) {
      alert('Conta criada com sucesso!');
    }
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>Bem-vindo, {user.email}!</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {/* Formulário de login */}
    </div>
  );
}
```

## 🤖 Funcionalidades Automáticas

### 1. Mensagem de Boas-vindas

Quando um novo cliente é criado, automaticamente:
- Verifica se o número existe no WhatsApp
- Envia mensagem de boas-vindas personalizada

### 2. Envio de Planos Alimentares

Quando uma dieta é criada, automaticamente:
- Busca os dados do cliente
- Envia o plano alimentar formatado via WhatsApp

### 3. Lembretes de Consulta

Quando uma consulta é agendada, automaticamente:
- Envia confirmação via WhatsApp
- Inclui dicas de preparação

## 📊 Estrutura de Dados

### Cliente
```javascript
{
  id: "string",
  name: "string",
  email: "string",
  phone: "string",
  birthDate: "string",
  goals: "string",
  createdAt: "string",
  updatedAt: "string"
}
```

### Dieta
```javascript
{
  id: "string",
  clientId: "string",
  name: "string",
  plan: "string",
  duration: "number",
  calories: "number",
  meals: "array",
  createdAt: "string",
  updatedAt: "string"
}
```

### Consulta
```javascript
{
  id: "string",
  clientId: "string",
  date: "string",
  type: "string",
  notes: "string",
  status: "string",
  createdAt: "string",
  updatedAt: "string"
}
```

## 🛠️ Comandos Úteis

### Instalar dependências:
```bash
npm install
```

### Executar desenvolvimento:
```bash
npm run dev
```

### Verificar status dos serviços:
```javascript
// No console do navegador
nutriService.initialize().then(console.log);
```

## 🔐 Segurança

- ✅ Configurações Firebase protegidas
- ✅ API Key da Evolution API configurada
- ✅ Validação de dados antes do envio
- ✅ Tratamento de erros robusto
- ✅ Logs detalhados para debug

## 📝 Exemplos de Uso

### Exemplo 1: Criar cliente e enviar boas-vindas

```javascript
const newClient = {
  name: "João Silva",
  email: "joao@email.com",
  phone: "+5511999999999",
  birthDate: "1990-01-01",
  goals: "Perder peso"
};

const result = await nutriService.clients.create(newClient);
// Mensagem de boas-vindas será enviada automaticamente
```

### Exemplo 2: Criar dieta e enviar via WhatsApp

```javascript
const newDiet = {
  clientId: "client123",
  name: "Dieta Emagrecimento",
  plan: "Café da manhã: Aveia com frutas\nAlmoço: Frango grelhado com salada",
  duration: 30,
  calories: 1500
};

const result = await nutriService.diets.create(newDiet);
// Plano alimentar será enviado automaticamente via WhatsApp
```

### Exemplo 3: Enviar dicas nutricionais

```javascript
const tips = `
🥗 Dicas para hoje:
• Beba pelo menos 2L de água
• Inclua proteínas em todas as refeições
• Evite alimentos processados
• Pratique atividade física
`;

const result = await nutriService.whatsapp.sendNutritionalTips("client123", tips);
```

## 🐛 Troubleshooting

### Problema: Firebase não conecta
- Verifique as configurações em `src/config/index.js`
- Confirme se o projeto Firebase está ativo

### Problema: WhatsApp não envia mensagens
- Verifique se a instância está conectada
- Escaneie o QR Code se necessário
- Confirme se o número está no formato correto

### Problema: Erro de CORS
- Adicione o domínio nas configurações do Firebase
- Configure CORS na Evolution API

## 🔄 Próximos Passos

- [ ] Implementar webhook para receber mensagens
- [ ] Adicionar notificações push
- [ ] Criar dashboard de análise
- [ ] Implementar backup automático
- [ ] Adicionar templates de mensagens

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- [Documentação Firebase](https://firebase.google.com/docs)
- [Documentação Evolution API](https://doc.evolution-api.com)
- [Issues do GitHub](https://github.com/nutriapp/nutriplan-plataforma/issues)

---

**Desenvolvido por:** Agência Visionár.IA  
**Versão:** 2.0.0  
**Data:** Dezembro 2024 