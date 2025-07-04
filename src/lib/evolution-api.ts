/**
 * Utilitário para integração com a Evolution API (WhatsApp)
 */

// Configuração da Evolution API
const EVOLUTION_API_URL = "https://dev-studiogirardi-evolution-api.lt0sh0.easypanel.host";
const EVOLUTION_API_KEY = "02314644FB70-4D08-A756-A53CED8621A9";
const EVOLUTION_INSTANCE = "este_nutriplan";
const EVOLUTION_PHONE = "5535991619970";

/**
 * Envia uma mensagem de texto simples via WhatsApp
 */
export async function sendWhatsAppMessage(
  phoneNumber: string, // Formato: 5511999999999 (sem o sinal de + ou outros caracteres)
  message: string
) {
  try {
    // Limpar o número de telefone (remover caracteres não numéricos)
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    
    // Garantir que o número comece com 55 (Brasil)
    const formattedPhone = cleanPhone.startsWith("55")
      ? cleanPhone
      : `55${cleanPhone}`;
    
    const response = await fetch(`${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": EVOLUTION_API_KEY
      },
      body: JSON.stringify({
        number: `${formattedPhone}@s.whatsapp.net`,
        options: {
          delay: 1200
        },
        textMessage: {
          text: message
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao enviar mensagem: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar mensagem WhatsApp:", error);
    throw error;
  }
}

/**
 * Envia uma mensagem contendo um código de verificação
 */
export async function sendVerificationCode(
  phoneNumber: string,
  code: string
) {
  const message = `Seu código de verificação NutriPlan: ${code}\n\nEste código é válido por 5 minutos.`;
  return sendWhatsAppMessage(phoneNumber, message);
}

/**
 * Envia um arquivo PDF pelo WhatsApp
 */
export async function sendPdfFile(
  phoneNumber: string,
  pdfUrl: string,
  caption: string
) {
  try {
    // Limpar o número de telefone
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    
    // Garantir que o número comece com 55 (Brasil)
    const formattedPhone = cleanPhone.startsWith("55")
      ? cleanPhone
      : `55${cleanPhone}`;
    
    const response = await fetch(`${EVOLUTION_API_URL}/message/sendMedia/${EVOLUTION_INSTANCE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": EVOLUTION_API_KEY
      },
      body: JSON.stringify({
        number: `${formattedPhone}@s.whatsapp.net`,
        options: {
          delay: 1200
        },
        mediaMessage: {
          mediatype: "document",
          media: pdfUrl,
          fileName: "dieta-nutriplan.pdf",
          caption: caption
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao enviar PDF: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar PDF pelo WhatsApp:", error);
    throw error;
  }
}

/**
 * Gera um código de verificação de 6 dígitos
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}