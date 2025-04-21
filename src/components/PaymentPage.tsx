import React, { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { createPreference } from "@/lib/mercadopago-sdk";
import MercadoPagoCheckout from "./MercadoPagoCheckout";
import MercadoPagoButton from "./MercadoPagoButton";
import { Loader2, CreditCard, Check, AlertCircle } from "lucide-react";

interface PaymentPageProps {
  lotteryType?: string;
  returnUrl?: string;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  lotteryType = "megasena",
  returnUrl = "/",
}) => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"button" | "checkout">("button");
  const [hasAccess, setHasAccess] = useState(false);
  const { toast } = useToast();

  // Verificar se já tem acesso
  useEffect(() => {
    const hasAdvancedAccess = localStorage.getItem("showAdvancedCombinations") === "true";
    setHasAccess(hasAdvancedAccess);
  }, []);

  // Criar preferência de pagamento
  const handleCreatePreference = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await createPreference({
        title: "Modo Avançado de IA - Loteria",
        price: 1.0,
        quantity: 1,
        description: `Acesso ao gerador avançado de combinações para ${lotteryType}`,
        lotteryType,
        externalReference: `lottery_${lotteryType}_${Date.now()}`,
      });

      if (data.id) {
        setPreferenceId(data.id);
        toast({
          title: "Preferência criada com sucesso",
          description: "Você já pode prosseguir com o pagamento.",
        });
      } else {
        throw new Error("ID de preferência não encontrado na resposta");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar preferência de pagamento";
      setError(errorMessage);
      toast({
        title: "Erro ao preparar pagamento",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manipulador de sucesso no pagamento
  const handlePaymentSuccess = () => {
    toast({
      title: "Pagamento aprovado!",
      description: "Seu acesso às combinações avançadas foi ativado com sucesso.",
      variant: "default",
    });
    
    setHasAccess(true);
    
    // Redirecionar após mostrar o toast
    setTimeout(() => {
      window.location.href = returnUrl;
    }, 1500);
  };

  // Manipulador de erro no pagamento
  const handlePaymentError = (error: any) => {
    toast({
      title: "Erro no pagamento",
      description: error instanceof Error ? error.message : "Falha ao processar pagamento",
      variant: "destructive",
    });
  };

  // Conteúdo quando já tem acesso
  if (hasAccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Você já possui acesso
          </CardTitle>
          <CardDescription>
            Você já possui acesso ao Modo Avançado de IA para loteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Seu pagamento foi processado com sucesso e você já tem acesso a todas as 
            funcionalidades avançadas. Aproveite combinações otimizadas por IA para 
            aumentar suas chances.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => window.location.href = returnUrl}
          >
            Ir para Combinações Avançadas
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Modo Avançado de IA</CardTitle>
        <CardDescription>
          Desbloqueie o potencial da inteligência artificial para gerar combinações mais precisas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-base mb-2">O que você ganhará:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Algoritmos avançados de IA para gerar combinações otimizadas</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Análise estatística aprofundada dos sorteios anteriores</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Combinações com maior probabilidade de acerto</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
              <span>Suporte prioritário</span>
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">Acesso ao modo avançado</span>
          <span className="text-2xl font-bold">R$ 1,00</span>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant={paymentMethod === "button" ? "default" : "outline"}
            size="sm"
            onClick={() => setPaymentMethod("button")}
          >
            Botão Simples
          </Button>
          <Button
            variant={paymentMethod === "checkout" ? "default" : "outline"}
            size="sm"
            onClick={() => setPaymentMethod("checkout")}
          >
            Checkout Completo
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {!preferenceId ? (
          <Button
            onClick={handleCreatePreference}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Preparando pagamento...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Prosseguir para pagamento
              </>
            )}
          </Button>
        ) : paymentMethod === "button" ? (
          <MercadoPagoButton
            preferenceId={preferenceId}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            lotteryType={lotteryType}
          />
        ) : (
          <MercadoPagoCheckout
            preferenceId={preferenceId}
            onReady={() => console.log("Checkout pronto")}
            onError={handlePaymentError}
            onSubmit={() => console.log("Checkout enviado")}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center text-xs text-gray-500">
        <p className="mb-1">Pagamento processado com segurança pelo Mercado Pago</p>
        <p>Este é um pagamento único, não uma assinatura</p>
      </CardFooter>
    </Card>
  );
};

export default PaymentPage;
