// API para processar webhooks do Mercado Pago

import { mercadoPagoConfig, verifyWebhookSignature } from "@/lib/mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Obter dados do webhook
    const payload = req.body;
    console.log("Webhook recebido:", payload);

    // Verificar a assinatura do webhook (em um ambiente real)
    const signature = req.headers["x-signature"];
    if (signature && !verifyWebhookSignature(payload, signature)) {
      return res.status(401).json({ error: "Assinatura inválida" });
    }

    // Processar o evento
    if (payload.type === "payment") {
      const paymentId = payload.data.id;
      console.log(`Processando pagamento ${paymentId}`);

      // Em um ambiente real, você buscaria os detalhes do pagamento na API do Mercado Pago
      // e atualizaria o status no seu banco de dados

      // Retornar sucesso
      return res
        .status(200)
        .json({ success: true, message: "Webhook processado com sucesso" });
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
