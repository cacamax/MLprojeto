// API que retorna um HTML completo com o checkout do Mercado Pago integrado
import mercadopagoConfig from '../../../lib/mercadopago-config.js';
const mercadopago = mercadopagoConfig;
const { publicKey } = mercadopagoConfig;

export default async function handler(req, res) {
  // Verificar método da requisição
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Obter parâmetros da URL
    const lotteryType = req.query.lottery || 'megasena';
    
    // Criar preferência no Mercado Pago
    const preferenceData = {
      items: [
        {
          id: `lottery_${lotteryType}_${Date.now()}`,
          title: 'Modo Avançado de IA - Loteria',
          description: `Acesso ao gerador avançado de combinações para ${lotteryType}`,
          quantity: 1,
          currency_id: "BRL",
          unit_price: 1.00,
        },
      ],
      back_urls: {
        success: `${getBaseUrl(req)}/mercadopago-success.html?lottery=${lotteryType}`,
        failure: `${getBaseUrl(req)}/${lotteryType}`,
        pending: `${getBaseUrl(req)}/${lotteryType}`
      },
      auto_return: "approved",
      statement_descriptor: "PROJETOL LOTERIAS",
      external_reference: `lottery_${lotteryType}_${Date.now()}`,
      notification_url: `${getBaseUrl(req)}/api/mercadopago/webhook`,
    };

    console.log("Preference data:", JSON.stringify(preferenceData, null, 2));

    // Criar preferência usando a API do Mercado Pago
    const preference = await mercadopago.preferences.create(preferenceData);
    
    console.log("Preference created:", JSON.stringify({
      id: preference.body.id,
      init_point: preference.body.init_point
    }, null, 2));

    // Enviar HTML com a preferência já integrada
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(getCheckoutHTML(preference.body.id, lotteryType, publicKey));
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    
    // Retornar página de erro
    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(getErrorHTML(error.message, lotteryType));
  }
}

// Função auxiliar para obter a URL base
function getBaseUrl(req) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host || 'localhost:5176';
  return process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;
}

// Modelo HTML para checkout integrado
function getCheckoutHTML(preferenceId, lotteryType, publicKey) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout Mercado Pago - Modelo Predefinido</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 30px;
      width: 100%;
      max-width: 500px;
      text-align: center;
    }
    
    h1 {
      color: #009ee3;
      margin-top: 0;
      margin-bottom: 20px;
    }
    
    .product-info {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      text-align: left;
    }
    
    .product-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    .product-price {
      font-size: 24px;
      font-weight: bold;
      color: #009ee3;
    }
    
    .message {
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
      display: none;
    }
    
    .loader {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #009ee3;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 2s linear infinite;
      margin: 20px auto;
      display: none;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .checkout-button {
      background-color: #009ee3;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px 20px;
      font-size: 16px;
      width: 100%;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .checkout-button:hover {
      background-color: #008fcf;
    }
    
    .mercadopago-button {
      background-color: #009ee3;
      color: white;
      font-family: "Helvetica Neue", Arial, sans-serif;
      font-size: 0.875em;
      line-height: 2.7em;
      font-weight: bold;
      border: 0;
      border-radius: 0.2em;
      box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.2);
      width: 100%;
      cursor: pointer;
      outline: none;
      height: 2.7em;
      text-align: center;
    }
    
    #checkout-btn {
      display: block;
      margin: 20px auto 0;
    }
    
    .features {
      margin: 20px 0;
      text-align: left;
    }
    
    .feature {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .feature .check {
      color: #4CAF50;
      margin-right: 10px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Modo Avançado de IA</h1>
    
    <div class="product-info">
      <div class="product-title">Acesso ao gerador avançado de combinações</div>
      <div class="product-price">R$ 1,00</div>
    </div>
    
    <div class="features">
      <div class="feature">
        <span class="check">✓</span>
        <span>Algoritmos avançados de IA para gerar combinações</span>
      </div>
      <div class="feature">
        <span class="check">✓</span>
        <span>Análise estatística dos sorteios anteriores</span>
      </div>
      <div class="feature">
        <span class="check">✓</span>
        <span>Combinações com maior probabilidade de acerto</span>
      </div>
      <div class="feature">
        <span class="check">✓</span>
        <span>Suporte prioritário</span>
      </div>
    </div>
    
    <div id="checkout-button-container">
      <!-- Checkout do Mercado Pago será renderizado aqui -->
    </div>
  </div>
  
  <!-- SDK MercadoPago.js V2 -->
  <script src="https://sdk.mercadopago.com/js/v2"></script>
  
  <script>
    // Verifica se já tem acesso
    if (localStorage.getItem('showAdvancedCombinations') === 'true') {
      // Já tem acesso, mostrar botão para ir ao gerador
      const button = document.createElement('button');
      button.className = 'checkout-button';
      button.textContent = 'Ir para o gerador avançado';
      button.addEventListener('click', () => {
        window.location.href = '/${lotteryType}';
      });
      
      document.getElementById('checkout-button-container').appendChild(button);
    } else {
      // Inicializar o SDK do Mercado Pago
      const mp = new MercadoPago('${publicKey}', {
        locale: 'pt-BR'
      });
      
      // Criar o botão de checkout
      mp.checkout({
        preference: {
          id: '${preferenceId}'
        },
        render: {
          container: '#checkout-button-container',
          label: 'Pagar agora',
        }
      });
    }
  </script>
</body>
</html>`;
}

// Modelo HTML para página de erro
function getErrorHTML(errorMessage, lotteryType) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Erro - Checkout Mercado Pago</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 30px;
      width: 100%;
      max-width: 500px;
      text-align: center;
    }
    
    h1 {
      color: #c62828;
      margin-top: 0;
      margin-bottom: 20px;
    }
    
    .message {
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
      background-color: #ffebee;
      color: #c62828;
      text-align: left;
    }
    
    .button {
      background-color: #009ee3;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s;
      text-decoration: none;
      display: inline-block;
      margin-top: 20px;
    }
    
    .button:hover {
      background-color: #008fcf;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Erro ao processar pagamento</h1>
    
    <div class="message">
      <p><strong>Não foi possível iniciar o checkout:</strong></p>
      <p>${errorMessage}</p>
    </div>
    
    <a href="/${lotteryType}" class="button">Voltar para o início</a>
  </div>
</body>
</html>`;
}
