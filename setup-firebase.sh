#!/bin/bash

# 🔥 Script de Configuração Automática do Firebase - NutriApp
# Este script automatiza todo o processo de configuração do Firebase

echo "🔥 Iniciando configuração automática do Firebase para NutriApp..."
echo "================================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    echo "   Download: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"

# Verificar se o arquivo de configuração existe
if [ ! -f "src/config/index.js" ]; then
    echo "❌ Arquivo de configuração não encontrado: src/config/index.js"
    echo "   Certifique-se de estar no diretório correto do projeto."
    exit 1
fi

echo "✅ Arquivo de configuração encontrado"

# Verificar se Firebase está instalado
if ! npm list firebase &> /dev/null; then
    echo "📦 Instalando Firebase..."
    npm install firebase
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao instalar Firebase"
        exit 1
    fi
else
    echo "✅ Firebase já está instalado"
fi

# Verificar se o script de setup existe
if [ ! -f "firebase-setup.js" ]; then
    echo "❌ Script de configuração não encontrado: firebase-setup.js"
    echo "   Certifique-se de que o arquivo foi criado corretamente."
    exit 1
fi

echo "✅ Script de configuração encontrado"

# Executar configuração do Firebase
echo ""
echo "🚀 Executando configuração do Firebase..."
echo "================================================="

node firebase-setup.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Configuração do Firebase concluída com sucesso!"
    echo "================================================="
    echo ""
    echo "📋 Próximos passos:"
    echo "1. Acesse o Firebase Console: https://console.firebase.google.com/"
    echo "2. Vá para Authentication > Users"
    echo "3. Crie um usuário com email: admin@nutriapp.com"
    echo "4. Copie o UID gerado e atualize no documento users/example"
    echo "5. Configure as regras de segurança (veja README-FIREBASE-SETUP.md)"
    echo "6. Crie os índices recomendados"
    echo ""
    echo "📖 Para mais detalhes, consulte: README-FIREBASE-SETUP.md"
    echo ""
    echo "🔐 Dados de acesso padrão:"
    echo "   Email: admin@nutriapp.com"
    echo "   Senha: [defina no Firebase Console]"
else
    echo ""
    echo "❌ Erro durante a configuração do Firebase"
    echo "================================================="
    echo ""
    echo "🔧 Possíveis soluções:"
    echo "1. Verifique sua conexão com a internet"
    echo "2. Confirme se as credenciais do Firebase estão corretas"
    echo "3. Verifique se o projeto Firebase existe e está ativo"
    echo "4. Consulte o README-FIREBASE-SETUP.md para mais detalhes"
    echo ""
    exit 1
fi

echo "✨ Setup completo! Seu Firebase está pronto para uso."