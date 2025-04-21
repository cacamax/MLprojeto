/**
 * Script para testar webhooks do Mercado Pago localmente
 * 
 * Este script simula notificações que o Mercado Pago envia quando
 * ocorrem eventos de pagamento, permitindo testar o fluxo completo 
 * de pagamento sem precisar fazer transações reais.
 */

const fetch = require('node-fetch');

// Configurações
const WEBHOOK_URL = 'http://localhost:5176/api/mercadopago/webhook';
const TEST_PAYMENT_ID = 'TEST_' + Date.now();

// Função para simular uma notificação de pagamento
async function simulatePaymentNotification(status = 'approved') {
  console.log(`\n📣 Simulando notificação de pagamento ${status} com ID: ${TEST_PAYMENT_ID}`);
  
  // Criar o payload conforme documentação do Mercado Pago
  // https://www.mercadopago.com.br/developers/pt/docs/checkout-api/webhooks/handling
  const payload = {
    action: "payment.updated",
    api_version: "v1",
    data: {
      id: TEST_PAYMENT_ID
    },
    date_created: new Date().toISOString(),
    id: Date.now(),
    live_mode: false,
    type: "payment",
    user_id: "2318017672"
  };
  
  // Simular dados do pagamento que seriam retornados pelo getPaymentInfo
  const paymentInfo = {
    id: TEST_PAYMENT_ID,
    status: status,
    status_detail: status === 'approved' ? 'accredited' : 'rejected',
    date_approved: status === 'approved' ? new Date().toISOString() : null,
    date_created: new Date().toISOString(),
    payment_method_id: "pix",
    payment_type_id: "bank_transfer",
    transaction_amount: 1,
    currency_id: "BRL",
    external_reference: "lottery_megasena_test",
    description: "Modo Avançado de IA - Loteria",
    payer: {
      email: "test@example.com",
      identification: {
        type: "CPF",
        number: "12345678909"
      }
    }
  };
  
  try {
    // Primeiro, injete os dados de pagamento simulados no sistema
    // Em um ambiente real, esses dados seriam obtidos da API do Mercado Pago
    global.mockPaymentData = paymentInfo;
    
    // Enviar a notificação para o webhook
    console.log(`🔄 Enviando notificação para: ${WEBHOOK_URL}`);
    console.log(`📦 Payload: ${JSON.stringify(payload, null, 2)}`);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'MercadoPago/1.0',
        'X-Webhook-Source': 'test-webhook-script'
      },
      body: JSON.stringify(payload)
    });
    
    const responseText = await response.text();
    console.log(`\n✅ Resposta do servidor (${response.status}):`);
    try {
      console.log(JSON.parse(responseText));
    } catch (e) {
      console.log(responseText);
    }
    
    return true;
  } catch (error) {
    console.error(`\n❌ Erro ao enviar notificação: ${error.message}`);
    return false;
  }
}

// Função principal
async function main() {
  console.log('🔧 Teste de Webhook do Mercado Pago');
  console.log('==================================');
  
  // Simular pagamento aprovado
  await simulatePaymentNotification('approved');
  
  // Esperar 2 segundos
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simular pagamento recusado
  await simulatePaymentNotification('rejected');
  
  console.log('\n🏁 Teste de webhook concluído!');
}

// Executar o script
main().catch(error => {
  console.error('Erro durante a execução:', error);
  process.exit(1);
});
