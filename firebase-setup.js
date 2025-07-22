import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  addDoc,
  writeBatch
} from 'firebase/firestore';
import { config } from './src/config/index.js';

// Inicializar Firebase
const app = initializeApp(config.firebase);
const db = getFirestore(app);

// Estrutura das coleções
const collectionsStructure = {
  // Coleção de usuários
  users: {
    example: {
      uid: 'user_example_id',
      email: 'admin@nutriapp.com',
      name: 'Administrador',
      role: 'admin', // admin, nutritionist, client
      phone: '+5535999999999',
      avatar: '',
      isActive: true,
      permissions: {
        canCreateUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
        canViewReports: true,
        canManageClients: true,
        canCreateDiets: true
      },
      profile: {
        specialization: 'Nutrição Clínica',
        crn: '12345',
        experience: '5 anos',
        bio: 'Nutricionista especializada em nutrição clínica'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de clientes
  clients: {
    example: {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '+5535988887777',
      cpf: '123.456.789-00',
      birthDate: '1990-01-01',
      gender: 'masculino', // masculino, feminino
      address: {
        street: 'Rua das Flores, 123',
        city: 'Varginha',
        state: 'MG',
        zipCode: '37000-000'
      },
      anthropometry: {
        height: 175, // cm
        weight: 80, // kg
        bodyFat: 15, // %
        muscleMass: 65, // kg
        bmi: 26.1
      },
      healthInfo: {
        allergies: ['lactose'],
        restrictions: ['glúten'],
        medications: [],
        diseases: [],
        activityLevel: 'moderado', // sedentário, leve, moderado, intenso
        goal: 'perda_peso' // perda_peso, ganho_massa, manutenção
      },
      nutritionistId: 'user_example_id',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de dietas
  diets: {
    example: {
      clientId: 'client_example_id',
      nutritionistId: 'user_example_id',
      title: 'Dieta para Perda de Peso',
      description: 'Dieta balanceada focada na perda de peso saudável',
      type: 'perda_peso',
      duration: 30, // dias
      totalCalories: 1800,
      macros: {
        carbs: 45, // %
        proteins: 30, // %
        fats: 25 // %
      },
      meals: [
        {
          id: 'cafe_manha',
          name: 'Café da Manhã',
          time: '07:00',
          foods: [
            {
              name: 'Aveia',
              quantity: 50,
              unit: 'g',
              calories: 190,
              carbs: 32,
              proteins: 7,
              fats: 3
            },
            {
              name: 'Banana',
              quantity: 1,
              unit: 'unidade',
              calories: 105,
              carbs: 27,
              proteins: 1,
              fats: 0
            }
          ],
          totalCalories: 295
        },
        {
          id: 'almoco',
          name: 'Almoço',
          time: '12:00',
          foods: [
            {
              name: 'Peito de Frango',
              quantity: 150,
              unit: 'g',
              calories: 248,
              carbs: 0,
              proteins: 46,
              fats: 5
            },
            {
              name: 'Arroz Integral',
              quantity: 100,
              unit: 'g',
              calories: 123,
              carbs: 25,
              proteins: 3,
              fats: 1
            }
          ],
          totalCalories: 371
        }
      ],
      status: 'ativa', // ativa, pausada, finalizada
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de alimentos
  foods: {
    example: {
      name: 'Aveia',
      category: 'cereais',
      brand: 'Quaker',
      barcode: '7891234567890',
      nutrition: {
        calories: 380, // por 100g
        carbs: 64,
        proteins: 14,
        fats: 6,
        fiber: 10,
        sodium: 5,
        sugar: 1
      },
      unit: 'g',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de templates de dieta
  dietTemplates: {
    example: {
      name: 'Template Perda de Peso',
      description: 'Template padrão para perda de peso',
      type: 'perda_peso',
      targetCalories: 1800,
      macros: {
        carbs: 45,
        proteins: 30,
        fats: 25
      },
      meals: [
        {
          id: 'cafe_manha',
          name: 'Café da Manhã',
          time: '07:00',
          caloriesPercentage: 20
        },
        {
          id: 'lanche_manha',
          name: 'Lanche da Manhã',
          time: '10:00',
          caloriesPercentage: 10
        },
        {
          id: 'almoco',
          name: 'Almoço',
          time: '12:00',
          caloriesPercentage: 35
        },
        {
          id: 'lanche_tarde',
          name: 'Lanche da Tarde',
          time: '15:00',
          caloriesPercentage: 10
        },
        {
          id: 'jantar',
          name: 'Jantar',
          time: '19:00',
          caloriesPercentage: 25
        }
      ],
      nutritionistId: 'user_example_id',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de consultas
  appointments: {
    example: {
      clientId: 'client_example_id',
      nutritionistId: 'user_example_id',
      date: new Date().toISOString(),
      duration: 60, // minutos
      type: 'consulta_inicial', // consulta_inicial, retorno, avaliacao
      status: 'agendada', // agendada, realizada, cancelada
      notes: 'Primeira consulta para avaliação nutricional',
      anthropometry: {
        weight: 80,
        height: 175,
        bodyFat: 15,
        muscleMass: 65
      },
      observations: 'Cliente motivado para mudança de hábitos',
      nextAppointment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de pagamentos
  payments: {
    example: {
      clientId: 'client_example_id',
      nutritionistId: 'user_example_id',
      appointmentId: 'appointment_example_id',
      amount: 150.00,
      currency: 'BRL',
      method: 'pix', // pix, cartao, dinheiro, transferencia
      status: 'pago', // pendente, pago, cancelado, estornado
      description: 'Consulta nutricional',
      dueDate: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      transactionId: 'txn_123456789',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de relatórios
  reports: {
    example: {
      type: 'evolucao_cliente', // evolucao_cliente, financeiro, consultas
      clientId: 'client_example_id',
      nutritionistId: 'user_example_id',
      period: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString()
      },
      data: {
        weightLoss: 5, // kg
        bodyFatReduction: 3, // %
        muscleMassGain: 1, // kg
        adherence: 85 // %
      },
      observations: 'Cliente apresentou boa evolução no período',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Coleção de configurações do sistema
  settings: {
    example: {
      type: 'general',
      config: {
        businessName: 'NutriApp Clínica',
        businessAddress: 'Rua das Flores, 123 - Varginha/MG',
        businessPhone: '+5535999999999',
        businessEmail: 'contato@nutriapp.com',
        workingHours: {
          monday: { start: '08:00', end: '18:00' },
          tuesday: { start: '08:00', end: '18:00' },
          wednesday: { start: '08:00', end: '18:00' },
          thursday: { start: '08:00', end: '18:00' },
          friday: { start: '08:00', end: '18:00' },
          saturday: { start: '08:00', end: '12:00' },
          sunday: { closed: true }
        },
        appointmentDuration: 60,
        currency: 'BRL',
        timezone: 'America/Sao_Paulo'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
};

// Função para criar as coleções
async function setupFirebaseCollections() {
  console.log('🔥 Iniciando configuração do Firebase...');
  
  try {
    const batch = writeBatch(db);
    let operationsCount = 0;
    
    for (const [collectionName, documents] of Object.entries(collectionsStructure)) {
      console.log(`📁 Criando coleção: ${collectionName}`);
      
      for (const [docId, docData] of Object.entries(documents)) {
        const docRef = doc(db, collectionName, docId);
        batch.set(docRef, docData);
        operationsCount++;
        
        // Firebase tem limite de 500 operações por batch
        if (operationsCount >= 450) {
          await batch.commit();
          console.log(`✅ Batch de ${operationsCount} operações commitado`);
          operationsCount = 0;
        }
      }
    }
    
    // Commitar operações restantes
    if (operationsCount > 0) {
      await batch.commit();
      console.log(`✅ Batch final de ${operationsCount} operações commitado`);
    }
    
    console.log('🎉 Configuração do Firebase concluída com sucesso!');
    console.log('\n📋 Coleções criadas:');
    Object.keys(collectionsStructure).forEach(collection => {
      console.log(`   - ${collection}`);
    });
    
    console.log('\n🔐 Dados de acesso padrão:');
    console.log('   Email: admin@nutriapp.com');
    console.log('   Senha: (você deve criar no Firebase Auth)');
    
  } catch (error) {
    console.error('❌ Erro ao configurar Firebase:', error);
  }
}

// Função para criar índices (executar no console do Firebase)
function getFirebaseIndexes() {
  return `
// 📋 ÍNDICES RECOMENDADOS PARA O FIREBASE
// Execute estes comandos no Firebase CLI ou crie manualmente no console:

// Índices para coleção 'clients'
// Campo: nutritionistId, isActive
// Campo: createdAt (desc)

// Índices para coleção 'diets'
// Campo: clientId, status
// Campo: nutritionistId, status
// Campo: createdAt (desc)

// Índices para coleção 'appointments'
// Campo: clientId, date
// Campo: nutritionistId, date
// Campo: status, date

// Índices para coleção 'payments'
// Campo: clientId, status
// Campo: nutritionistId, status
// Campo: status, dueDate

// Regras de segurança recomendadas:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler/escrever apenas seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Clientes - apenas nutricionistas podem acessar
    match /clients/{clientId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'nutritionist'];
    }
    
    // Dietas - apenas nutricionistas podem acessar
    match /diets/{dietId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'nutritionist'];
    }
    
    // Outras coleções seguem o mesmo padrão
    match /{document=**} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'nutritionist'];
    }
  }
}
  `;
}

// Executar configuração
if (typeof window === 'undefined') {
  // Executando no Node.js
  setupFirebaseCollections();
  console.log(getFirebaseIndexes());
} else {
  // Executando no browser
  console.log('Execute este script no Node.js para configurar o Firebase');
}

export { setupFirebaseCollections, getFirebaseIndexes };