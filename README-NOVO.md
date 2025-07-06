# 🥗 NutriApp - Plataforma Completa

**Versão 2.0 - Estrutura Reestruturada**

Uma plataforma completa para nutricionistas criarem e gerenciarem dietas personalizadas para seus clientes. 

## 🆕 Nova Estrutura do Projeto

O projeto foi completamente reestruturado para melhor organização e manutenibilidade:

```
nutriapp-plataforma/
├── src/                          # Código fonte principal
│   ├── components/               # Componentes React reutilizáveis
│   │   ├── Button.jsx           # Componente de botão
│   │   ├── Card.jsx             # Componente de card
│   │   ├── Input.jsx            # Componente de input
│   │   ├── Select.jsx           # Componente de select
│   │   ├── Modal.jsx            # Componente de modal
│   │   ├── NutriPlan.jsx        # Componente principal da aplicação
│   │   └── index.js             # Arquivo de exportação dos componentes
│   ├── data/                    # Dados mockados
│   │   ├── mockUsers.js         # Dados de usuários
│   │   ├── mockClients.js       # Dados de clientes
│   │   ├── mockDiets.js         # Dados de dietas
│   │   └── mockTemplates.js     # Dados de templates
│   ├── utils/                   # Funções utilitárias
│   │   ├── calculations.js      # Cálculos nutricionais
│   │   └── dietGeneration.js    # Geração de dietas
│   ├── styles/                  # Estilos e design system
│   │   ├── colors.js            # Paleta de cores
│   │   └── customStyles.js      # Estilos customizados e animações
│   ├── config/                  # Configurações
│   │   └── index.js             # Configurações da aplicação
│   ├── App.jsx                  # Componente App principal
│   └── index.js                 # Ponto de entrada da aplicação
├── public/                      # Arquivos públicos
│   └── storedState.json         # Estado inicial da aplicação
├── assets/                      # Assets estáticos
├── index.html                   # Arquivo original (mantido para compatibilidade)
├── index-new.html               # Nova versão com estrutura modular
├── component.js                 # Arquivo original (mantido para fallback)
├── component.jsx                # Arquivo original (mantido para referência)
├── package.json                 # Dependências e scripts
└── README-NOVO.md               # Este arquivo
```

## 🚀 Melhorias Implementadas

### ✅ Organização Modular
- **Componentes separados**: Cada componente React em seu próprio arquivo
- **Utilitários organizados**: Funções de cálculo e geração separadas por funcionalidade
- **Dados mockados**: Estruturados em arquivos específicos
- **Design System**: Cores e estilos organizados e reutilizáveis

### ✅ Manutenibilidade
- **Imports claros**: Importações organizadas e explícitas
- **Separação de responsabilidades**: Cada arquivo tem uma função específica
- **Configuração centralizada**: Settings da aplicação em local único
- **Fallback inteligente**: Mantém compatibilidade com versão anterior

### ✅ Escalabilidade
- **Estrutura preparada**: Para crescimento da aplicação
- **Componentes reutilizáveis**: Design system consistente
- **Configuração por ambiente**: Desenvolvimento e produção
- **Sistema de builds**: Preparado para ferramentas modernas

## 🛠️ Como Usar

### Opção 1: Versão Nova (Recomendada)
```bash
# Abra o arquivo index-new.html em um servidor local
npx serve . -l 3000
# Acesse: http://localhost:3000/index-new.html
```

### Opção 2: Versão Original (Compatibilidade)
```bash
# Abra o arquivo index.html original
# Funciona diretamente no navegador (file://) ou servidor
```

### Opção 3: Servidor de Desenvolvimento
```bash
# Se tiver Node.js instalado
npm install
npm run dev
```

## 🎯 Funcionalidades

### 📊 Dashboard
- Visão geral de clientes, dietas e estatísticas
- Gráficos interativos de performance
- Cards de métricas importantes

### 👥 Gestão de Clientes
- Cadastro completo de clientes
- Histórico de dietas
- Acompanhamento de progresso

### 🍽️ Criação de Dietas
- Cálculo automático de necessidades calóricas
- Distribuição de macronutrientes
- Geração de refeições balanceadas
- Sistema de restrições alimentares

### 📋 Templates
- Templates pré-definidos de dietas
- Personalização por objetivo
- Reutilização para múltiplos clientes

### 🧮 Calculadora Nutricional
- Cálculo de TMB (Taxa Metabólica Basal)
- Gasto calórico total
- Distribuição de macronutrientes
- Ajustes por objetivo e biotipo

## 🎨 Design System

### Cores Organizadas
```javascript
// Cores primárias, secundárias e neutras
// Definidas em src/styles/colors.js
```

### Componentes Reutilizáveis
- **Button**: Variações primary, secondary, outline, ghost, danger
- **Card**: Container base para conteúdos
- **Input**: Campo de entrada com validação
- **Select**: Seleção com opções customizáveis
- **Modal**: Diálogos e popups

## 📱 Responsividade

- **Mobile First**: Interface otimizada para dispositivos móveis
- **Desktop**: Aproveitamento completo de telas grandes
- **Tablet**: Experiência adaptada para tablets

## 🔒 Compatibilidade

### Mantida Retro-compatibilidade
- Arquivos originais preservados
- Fallback automático em caso de erro
- Funciona sem servidor (file://)
- Suporte a navegadores modernos

### Versão Nova
- Estrutura modular moderna
- Melhor organização de código
- Preparada para expansão
- Facilita manutenção

## 🚀 Próximos Passos

1. **Backend Integration**: Conectar com API real
2. **Autenticação**: Sistema de login completo
3. **Banco de Dados**: Persistência real de dados
4. **Relatórios Avançados**: PDFs e análises detalhadas
5. **Notificações**: Sistema de alertas e lembretes
6. **Mobile App**: Versão nativa para smartphones

## 🤝 Contribuição

O projeto está organizado para facilitar contribuições:

1. **Fork** o repositório
2. **Crie** uma branch para sua feature
3. **Desenvolva** seguindo a estrutura modular
4. **Teste** em ambas as versões (nova e original)
5. **Envie** um Pull Request

## 📄 Licença

MIT License - Veja o arquivo LICENSE para detalhes.

---

**Desenvolvido com ❤️ pela equipe NutriApp**

> Esta reestruturação mantém 100% da funcionalidade original enquanto melhora significativamente a organização, manutenibilidade e escalabilidade do código. 