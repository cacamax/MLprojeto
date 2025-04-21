import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Copy, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const WebhooksPage = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>(
    "https://dazzling-golick2-wlwj6.dev-2.tempolabs.ai/webhooks",
  );
  const [webhookSecret, setWebhookSecret] = useState<string>(
    "987554fadb55c271556361f0c8dbf3044237c32423183ea62bddf64cdffc7494",
  );
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const { toast } = useToast();

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: message,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Configuração de Webhooks do Mercado Pago
          </h1>

          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>Webhooks do Mercado Pago</CardTitle>
              <CardDescription>
                Configure webhooks para receber notificações de pagamentos em
                tempo real
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-700">
                  Webhook configurado
                </AlertTitle>
                <AlertDescription className="text-green-600">
                  Seu webhook está configurado e pronto para receber
                  notificações de pagamentos.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="webhook-url">URL do Webhook</Label>
                  <div className="flex mt-1">
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          webhookUrl,
                          "URL do webhook copiada para a área de transferência.",
                        )
                      }
                      className="rounded-l-none"
                      variant="secondary"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Esta URL deve ser configurada no painel do Mercado Pago para
                    receber notificações.
                  </p>
                </div>

                <div>
                  <Label htmlFor="webhook-secret">Assinatura Secreta</Label>
                  <div className="flex mt-1">
                    <Input
                      id="webhook-secret"
                      value={webhookSecret}
                      readOnly
                      className="rounded-r-none font-mono text-sm"
                    />
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          webhookSecret,
                          "Assinatura secreta copiada para a área de transferência.",
                        )
                      }
                      className="rounded-l-none"
                      variant="secondary"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Esta assinatura é usada para verificar a autenticidade das
                    notificações recebidas.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Eventos</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>payment.created - Quando um pagamento é criado</li>
                    <li>payment.updated - Quando um pagamento é atualizado</li>
                    <li>payment.approved - Quando um pagamento é aprovado</li>
                    <li>payment.rejected - Quando um pagamento é rejeitado</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">
                  Como configurar no Mercado Pago
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Acesse sua conta do Mercado Pago</li>
                  <li>Vá para Configurações &gt; Webhooks</li>
                  <li>Clique em "Adicionar webhook"</li>
                  <li>Cole a URL do webhook acima</li>
                  <li>Selecione os eventos de pagamento que deseja receber</li>
                  <li>Salve as configurações</li>
                </ol>
              </div>

              <div className="pt-4 border-t">
                <a
                  href="https://www.mercadopago.com.br/developers/pt/docs/checkout-api/webhooks/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <Link className="h-4 w-4" />
                  Documentação oficial de webhooks do Mercado Pago
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebhooksPage;
