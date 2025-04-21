import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { CheckCircle } from "lucide-react";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Ativar acesso premium quando a página de sucesso é carregada
    localStorage.setItem("megasena_premium", "true");
    localStorage.setItem("lotofacil_premium", "true");
    localStorage.setItem("quina_premium", "true");
    localStorage.setItem("timemania_premium", "true");
    localStorage.setItem("duplasena_premium", "true");
    localStorage.setItem("showAdvancedCombinations", "true");
    
    // Limpar parâmetros da URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Pagamento Aprovado!</h1>
        <p className="text-gray-600 mb-6">
          Seu pagamento foi processado com sucesso. Você agora tem acesso ao gerador avançado de combinações para todas as loterias.
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

export default PaymentSuccess;
