import React, { useEffect, useState } from "react";
import PaymentPage from "@/components/PaymentPage";
import { useSearchParams } from "react-router-dom";

const PaymentRoute: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [lotteryType, setLotteryType] = useState<string>("megasena");
  
  useEffect(() => {
    // Obter parâmetros da URL
    const lotteryParam = searchParams.get("lottery");
    if (lotteryParam) {
      setLotteryType(lotteryParam);
      // Salvar o tipo de loteria para uso posterior
      localStorage.setItem("lotteryType", lotteryParam);
    } else {
      // Usar o valor armazenado se não houver parâmetro na URL
      const storedType = localStorage.getItem("lotteryType");
      if (storedType) {
        setLotteryType(storedType);
      }
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Desbloqueie Recursos Avançados
        </h1>
        
        <div className="mb-10">
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Com o modo avançado de IA, você terá acesso a combinações otimizadas com 
            algoritmos de inteligência artificial e análise estatística de sorteios anteriores.
          </p>
        </div>
        
        <PaymentPage 
          lotteryType={lotteryType} 
          returnUrl={`/${lotteryType}`} 
        />
        
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Ao prosseguir com o pagamento, você concorda com nossos termos de serviço 
            e política de privacidade. Para qualquer dúvida, entre em contato com nosso suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentRoute;
