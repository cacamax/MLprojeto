import React from 'react';
import MercadoPagoButton from '../components/MercadoPagoButton';

// Página de teste para o componente MercadoPagoButton
export default function MercadoPagoButtonTest() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Teste do Botão Mercado Pago
        </h1>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-sm text-blue-700">
            <strong>Credenciais de produção:</strong> <code>APP_USR-79df32c0-dbdf-4313-b924-c6f7e7d068a5</code>
          </p>
        </div>
        
        <div className="mb-8 bg-gray-50 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Detalhes do Produto</h2>
          <div className="space-y-2">
            <p><strong>Nome:</strong> Modo Avançado de IA - Loteria</p>
            <p><strong>Preço:</strong> R$ 1,00</p>
            <p><strong>Descrição:</strong> Acesso ao gerador avançado de combinações</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Botão de Pagamento</h2>
          <MercadoPagoButton 
            title="Modo Avançado de IA - Loteria"
            price={1.00}
            description="Acesso ao gerador avançado de combinações"
            lotteryType="megasena"
            buyerEmail=""
          />
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Como funciona:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Clique no botão de pagamento acima</li>
            <li>Você será redirecionado para o checkout do Mercado Pago</li>
            <li>Após completar o pagamento, você será redirecionado de volta para a página de sucesso</li>
            <li>O modo avançado será ativado automaticamente</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
