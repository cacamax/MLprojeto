// Tipagem para o SDK do Mercado Pago
interface MercadoPagoInstance {
  checkout: (options: {
    preference: {
      id: string;
    };
    autoOpen?: boolean;
    render?: {
      container?: string;
      label?: string;
      type?: string;
    };
    callbacks?: {
      onError?: (error: any) => void;
      onReady?: () => void;
    };
  }) => { close: () => void; open: () => void };
}

// Definição para o objeto global que o script Mercado Pago adiciona à window
declare global {
  interface Window {
    MercadoPago?: (publicKey: string, options?: { locale?: string }) => MercadoPagoInstance;
  }
}

// Controle de carregamento do script
let scriptPromise: Promise<boolean> | null = null;

/**
 * Carrega o SDK do Mercado Pago dinamicamente
 */
export const loadMercadoPagoScript = (): Promise<boolean> => {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    try {
      // Se o script já estiver carregado, retorne imediatamente
      if (window.MercadoPago) {
        resolve(true);
        return;
      }

      // Cria elemento de script
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.type = "text/javascript";
      script.async = true;

      // Handler para quando o script carregar
      script.onload = () => {
        resolve(true);
      };

      // Handler para erros
      script.onerror = () => {
        reject(new Error("Falha ao carregar o SDK do Mercado Pago"));
      };

      // Adiciona o script ao documento
      document.head.appendChild(script);
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });

  return scriptPromise;
};

/**
 * Inicializa o SDK do Mercado Pago
 * @returns Uma instância do Mercado Pago
 */
export const initMercadoPago = async (): Promise<MercadoPagoInstance> => {
  await loadMercadoPagoScript();

  if (!window.MercadoPago) {
    throw new Error("SDK do Mercado Pago não carregado");
  }

  // Utilize a PUBLIC_KEY fornecida
  // Em desenvolvimento, podemos usar a chave de produção já que usamos modo simulado
  const PUBLIC_KEY = "APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c";

  return window.MercadoPago(PUBLIC_KEY, {
    locale: "pt-BR",
  });
};

/**
 * Cria uma preferência de pagamento no Mercado Pago
 * @param data Dados do pagamento (title, price, description, etc.)
 * @returns Objeto contendo o ID da preferência e URLs de redirecionamento
 */
export const createPreference = async (data: {
  title: string;
  price: number;
  quantity?: number;
  description?: string;
  lotteryType?: string;
  externalReference?: string;
}) => {
  try {
    // Validar dados antes de enviar
    if (!data.title || !data.price || data.price <= 0) {
      throw new Error("Dados de pagamento inválidos");
    }

    // Adicionar timestamp ao externalReference para garantir unicidade
    const uniqueRef = data.externalReference || `lottery_${data.lotteryType || 'generic'}_${Date.now()}`;
    
    const response = await fetch("/api/mercadopago/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        quantity: data.quantity || 1,
        externalReference: uniqueRef
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao criar preferência: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    // Verificar se a resposta contém o ID da preferência
    if (!result.id) {
      throw new Error("ID de preferência não encontrado na resposta");
    }
    
    return result;
  } catch (error) {
    console.error("Erro ao criar preferência de pagamento:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
};

/**
 * Redireciona para o checkout do Mercado Pago
 * @param preferenceId ID da preferência a ser usada para o checkout
 */
export const redirectToCheckout = async (preferenceId: string): Promise<void> => {
  try {
    // Validar preferenceId
    if (!preferenceId) {
      throw new Error("ID de preferência não fornecido");
    }
    
    // Verifica se estamos em ambiente de desenvolvimento simulado
    if (process.env.NODE_ENV === "development" && process.env.VITE_SIMULATE_PAYMENT === "true") {
      console.log("Modo de simulação de pagamento ativado, redirecionando para página de sucesso simulada");
      
      // Simula um redirecionamento para página de sucesso após "processamento"
      setTimeout(() => {
        window.location.href = `/mercadopago-success.html?status=approved&payment_id=SIMULATED_${Date.now()}&external_reference=SIMULATED_REF`;
      }, 1500);
      
      return;
    }

    // Usar URL de preferência preexistente se disponível
    if (preferenceId.startsWith("http")) {
      window.location.href = preferenceId;
      return;
    }
    
    // Opção 1: Redirecionamento direto para checkout com a preferência
    window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;
    
  } catch (error) {
    console.error("Erro ao redirecionar para checkout:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
};

/**
 * Verifica o status de um pagamento
 * @param paymentId ID do pagamento a ser verificado
 * @returns Status do pagamento
 */
export const checkPaymentStatus = async (paymentId: string) => {
  try {
    const response = await fetch(`/api/mercadopago/check-payment?payment_id=${paymentId}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao verificar pagamento: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erro ao verificar status do pagamento:", error);
    throw error instanceof Error ? error : new Error(String(error));
  }
};
