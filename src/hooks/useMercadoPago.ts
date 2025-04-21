import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createPreference, redirectToCheckout } from "@/lib/mercadopago-sdk";

export function useMercadoPago() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createPayment = async (options: {
    title: string;
    price: number;
    quantity: number;
    buyerEmail?: string;
    externalReference?: string;
  }) => {
    setIsLoading(true);
    try {
      // Criar uma preferência de pagamento
      const preference = await createPreference(options);

      // Redirecionar para a URL de pagamento do Mercado Pago
      if (preference && preference.id) {
        // Forçar redirecionamento para o Mercado Pago
        console.log(
          "Redirecionando para Mercado Pago com preferenceId:",
          preference.id,
        );
        // Pequeno atraso para garantir que o console.log seja exibido
        setTimeout(() => {
          if (preference.init_point) {
            window.location.href = preference.init_point;
          } else {
            redirectToCheckout(preference.id);
          }
        }, 100);
        return preference;
      } else {
        throw new Error("Preferência de pagamento inválida");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast({
        title: "Erro ao processar pagamento",
        description:
          "Não foi possível iniciar o pagamento. Tente novamente mais tarde.",
        variant: "destructive",
      });
      setIsLoading(false);
      return null;
    }
  };

  const createLotteryPayment = async (options: {
    lotteryType: string;
    combinationsCount: number;
    buyerEmail?: string;
    isPremium?: boolean;
  }) => {
    const { lotteryType, combinationsCount, buyerEmail, isPremium } = options;

    // Preço fixo para o Gerador Avançado
    const price = 5.0;

    // Criar referência externa única
    const externalReference = `lottery_${lotteryType}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    // Para fins de teste, simular pagamento aprovado diretamente
    localStorage.setItem("showAdvancedCombinations", "true");
    localStorage.setItem("lotteryType", lotteryType);

    // Redirecionar para a página da loteria
    window.location.href = `/${lotteryType}`;
    return {
      id: "test_id",
      init_point: "",
      external_reference: externalReference,
    };

    // Em produção, descomentar este bloco e comentar o código acima
    /*
    return createPayment({
      title: `Gerador Avançado de ${getLotteryName(lotteryType)} - ${combinationsCount} Combinações`,
      price: price,
      quantity: 1,
      buyerEmail: buyerEmail || "cliente@example.com",
      externalReference,
    });
    */
  };

  const getLotteryName = (lotteryType: string): string => {
    switch (lotteryType) {
      case "megasena":
        return "Mega Sena";
      case "lotofacil":
        return "Lotofácil";
      case "timemania":
        return "Timemania";
      case "duplasena":
        return "Dupla Sena";
      case "quina":
      default:
        return "Quina";
    }
  };

  return {
    isLoading,
    createPayment,
    createLotteryPayment,
  };
}
