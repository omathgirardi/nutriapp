import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  getDocs,
  query,
  limit
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { config } from './src/config/index.js';

// Inicializar Firebase
const app = initializeApp(config.firebase);
const db = getFirestore(app);
const auth = getAuth(app);

// Cores para output no terminal
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Função para log colorido
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Lista de coleções esperadas
const expectedCollections = [
  'users',
  'clients', 
  'diets',
  'foods',
  'dietTemplates',
  'appointments',
  'payments',
  'reports',
  'settings'
];

// Função para testar conexão com Firebase
async function testFirebaseConnection() {
  log('\n🔥 Testando conexão com Firebase...', 'blue');
  
  try {
    // Testar conexão básica
    const testDoc = doc(db, 'test', 'connection');
    await getDoc(testDoc);
    log('✅ Conexão com Firebase estabelecida', 'green');
    return true;
  } catch (error) {
    log(`❌ Erro na conexão com Firebase: ${error.message}`, 'red');
    return false;
  }
}

// Função para verificar coleções
async function checkCollections() {
  log('\n📁 Verificando coleções...', 'blue');
  
  const results = {
    found: [],
    missing: [],
    withData: [],
    empty: []
  };
  
  for (const collectionName of expectedCollections) {
    try {
      const q = query(collection(db, collectionName), limit(1));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        results.empty.push(collectionName);
        log(`⚠️  Coleção '${collectionName}' existe mas está vazia`, 'yellow');
      } else {
        results.withData.push(collectionName);
        log(`✅ Coleção '${collectionName}' encontrada com dados`, 'green');
      }
      
      results.found.push(collectionName);
    } catch (error) {
      results.missing.push(collectionName);
      log(`❌ Coleção '${collectionName}' não encontrada`, 'red');
    }
  }
  
  return results;
}

// Função para testar autenticação (opcional)
async function testAuthentication() {
  log('\n🔐 Testando autenticação...', 'blue');
  
  try {
    // Tentar fazer login com credenciais de exemplo
    // NOTA: Isso só funcionará se você tiver criado o usuário no Firebase Auth
    const email = 'admin@nutriapp.com';
    log(`   Tentando login com: ${email}`, 'yellow');
    log('   (Isso só funcionará se você tiver criado o usuário no Firebase Auth)', 'yellow');
    
    // Comentado para não dar erro se o usuário não existir
    // const userCredential = await signInWithEmailAndPassword(auth, email, 'sua_senha');
    // log('✅ Autenticação funcionando', 'green');
    
    log('⚠️  Teste de autenticação pulado (configure o usuário primeiro)', 'yellow');
    return true;
  } catch (error) {
    log(`❌ Erro na autenticação: ${error.message}`, 'red');
    return false;
  }
}

// Função para verificar dados de exemplo
async function checkSampleData() {
  log('\n📋 Verificando dados de exemplo...', 'blue');
  
  const checks = [
    { collection: 'users', doc: 'example' },
    { collection: 'clients', doc: 'example' },
    { collection: 'diets', doc: 'example' },
    { collection: 'settings', doc: 'example' }
  ];
  
  let successCount = 0;
  
  for (const check of checks) {
    try {
      const docRef = doc(db, check.collection, check.doc);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        log(`✅ Documento '${check.collection}/${check.doc}' encontrado`, 'green');
        
        // Verificar campos essenciais
        if (data.createdAt && data.updatedAt) {
          log(`   ✓ Campos de timestamp presentes`, 'green');
        }
        
        successCount++;
      } else {
        log(`❌ Documento '${check.collection}/${check.doc}' não encontrado`, 'red');
      }
    } catch (error) {
      log(`❌ Erro ao verificar '${check.collection}/${check.doc}': ${error.message}`, 'red');
    }
  }
  
  return successCount;
}

// Função para gerar relatório final
function generateReport(connectionOk, collectionsResult, authOk, sampleDataCount) {
  log('\n📊 RELATÓRIO FINAL', 'bold');
  log('='.repeat(50), 'blue');
  
  // Status da conexão
  log(`🔗 Conexão Firebase: ${connectionOk ? '✅ OK' : '❌ FALHOU'}`, connectionOk ? 'green' : 'red');
  
  // Status das coleções
  log(`📁 Coleções encontradas: ${collectionsResult.found.length}/${expectedCollections.length}`, 
    collectionsResult.found.length === expectedCollections.length ? 'green' : 'yellow');
  
  if (collectionsResult.withData.length > 0) {
    log(`📊 Coleções com dados: ${collectionsResult.withData.length}`, 'green');
  }
  
  if (collectionsResult.empty.length > 0) {
    log(`📭 Coleções vazias: ${collectionsResult.empty.length}`, 'yellow');
  }
  
  if (collectionsResult.missing.length > 0) {
    log(`❌ Coleções faltando: ${collectionsResult.missing.join(', ')}`, 'red');
  }
  
  // Status dos dados de exemplo
  log(`📋 Dados de exemplo: ${sampleDataCount}/4 documentos encontrados`, 
    sampleDataCount === 4 ? 'green' : 'yellow');
  
  // Status geral
  const overallStatus = connectionOk && 
    collectionsResult.found.length === expectedCollections.length && 
    sampleDataCount >= 3;
  
  log('\n🎯 STATUS GERAL:', 'bold');
  if (overallStatus) {
    log('✅ CONFIGURAÇÃO COMPLETA - Firebase pronto para uso!', 'green');
    log('\n🚀 Próximos passos:', 'blue');
    log('1. Criar usuário admin no Firebase Auth', 'yellow');
    log('2. Configurar regras de segurança', 'yellow');
    log('3. Criar índices recomendados', 'yellow');
    log('4. Testar login no aplicativo', 'yellow');
  } else {
    log('⚠️  CONFIGURAÇÃO INCOMPLETA - Verifique os erros acima', 'yellow');
    log('\n🔧 Ações recomendadas:', 'blue');
    log('1. Execute: npm run firebase:setup', 'yellow');
    log('2. Verifique as credenciais do Firebase', 'yellow');
    log('3. Consulte README-FIREBASE-SETUP.md', 'yellow');
  }
  
  log('\n📖 Para mais detalhes: README-FIREBASE-SETUP.md', 'blue');
}

// Função principal
async function runFirebaseTest() {
  log('🧪 TESTE DE CONFIGURAÇÃO DO FIREBASE - NUTRIAPP', 'bold');
  log('='.repeat(60), 'blue');
  
  try {
    // Testar conexão
    const connectionOk = await testFirebaseConnection();
    
    if (!connectionOk) {
      log('\n❌ Não foi possível conectar ao Firebase. Verifique as configurações.', 'red');
      return;
    }
    
    // Verificar coleções
    const collectionsResult = await checkCollections();
    
    // Testar autenticação
    const authOk = await testAuthentication();
    
    // Verificar dados de exemplo
    const sampleDataCount = await checkSampleData();
    
    // Gerar relatório
    generateReport(connectionOk, collectionsResult, authOk, sampleDataCount);
    
  } catch (error) {
    log(`\n💥 Erro durante o teste: ${error.message}`, 'red');
    log('\n🔧 Possíveis soluções:', 'yellow');
    log('1. Verifique se o Firebase está configurado corretamente', 'yellow');
    log('2. Execute: npm run firebase:setup', 'yellow');
    log('3. Verifique sua conexão com a internet', 'yellow');
  }
}

// Executar teste
if (typeof window === 'undefined') {
  // Executando no Node.js
  runFirebaseTest();
} else {
  // Executando no browser
  console.log('Execute este script no Node.js para testar o Firebase');
}

export { runFirebaseTest };