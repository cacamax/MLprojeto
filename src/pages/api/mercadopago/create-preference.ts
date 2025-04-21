// API para criar preferência de pagamento no Mercado Pago

import { mercadoPagoConfig } from "@/lib/mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Receber a preferência completa do cliente
    const preference = req.body;

    // Validar dados essenciais
    if (!preference.items || preference.items.length === 0) {
      return res.status(400).json({ error: "Itens não fornecidos" });
    }

    // Garantir que temos um pagador definido
    if (!preference.payer || !preference.payer.email) {
      preference.payer = {
        ...preference.payer,
        email: "cliente@example.com",
      };
    }

    // Garantir que temos URLs de retorno
    if (!preference.back_urls) {
      preference.back_urls = {
        success: `${req.headers.origin}/success`,
        failure: `${req.headers.origin}/failure`,
        pending: `${req.headers.origin}/pending`,
      };
    }

    // Adicionar URL de notificação (webhook)
    preference.notification_url = `${req.headers.origin}/api/webhook`;

    // Em um ambiente real, você faria uma requisição para a API do Mercado Pago
    // usando o SDK ou fetch com o token de acesso
    // Aqui estamos simulando a resposta para fins de teste
    const preferenceId = `TEST_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    // Retornar a preferência simulada
    return res.status(200).json({
      id: preferenceId,
      init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}&public_key=APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c`,
      sandbox_init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}&public_key=APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c`,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return res
      .status(500)
      .json({ error: error.message || "Erro interno do servidor" });
  }
}
