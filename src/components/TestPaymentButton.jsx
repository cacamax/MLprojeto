import React, { useState } from "react";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";

const TestPaymentButton = ({ className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simular pagamento aprovado diretamente
      localStorage.setItem("showAdvancedCombinations", "true");
      localStorage.setItem("lotteryType", "quina");

      // Redirecionar para a página da loteria
      window.location.href = "/quina";
    } catch (err) {
      console.error("Erro ao testar pagamento:", err);
      setError("Erro ao processar pagamento de teste. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" />
            Testar Pagamento (Modo Teste)
          </>
        )}
      </Button>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default TestPaymentButton;
