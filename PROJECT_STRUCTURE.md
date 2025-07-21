# Estrutura do Projeto NutriApp

## Visão Geral
O projeto foi reorganizado para uma estrutura mais modular e escalável, separando componentes por funcionalidades e telas específicas.

## Estrutura de Pastas

```
src/
├── pages/                          # Páginas principais da aplicação
│   ├── admin/                      # Páginas do administrador
│   │   ├── Dashboard.jsx           # Dashboard principal do admin
│   │   ├── PersonalTrainers.jsx    # Gerenciamento de personal trainers
│   │   ├── Settings.jsx            # Configurações do sistema
│   │   └── Reports.jsx             # Relatórios e analytics
│   └── personal-trainer/           # Páginas do personal trainer
│       ├── Dashboard.jsx           # Dashboard do personal trainer
│       ├── Clients.jsx             # Gerenciamento de clientes
│       └── Diets.jsx               # Gerenciamento de dietas
│
├── components/                     # Componentes reutilizáveis
│   ├── shared/                     # Componentes compartilhados
│   │   ├── Button.jsx              # Componente de botão
│   │   ├── Card.jsx                # Componente de card
│   │   ├── Input.jsx               # Componente de input
│   │   ├── Modal.jsx               # Componente de modal
│   │   └── Select.jsx              # Componente de select
│   ├── admin/                      # Componentes específicos do admin
│   │   └── ClientsSection.jsx      # Seção de clientes (admin)
│   ├── personal-trainer/           # Componentes específicos do PT
│   │   └── PersonalTrainerExample.jsx
│   └── NutriPlan.jsx               # Componente legacy (mantido)
│
├── assets/                         # Recursos estáticos
├── config/                         # Configurações
├── data/                          # Dados mockados
├── hooks/                         # Custom hooks
├── services/                      # Serviços e APIs
├── styles/                        # Estilos globais
├── utils/                         # Utilitários
├── App.jsx                        # Componente principal com roteamento
└── index.js                       # Ponto de entrada
```

## Funcionalidades por Área

### Admin (Administrador)
- **Dashboard**: Visão geral do sistema, estatísticas gerais
- **Personal Trainers**: Gerenciamento completo de personal trainers
- **Settings**: Configurações do sistema, backup, manutenção
- **Reports**: Relatórios detalhados e analytics

### Personal Trainer
- **Dashboard**: Visão geral dos clientes e atividades
- **Clients**: Gerenciamento completo de clientes
- **Diets**: Criação e gerenciamento de dietas

## Rotas da Aplicação

### Admin Routes
- `/admin/dashboard` - Dashboard do administrador
- `/admin/personal-trainers` - Gerenciamento de personal trainers
- `/admin/settings` - Configurações do sistema
- `/admin/reports` - Relatórios e analytics

### Personal Trainer Routes
- `/personal-trainer/dashboard` - Dashboard do personal trainer
- `/personal-trainer/clients` - Gerenciamento de clientes
- `/personal-trainer/diets` - Gerenciamento de dietas

### Redirects
- `/admin` → `/admin/dashboard`
- `/personal-trainer` → `/personal-trainer/dashboard`
- `/` → `/admin/dashboard`

## Componentes Compartilhados

Todos os componentes em `src/components/shared/` são reutilizáveis e podem ser usados em qualquer parte da aplicação:

- **Button**: Botão customizável com variantes
- **Card**: Container com estilo de card
- **Input**: Campo de entrada customizável
- **Modal**: Modal responsivo e acessível
- **Select**: Dropdown customizável

## Compatibilidade

O componente `NutriPlan.jsx` original foi mantido para compatibilidade. O App.jsx possui uma flag `userType` que permite alternar entre:
- `'legacy'`: Usa o componente original
- `'admin'`: Usa as novas páginas de admin
- `'personal-trainer'`: Usa as novas páginas de personal trainer

## Próximos Passos

1. **Implementar autenticação**: Sistema de login para diferenciar admin e personal trainer
2. **Conectar APIs**: Integrar com backend real
3. **Testes**: Adicionar testes unitários e de integração
4. **Documentação**: Documentar componentes individuais
5. **Performance**: Implementar lazy loading para as páginas

## Tecnologias Utilizadas

- React 18+
- React Router DOM (para roteamento)
- Tailwind CSS (para estilização)
- Lucide React (para ícones)

## Como Usar

1. Para testar as novas páginas, altere o valor de `userType` no `App.jsx`:
   ```javascript
   const [userType, setUserType] = useState('admin'); // ou 'personal-trainer'
   ```

2. Navegue para as rotas específicas:
   - Admin: `http://localhost:3000/admin/dashboard`
   - Personal Trainer: `http://localhost:3000/personal-trainer/dashboard`

3. Para voltar ao sistema original:
   ```javascript
   const [userType, setUserType] = useState('legacy');
   ```