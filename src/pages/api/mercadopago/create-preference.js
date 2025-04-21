// API para criar preferência de pagamento no Mercado Pago
import { createPreference } from '../../../lib/mercadopago.js';

export default async function handler(req, res) {
  // Verificar se o método é POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Extrair dados do corpo da requisição
    const { 
      title, 
      description, 
      price, 
      quantity = 1, 
      lotteryType = 'quina', 
      externalReference = null 
    } = req.body;

    // Validar dados obrigatórios
    if (!title || !price) {
      return res.status(400).json({ error: 'Dados incompletos. Título e preço são obrigatórios.' });
    }

    // Validar preço
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ error: 'Preço inválido. Deve ser um número maior que zero.' });
    }

    // Gerar referência externa se não fornecida
    const finalExternalReference = externalReference || `${lotteryType}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Criar preferência usando a função do módulo mercadopago
    const preferenceData = {
      title,
      description,
      price: parsedPrice,
      quantity,
      lotteryType,
      externalReference: finalExternalReference
    };

    console.log("Criando preferência com os dados:", JSON.stringify(preferenceData, null, 2));

    // Criar preferência usando a função do módulo mercadopago
    const preference = await createPreference(preferenceData);
    
    console.log("Preferência criada:", JSON.stringify({
      id: preference.id,
      init_point: preference.init_point
    }, null, 2));

    // Retornar a preferência criada
    return res.status(200).json({
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
      external_reference: finalExternalReference
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    return res.status(500).json({ 
      error: 'Erro ao criar preferência de pagamento',
      details: error.message
    });
  }
}
