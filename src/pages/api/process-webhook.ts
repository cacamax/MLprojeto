// API para processar webhooks do Mercado Pago

import { mercadoPagoConfig } from "@/lib/mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, data } = req.body;
    const signature = req.headers["x-signature"];

    // Em um ambiente real, você verificaria a assinatura do webhook
    // const isValidSignature = verifySignature(req.body, signature, mercadoPagoConfig.webhookSecret);
    // if (!isValidSignature) {
    //   return res.status(401).json({ error: "Assinatura inválida" });
    // }

    // Processar diferentes tipos de eventos
    if (type === "payment") {
      const paymentId = data.id;

      // Em um ambiente real, você buscaria os detalhes do pagamento na API do Mercado Pago
      // e atualizaria o status no seu banco de dados

      console.log(`Pagamento ${paymentId} recebido e processado!`);

      // Simular processamento bem-sucedido
      return res
        .status(200)
        .json({ success: true, message: "Pagamento processado com sucesso" });
    }

    // Para outros tipos de eventos
    return res.status(200).json({ success: true, message: "Evento recebido" });
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    return res
      .status(500)
      .json({ error: error.message || "Erro interno do servidor" });
  }
}

// Função para verificar a assinatura do webhook
function verifySignature(payload, signature, secret) {
  // Em um ambiente real, você verificaria a assinatura usando o segredo do webhook
  // const crypto = require('crypto');
  // const generatedSignature = crypto
  //   .createHmac('sha256', secret)
  //   .update(JSON.stringify(payload))
  //   .digest('hex');
  // return generatedSignature === signature;

  // Para este exemplo, vamos apenas retornar true
  return true;
}
