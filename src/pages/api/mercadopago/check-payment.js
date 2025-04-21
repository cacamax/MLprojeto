import { getPaymentInfo } from "../../../lib/mercadopago-server";

/**
 * API para verificar o status de um pagamento do Mercado Pago
 * 
 * @param {object} req - Objeto de requisição Next.js
 * @param {object} res - Objeto de resposta Next.js
 */
export default async function handler(req, res) {
  // Aceitar apenas requisições GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Obter o ID do pagamento da query
    const { payment_id } = req.query;

    if (!payment_id) {
      return res.status(400).json({
        error: "ID de pagamento não fornecido",
      });
    }

    console.log(`Verificando status do pagamento: ${payment_id}`);

    // Obter informações do pagamento
    const paymentInfo = await getPaymentInfo(payment_id);

    // Retornar a resposta
    res.status(200).json({
      id: paymentInfo.id,
      status: paymentInfo.status,
      status_detail: paymentInfo.status_detail,
      external_reference: paymentInfo.external_reference,
      date_created: paymentInfo.date_created,
      date_approved: paymentInfo.date_approved,
      payment_method_id: paymentInfo.payment_method_id,
      payment_type_id: paymentInfo.payment_type_id,
      transaction_amount: paymentInfo.transaction_amount,
    });
  } catch (error) {
    console.error("Erro ao verificar pagamento:", error);
    
    res.status(500).json({
      error: "Erro ao verificar pagamento",
      message: error.message,
    });
  }
}
