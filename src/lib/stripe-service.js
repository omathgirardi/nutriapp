/**
 * Serviço para integração com o Stripe
 */

// Preços dos pacotes de créditos
export const CREDIT_PACKAGES = [
  {
    id: 'basic',
    name: 'Pacote Básico',
    credits: 200,
    price: 199.90,
    description: 'Ideal para começar, 200 créditos para criar dietas.',
    savePercent: 0,
    popular: false,
    color: 'bg-primary-50 border-primary-100 text-primary-700'
  },
  {
    id: 'pro',
    name: 'Pacote Profissional',
    credits: 500,
    price: 399.90,
    originalPrice: 499.75, // 200 * 2.5
    description: 'Para personal trainers com vários clientes. 500 créditos.',
    savePercent: 20,
    popular: true,
    color: 'bg-secondary-50 border-secondary-100 text-secondary-700'
  },
  {
    id: 'premium',
    name: 'Pacote Premium',
    credits: 1000,
    price: 699.90,
    originalPrice: 999.50, // 200 * 5
    description: 'Para profissionais de alta performance. 1000 créditos.',
    savePercent: 30,
    popular: false,
    color: 'bg-amber-50 border-amber-100 text-amber-700'
  }
];

/**
 * Inicia o processo de checkout para compra de créditos
 * @param {string} packageId ID do pacote escolhido
 * @param {string} userId ID do usuário
 * @returns {Promise<{url: string}>} URL para redirecionar ao checkout
 */
export async function createCheckoutSession(packageId, userId) {
  try {
    // Em uma implementação real, isso seria uma chamada API para seu backend
    // que então criaria a sessão de checkout com o Stripe
    
    // Simular resposta
    const selectedPackage = CREDIT_PACKAGES.find(p => p.id === packageId);
    
    if (!selectedPackage) {
      throw new Error('Pacote não encontrado');
    }
    
    // Simular URL de checkout (em produção, isso viria do Stripe)
    return {
      url: `/checkout/confirmation?package=${packageId}&userId=${userId}`
    };
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    throw error;
  }
}

/**
 * Processa a confirmação do pagamento e adiciona créditos ao usuário
 * @param {string} packageId ID do pacote escolhido
 * @param {string} userId ID do usuário
 * @returns {Promise<boolean>} Confirmação do processamento
 */
export async function processPaymentConfirmation(packageId, userId) {
  try {
    // Em produção, isso verificaria o status do pagamento com o Stripe
    // e então adicionaria os créditos na conta do usuário
    
    const selectedPackage = CREDIT_PACKAGES.find(p => p.id === packageId);
    
    if (!selectedPackage) {
      throw new Error('Pacote não encontrado');
    }
    
    // Simulação de sucesso
    return true;
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    throw error;
  }
}