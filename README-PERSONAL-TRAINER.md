# 🏋️‍♂️ Sistema de Personal Trainers - NutriApp

## 📋 Visão Geral

Sistema completo para gerenciar Personal Trainers na plataforma NutriApp, com **mensagens automáticas via WhatsApp** e **sistema de créditos**.

## 🚀 Funcionalidades Automáticas

### 1. 📱 Mensagem de Boas-vindas
Enviada automaticamente quando um Personal Trainer é cadastrado:

```
🎉 Bem-vindo ao NutriApp! 🎉

Olá [Nome]! Você foi cadastrado como Personal Trainer!

👤 Seus dados de acesso:
• Nome: [Nome]
• Email: [Email]
• Senha temporária: [Senha]
• ID do Trainer: [ID]
• CREF: [CREF]
• Créditos iniciais: [Créditos]

🔐 Código de Confirmação:
[CÓDIGO]

📱 Próximos passos:
1. Acesse a plataforma NutriApp
2. Faça login com email e senha
3. Digite o código de confirmação
4. Altere sua senha no primeiro acesso
5. Complete seu perfil

⏰ O código expira em 24 horas
```

### 2. ✅ Mensagem de Confirmação
Enviada quando o código é confirmado:

```
✅ Conta Ativada com Sucesso!

Parabéns [Nome]! 🎉

Sua conta foi ativada com sucesso!

🚀 Agora você pode:
• Criar planos alimentares
• Gerenciar seus clientes
• Enviar mensagens automáticas
• Acompanhar progresso dos clientes

💡 Dica: Altere sua senha temporária!
```

### 3. 💰 Notificação de Créditos
Enviada quando créditos são adicionados:

```
💰 Créditos Adicionados!

Olá [Nome]!

Seus créditos foram atualizados! 🎉

💳 Detalhes:
• Créditos adicionados: +[Quantidade]
• Total atual: [Total] créditos
• Data: [Data]

✨ Agora você pode:
• Criar mais planos alimentares
• Enviar mais mensagens
• Atender mais clientes
```

### 4. ⚠️ Alerta de Créditos Baixos
Enviado quando restam ≤ 5 créditos:

```
⚠️ Créditos Baixos!

Olá [Nome]!

Seus créditos estão acabando! 😰

💳 Situação atual:
• Créditos restantes: [Quantidade]
• Status: Créditos baixos

🔄 Recomendações:
• Adquira mais créditos
• Entre em contato com suporte
• Evite interrupções no atendimento
```

### 5. 🚨 Alerta de Créditos Esgotados
Enviado quando créditos chegam a 0:

```
🚨 Créditos Esgotados!

Olá [Nome]!

Seus créditos acabaram! 😱

💳 Situação atual:
• Créditos restantes: 0
• Status: Sem créditos

🔒 Funcionalidades bloqueadas:
• Criação de planos alimentares
• Envio de mensagens
• Atendimento de novos clientes

📞 URGENTE - Suporte:
Entre em contato IMEDIATAMENTE!
```

## 🔧 Como Usar

### 1. Criar Personal Trainer

```javascript
import { usePersonalTrainer } from '../hooks/usePersonalTrainer';

const { createTrainer } = usePersonalTrainer();

const novoTrainer = {
  name: "João Silva",
  email: "joao@email.com",
  phone: "+5511999999999",
  cref: "123456-G/SP",
  initialCredits: 10
};

const result = await createTrainer(novoTrainer);
// Mensagem de boas-vindas enviada automaticamente via WhatsApp
```

### 2. Confirmar Código de Ativação

```javascript
const { confirmTrainer } = usePersonalTrainer();

const result = await confirmTrainer("P1234", "ABC123");
// Mensagem de confirmação enviada automaticamente
```

### 3. Gerenciar Créditos

```javascript
import { useCredits } from '../hooks/usePersonalTrainer';

const { addCredits, useCredits } = useCredits("P1234");

// Adicionar créditos
await addCredits(50, "Recarga mensal");
// Notificação enviada automaticamente

// Usar créditos
await useCredits(1, "Criação de plano alimentar");
// Alerta enviado se créditos ficarem baixos
```

