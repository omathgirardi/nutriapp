import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = 'https://lbtjkmkhntfebldgslxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidGprbWtobnRmZWJsZGdzbHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODg1NjMsImV4cCI6MjA2ODc2NDU2M30.bbJ3sw6noqSewixsZq2eW8RitKwgsldzAwFjOkFb_Ww';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugLogin() {
  console.log('=== DEBUG LOGIN ===');
  
  // Teste 1: Usuário que não existe
  console.log('\n1. Testando usuário inexistente...');
  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'naoexiste@gmail.com')
      .single();

    console.log('Resultado:', { userData, userError });
    
    if (userError || !userData) {
      console.log('✅ Usuário inexistente corretamente rejeitado');
    } else {
      console.log('❌ ERRO: Usuário inexistente foi encontrado!');
    }
  } catch (error) {
    console.log('✅ Usuário inexistente corretamente rejeitado (erro:', error.message, ')');
  }

  // Teste 2: Usuário que existe
  console.log('\n2. Testando usuário existente...');
  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'teste1754330038320@gmail.com')
      .single();

    console.log('Resultado:', { userData: userData ? 'ENCONTRADO' : 'NÃO ENCONTRADO', userError });
    
    if (userData) {
      console.log('✅ Usuário existente encontrado:', userData.full_name);
      
      // Teste de senha
      const isPasswordValid = await bcrypt.compare('123456', userData.password_hash);
      console.log('Senha válida:', isPasswordValid);
      
      const isWrongPasswordValid = await bcrypt.compare('senhaerrada', userData.password_hash);
      console.log('Senha incorreta válida:', isWrongPasswordValid);
    } else {
      console.log('❌ ERRO: Usuário existente não foi encontrado!');
    }
  } catch (error) {
    console.log('❌ ERRO ao buscar usuário existente:', error.message);
  }

  console.log('\n=== FIM DEBUG ===');
}

debugLogin(); 