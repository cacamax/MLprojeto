// API para processar webhooks do Mercado Pago
import { payment, verifyWebhookSignature } from "../../../lib/mercadopago.js";

// Função auxiliar para processar pagamentos
async function processPayment(paymentId) {
  try {
    // Buscar detalhes do pagamento
    console.log(`Buscando detalhes do pagamento: ${paymentId}`);
    const paymentInfo = await payment.get({ id: paymentId });
    
    // Processar informações do pagamento
    const { status, status_detail, external_reference } = paymentInfo;
    console.log(`Pagamento ${paymentId} - Status: ${status}, Detalhe: ${status_detail}, Referência: ${external_reference}`);
    
    // Lógica para processar pagamentos baseado no status
    if (status === 'approved') {
      console.log(`Pagamento ${paymentId} aprovado!`);
      // Aqui você pode atualizar o banco de dados ou fazer qualquer outra ação necessária
    } else if (status === 'pending') {
      console.log(`Pagamento ${paymentId} pendente. Detalhe: ${status_detail}`);
    } else if (status === 'rejected') {
      console.log(`Pagamento ${paymentId} rejeitado. Detalhe: ${status_detail}`);
    }
    
    return { status, status_detail, external_reference };
  } catch (error) {
    console.error(`Erro ao processar pagamento ${paymentId}:`, error);
    throw error;
  }
}

// Função auxiliar para validar o payload do webhook
function validateWebhookPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error("Formato inválido do payload do webhook");
  }
  
  return { type: payload.type, action: payload.action, dataId: payload.data?.id };
}

export default async function handler(req, res) {
  // Aceitar apenas métodos POST para webhooks
  if (req.method !== "POST") {
    console.log(`Método não permitido para webhook: ${req.method}`);
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Obter dados do webhook
    const payload = req.body;
    
    // Log para depuração
    console.log("Webhook do Mercado Pago recebido:", 
      JSON.stringify({
        headers: req.headers,
        query: req.query,
        body: typeof payload === 'object' ? 
          { type: payload.type, action: payload.action, id: payload.data?.id } : 
          "Formato inválido"
      }, null, 2)
    );

    // Verificar a assinatura do webhook (autenticidade)
    const signatureResult = verifyWebhookSignature(req);
    if (!signatureResult.valid && process.env.NODE_ENV !== 'development') {
      console.warn("Assinatura do webhook inválida:", signatureResult.error);
      // Em produção, verificamos a assinatura rigorosamente
      // Em desenvolvimento, podemos prosseguir mesmo com assinatura inválida
      if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({ error: signatureResult.error });
      }
    }

    // Validar o payload do webhook
    const { type, action, dataId } = validateWebhookPayload(payload);
    
    // Processar notificação de pagamento
    if (type === 'payment' && action === 'created' && dataId) {
      await processPayment(dataId);
    } else {
      console.log(`Tipo de notificação não processado: ${type} / ${action}`);
    }

    // Retornar sucesso - Mercado Pago espera um HTTP 200
    return res.status(200).json({
      received: true,
      message: "Webhook processado com sucesso"
    });
  } catch (error) {
    // Log detalhado do erro
    console.error("Erro ao processar webhook do Mercado Pago:", error);
    
    // Em produção, sempre retornar 200 para evitar retentativas do Mercado Pago
    if (process.env.NODE_ENV === 'production') {
      return res.status(200).json({ 
        received: true,
        message: "Webhook processado, mas com erros"
      });
    }
    
    // Em desenvolvimento, retornar detalhes do erro
    return res.status(500).json({ 
      error: error.message || "Erro interno do servidor"
    });
  }
}
