import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

interface WebhookSetupProps {
  className?: string;
}

const WebhookSetup = ({ className = "" }: WebhookSetupProps) => {
  const [webhookStatus, setWebhookStatus] = React.useState<
    "not-configured" | "pending" | "configured"
  >("not-configured");

  const handleConfigureWebhook = () => {
    // Simulação de configuração de webhook
    setWebhookStatus("pending");

    // Simular uma resposta após 2 segundos
    setTimeout(() => {
      setWebhookStatus("configured");
    }, 2000);
  };

  return (
    <div className={`w-full py-8 ${className}`}>
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Configuração de Webhooks</CardTitle>
            <CardDescription>
              Configure webhooks para receber notificações automáticas de
              pagamentos do AbacatePay
            </CardDescription>
          </CardHeader>
          <CardContent>
            {webhookStatus === "not-configured" && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Webhook não configurado</AlertTitle>
                <AlertDescription>
                  Você precisa configurar um webhook para receber notificações
                  de pagamentos em tempo real.
                </AlertDescription>
              </Alert>
            )}

            {webhookStatus === "pending" && (
              <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertTitle className="text-yellow-700">
                  Configurando webhook
                </AlertTitle>
                <AlertDescription className="text-yellow-600">
                  Estamos configurando seu webhook. Isso pode levar alguns
                  instantes...
                </AlertDescription>
              </Alert>
            )}

            {webhookStatus === "configured" && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-700">
                  Webhook configurado
                </AlertTitle>
                <AlertDescription className="text-green-600">
                  Seu webhook está configurado e pronto para receber
                  notificações de pagamentos.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">URL do Webhook</h3>
                <div className="p-3 bg-muted rounded-md font-mono text-sm break-all">
                  https://webhook.site/your-webhook-id
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Esta URL deve ser configurada no painel do AbacatePay para
                  receber notificações.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Eventos</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>payment.succeeded - Quando um pagamento é aprovado</li>
                  <li>payment.failed - Quando um pagamento falha</li>
                  <li>payment.refunded - Quando um pagamento é reembolsado</li>
                </ul>
              </div>

              {webhookStatus !== "configured" && (
                <Button onClick={handleConfigureWebhook} className="mt-4">
                  Configurar Webhook
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebhookSetup;
