// Configurações do Mercado Pago
export const MERCADOPAGO_CONFIG = {
  // Credenciais de produção
  PUBLIC_KEY: 'APP_USR-79df32c0-dbdf-4313-b924-c6f7e7d068a5',
  ACCESS_TOKEN: 'APP_USR-3564134151747644-030918-534f45330d4ae82af055cbcbdd1d7c10-1567734275',
  WEBHOOK_SECRET: '5d9508dca15d27a33ab88c451f20405f025f3723eafa3fc75223abb745ed2717',
  
  // URLs de redirecionamento (para ambiente de desenvolvimento com Ngrok)
  // Estas URLs serão substituídas pelo URL do Ngrok durante os testes
  SUCCESS_URL: 'http://localhost:5175/success',
  FAILURE_URL: 'http://localhost:5175/failure',
  PENDING_URL: 'http://localhost:5175/pending',
  
  // URL para receber notificações do Mercado Pago (será substituída pelo URL do Ngrok)
  NOTIFICATION_URL: 'http://localhost:3001/api/mercadopago/webhook',
  
  // Configurações adicionais
  AUTO_RETURN: 'approved', 
  DEFAULT_PRICE: 1.00, 
  
  // Modo de operação
  INTEGRATION_MODE: 'redirect', 
  SANDBOX_MODE: true, // Alterado para true para usar o ambiente de sandbox durante os testes
  USE_SANDBOX: true,  // Adicionado para compatibilidade com o componente MercadoPagoButton
};

// Exportar configurações para uso em outros módulos
export default MERCADOPAGO_CONFIG;

console.log(MERCADOPAGO_CONFIG);
