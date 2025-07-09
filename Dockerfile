# Dockerfile para deploy no EasyPanel
# Multi-stage build para otimizar tamanho da imagem

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Copiar arquivo de ambiente de produção
COPY .env.production .env

# Configurar variáveis de ambiente para produção
ENV NODE_ENV=production
ENV REACT_APP_USE_MOCK_DATA=false
ENV REACT_APP_FIREBASE_API_KEY=AIzaSyCyJLIOs4LuUg3wMkxkK9UOzGDBF2tQgHE
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=nutriplan-app-75faa.firebaseapp.com
ENV REACT_APP_FIREBASE_PROJECT_ID=nutriplan-app-75faa
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=nutriplan-app-75faa.firebasestorage.app
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=162618694330
ENV REACT_APP_FIREBASE_APP_ID=1:162618694330:web:56f8cfbb93290bac904083
ENV REACT_APP_API_URL=https://dev-studiogirardi-nutriapp.lt0sh0.easypanel.host
ENV REACT_APP_EVOLUTION_BASE_URL=https://dev-studiogirardi-evolution-api.lt0sh0.easypanel.host
ENV REACT_APP_EVOLUTION_API_KEY=02314644FB70-4D08-A756-A53CED8621A9
ENV REACT_APP_EVOLUTION_INSTANCE_NAME=teste_nutriplan
ENV REACT_APP_EVOLUTION_PHONE=+553591619970

# Build da aplicação (para React estático)
# Build step removed - static files are already ready

# Stage 2: Production
FROM nginx:alpine

# Copiar arquivos buildados
COPY --from=builder /app /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]