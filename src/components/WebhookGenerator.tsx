import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, CheckCircle2, Copy, Link } from "lucide-react";
import { useToast } from "./ui/use-toast";

const WebhookGenerator = () => {
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const { toast } = useToast();

  const generateWebhook = () => {
    setIsGenerating(true);

    // Simulate webhook generation
    setTimeout(() => {
      const uniqueId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const newWebhookUrl = `https://webhook.site/${uniqueId}`;
      setWebhookUrl(newWebhookUrl);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "Copiado!",
      description: "URL do webhook copiada para a área de transferência.",
    });
  };

  return (
    <div className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
                Gerador de Webhook para Integrações
              </CardTitle>
              <CardDescription className="text-lg">
                Gere um webhook único para receber notificações de pagamentos e
                integrações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isGenerated ? (
                <>
                  <div className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Importante</AlertTitle>
                      <AlertDescription>
                        Ao gerar um webhook, você receberá uma URL única que
                        pode ser usada para configurar integrações com
                        plataformas de pagamento como Hotmart, Monetizze, Eduzz
                        e outras.
                      </AlertDescription>
                    </Alert>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="webhook-name">
                        Nome do Webhook (opcional)
                      </Label>
                      <Input
                        id="webhook-name"
                        placeholder="Ex: Integração Hotmart"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={generateWebhook}
                    className="w-full py-6 text-lg font-semibold"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <span className="animate-spin mr-2">⚙️</span>
                        Gerando webhook...
                      </>
                    ) : (
                      "Gerar Webhook"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-700">
                      Webhook gerado com sucesso!
                    </AlertTitle>
                    <AlertDescription className="text-green-600">
                      Seu webhook está pronto para uso. Copie a URL abaixo e
                      configure-a na plataforma de pagamento de sua escolha.
                    </AlertDescription>
                  </Alert>

                  <div className="mt-4 space-y-2">
                    <Label htmlFor="webhook-url">URL do Webhook</Label>
                    <div className="flex">
                      <Input
                        id="webhook-url"
                        value={webhookUrl}
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button
                        onClick={copyToClipboard}
                        className="rounded-l-none"
                        variant="secondary"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Próximos passos:</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Copie a URL do webhook acima</li>
                      <li>
                        Acesse sua conta na plataforma de pagamento (Hotmart,
                        etc.)
                      </li>
                      <li>
                        Vá para as configurações de integrações ou webhooks
                      </li>
                      <li>
                        Cole a URL e configure os eventos que deseja receber
                      </li>
                      <li>Salve as configurações e teste a integração</li>
                    </ol>
                  </div>

                  <div className="mt-4">
                    <Button
                      onClick={generateWebhook}
                      variant="outline"
                      className="w-full"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Gerar nova URL
                    </Button>
                  </div>
                </>
              )}

              <div className="mt-6 pt-6 border-t text-sm text-muted-foreground">
                <p>
                  Nota: Para webhooks permanentes e com recursos avançados,
                  recomendamos usar serviços como{" "}
                  <a
                    href="https://webhook.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Webhook.site
                  </a>{" "}
                  ou{" "}
                  <a
                    href="https://pipedream.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Pipedream
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebhookGenerator;
