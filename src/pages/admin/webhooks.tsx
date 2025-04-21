import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WebhookSetup from "../../components/WebhookSetup";

const WebhooksPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Configuração de Webhooks</h1>

          <WebhookSetup />

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Como funcionam os webhooks?
            </h2>
            <p className="mb-4">
              Webhooks são notificações HTTP automáticas que o AbacatePay envia
              para seu servidor quando ocorrem eventos, como pagamentos
              aprovados ou falhas de pagamento.
            </p>
            <p className="mb-4">
              Quando um cliente realiza um pagamento, o AbacatePay enviará uma
              notificação para a URL do webhook configurada, permitindo que seu
              sistema atualize automaticamente o status do pedido sem
              necessidade de polling.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-2">
              Implementação segura
            </h3>
            <p>
              Para garantir a segurança, sempre verifique a assinatura do
              webhook usando o segredo compartilhado fornecido pelo AbacatePay.
              Isso evita que terceiros enviem notificações falsas para seu
              endpoint.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebhooksPage;
