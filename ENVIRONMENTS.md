# Guia de Ambientes - NutriApp

Este projeto está configurado para trabalhar com múltiplos ambientes: **Desenvolvimento**, **Teste** e **Produção**.

## 🚀 Como Executar Cada Ambiente

### Desenvolvimento (Development)
```bash
npm run dev
```
- **Porta**: 3000
- **URL**: http://localhost:3000
- **Configuração**: `.env.development`
- **Uso**: Para desenvolvimento local com debug ativado

### Teste (Test)
```bash
npm run test
```
- **Porta**: 3001
- **URL**: http://localhost:3001
- **Configuração**: `.env.test`
- **Uso**: Para testes e validações antes da produção

### Produção (Production)
```bash
npm run prod
# ou
npm start
```
- **Porta**: 8080
- **URL**: http://localhost:8080
- **Configuração**: `.env.production`
- **Uso**: Para ambiente de produção

## 📁 Arquivos de Configuração

| Arquivo | Descrição |
|---------|----------|
| `.env` | Configurações base compartilhadas |
| `.env.development` | Configurações específicas de desenvolvimento |
| `.env.test` | Configurações específicas de teste |
| `.env.production` | Configurações específicas de produção |

## ⚙️ Configuração das Variáveis de Ambiente

### 1. Supabase
Configure as URLs e chaves do Supabase para cada ambiente:
```env
REACT_APP_SUPABASE_URL=sua_url_do_supabase
REACT_APP_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

### 2. Evolution API
Configure as credenciais da Evolution API:
```env
REACT_APP_EVOLUTION_BASE_URL=sua_url_da_evolution_api
REACT_APP_EVOLUTION_API_KEY=sua_chave_da_evolution_api
REACT_APP_EVOLUTION_INSTANCE_NAME=nome_da_instancia
REACT_APP_EVOLUTION_PHONE_NUMBER=numero_do_telefone
```

## 🔒 Segurança

- **NUNCA** commite arquivos `.env*` com dados reais
- Use valores de exemplo ou placeholders nos arquivos commitados
- Configure as variáveis reais no servidor de produção
- Mantenha chaves de API seguras e rotacione regularmente

## 🛠️ Solução de Problemas

### Conflito de Portas
Se uma porta estiver em uso:
1. Pare o processo que está usando a porta
2. Ou altere a porta no arquivo de configuração correspondente

### Variáveis Não Carregadas
1. Verifique se o arquivo `.env` correto existe
2. Reinicie o servidor após alterar variáveis
3. Certifique-se de que as variáveis começam com `REACT_APP_`

### Cache de Configuração
Se as mudanças não aparecerem:
1. Pare o servidor (Ctrl+C)
2. Limpe o cache: `rm -rf node_modules/.cache`
3. Reinicie: `npm run dev` (ou comando apropriado)

## 📝 Exemplo de Uso

```bash
# Terminal 1 - Desenvolvimento
npm run dev

# Terminal 2 - Teste (em paralelo)
npm run test

# Para produção (pare os outros primeiro)
npm run prod
```

## 🔄 Migração Entre Ambientes

1. **Dev → Test**: Teste suas funcionalidades
2. **Test → Prod**: Deploy apenas código testado
3. **Backup**: Sempre faça backup antes de mudanças em produção

---

**Dica**: Use o ambiente de teste para validar integrações com APIs externas antes de colocar em produção!