## 📊 Estrutura de Dados

### Personal Trainer
```javascript
{
  id: "string",
  trainerId: "P1234",
  name: "string",
  email: "string",
  phone: "string",
  cref: "string",
  credits: 10,
  tempPassword: "string",
  confirmationCode: "ABC123",
  confirmationExpiry: "2024-12-08T10:00:00Z",
  isConfirmed: false,
  createdAt: "2024-12-07T10:00:00Z",
  updatedAt: "2024-12-07T10:00:00Z"
}
```

### Transação de Créditos
```javascript
{
  id: "string",
  trainerId: "P1234",
  trainerName: "string",
  type: "credit" | "debit",
  amount: 10,
  description: "string",
  previousBalance: 5,
  newBalance: 15,
  createdAt: "2024-12-07T10:00:00Z"
}
```

## 🎯 Exemplo Prático

### Fluxo Completo:

```javascript
// 1. Criar Personal Trainer
const trainerData = {
  name: "Maria Santos",
  email: "maria@email.com",
  phone: "+5511888888888",
  cref: "654321-G/RJ",
  initialCredits: 20
};

const createResult = await nutriService.personalTrainers.create(trainerData);
console.log('Trainer criado:', createResult.trainerId);
console.log('Código de confirmação:', createResult.confirmationCode);
// 📱 Mensagem de boas-vindas enviada automaticamente

// 2. Confirmar código (trainer faz isso)
const confirmResult = await nutriService.personalTrainers.confirm(
  createResult.trainerId,
  createResult.confirmationCode
);
// 📱 Mensagem de confirmação enviada automaticamente

// 3. Adicionar créditos
const creditsResult = await nutriService.personalTrainers.addCredits(
  createResult.trainerId,
  30,
  "Recarga premium"
);
// 📱 Notificação de créditos enviada automaticamente

// 4. Usar créditos
const useResult = await nutriService.personalTrainers.useCredits(
  createResult.trainerId,
  45, // Usar muitos créditos para testar alerta
  "Criação de múltiplos planos"
);
// 📱 Alerta de créditos baixos enviado automaticamente
```

## 🔐 Segurança

- ✅ Códigos de confirmação expiram em 24 horas
- ✅ Senhas temporárias geradas automaticamente
- ✅ Validação de CREF
- ✅ Controle de créditos por transação
- ✅ Histórico completo de transações

## 📱 Componente de Exemplo

Para testar o sistema, use o componente:

```javascript
import PersonalTrainerExample from './components/PersonalTrainerExample';

function App() {
  return <PersonalTrainerExample />;
}
```

## 🚀 Comandos Úteis

```bash
# Testar criação de trainer
npm run dev
# Abrir http://localhost:3000 e usar os formulários

# Verificar logs no console
# Todas as mensagens são logadas automaticamente
```

## 📊 Relatórios

### Verificar créditos de um trainer:
```javascript
const credits = await nutriService.personalTrainers.getCredits("P1234");
console.log('Créditos:', credits.credits);
```

### Histórico de transações:
```javascript
const history = await nutriService.personalTrainers.getTransactionHistory("P1234");
console.log('Transações:', history.data);
```

## 🔄 Workflow Automático

```
1. Criar Trainer
   ↓
2. 📱 Mensagem de boas-vindas (automática)
   ↓
3. Trainer recebe código via WhatsApp
   ↓
4. Confirmar código
   ↓
5. 📱 Mensagem de confirmação (automática)
   ↓
6. Adicionar créditos
   ↓
7. 📱 Notificação de créditos (automática)
   ↓
8. Usar créditos
   ↓
9. 📱 Alertas automáticos se necessário
```

## 🎯 Próximos Passos

- [ ] Dashboard de análise de créditos
- [ ] Relatórios automáticos
- [ ] Integração com sistema de pagamento
- [ ] Templates de mensagens personalizáveis
- [ ] Webhook para receber confirmações

---

**💪 Sistema pronto para uso!** Todas as mensagens são enviadas automaticamente via WhatsApp quando as ações são executadas.

**Testado e funcionando:** Firebase + Evolution API + Sistema de Créditos + Mensagens Automáticas 