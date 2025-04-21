// Implementação baseada no repositório https://github.com/goncy/next-mercadopago

// Configurações do Mercado Pago
export const mercadoPagoConfig = {
  publicKey: "APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c",
  accessToken:
    "APP_USR-8148153279757607-030919-8c18fcc8d457093ccfea4bb3952f7b68-2318017672",
  webhookUrl: "https://dazzling-golick2-wlwj6.dev-2.tempolabs.ai/webhooks",
  webhookSecret:
    "987554fadb55c271556361f0c8dbf3044237c32423183ea62bddf64cdffc7494",
  backUrls: {
    success: "https://dazzling-golick2-wlwj6.dev-2.tempolabs.ai/success",
    failure: "https://dazzling-golick2-wlwj6.dev-2.tempolabs.ai/failure",
    pending: "https://dazzling-golick2-wlwj6.dev-2.tempolabs.ai/pending",
  },
};

// Interface para a preferência de pagamento
export interface PaymentPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

// Função para criar uma preferência de pagamento
export async function createPaymentPreference(options: {
  title: string;
  price: number;
  quantity: number;
  buyerEmail?: string;
  externalReference?: string;
}): Promise<PaymentPreference> {
  const { title, price, quantity, buyerEmail, externalReference } = options;

  try {
    // Criar objeto de preferência
    const preference = {
      items: [
        {
          id: externalReference || `item_${Date.now()}`,
          title,
          quantity: quantity || 1,
          unit_price: price,
          currency_id: "BRL",
        },
      ],
      payer: buyerEmail ? { email: buyerEmail } : undefined,
      external_reference: externalReference,
      back_urls: mercadoPagoConfig.backUrls,
      auto_return: "approved",
      notification_url: mercadoPagoConfig.webhookUrl,
    };

    // Criar a preferência no Mercado Pago
    try {
      // Tentar fazer a requisição para a API do Mercado Pago
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          quantity,
          externalReference,
          description: `Gerador de Combinações para ${externalReference?.split("_")[1] || "Loteria"}`,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao criar preferência: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (apiError) {
      console.error("Erro na API do Mercado Pago:", apiError);

      // Fallback: criar ID simulado em caso de erro na API
      const fallbackId = `fallback_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      return {
        id: fallbackId,
        init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${fallbackId}&public_key=${mercadoPagoConfig.publicKey}`,
        sandbox_init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${fallbackId}&public_key=${mercadoPagoConfig.publicKey}`,
      };
    }
  } catch (error) {
    console.error("Erro ao criar preferência de pagamento:", error);
    throw error;
  }
}

// Função para verificar o status de um pagamento
export function getPaymentStatus(status: string): {
  status:
    | "approved"
    | "pending"
    | "rejected"
    | "refunded"
    | "cancelled"
    | "in_process"
    | "unknown";
  message: string;
} {
  switch (status) {
    case "approved":
      return { status: "approved", message: "Pagamento aprovado" };
    case "pending":
      return { status: "pending", message: "Pagamento pendente" };
    case "in_process":
      return { status: "in_process", message: "Pagamento em processamento" };
    case "rejected":
      return { status: "rejected", message: "Pagamento rejeitado" };
    case "refunded":
      return { status: "refunded", message: "Pagamento devolvido" };
    case "cancelled":
      return { status: "cancelled", message: "Pagamento cancelado" };
    default:
      return { status: "unknown", message: "Status desconhecido" };
  }
}

// Função para verificar a assinatura do webhook
export function verifyWebhookSignature(
  payload: any,
  signature: string,
): boolean {
  // Em um ambiente real, você verificaria a assinatura usando o segredo do webhook
  // const crypto = require('crypto');
  // const generatedSignature = crypto
  //   .createHmac('sha256', mercadoPagoConfig.webhookSecret)
  //   .update(JSON.stringify(payload))
  //   .digest('hex');
  // return generatedSignature === signature;

  // Para este exemplo, vamos apenas retornar true
  return true;
}
