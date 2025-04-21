// Servidor Express para API do Mercado Pago
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { MERCADOPAGO_CONFIG } from './src/lib/mercadopago-config.js';
import crypto from 'crypto';
import path from 'path';

// Configurar o Mercado Pago com o token de acesso
const client = new MercadoPagoConfig({ 
  accessToken: MERCADOPAGO_CONFIG.ACCESS_TOKEN 
});

// Criar instâncias dos serviços
const preferenceClient = new Preference(client);
const paymentClient = new Payment(client);

// Criar instância do servidor Express
const app = express();
const port = process.env.PORT || 3001;

// Variável para armazenar o URL do Ngrok
let ngrokUrl = null;

// Configurar middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist')); // Servir arquivos estáticos da pasta dist

// Middleware para verificar assinatura do webhook
const verifyWebhookSignature = (req, res, next) => {
  // Apenas verificar assinatura em produção ou se estiver configurado para isso
  if (process.env.NODE_ENV === 'production' || process.env.VERIFY_WEBHOOK_SIGNATURE === 'true') {
    try {
      const signature = req.headers['x-signature'] || '';
      const requestBody = JSON.stringify(req.body);
      
      // Calcular o HMAC SHA256 do corpo da requisição usando a chave secreta
      const calculatedSignature = crypto
        .createHmac('sha256', MERCADOPAGO_CONFIG.WEBHOOK_SECRET)
        .update(requestBody)
        .digest('hex');
      
      // Comparar a assinatura calculada com a recebida
      if (signature !== calculatedSignature) {
        console.error('Assinatura do webhook inválida');
        return res.status(401).json({ error: 'Assinatura inválida' });
      }
      
      console.log('Assinatura do webhook verificada com sucesso');
    } catch (error) {
      console.error('Erro ao verificar assinatura do webhook:', error);
      // Em caso de erro na verificação, continuar por segurança
      // Isso pode ser ajustado conforme a política de segurança
    }
  }
  
  next();
};

// Rota para definir o URL do Ngrok
app.post('/api/set-ngrok-url', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL não fornecido' });
  }
  
  ngrokUrl = url;
  console.log('URL do Ngrok definido:', ngrokUrl);
  
  return res.status(200).json({ success: true, url: ngrokUrl });
});

// Rota para obter o URL do Ngrok
app.get('/api/get-ngrok-url', (req, res) => {
  return res.status(200).json({ url: ngrokUrl });
});

// Rota de status para verificar se o servidor está online
app.get('/api/status', (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    message: 'Servidor de pagamento está funcionando corretamente',
    ngrokUrl: ngrokUrl
  });
});

// Rota para criar preferência de pagamento
app.post('/api/mercadopago/create-preference', async (req, res) => {
  try {
    const { title, price, description, quantity, lotteryType } = req.body;
    
    if (!title || !price || !description || !quantity) {
      return res.status(400).json({ 
        error: 'Parâmetros inválidos. Todos os campos são obrigatórios: title, price, description, quantity' 
      });
    }

    console.log('Criando preferência de pagamento:', { title, price, description, quantity, lotteryType });
    
    // Usar o URL do Ngrok para as URLs de retorno se disponível
    const baseUrl = ngrokUrl || 'http://localhost:5175';
    const notificationUrl = ngrokUrl ? `${ngrokUrl}/api/mercadopago/webhook` : MERCADOPAGO_CONFIG.NOTIFICATION_URL;
    
    // Gerar um código único para correlacionar o pagamento com o sistema interno
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 10000);
    const externalReference = `lottery_${lotteryType || 'generic'}_${timestamp}_${randomId}`;
    
    const preferenceData = {
      items: [
        {
          id: `lottery_access_${timestamp}`,
          title: title,
          description: description,
          quantity: quantity,
          currency_id: 'BRL',
          unit_price: parseFloat(price),
        },
      ],
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      notification_url: notificationUrl,
      auto_return: 'approved',
      statement_descriptor: 'SORTIAIA',
      binary_mode: true, // Alterado para true para evitar status pendente durante testes
      expires: false, // Não expira
      external_reference: externalReference, // Código único para correlacionar com o sistema interno
    };

    console.log('Dados da preferência:', {
      backUrls: preferenceData.back_urls,
      notificationUrl: preferenceData.notification_url,
      externalReference: preferenceData.external_reference
    });

    const preference = await preferenceClient.create({ body: preferenceData });
    
    console.log('Preferência criada com sucesso:', preference.id);
    
    return res.status(200).json({
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
      external_reference: externalReference // Retornar o external_reference para o cliente
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return res.status(500).json({ 
      error: 'Erro ao criar preferência de pagamento',
      details: error.message 
    });
  }
});

// Rota para verificar o status de um pagamento específico (alternativa para webhook)
app.get('/api/mercadopago/payment-status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    if (!paymentId) {
      return res.status(400).json({ error: 'ID do pagamento não fornecido' });
    }
    
    console.log('Verificando status do pagamento:', paymentId);
    
    const payment = await paymentClient.get({ id: paymentId });
    console.log('Informações do pagamento:', payment);
    
    return res.status(200).json({
      id: payment.id,
      status: payment.status,
      status_detail: payment.status_detail,
      payment_method_id: payment.payment_method_id,
      payment_type_id: payment.payment_type_id,
      transaction_amount: payment.transaction_amount,
      date_created: payment.date_created,
      date_approved: payment.date_approved,
    });
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error);
    return res.status(500).json({ 
      error: 'Erro ao verificar status do pagamento',
      details: error.message 
    });
  }
});

