// API para verificar o status da integração com o Mercado Pago
import mercadopago from '../../../lib/mercadopago-config.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Verificar se o SDK está configurado corretamente
    const sdkConfig = {
      isConfigured: !!mercadopago.configurations.getAccessToken(),
      publicKey: process.env.MP_PUBLIC_KEY || "APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c",
      environment: process.env.NODE_ENV,
      webhookUrl: `${getBaseUrl(req)}/api/mercadopago/webhook`,
      serverTime: new Date().toISOString()
    };

    // Verificar se podemos fazer uma chamada simples para a API do Mercado Pago
    // Essa chamada não precisa de parâmetros específicos, apenas verifica se o token de acesso é válido
    try {
      await mercadopago.payment_methods.get();
      sdkConfig.apiConnectionStatus = 'connected';
    } catch (apiError) {
      sdkConfig.apiConnectionStatus = 'error';
      sdkConfig.apiError = apiError.message;
    }

    return res.status(200).json({
      status: 'ok',
      config: sdkConfig
    });
  } catch (error) {
    console.error('Erro ao verificar status da integração:', error);
    return res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
}

// Função auxiliar para obter a URL base
function getBaseUrl(req) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:5176';
  return process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;
}
