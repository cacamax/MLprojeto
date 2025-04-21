// Script para testar a API do Mercado Pago
import fetch from 'node-fetch';

async function testCreatePreference() {
  try {
    console.log('Testando criação de preferência...');
    
    const paymentData = {
      title: "Acesso Premium ao Gerador de Loteria",
      price: 1.00,
      description: "Acesso ao gerador avançado de combinações para Mega-Sena",
      lotteryType: "megasena",
      quantity: 1,
      buyerEmail: "cliente@exemplo.com"
    };
    
    console.log('Enviando dados:', JSON.stringify(paymentData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/mercadopago/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    
    console.log('Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('Preferência criada com sucesso:');
    console.log('ID:', data.id);
    console.log('URL de checkout:', data.init_point);
    
  } catch (error) {
    console.error('Erro ao testar API:', error);
  }
}

// Executar teste
testCreatePreference();
