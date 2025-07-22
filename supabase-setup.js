import { createClient } from '@supabase/supabase-js';
import { config } from './src/config/index.js';
import crypto from 'node:crypto';

// Inicializar Supabase
const supabase = createClient(config.supabase.url, config.supabase.anonKey);

// Estrutura das tabelas
// Nota: Supabase usa tabelas em vez de coleções. Precisamos criar tabelas via SQL se necessário.
// Para este setup, assumimos que as tabelas já existem ou usamos insert para dados iniciais.

async function setup() {
  try {
    console.log('🚀 Inicializando setup do Supabase...');

    // Exemplo de inserção de usuário
    const password = 'admin123'; // Altere para uma senha segura
    const password_hash = crypto.createHash('sha256').update(password).digest('hex');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        uid: 'user_example_id',
        email: 'admin@nutriapp.com',
        full_name: 'Administrador',
        role: 'admin',
        phone_number: '+5535999999999',
        avatar: '',
        bio: 'Nutricionista especializada em nutrição clínica',
        is_active: true,
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
          experience: '5 anos'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        password_hash: password_hash
      });
    if (userError) throw userError;
    console.log('✅ Usuário exemplo criado');

    // Adicionar mais inserções para outras tabelas como clients, diets, etc.
    // ...

    console.log('🎉 Setup do Supabase concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro no setup do Supabase:', error);
  }
}

setup();