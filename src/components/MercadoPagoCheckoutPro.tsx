import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";

interface MercadoPagoCheckoutProProps {
  preferenceId: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: any) => void;
  fallbackButtonText?: string;
  className?: string;
}

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const MercadoPagoCheckoutPro: React.FC<MercadoPagoCheckoutProProps> = ({
  preferenceId,
  onPaymentSuccess,
  onPaymentError,
  fallbackButtonText = "Pagar com Mercado Pago",
  className = "",
}) => {
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se temos um ID de preferência
    if (!preferenceId) {
      setError("ID de preferência não fornecido");
      setIsLoading(false);
      return;
    }

    // Carregar o SDK do Mercado Pago
    const loadMercadoPagoScript = () => {
      if (window.MercadoPago) {
        initMercadoPago();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.type = "text/javascript";
      script.onload = initMercadoPago;
      script.onerror = handleScriptError;
      document.body.appendChild(script);
    };

    // Inicializar o Mercado Pago
    const initMercadoPago = () => {
      try {
        const mp = new window.MercadoPago(
          "APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c",
          {
            locale: "pt-BR",
          },
        );

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
              onError: (error: any) => {
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

    // Tratar erro ao carregar o script
    const handleScriptError = () => {
      console.error("Erro ao carregar script do Mercado Pago");
      setError("Erro ao carregar Mercado Pago");
      setIsLoading(false);
      if (onPaymentError)
        onPaymentError(new Error("Erro ao carregar script do Mercado Pago"));
    };

    // Carregar o script
    loadMercadoPagoScript();

    // Limpar ao desmontar
    return () => {
      const script = document.querySelector(
        'script[src="https://sdk.mercadopago.com/js/v2"]',
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [preferenceId, onPaymentSuccess, onPaymentError]);

  // Botão de fallback em caso de erro
  const handleFallbackClick = () => {
    // Redirecionar para o Mercado Pago usando o SDK
    import("@/lib/mercadopago-sdk").then(({ redirectToCheckout }) => {
      redirectToCheckout(preferenceId);
    });
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

export default MercadoPagoCheckoutPro;
