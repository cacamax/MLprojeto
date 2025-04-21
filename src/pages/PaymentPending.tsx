import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Clock, RefreshCw, CheckCircle } from "lucide-react";

const PaymentPending: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  const [ngrokUrl, setNgrokUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);

  // Extrair o ID do pagamento da URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paymentId = urlParams.get('payment_id');
    
    if (paymentId) {
      // Armazenar o ID do pagamento para verificação
      localStorage.setItem("mp_pending_payment_id", paymentId);
      localStorage.setItem("mp_pending_payment_time", Date.now().toString());
      
      // Iniciar verificação periódica
      const intervalId = setInterval(() => {
        checkPaymentStatus(paymentId);
      }, 10000); // Verificar a cada 10 segundos
      
      // Limpar intervalo ao desmontar o componente
      return () => clearInterval(intervalId);
    }
  }, [location]);

  // Obter URL do Ngrok do localStorage
  useEffect(() => {
    const savedNgrokUrl = localStorage.getItem('ngrok_url');
    if (savedNgrokUrl) {
      setNgrokUrl(savedNgrokUrl);
    }
  }, []);

  // Countdown para próxima verificação
  useEffect(() => {
    if (countdown > 0 && paymentStatus === 'pending') {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(30);
    }
  }, [countdown, paymentStatus]);

  // Função para verificar o status do pagamento
  const checkPaymentStatus = async (paymentId: string) => {
    if (!ngrokUrl) return;
    
    setIsChecking(true);
    
    try {
      const response = await fetch(`${ngrokUrl}/api/mercadopago/payment-status/${paymentId}`);
      
      if (!response.ok) {
        console.error('Erro ao verificar status do pagamento');
        setIsChecking(false);
        return;
      }
      
      const data = await response.json();
      console.log('Status do pagamento:', data);
      
      if (data.status === 'approved') {
        setPaymentStatus('approved');
        
        // Ativar acesso premium
        localStorage.setItem("megasena_premium", "true");
        localStorage.setItem("lotofacil_premium", "true");
        localStorage.setItem("quina_premium", "true");
        localStorage.setItem("timemania_premium", "true");
        localStorage.setItem("duplasena_premium", "true");
        localStorage.setItem("showAdvancedCombinations", "true");
        
        // Limpar pagamento pendente
        localStorage.removeItem("mp_pending_payment_id");
        localStorage.removeItem("mp_pending_payment_time");
        
        // Redirecionar após 3 segundos
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else if (data.status === 'rejected') {
        setPaymentStatus('rejected');
      }
    } catch (error) {
      console.error('Erro ao verificar status do pagamento:', error);
    } finally {
      setIsChecking(false);
    }
  };

  // Verificar manualmente o status do pagamento
  const handleManualCheck = () => {
    const paymentId = localStorage.getItem("mp_pending_payment_id");
    if (paymentId) {
      checkPaymentStatus(paymentId);
      setCountdown(30);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        {paymentStatus === 'pending' && (
          <>
            <div className="flex justify-center mb-6">
              <Clock className="h-16 w-16 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Pagamento Pendente</h1>
            <p className="text-gray-600 mb-6">
              Seu pagamento está sendo processado. Se você já completou o pagamento via PIX, 
              aguarde alguns instantes para a confirmação.
            </p>
            <div className="mb-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-amber-700">
                Próxima verificação automática em: <span className="font-bold">{countdown}</span> segundos
              </p>
            </div>
            <Button 
              onClick={handleManualCheck}
              disabled={isChecking}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 mb-4 w-full"
            >
              {isChecking ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                  Verificando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Verificar Pagamento Agora
                </span>
              )}
            </Button>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="px-6 py-2 w-full"
            >
              Voltar para a Página Inicial
            </Button>
          </>
        )}

        {paymentStatus === 'approved' && (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Pagamento Aprovado!</h1>
            <p className="text-gray-600 mb-6">
              Seu pagamento foi processado com sucesso. Você agora tem acesso ao gerador avançado 
              de combinações para todas as loterias.
            </p>
            <p className="text-gray-600 mb-6">
              Redirecionando para a página inicial...
            </p>
          </>
        )}

        {paymentStatus === 'rejected' && (
          <>
            <div className="flex justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Pagamento Recusado</h1>
            <p className="text-gray-600 mb-6">
              Infelizmente seu pagamento foi recusado. Por favor, tente novamente com outro método de pagamento.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
            >
              Voltar para a Página Inicial
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPending;
