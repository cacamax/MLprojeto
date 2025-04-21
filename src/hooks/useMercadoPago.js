import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useMercadoPago() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createPayment = async (options) => {
    setIsLoading(true);
    try {
      // Criar uma preferência de pagamento
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const preference = await response.json();

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
            // Usar window.open em vez de window.location para evitar bloqueios de popup
            window.location.href = preference.init_point;
          } else {
            // Redirecionar diretamente para o checkout do Mercado Pago
            const checkoutUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preference.id}&public_key=APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c`;
            window.location.href = checkoutUrl;
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

  const createLotteryPayment = async (options) => {
    const { lotteryType, combinationsCount, buyerEmail } = options;

    // Preço fixo para o Gerador Avançado
    const price = 5.0;

    // Criar referência externa única
    const externalReference = `lottery_${lotteryType}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    // Criar objeto de preferência completo seguindo a documentação do Mercado Pago
    const preference = {
      items: [
        {
          id: externalReference,
          title: `Gerador Avançado de ${getLotteryName(lotteryType)} - ${combinationsCount} Combinações`,
          description: `Gerador de Combinações Avançado para ${getLotteryName(lotteryType)}`,
          quantity: 1,
          currency_id: "BRL",
          unit_price: price,
        },
      ],
      payer: {
        email: buyerEmail || "cliente@example.com",
        name: "Cliente",
        surname: "Teste",
      },
      external_reference: externalReference,
      back_urls: {
        success: `${window.location.origin}/success`,
        failure: `${window.location.origin}/failure`,
        pending: `${window.location.origin}/pending`,
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 1,
      },
    };

    return createPayment(preference);
  };

  const getLotteryName = (lotteryType) => {
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
