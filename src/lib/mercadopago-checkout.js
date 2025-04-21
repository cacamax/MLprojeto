// Implementação baseada no repositório https://github.com/dedekpo/mercadopago-nextjs-by-andredev

// Configurações do Mercado Pago
const PUBLIC_KEY = "APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c";

// Função para carregar o SDK do Mercado Pago
export function loadMercadoPagoSDK() {
  return new Promise((resolve, reject) => {
    // Verificar se o SDK já está carregado
    if (window.MercadoPago) {
      resolve(window.MercadoPago);
      return;
    }

    // Criar script para carregar o SDK
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      if (window.MercadoPago) {
        resolve(window.MercadoPago);
      } else {
        reject(new Error("Mercado Pago SDK não carregado"));
      }
    };

    script.onerror = () => {
      reject(new Error("Erro ao carregar Mercado Pago SDK"));
    };

    document.body.appendChild(script);
  });
}

// Função para inicializar o Mercado Pago
export async function initMercadoPago() {
  try {
    const MercadoPago = await loadMercadoPagoSDK();
    return new MercadoPago(PUBLIC_KEY, { locale: "pt-BR" });
  } catch (error) {
    console.error("Erro ao inicializar Mercado Pago:", error);
    throw error;
  }
}

// Função para criar um botão de checkout
export async function createCheckoutButton(preferenceId, elementId) {
  try {
    const mp = await initMercadoPago();

    mp.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: `#${elementId}`,
        label: "Pagar",
      },
    });

    return true;
  } catch (error) {
    console.error("Erro ao criar botão de checkout:", error);
    return false;
  }
}

// Função para redirecionar para o checkout
export function redirectToCheckout(preferenceId) {
  try {
    const checkoutUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}&public_key=${PUBLIC_KEY}`;
    console.log("Redirecionando para:", checkoutUrl);
    window.location.href = checkoutUrl;
    return true;
  } catch (error) {
    console.error("Erro ao redirecionar para checkout:", error);
    return false;
  }
}
