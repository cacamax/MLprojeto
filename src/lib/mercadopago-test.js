// Arquivo para testar a integração com o Mercado Pago

// Função para testar o redirecionamento para o Mercado Pago
export function testMercadoPagoRedirect() {
  // URL de teste do Mercado Pago
  const testUrl =
    "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=test_preference_id&public_key=APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c";

  // Abrir em uma nova janela para testar
  window.open(testUrl, "_blank");

  console.log("Teste de redirecionamento para o Mercado Pago iniciado");
  return true;
}

// Função para testar a criação de preferência
export async function testCreatePreference() {
  try {
    // Simular a criação de uma preferência
    const mockPreferenceId = `test_${Date.now()}`;

    // URL do Mercado Pago para checkout
    const mercadoPagoUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mockPreferenceId}&public_key=APP_USR-d72d60c2-6088-4429-b87f-141dae6d222c`;

    // Retornar a preferência simulada
    return {
      id: mockPreferenceId,
      init_point: mercadoPagoUrl,
      sandbox_init_point: mercadoPagoUrl,
    };
  } catch (error) {
    console.error("Erro ao criar preferência de teste:", error);
    throw error;
  }
}
