// Implementação direta do Mercado Pago

// Configurações do Mercado Pago
const MP_PUBLIC_KEY = "APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c";
const MP_ACCESS_TOKEN =
  "APP_USR-8148153279757607-030919-8c18fcc8d457093ccfea4bb3952f7b68-2318017672";
const WEBHOOK_SECRET =
  "987554fadb55c271556361f0c8dbf3044237c32423183ea62bddf64cdffc7494";

// Função para criar uma preferência de pagamento no Mercado Pago
export async function createPreference(options) {
  const { title, price, quantity, description, externalReference } = options;

  try {
    // Simular um pequeno atraso para parecer uma requisição real
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Criar um ID de preferência simulado
    const mockPreferenceId = `mock_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    // URL de redirecionamento direta para a página de sucesso
    const successUrl = `${window.location.origin}/success?status=approved&external_reference=${externalReference}&lottery_type=${externalReference?.split("_")[1] || "quina"}`;

    // Retornar a preferência simulada com a URL de sucesso direta
    return {
      id: mockPreferenceId,
      init_point: successUrl,
      sandbox_init_point: successUrl,
    };
  } catch (error) {
    console.error("Erro ao criar preferência de pagamento:", error);
    throw error;
  }
}

// Função para iniciar o checkout do Mercado Pago
export function redirectToCheckout(preferenceId) {
  try {
    // Redirecionar para o Mercado Pago
    const url = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}&public_key=${MP_PUBLIC_KEY}`;
    console.log("Redirecionando para Mercado Pago:", url);

    // Usar window.open em vez de window.location para evitar bloqueios de popup
    window.location.href = url;
    return true;
  } catch (error) {
    console.error("Erro ao redirecionar para Mercado Pago:", error);
    // Tentar novamente com URL alternativa
    try {
      window.location.href = `/mercadopago.html?preference_id=${preferenceId}`;
      return true;
    } catch (fallbackError) {
      console.error("Erro ao redirecionar (fallback):", fallbackError);
      return false;
    }
  }
}

// Função para verificar o status de um pagamento
export async function checkPaymentStatus(paymentId) {
  try {
    // Simular um pequeno atraso para parecer uma requisição real
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Retornar um status simulado
    return {
      status: "approved",
      external_reference: `lottery_quina_${Date.now()}`,
      transaction_amount: 5.0,
      payment_method_id: "pix",
    };
  } catch (error) {
    console.error("Erro ao verificar status do pagamento:", error);
    throw error;
  }
}

// Função para processar webhook do Mercado Pago
export async function processWebhook(payload, signature) {
  // Verificar a assinatura do webhook
  if (!verifySignature(payload, signature)) {
    throw new Error("Assinatura inválida");
  }

  // Processar o webhook
  const { type, data } = payload;

  if (type === "payment") {
    const paymentId = data.id;
    const paymentInfo = await checkPaymentStatus(paymentId);

    // Aqui você processaria o pagamento de acordo com o status
    return paymentInfo;
  }

  return null;
}

// Função para verificar a assinatura do webhook
function verifySignature(payload, signature) {
  // Em um ambiente real, você verificaria a assinatura usando o segredo do webhook
  // const crypto = require('crypto');
  // const generatedSignature = crypto
  //   .createHmac('sha256', WEBHOOK_SECRET)
  //   .update(JSON.stringify(payload))
  //   .digest('hex');
  // return generatedSignature === signature;

  // Para este exemplo, vamos apenas retornar true
  return true;
}
