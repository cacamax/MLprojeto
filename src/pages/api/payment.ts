// Este arquivo seria usado em um ambiente Next.js
// Para o ambiente atual, você precisaria de um backend separado

import { mercadoPagoConfig } from "@/lib/mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { title, price, quantity, buyerEmail, externalReference } = req.body;

    // Validar os dados recebidos
    if (!title || !price || !quantity) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    // Aqui seria a integração real com o Mercado Pago
    // Como estamos em um ambiente Vite sem backend, vamos simular a resposta

    // Em um ambiente Next.js real, você usaria o SDK do Mercado Pago:
    // import mercadopago from 'mercadopago';
    // mercadopago.configure({ access_token: mercadoPagoConfig.accessToken });
    // const preference = await mercadopago.preferences.create({ ... });

    // Simulação da resposta do Mercado Pago
    const mockPreferenceId = `mock_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const mockInitPoint = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mockPreferenceId}`;

    // Resposta simulada
    const preferenceResponse = {
      id: mockPreferenceId,
      init_point: mockInitPoint,
      sandbox_init_point: mockInitPoint,
      external_reference: externalReference,
      items: [
        {
          id: "1",
          title,
          quantity,
          unit_price: price,
          currency_id: "BRL",
        },
      ],
    };

    return res.status(200).json(preferenceResponse);
  } catch (error) {
    console.error("Erro ao criar preferência de pagamento:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
