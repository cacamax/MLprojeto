// Implementação do servidor para Mercado Pago
// Baseado em https://github.com/goncy/next-mercadopago

// Importações necessárias
import mercadopago from 'mercadopago';
import crypto from 'crypto';

// Configurações
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || "APP_USR-8148153279757607-030919-8c18fcc8d457093ccfea4bb3952f7b68-2318017672";
const PUBLIC_KEY = process.env.MP_PUBLIC_KEY || "APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c";
const WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET || "TEST_WEBHOOK_SECRET";

// Inicializar o SDK do Mercado Pago
mercadopago.configure({
  access_token: ACCESS_TOKEN
});

// Criar preferência de pagamento para checkout
export async function createPreference({
  title,
  price,
  quantity = 1,
  description,
  buyerEmail,
  customId,
  externalReference,
  baseUrl,
  lotteryType = "megasena"
}) {
  try {
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      throw new Error("Preço inválido");
    }

    // Garantir que o baseUrl seja válido
    if (!baseUrl) {
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5174";
    }

    // Garantir que o preço seja um número
    const parsedPrice = parseFloat(price);

    // Construir objeto de preferência conforme documentação do Mercado Pago
    const preference = {
      items: [
        {
          id: customId || `lottery_${lotteryType}_${Date.now()}`,
          title: title || "Modo Avançado de IA - Loteria",
          description: description || `Acesso ao gerador avançado de combinações para ${lotteryType}`,
          quantity: quantity,
          currency_id: "BRL",
          unit_price: parsedPrice,
        },
      ],
      back_urls: {
        success: `${baseUrl}/mercadopago-success.html?lottery=${lotteryType}`,
        failure: `${baseUrl}/${lotteryType}`,
        pending: `${baseUrl}/${lotteryType}`
      },
      auto_return: "approved",
      statement_descriptor: "PROJETOL LOTERIAS",
      external_reference: externalReference || `lottery_${lotteryType}_${Date.now()}`,
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
      payer: {
        email: buyerEmail || "cliente@example.com"
      }
    };

    console.log("Criando preferência:", JSON.stringify(preference, null, 2));

    // Criar preferência no Mercado Pago
    const response = await mercadopago.preferences.create(preference);
    console.log("Resposta da preferência:", JSON.stringify(response.body, null, 2));
    
    return response.body;
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    throw new Error(`Falha ao criar preferência: ${error.message}`);
  }
}

// Verificar a assinatura do webhook
export function verifyWebhookSignature(payload, signature) {
  try {
    // Em ambiente de desenvolvimento, podemos relaxar a verificação
    if (process.env.NODE_ENV !== 'production') {
      console.log("Ambiente de desenvolvimento: pulando verificação de assinatura");
      return true;
    }

    // Se não temos assinatura ou segredo, falha na verificação
    if (!signature || !WEBHOOK_SECRET) {
      console.warn("Assinatura ou segredo de webhook não fornecidos");
      return false;
    }

    // Calcular assinatura esperada
    const generatedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest('hex');

    // Comparar assinaturas (comparação segura contra timing attacks)
    const signaturesMatch = crypto.timingSafeEqual(
      Buffer.from(generatedSignature),
      Buffer.from(signature)
    );

    return signaturesMatch;
  } catch (error) {
    console.error("Erro ao verificar assinatura do webhook:", error);
    return false;
  }
}

// Processar webhook do Mercado Pago
export async function processWebhook(payload, signature) {
  try {
    // Verificar a assinatura
    const isSignatureValid = verifyWebhookSignature(payload, signature);
    
    if (!isSignatureValid && process.env.NODE_ENV === 'production') {
      throw new Error("Assinatura do webhook inválida");
    }

    if (payload.type) {
      // Process payment notifications
      const { type, data } = payload;
      if (type === "payment") {
        const paymentId = data.id;
        const paymentInfo = await getPaymentInfo(paymentId);
        
        // Processar o pagamento
        return await processPayment(paymentInfo);
      } else {
        console.log(`Webhook notification type: ${type}`, payload);
        return {
          acknowledged: true,
          type,
          info: "Notification received but not processed"
        };
      }
    } else {
      throw new Error("Formato de webhook inválido");
    }
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    throw error;
  }
}

// Obter informações do pagamento
export async function getPaymentInfo(paymentId) {
  try {
    // Para testes locais, verificar se há dados mockados
    if (paymentId.startsWith('TEST_') && typeof global !== 'undefined' && global.mockPaymentData) {
      console.log('Usando dados de pagamento mockados para testes');
      return global.mockPaymentData;
    }

    // Buscar informações do pagamento na API do Mercado Pago
    console.log(`Buscando informações do pagamento: ${paymentId}`);
    const response = await mercadopago.payment.get(paymentId);
    
    return response.body;
  } catch (error) {
    console.error(`Erro ao obter informações do pagamento ${paymentId}:`, error);
    throw error;
  }
}

// Processar pagamento recebido
export async function processPayment(paymentInfo) {
  try {
    const { 
      id, 
      status, 
      status_detail, 
      transaction_amount, 
      date_approved,
      external_reference
    } = paymentInfo;
    
    console.log(`Processando pagamento ${id}, status: ${status}`);
    
    // Em uma implementação real, você pode:
    // 1. Atualizar o banco de dados com o status do pagamento
    // 2. Enviar e-mail de confirmação para o cliente
    // 3. Ativar acessos ou recursos comprados
    // 4. Registrar a transação para contabilidade
    
    // Exemplo simples: retornar resultado processado
    const result = {
      success: status === "approved",
      payment_id: id,
      status,
      status_detail,
      amount: transaction_amount,
      approved_at: date_approved,
      reference: external_reference,
      processed_at: new Date().toISOString()
    };
    
    console.log("Resultado do processamento:", result);
    
    return result;
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    throw error;
  }
}

export default {
  createPreference,
  verifyWebhookSignature,
  processWebhook,
  getPaymentInfo,
  processPayment
};
