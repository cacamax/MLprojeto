// API para integração com o Mercado Pago

const MP_ACCESS_TOKEN =
  "APP_USR-8148153279757607-030919-8c18fcc8d457093ccfea4bb3952f7b68-2318017672";
const WEBHOOK_SECRET =
  "987554fadb55c271556361f0c8dbf3044237c32423183ea62bddf64";

// Função para criar uma preferência de pagamento
export async function createPreference(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, price, quantity, description, externalReference } = req.body;

    // Validar os dados recebidos
    if (!title || !price) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    // Criar o objeto de preferência
    const preference = {
      items: [
        {
          id: externalReference || `item_${Date.now()}`,
          title,
          description: description || title,
          quantity: quantity || 1,
          currency_id: "BRL",
          unit_price: price,
        },
      ],
      external_reference: externalReference,
      back_urls: {
        success: `${req.headers.origin}/success`,
        failure: `${req.headers.origin}/failure`,
        pending: `${req.headers.origin}/pending`,
      },
      auto_return: "approved",
    };

    // Fazer a requisição para a API do Mercado Pago
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(preference),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return res
      .status(500)
      .json({ error: error.message || "Erro interno do servidor" });
  }
}

// Função para processar webhooks do Mercado Pago
export async function processWebhook(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, data } = req.body;

    // Verificar a assinatura do webhook (em um ambiente real)
    // const signature = req.headers['x-signature'];
    // if (!verifySignature(req.body, signature, WEBHOOK_SECRET)) {
    //   return res.status(401).json({ error: 'Assinatura inválida' });
    // }

    // Processar diferentes tipos de eventos
    if (type === "payment") {
      const paymentId = data.id;

      // Buscar informações detalhadas do pagamento
      const paymentInfo = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          },
        },
      ).then((res) => res.json());

      // Processar o pagamento de acordo com o status
      if (paymentInfo.status === "approved") {
        // Atualizar o status do pagamento no banco de dados
        // Liberar o acesso ao conteúdo pago
        console.log(`Pagamento ${paymentId} aprovado!`);
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    return res
      .status(500)
      .json({ error: error.message || "Erro interno do servidor" });
  }
}

// Função para verificar a assinatura do webhook
function verifySignature(payload, signature, secret) {
  const crypto = require("crypto");
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");

  return generatedSignature === signature;
}
