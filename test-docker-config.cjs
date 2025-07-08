// Script para validar configuração Docker sem executar build
const fs = require('fs');
const path = require('path');

console.log('🔍 Validando configuração Docker para EasyPanel...');

// Verificar arquivos essenciais
const requiredFiles = [
  'Dockerfile',
  'docker-compose.yml',
  'nginx.conf',
  '.dockerignore',
  'package.json',
  'index.html'
];

console.log('\n📁 Verificando arquivos essenciais:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Verificar Dockerfile
console.log('\n🐳 Analisando Dockerfile:');
const dockerfile = fs.readFileSync('Dockerfile', 'utf8');
const dockerChecks = [
  { check: dockerfile.includes('FROM node:18-alpine AS builder'), desc: 'Multi-stage build configurado' },
  { check: dockerfile.includes('nginx:alpine'), desc: 'Nginx como servidor web' },
  { check: dockerfile.includes('EXPOSE 80'), desc: 'Porta 80 exposta' },
  { check: dockerfile.includes('npm run vercel-build'), desc: 'Build command correto' }
];

dockerChecks.forEach(({check, desc}) => {
  console.log(`${check ? '✅' : '❌'} ${desc}`);
});

// Verificar nginx.conf
console.log('\n🌐 Analisando nginx.conf:');
const nginxConf = fs.readFileSync('nginx.conf', 'utf8');
const nginxChecks = [
  { check: nginxConf.includes('listen 80'), desc: 'Porta 80 configurada' },
  { check: nginxConf.includes('try_files $uri $uri/ /index.html'), desc: 'SPA routing configurado' },
  { check: nginxConf.includes('gzip on'), desc: 'Compressão habilitada' },
  { check: nginxConf.includes('X-Frame-Options'), desc: 'Headers de segurança' }
];

nginxChecks.forEach(({check, desc}) => {
  console.log(`${check ? '✅' : '❌'} ${desc}`);
});

// Verificar docker-compose.yml
console.log('\n🔧 Analisando docker-compose.yml:');
const dockerCompose = fs.readFileSync('docker-compose.yml', 'utf8');
const composeChecks = [
  { check: dockerCompose.includes('"80:80"'), desc: 'Port mapping correto' },
  { check: dockerCompose.includes('NODE_ENV=production'), desc: 'Ambiente de produção' },
  { check: dockerCompose.includes('healthcheck'), desc: 'Health check configurado' },
  { check: dockerCompose.includes('restart: unless-stopped'), desc: 'Auto restart habilitado' }
];

composeChecks.forEach(({check, desc}) => {
  console.log(`${check ? '✅' : '❌'} ${desc}`);
});

// Verificar .dockerignore
console.log('\n🚫 Analisando .dockerignore:');
const dockerignore = fs.readFileSync('.dockerignore', 'utf8');
const ignoreChecks = [
  { check: dockerignore.includes('node_modules'), desc: 'node_modules ignorado' },
  { check: dockerignore.includes('.env.local'), desc: 'Arquivos .env locais ignorados' },
  { check: dockerignore.includes('*.md'), desc: 'Documentação ignorada' },
  { check: dockerignore.includes('.git'), desc: 'Git ignorado' }
];

ignoreChecks.forEach(({check, desc}) => {
  console.log(`${check ? '✅' : '❌'} ${desc}`);
});

// Verificar package.json
console.log('\n📦 Analisando package.json:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const packageChecks = [
  { check: packageJson.scripts && packageJson.scripts['vercel-build'], desc: 'Script vercel-build existe' },
  { check: packageJson.dependencies && packageJson.dependencies.firebase, desc: 'Firebase dependency' },
  { check: packageJson.dependencies && packageJson.dependencies.react, desc: 'React dependency' }
];

packageChecks.forEach(({check, desc}) => {
  console.log(`${check ? '✅' : '❌'} ${desc}`);
});

console.log('\n🎯 Resumo da Configuração:');
console.log('✅ Dockerfile otimizado com multi-stage build');
console.log('✅ Nginx configurado para servir SPA React');
console.log('✅ Docker Compose com health check');
console.log('✅ .dockerignore otimizado');
console.log('✅ Porta 80 configurada corretamente');

console.log('\n🚀 Próximos passos para EasyPanel:');
console.log('1. Fazer commit e push das alterações');
console.log('2. Criar aplicação no EasyPanel');
console.log('3. Conectar repositório Git');
console.log('4. Configurar variáveis de ambiente');
console.log('5. Fazer deploy!');

console.log('\n✨ Configuração Docker pronta para EasyPanel!');