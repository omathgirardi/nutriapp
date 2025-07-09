// Utilitário para verificar se o deploy está funcionando corretamente
export const deploymentCheck = {
  // Verificar se todas as variáveis de ambiente estão definidas
  checkEnvironmentVariables() {
    const requiredVars = [
      'REACT_APP_FIREBASE_API_KEY',
      'REACT_APP_FIREBASE_AUTH_DOMAIN',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_STORAGE_BUCKET',
      'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
      'REACT_APP_FIREBASE_APP_ID',
      'REACT_APP_EVOLUTION_BASE_URL',
      'REACT_APP_EVOLUTION_API_KEY',
      'REACT_APP_EVOLUTION_INSTANCE_NAME'
    ];

    const missing = [];
    const present = [];

    requiredVars.forEach(varName => {
      if (process.env[varName]) {
        present.push(varName);
      } else {
        missing.push(varName);
      }
    });

    return {
      success: missing.length === 0,
      missing,
      present,
      total: requiredVars.length
    };
  },

  // Verificar conectividade com Firebase
  async checkFirebaseConnection() {
    try {
      const { dbService } = await import('../services/firebase.js');
      
      // Tentar uma operação simples no Firestore
      const testResult = await dbService.getAll('tenants', 'tenant-demo');
      
      return {
        success: true,
        message: 'Firebase conectado com sucesso',
        data: testResult
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao conectar com Firebase',
        error: error.message
      };
    }
  },

  // Verificar conectividade com Evolution API
  async checkEvolutionAPI() {
    try {
      const { evolutionService } = await import('../services/evolutionApi.js');
      
      // Tentar verificar status da instância
      const status = await evolutionService.getInstanceStatus();
      
      return {
        success: true,
        message: 'Evolution API conectada',
        status
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao conectar com Evolution API',
        error: error.message
      };
    }
  },

  // Verificar se está em produção
  checkProductionMode() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isEasyPanel = window.location.hostname.includes('easypanel.host');
    const hasHTTPS = window.location.protocol === 'https:';
    
    return {
      isProduction,
      isEasyPanel,
      hasHTTPS,
      hostname: window.location.hostname,
      protocol: window.location.protocol
    };
  },

  // Executar todos os checks
  async runAllChecks() {
    console.log('🔍 Iniciando verificação de deployment...');
    
    const results = {
      timestamp: new Date().toISOString(),
      environment: this.checkProductionMode(),
      variables: this.checkEnvironmentVariables(),
      firebase: await this.checkFirebaseConnection(),
      evolutionAPI: await this.checkEvolutionAPI()
    };

    // Log detalhado
    console.log('📊 Resultados da verificação:', results);
    
    // Resumo
    const allGood = results.variables.success && 
                   results.firebase.success && 
                   results.evolutionAPI.success;
    
    if (allGood) {
      console.log('✅ Todos os sistemas funcionando corretamente!');
    } else {
      console.warn('⚠️ Alguns problemas encontrados:', {
        variables: !results.variables.success ? results.variables.missing : null,
        firebase: !results.firebase.success ? results.firebase.error : null,
        evolution: !results.evolutionAPI.success ? results.evolutionAPI.error : null
      });
    }
    
    return results;
  },

  // Gerar relatório para o usuário
  generateReport(results) {
    const report = [];
    
    report.push('# 📋 Relatório de Deployment\n');
    
    // Ambiente
    report.push('## 🌐 Ambiente');
    report.push(`- **Produção**: ${results.environment.isProduction ? '✅' : '❌'}`);
    report.push(`- **EasyPanel**: ${results.environment.isEasyPanel ? '✅' : '❌'}`);
    report.push(`- **HTTPS**: ${results.environment.hasHTTPS ? '✅' : '❌'}`);
    report.push(`- **Hostname**: ${results.environment.hostname}`);
    report.push('');
    
    // Variáveis de ambiente
    report.push('## 🔧 Variáveis de Ambiente');
    report.push(`- **Status**: ${results.variables.success ? '✅' : '❌'}`);
    report.push(`- **Presentes**: ${results.variables.present.length}/${results.variables.total}`);
    if (results.variables.missing.length > 0) {
      report.push(`- **Faltando**: ${results.variables.missing.join(', ')}`);
    }
    report.push('');
    
    // Firebase
    report.push('## 🔥 Firebase');
    report.push(`- **Status**: ${results.firebase.success ? '✅' : '❌'}`);
    report.push(`- **Mensagem**: ${results.firebase.message}`);
    if (!results.firebase.success) {
      report.push(`- **Erro**: ${results.firebase.error}`);
    }
    report.push('');
    
    // Evolution API
    report.push('## 📱 Evolution API (WhatsApp)');
    report.push(`- **Status**: ${results.evolutionAPI.success ? '✅' : '❌'}`);
    report.push(`- **Mensagem**: ${results.evolutionAPI.message}`);
    if (!results.evolutionAPI.success) {
      report.push(`- **Erro**: ${results.evolutionAPI.error}`);
    }
    
    return report.join('\n');
  }
};

// Executar verificação automaticamente em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // Aguardar um pouco para garantir que tudo carregou
  setTimeout(() => {
    deploymentCheck.runAllChecks();
  }, 2000);
}

export default deploymentCheck;