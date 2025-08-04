const admin = require('firebase-admin');
const serviceAccount = require('../firebase-credentials.json');

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Dados iniciais para seed
const seedData = {
  tenants: [
    {
      id: 'tenant-demo',
      name: 'Nutricionista Demo',
      activationCode: 'DEMO2024',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      features: ['whatsapp', 'appointments', 'diets']
    }
  ],
  users: [
    {
      tenantId: 'tenant-demo',
      email: 'demo@nutriapp.com',
      name: 'Usuário Demo',
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],
  foods: [
    {
      tenantId: 'tenant-demo',
      name: 'Arroz Branco',
      category: 'Carboidratos',
      portion: '100g',
      calories: 130,
      protein: 2.7,
      carbs: 28.2,
      fat: 0.3
    },
    {
      tenantId: 'tenant-demo',
      name: 'Feijão Carioca',
      category: 'Proteínas',
      portion: '100g',
      calories: 77,
      protein: 4.8,
      carbs: 14,
      fat: 0.5
    }
  ]
};

// Função para popular o banco com dados iniciais
async function seedFirestore() {
  try {
    console.log('🌱 Iniciando seed do Firestore...');

    for (const [collection, documents] of Object.entries(seedData)) {
      console.log(`📝 Populando coleção: ${collection}`);
      
      for (const doc of documents) {
        const docId = doc.id || admin.firestore().collection(collection).doc().id;
        await db.collection(collection).doc(docId).set(doc);
        console.log(`✅ Documento criado em ${collection}: ${docId}`);
      }
    }

    console.log('✨ Seed do Firestore concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao fazer seed do Firestore:', error);
    throw error;
  }
}

// Executar seed
seedFirestore()
  .then(() => {
    console.log('🎉 Dados iniciais inseridos com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Erro ao inserir dados:', error);
    process.exit(1);
  }); 