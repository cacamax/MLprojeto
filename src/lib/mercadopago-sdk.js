// Configurações do SDK do Mercado Pago
import { MERCADOPAGO_CONFIG } from './mercadopago-config.js';

/**
 * Cria uma preferência de pagamento no servidor
 * @param {Object} params - Parâmetros da preferência
 * @param {string} params.title - Título do item
 * @param {number} params.price - Preço do item
 * @param {string} params.description - Descrição do item
 * @param {number} params.quantity - Quantidade do item
 * @param {string} params.lotteryType - Tipo de loteria
 * @returns {Promise<Object>} - Dados da preferência criada
 */
export async function createPreference({
  title,
  price,
  description,
  quantity = 1,
  lotteryType = "megasena"
}) {
  try {
    // Criar preferência no servidor
    const response = await fetch('http://localhost:3001/api/mercadopago/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price,
        description,
        quantity,
        lotteryType
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    throw error;
  }
}

/**
 * Verifica o status de um pagamento
 * @param {string} paymentId - ID do pagamento
 * @returns {Promise<Object>} - Status do pagamento
 */
export async function checkPaymentStatus(paymentId) {
  try {
    const response = await fetch(`http://localhost:3001/api/mercadopago/payment/${paymentId}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao verificar pagamento: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    throw error;
  }
}

export default {
  createPreference,
  checkPaymentStatus,
  config: MERCADOPAGO_CONFIG
};
