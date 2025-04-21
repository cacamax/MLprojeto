import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { initMercadoPago, redirectToCheckout } from "@/lib/mercadopago-client";

const MercadoPagoCheckout = ({
  preferenceId,
  onPaymentSuccess,
  onPaymentError,
  fallbackButtonText = "Pagar com Mercado Pago",
  className = "",
}) => {
  const checkoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar se temos um ID de preferência
    if (!preferenceId) {
      setError("ID de preferência não fornecido");
      setIsLoading(false);
      return;
    }

    // Inicializar o Mercado Pago
    const setupCheckout = async () => {
      try {
        const mp = await initMercadoPago();

        // Renderizar o botão de checkout
        if (checkoutRef.current) {
          mp.checkout({
            preference: {
              id: preferenceId,
            },
            render: {
              container: checkoutRef.current,
              label: "Pagar",
              type: "wallet_button",
            },
            callbacks: {
              onReady: () => {
                setIsLoading(false);
                console.log("Checkout pronto");
              },
              onError: (error) => {
                console.error("Erro no checkout:", error);
                setError("Erro ao carregar checkout");
                setIsLoading(false);
                if (onPaymentError) onPaymentError(error);
              },
              onSubmit: () => {
                console.log("Pagamento iniciado");
              },
            },
          });
        }
      } catch (error) {
        console.error("Erro ao inicializar Mercado Pago:", error);
        setError("Erro ao inicializar pagamento");
        setIsLoading(false);
        if (onPaymentError) onPaymentError(error);
      }
    };

    setupCheckout();
  }, [preferenceId, onPaymentSuccess, onPaymentError]);

  // Botão de fallback em caso de erro
  const handleFallbackClick = () => {
    redirectToCheckout(preferenceId);
  };

  return (
    <div className={className}>
      {isLoading && (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Carregando...
        </Button>
      )}

      <div ref={checkoutRef} className={isLoading ? "hidden" : ""} />

      {error && (
        <div className="space-y-2">
          <p className="text-sm text-red-500">{error}</p>
          <Button onClick={handleFallbackClick} className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            {fallbackButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MercadoPagoCheckout;
