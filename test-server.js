// Servidor de teste para Mercado Pago
import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-8148153279757607-030919-8c18fcc8d457093ccfea4bb3952f7b68-2318017672'
});

const preference = new Preference(client);

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ status: 'ok' });
});

// Rota para criar preferência
app.post('/create-preference', async (req, res) => {
  try {
    const preferenceData = {
      items: [
        {
          title: 'Acesso Premium',
          unit_price: 1,
          quantity: 1,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: 'http://127.0.0.1:5175/success',
        failure: 'http://127.0.0.1:5175/failure'
      },
      auto_return: 'approved'
    };

    const result = await preference.create(preferenceData);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

// Iniciar servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor de teste rodando em http://127.0.0.1:${port}`);
});
