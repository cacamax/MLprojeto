// API para testar a criação de preferência no Mercado Pago

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Criar um ID de preferência simulado para teste
    const preferenceId = `TEST_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    // Retornar a preferência simulada
    return res.status(200).json({
      id: preferenceId,
      init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}&public_key=APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c`,
      sandbox_init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}&public_key=APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c`,
      external_reference: `lottery_quina_${Date.now()}`,
      message: "Preferência de teste criada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao criar preferência de teste:", error);
    return res
      .status(500)
      .json({ error: error.message || "Erro interno do servidor" });
  }
}
