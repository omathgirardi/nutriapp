// Debug script para testar criação de clientes
// Execute este script no console do navegador na aplicação

console.log('🔍 Iniciando debug da criação de clientes...');

// Função para testar a criação de cliente
async function debugClientCreation() {
    console.log('📋 Testando criação de cliente...');
    
    // Dados de teste
    const testClientData = {
        name: 'Cliente Teste Debug',
        email: 'teste.debug@email.com',
        phone: '+5535999999999',
        age: 30,
        gender: 'male',
        weight: 80,
        height: 175,
        goal: 'weight_loss',
        activityLevel: 'moderate',
        status: 'active'
    };
    
    console.log('📝 Dados do cliente:', testClientData);
    
    try {
        // Verificar se o nutriService está disponível
        if (typeof window.nutriService === 'undefined') {
            console.error('❌ nutriService não está disponível no window');
            
            // Tentar importar diretamente
            console.log('🔄 Tentando importar nutriService...');
            
            // Verificar se os módulos estão carregados
            const modules = Object.keys(window).filter(key => key.includes('firebase') || key.includes('nutri'));
            console.log('📦 Módulos disponíveis:', modules);
            
            return;
        }
        
        console.log('✅ nutriService encontrado:', window.nutriService);
        
        // Testar inicialização
        console.log('🚀 Testando inicialização dos serviços...');
        const initResult = await window.nutriService.initialize();
        console.log('📊 Resultado da inicialização:', initResult);
        
        // Testar criação de cliente
        console.log('👤 Testando criação de cliente...');
        const createResult = await window.nutriService.clients.create(testClientData);
        console.log('📊 Resultado da criação:', createResult);
        
        if (createResult.success) {
            console.log('✅ Cliente criado com sucesso! ID:', createResult.id);
            
            // Testar busca de clientes
            console.log('📋 Testando busca de clientes...');
            const getAllResult = await window.nutriService.clients.getAll();
            console.log('📊 Resultado da busca:', getAllResult);
            
            if (getAllResult.success) {
                console.log('📊 Total de clientes:', getAllResult.data.length);
                console.log('👥 Lista de clientes:', getAllResult.data);
            }
        } else {
            console.error('❌ Erro na criação:', createResult.error);
        }
        
    } catch (error) {
        console.error('❌ Erro durante o teste:', error);
        console.error('📋 Stack trace:', error.stack);
    }
}

// Função para verificar o estado atual da aplicação
function debugAppState() {
    console.log('🔍 Verificando estado da aplicação...');
    
    // Verificar React
    if (typeof React !== 'undefined') {
        console.log('✅ React está disponível:', React.version);
    } else {
        console.log('❌ React não encontrado');
    }
    
    // Verificar Firebase
    const firebaseKeys = Object.keys(window).filter(key => key.toLowerCase().includes('firebase'));
    console.log('🔥 Chaves Firebase encontradas:', firebaseKeys);
    
    // Verificar serviços
    const serviceKeys = Object.keys(window).filter(key => key.toLowerCase().includes('service') || key.toLowerCase().includes('nutri'));
    console.log('🛠️ Serviços encontrados:', serviceKeys);
    
    // Verificar hooks
    const hookKeys = Object.keys(window).filter(key => key.toLowerCase().includes('hook') || key.toLowerCase().includes('use'));
    console.log('🪝 Hooks encontrados:', hookKeys);
    
    // Verificar erros no console
    console.log('📊 Verificando erros anteriores...');
    
    // Verificar localStorage
    const localStorageKeys = Object.keys(localStorage).filter(key => key.includes('nutri') || key.includes('firebase'));
    console.log('💾 LocalStorage relacionado:', localStorageKeys);
    
    // Verificar sessionStorage
    const sessionStorageKeys = Object.keys(sessionStorage).filter(key => key.includes('nutri') || key.includes('firebase'));
    console.log('🗂️ SessionStorage relacionado:', sessionStorageKeys);
}

// Função para testar Firebase diretamente
async function debugFirebaseDirect() {
    console.log('🔥 Testando Firebase diretamente...');
    
    try {
        // Verificar se Firebase está carregado
        if (typeof firebase === 'undefined' && typeof window.firebase === 'undefined') {
            console.error('❌ Firebase não está carregado');
            return;
        }
        
        console.log('✅ Firebase encontrado');
        
        // Tentar acessar Firestore
        const db = firebase.firestore ? firebase.firestore() : window.firebase?.firestore?.();
        
        if (!db) {
            console.error('❌ Firestore não está disponível');
            return;
        }
        
        console.log('✅ Firestore disponível');
        
        // Testar criação direta
        const testData = {
            name: 'Teste Firebase Direto',
            email: 'firebase.direto@test.com',
            createdAt: new Date().toISOString()
        };
        
        console.log('📝 Criando documento diretamente no Firestore...');
        const docRef = await db.collection('clients').add(testData);
        console.log('✅ Documento criado com ID:', docRef.id);
        
        // Testar leitura
        console.log('📖 Lendo documentos da coleção clients...');
        const snapshot = await db.collection('clients').get();
        console.log('📊 Total de documentos:', snapshot.size);
        
        snapshot.forEach(doc => {
            console.log('📄 Documento:', doc.id, doc.data());
        });
        
    } catch (error) {
        console.error('❌ Erro no teste Firebase direto:', error);
    }
}

// Executar todos os testes
async function runAllTests() {
    console.log('🚀 Executando todos os testes de debug...');
    
    debugAppState();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await debugFirebaseDirect();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await debugClientCreation();
    
    console.log('✅ Todos os testes concluídos!');
}

// Exportar funções para uso no console
window.debugClientCreation = debugClientCreation;
window.debugAppState = debugAppState;
window.debugFirebaseDirect = debugFirebaseDirect;
window.runAllTests = runAllTests;

console.log('🔧 Funções de debug carregadas!');
console.log('📋 Funções disponíveis:');
console.log('  - debugClientCreation(): Testa criação de cliente');
console.log('  - debugAppState(): Verifica estado da aplicação');
console.log('  - debugFirebaseDirect(): Testa Firebase diretamente');
console.log('  - runAllTests(): Executa todos os testes');
console.log('');
console.log('💡 Para executar todos os testes, digite: runAllTests()');