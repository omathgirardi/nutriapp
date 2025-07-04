/**
 * Serviço para integração com a Evolution API (WhatsApp)
 */

// Configurações da API
const API_CONFIG = {
  url: 'https://dev-studiogirardi-evolution-api.lt0sh0.easypanel.host',
  apiKey: '02314644FB70-4D08-A756-A53CED8621A9',
  instance: 'este_nutriplan'
};

/**
 * Envia uma mensagem de texto pelo WhatsApp
 * @param {string} to Número de telefone (formato: 5535991619970)
 * @param {string} message Texto da mensagem
 * @returns {Promise<Object>} Resposta da API
 */
export async function sendWhatsAppMessage(to, message) {
  try {
    // Em uma implementação real, isso faria uma chamada para o endpoint da Evolution API
    // através de um servidor backend para proteger suas credenciais
    
    // Simulação de resposta bem-sucedida
    console.log(`Mensagem enviada para ${to}: ${message}`);
    
    return {
      success: true,
      message: "Mensagem enviada com sucesso"
    };
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
}

/**
 * Envia um arquivo PDF pelo WhatsApp
 * @param {string} to Número de telefone (formato: 5535991619970)
 * @param {string} pdfUrl URL do arquivo PDF
 * @param {string} caption Legenda da mensagem
 * @returns {Promise<Object>} Resposta da API
 */
export async function sendPdfFile(to, pdfUrl, caption) {
  try {
    // Em uma implementação real, isso faria uma chamada para o endpoint da Evolution API
    // através de um servidor backend para proteger suas credenciais
    
    // Simulação de resposta bem-sucedida
    console.log(`PDF enviado para ${to}: ${pdfUrl} com legenda: ${caption}`);
    
    return {
      success: true,
      message: "PDF enviado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao enviar PDF:", error);
    throw error;
  }
}

/**
 * Envia um código de verificação pelo WhatsApp
 * @param {string} to Número de telefone (formato: 5535991619970)
 * @param {string} code Código de verificação
 * @returns {Promise<Object>} Resposta da API
 */
export async function sendVerificationCode(to, code) {
  try {
    const message = `Seu código de verificação do NutriPlan é: *${code}*\n\nEste código expira em 10 minutos.`;
    
    return await sendWhatsAppMessage(to, message);
  } catch (error) {
    console.error("Erro ao enviar código de verificação:", error);
    throw error;
  }
}