// Rota para receber notificações do Mercado Pago (webhook)
app.post('/api/mercadopago/webhook', async (req, res) => {
  try {
    console.log('Webhook recebido - Headers:', req.headers);
    console.log('Webhook recebido - Body:', JSON.stringify(req.body, null, 2));
    
    const { action, api_version, data, date_created, id, live_mode, type, user_id } = req.body;
    
    // Registrar todos os dados recebidos para depuração
    console.log('Webhook detalhado:', { 
      action, 
      api_version, 
      data, 
      date_created, 
      id, 
      live_mode, 
      type, 
      user_id 
    });
    
    // Processar notificação de pagamento
    if (type === 'payment') {
      const paymentId = data.id;
      
      try {
        // Obter informações do pagamento
        const payment = await paymentClient.get({ id: paymentId });
        console.log('Informações do pagamento:', JSON.stringify(payment, null, 2));
        
        // Extrair external_reference para correlacionar com o sistema interno
        const externalReference = payment.external_reference;
        console.log('External reference recebido:', externalReference);
        
        // Extrair informações do external_reference (formato: lottery_tipo_timestamp_random)
        if (externalReference) {
          const parts = externalReference.split('_');
          if (parts.length >= 4 && parts[0] === 'lottery') {
            const lotteryType = parts[1];
            console.log('Tipo de loteria identificado:', lotteryType);
            
            // Verificar status do pagamento
            if (payment.status === 'approved') {
              console.log(`Pagamento ${paymentId} aprovado para ${lotteryType}!`);
              // Aqui você pode implementar a lógica para ativar recursos premium
              // Como estamos usando localStorage no cliente, o webhook serve apenas para registro
            } else {
              console.log(`Pagamento ${paymentId} com status: ${payment.status} para ${lotteryType}`);
            }
          }
        }
      } catch (paymentError) {
        console.error('Erro ao obter informações do pagamento:', paymentError);
      }
    }
    
    // Sempre retornar 200 para o Mercado Pago, mesmo em caso de erros internos
    return res.status(200).json({ message: 'Webhook recebido com sucesso' });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    // Mesmo em caso de erro, retornar 200 para o Mercado Pago
    return res.status(200).json({ message: 'Webhook recebido, mas ocorreu um erro no processamento' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Configuração do Mercado Pago:`, {
    publicKey: MERCADOPAGO_CONFIG.PUBLIC_KEY,
    successUrl: MERCADOPAGO_CONFIG.SUCCESS_URL,
    failureUrl: MERCADOPAGO_CONFIG.FAILURE_URL,
    pendingUrl: MERCADOPAGO_CONFIG.PENDING_URL,
    notificationUrl: MERCADOPAGO_CONFIG.NOTIFICATION_URL
  });
  console.log(`Para testar webhooks com Ngrok, use a rota /api/set-ngrok-url para definir o URL do Ngrok`);
}).on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err);
});

// Rota de fallback para SPA (Single Page Application)
app.get('*', (req, res) => {
  // Servir o index.html para que o React Router possa lidar com a rota
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
