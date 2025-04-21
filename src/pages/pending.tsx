import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";

const PaymentPendingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  const [ngrokUrl, setNgrokUrl] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  // Extrair o ID do pagamento da URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('payment_id');
    
    if (id) {
      setPaymentId(id);
      // Armazenar o ID do pagamento para verificação
      localStorage.setItem("mp_pending_payment_id", id);
      localStorage.setItem("mp_pending_payment_time", Date.now().toString());
      
      // Iniciar verificação periódica
      const intervalId = setInterval(() => {
        checkPaymentStatus(id);
      }, 10000); // Verificar a cada 10 segundos
      
      // Limpar intervalo ao desmontar o componente
      return () => clearInterval(intervalId);
    } else {
      // Tentar recuperar do localStorage
      const savedId = localStorage.getItem("mp_pending_payment_id");
      if (savedId) {
        setPaymentId(savedId);
      }
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
      if (paymentId) {
        checkPaymentStatus(paymentId);
      }
    }
  }, [countdown, paymentStatus, paymentId]);

  // Função para verificar o status do pagamento
  const checkPaymentStatus = async (id: string) => {
    if (!ngrokUrl) return;
    
    setIsChecking(true);
    
    try {
      const response = await fetch(`${ngrokUrl}/api/mercadopago/payment-status/${id}`);
      
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
    if (paymentId) {
      checkPaymentStatus(paymentId);
      setCountdown(30);
    }
  };

  const handleContinue = () => {
    // Redirecionar para a página inicial
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-6">
              {paymentStatus === 'pending' && (
                <>
                  <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Clock className="h-10 w-10 text-yellow-600" />
                  </div>

                  <h1 className="text-3xl font-bold">Pagamento em Processamento</h1>

                  <p className="text-xl text-muted-foreground">
                    Seu pagamento está sendo processado. Assim que for confirmado,
                    você terá acesso ao Gerador Avançado.
                  </p>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 w-full">
                    <p className="text-yellow-800">
                      O processamento pode levar alguns minutos. Próxima verificação automática em: <span className="font-bold">{countdown}</span> segundos
                    </p>
                  </div>

                  <Button
                    onClick={handleManualCheck}
                    disabled={isChecking}
                    className="mt-4 px-8 py-6 h-auto text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white w-full"
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
                    variant="outline"
                    onClick={handleContinue}
                    className="px-8 py-6 h-auto text-lg font-semibold w-full"
                  >
                    Voltar para o Gerador
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}

              {paymentStatus === 'approved' && (
                <>
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>

                  <h1 className="text-3xl font-bold">Pagamento Aprovado!</h1>

                  <p className="text-xl text-muted-foreground">
                    Seu pagamento foi processado com sucesso. Você agora tem acesso ao gerador avançado 
                    de combinações para todas as loterias.
                  </p>

                  <p className="text-muted-foreground">
                    Redirecionando para a página inicial...
                  </p>
                </>
              )}

              {paymentStatus === 'rejected' && (
                <>
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>

                  <h1 className="text-3xl font-bold">Pagamento Recusado</h1>

                  <p className="text-xl text-muted-foreground">
                    Infelizmente seu pagamento foi recusado. Por favor, tente novamente com outro método de pagamento.
                  </p>

                  <Button
                    onClick={handleContinue}
                    className="mt-4 px-8 py-6 h-auto text-lg font-semibold"
                  >
                    Voltar para o Gerador
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPendingPage;
