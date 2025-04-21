import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import {
  loadMercadoPagoScript,
  initMercadoPago,
  redirectToCheckout,
} from "@/lib/mercadopago-sdk";

interface MercadoPagoCheckoutProps {
  preferenceId: string;
  fallbackButtonText?: string;
  className?: string;
  onReady?: () => void;
  onError?: (error: any) => void;
  onSubmit?: () => void;
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({
  preferenceId,
  fallbackButtonText = "Pagar agora",
  className = "",
  onReady,
  onError,
  onSubmit,
}) => {
  const checkoutButtonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!preferenceId) {
      console.error("ID de preferência não fornecido");
      setHasError(true);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const initCheckout = async () => {
      try {
        // Carregar o SDK do Mercado Pago
        await loadMercadoPagoScript();

        if (!isMounted || !checkoutButtonRef.current) return;
        
        // Obter o ID do elemento para usar como seletor
        const containerId = `checkout-container-${Date.now()}`;
        checkoutButtonRef.current.id = containerId;

        // Inicializar o Mercado Pago
        const mp = await initMercadoPago();

        // Renderizar o botão de checkout
        mp.checkout({
          preference: {
            id: preferenceId,
          },
          render: {
            container: `#${containerId}`,
            label: "Pagar",
          },
          callbacks: {
            onReady: () => {
              if (onReady) onReady();
              setIsLoading(false);
            },
            onError: (error) => {
              console.error("Erro no checkout do Mercado Pago:", error);
              if (onError) onError(error);
              setHasError(true);
              setIsLoading(false);
            },
          },
        });
        
        // Adicionar listener para o evento de submit se necessário
        if (onSubmit) {
          // Usar um listener global para detectar quando o usuário clica no botão
          window.addEventListener("message", (event) => {
            // Verificar a origem da mensagem para evitar vulnerabilidades de segurança
            const mercadoPagoOrigins = [
              "https://www.mercadopago.com.br",
              "https://www.mercadopago.com",
              "https://www.mercadolibre.com",
              "https://www.mercadolivre.com.br"
            ];
            
            if (!mercadoPagoOrigins.includes(event.origin)) {
              return;
            }
            
            if (
              event.data.type === "submit" || 
              event.data.type === "checkout.submit"
            ) {
              onSubmit();
            }
          });
        }
      } catch (error) {
        console.error("Erro ao inicializar checkout do Mercado Pago:", error);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
          if (onError) onError(error);
        }
      }
    };

    initCheckout();

    return () => {
      isMounted = false;
    };
  }, [preferenceId, onReady, onError, onSubmit]);

  // Botão de fallback em caso de erro
  const handleFallbackClick = () => {
    if (preferenceId) {
      redirectToCheckout(preferenceId);
    }
  };

  return (
    <div className={className}>
      {isLoading && (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Carregando...
        </Button>
      )}

      <div ref={checkoutButtonRef} className={isLoading ? "hidden" : ""} />

      {hasError && (
        <Button onClick={handleFallbackClick} className="w-full">
          <CreditCard className="mr-2 h-4 w-4" />
          {fallbackButtonText}
        </Button>
      )}
    </div>
  );
};

export default MercadoPagoCheckout;
