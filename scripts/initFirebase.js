const admin = require('firebase-admin');
const serviceAccount = require('../firebase-credentials.json');

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Função para criar coleções e documentos iniciais
async function initializeFirestore() {
  try {
    console.log('🚀 Iniciando configuração do Firestore...');

    // Array de coleções para criar
    const collections = [
      'tenants',
      'users',
      'clients',
      'diets',
      'templates',
      'appointments',
      'foods'
    ];

    // Criar coleções
    for (const collectionName of collections) {
      console.log(`📁 Criando coleção: ${collectionName}`);
      
      // Verificar se a coleção já existe
      const collection = await db.collection(collectionName).get();
      
      if (collection.empty) {
        // Criar documento dummy que será deletado
        const dummyDoc = await db.collection(collectionName).add({
          _dummy: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        // Deletar documento dummy
        await dummyDoc.delete();
        
        console.log(`✅ Coleção ${collectionName} criada com sucesso!`);
      } else {
        console.log(`ℹ️ Coleção ${collectionName} já existe.`);
      }
    }

    // Criar índices compostos
    console.log('📊 Criando índices compostos...');
    
    const indexes = [
      {
        collection: 'clients',
        fields: ['tenantId', 'createdAt']
      },
      {
        collection: 'diets',
        fields: ['tenantId', 'createdAt']
      },
      {
        collection: 'templates',
        fields: ['tenantId', 'createdAt']
      },
      {
        collection: 'appointments',
        fields: ['tenantId', 'date']
      },
      {
        collection: 'foods',
        fields: ['tenantId', 'category']
      }
    ];

    for (const index of indexes) {
      console.log(`📈 Criando índice para ${index.collection}`);
      // Note: Índices são criados via Console ou arquivo de configuração
      console.log(`ℹ️ Índice para ${index.collection} deve ser criado manualmente no Console.`);
    }

    console.log('✨ Configuração do Firestore concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao configurar Firestore:', error);
    throw error;
  }
}

// Executar inicialização
initializeFirestore()
  .then(() => {
    console.log('🎉 Firebase inicializado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro na inicialização:', error);
    process.exit(1);
  }); 