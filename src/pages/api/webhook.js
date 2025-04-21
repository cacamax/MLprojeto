// API para receber webhooks do Mercado Pago

// Configurações do Mercado Pago
const WEBHOOK_SECRET =
  "987554fadb55c271556361f0c8dbf3044237c32423183ea62bddf64cdffc7494";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Obter dados do webhook
    const payload = req.body;
    console.log("Webhook recebido:", payload);

    // Verificar a assinatura do webhook (em um ambiente real)
    // const signature = req.headers['x-signature'];
    // if (!verifySignature(payload, signature, WEBHOOK_SECRET)) {
    //   return res.status(401).json({ error: 'Assinatura inválida' });
    // }

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
