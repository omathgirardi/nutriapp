#!/bin/bash

# Script para inicializar diferentes ambientes do NutriApp
# Uso: ./start-environment.sh [dev|test|prod]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir ajuda
show_help() {
    echo -e "${BLUE}🚀 NutriApp Environment Manager${NC}"
    echo ""
    echo "Uso: ./start-environment.sh [AMBIENTE]"
    echo ""
    echo "Ambientes disponíveis:"
    echo -e "  ${GREEN}dev${NC}   - Desenvolvimento (porta 3000)"
    echo -e "  ${YELLOW}test${NC}  - Teste (porta 3001)"
    echo -e "  ${RED}prod${NC}  - Produção (porta 8080)"
    echo ""
    echo "Exemplos:"
    echo "  ./start-environment.sh dev"
    echo "  ./start-environment.sh test"
    echo "  ./start-environment.sh prod"
    echo ""
}

# Função para verificar se uma porta está em uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}❌ Porta $port já está em uso!${NC}"
        echo -e "${YELLOW}💡 Para parar o processo na porta $port, execute:${NC}"
        echo "   kill \$(lsof -t -i:$port)"
        return 1
    fi
    return 0
}

# Função para iniciar ambiente
start_environment() {
    local env=$1
    local port=$2
    local script=$3
    
    echo -e "${BLUE}🔧 Iniciando ambiente: $env${NC}"
    echo -e "${BLUE}📡 Porta: $port${NC}"
    echo -e "${BLUE}🌐 URL: http://localhost:$port${NC}"
    echo ""
    
    # Verificar se a porta está disponível
    if ! check_port $port; then
        exit 1
    fi
    
    # Copiar arquivo de ambiente específico se existir
    if [ -f ".env.$env" ]; then
        echo -e "${GREEN}📋 Carregando configurações de .env.$env${NC}"
        cp ".env.$env" ".env.local"
    fi
    
    echo -e "${GREEN}🚀 Iniciando servidor...${NC}"
    echo -e "${YELLOW}💡 Pressione Ctrl+C para parar o servidor${NC}"
    echo ""
    
    # Executar o comando npm
    npm run $script
}

# Verificar se foi fornecido um argumento
if [ $# -eq 0 ]; then
    show_help
    exit 1
fi

# Processar o argumento
case $1 in
    dev|development)
        start_environment "development" "3000" "dev"
        ;;
    test|testing)
        start_environment "test" "3001" "test"
        ;;
    prod|production)
        start_environment "production" "8080" "prod"
        ;;
    help|-h|--help)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Ambiente '$1' não reconhecido!${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac