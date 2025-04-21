// Implementação do Mercado Pago baseada no repositório de referência
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import crypto from 'crypto';
import { MERCADOPAGO_CONFIG } from './mercadopago-config.js';

// Logs para diagnóstico
console.log('Iniciando configuração do Mercado Pago');
console.log('Access Token usado:', MERCADOPAGO_CONFIG.ACCESS_TOKEN.substring(0, 10) + '...');
console.log('Public Key usado:', MERCADOPAGO_CONFIG.PUBLIC_KEY);

// Instância do cliente Mercado Pago
const mpClient = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_CONFIG.ACCESS_TOKEN,
});

// Instâncias dos recursos
const preference = new Preference(mpClient);
const payment = new Payment(mpClient);

/**
 * Cria uma preferência de pagamento no Mercado Pago
 * @param {Object} data - Dados para criar a preferência
 * @param {string} data.title - Título do item
 * @param {string} data.description - Descrição do item
 * @param {number} data.price - Preço do item
 * @param {number} data.quantity - Quantidade do item
 * @param {string} data.externalReference - Referência externa
 * @returns {Promise<Object>} - Preferência criada
 */
async function createPreference(data) {
  try {
    console.log('[MP-Server] Criando preferência com dados:', JSON.stringify(data));
    
    const { title, description, price, quantity = 1, externalReference, buyerEmail } = data;
    
    // Validar dados obrigatórios
    if (!title || !price || price <= 0) {
      throw new Error('Dados inválidos para criar preferência');
    }
    
    // Construir dados da preferência
    const preferenceData = {
      items: [
        {
          id: externalReference || `lottery_${Date.now()}`,
          title,
          description: description || `Acesso ao gerador avançado de combinações`,
          quantity,
          currency_id: 'BRL',
          unit_price: Number(price),
        },
      ],
      payer: {
        email: buyerEmail || 'cliente@exemplo.com',
      },
      back_urls: {
        success: MERCADOPAGO_CONFIG.SUCCESS_URL,
        failure: MERCADOPAGO_CONFIG.FAILURE_URL,
        pending: MERCADOPAGO_CONFIG.PENDING_URL,
      },
      auto_return: MERCADOPAGO_CONFIG.AUTO_RETURN,
      notification_url: MERCADOPAGO_CONFIG.NOTIFICATION_URL,
      external_reference: externalReference || `ref_${Date.now()}`,
    };
    
    // Criar preferência
    const response = await preference.create({ body: preferenceData });
    
    console.log('[MP-Server] Preferência criada com sucesso:', JSON.stringify(response));
    
    return {
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    };
  } catch (error) {
    console.error('[MP-Server] Erro ao criar preferência:', error);
    throw new Error(`Erro ao criar preferência: ${error.message}`);
  }
}

/**
 * Verifica a assinatura do webhook do Mercado Pago
 * @param {Object} req - Requisição Express
 * @returns {boolean} - Se a assinatura é válida
 */
function verifyWebhookSignature(req) {
  try {
    const signature = req.headers['x-signature'];
    if (!signature) {
      console.warn('Webhook sem assinatura');
      return false;
    }
    
    const data = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', MERCADOPAGO_CONFIG.WEBHOOK_SECRET);
    const calculatedSignature = hmac.update(data).digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(calculatedSignature),
      Buffer.from(signature)
    );
  } catch (error) {
    console.error('Erro ao verificar assinatura do webhook:', error);
    return false;
  }
}

/**
 * Obtém informações de um pagamento
 * @param {string} paymentId - ID do pagamento
 * @returns {Promise<Object>} - Dados do pagamento
 */
async function getPaymentInfo(paymentId) {
  try {
    const paymentInfo = await payment.get({ id: paymentId });
    return paymentInfo;
  } catch (error) {
    console.error('Erro ao obter informações do pagamento:', error);
    throw error;
  }
}

/**
 * Obtém informações formatadas sobre o status de um pagamento
 * @param {string} status - Status do pagamento retornado pelo Mercado Pago
 * @returns {Object} - Objeto com status formatado e mensagem
 */
function getPaymentStatus(status) {
  switch (status) {
    case 'approved':
      return {
        status: 'approved',
        message: 'Pagamento aprovado! Você já pode acessar o gerador avançado de combinações.'
      };
    case 'pending':
      return {
        status: 'pending',
        message: 'Pagamento pendente. Assim que for confirmado, você terá acesso ao gerador avançado.'
      };
    case 'in_process':
      return {
        status: 'pending',
        message: 'Pagamento em processamento. Aguarde a confirmação para acessar o gerador avançado.'
      };
    case 'rejected':
      return {
        status: 'rejected',
        message: 'Pagamento rejeitado. Por favor, tente novamente com outro método de pagamento.'
      };
    case 'refunded':
      return {
        status: 'refunded',
        message: 'Pagamento reembolsado.'
      };
    case 'cancelled':
      return {
        status: 'cancelled',
        message: 'Pagamento cancelado.'
      };
    case 'in_mediation':
      return {
        status: 'in_mediation',
        message: 'Pagamento em mediação.'
      };
    case 'charged_back':
      return {
        status: 'charged_back',
        message: 'Pagamento estornado.'
      };
    default:
      return {
        status: 'unknown',
        message: 'Status de pagamento desconhecido.'
      };
  }
}

// Exportar funções
export {
  createPreference,
  verifyWebhookSignature,
  getPaymentInfo,
  getPaymentStatus,
  payment
};
