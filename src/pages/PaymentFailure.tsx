import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { XCircle } from "lucide-react";

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pagamento não Concluído</h1>
        <p className="text-gray-600 mb-6">
          Houve um problema ao processar seu pagamento. Isso pode ter ocorrido por diversos motivos.
        </p>
        <p className="text-gray-600 mb-6">
          Por favor, tente novamente ou escolha outro método de pagamento.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
        >
          Voltar para a Página Inicial
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailure;
