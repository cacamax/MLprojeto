// API para criar preferência de pagamento no Mercado Pago

// Configurações do Mercado Pago
const ACCESS_TOKEN =
  "APP_USR-8148153279757607-030919-8c18fcc8d457093ccfea4bb3952f7b68-2318017672";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const {
      title,
      price,
      quantity = 1,
      description,
      externalReference,
    } = req.body;

    // Validar dados
    if (!title || !price) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    // Criar objeto de preferência
    const preference = {
      items: [
        {
          title,
          description: description || title,
          quantity: quantity,
          currency_id: "BRL",
          unit_price: parseFloat(price),
        },
      ],
      external_reference: externalReference,
      back_urls: {
        success: `${req.headers.origin}/success`,
        failure: `${req.headers.origin}/failure`,
        pending: `${req.headers.origin}/pending`,
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
      },
    };

    // Em um ambiente real, você faria uma requisição para a API do Mercado Pago
    // Aqui estamos simulando a resposta para fins de teste
    const mockPreferenceId = `mock_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    // Retornar a preferência simulada
    return res.status(200).json({
      id: mockPreferenceId,
      init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mockPreferenceId}`,
      sandbox_init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mockPreferenceId}`,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    return res
      .status(500)
      .json({ error: error.message || "Erro interno do servidor" });
  }
}
