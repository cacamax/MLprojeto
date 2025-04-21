import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { getPaymentStatus } from "../lib/mercadopago.js";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    status: "",
    message: "",
    externalReference: "",
    lotteryType: "",
    combinationsCount: 0,
  });

  useEffect(() => {
    // Obter parâmetros da URL
    const status = searchParams.get("status") || "";
    const externalReference = searchParams.get("external_reference") || "";
    const lotteryTypeParam = searchParams.get("lottery_type") || "";

    // Extrair informações da referência externa (formato: lottery_type_timestamp_random)
    let lotteryType = lotteryTypeParam || "quina";
    let combinationsCount = 50; // Sempre 50 combinações para o Gerador Avançado

    if (externalReference && !lotteryTypeParam) {
      const parts = externalReference.split("_");
      if (parts.length >= 2) {
        lotteryType = parts[1];
      }
    }

    // Obter status formatado
    const { status: formattedStatus, message } = getPaymentStatus(status);

    setPaymentInfo({
      status: formattedStatus,
      message,
      externalReference,
      lotteryType,
      combinationsCount,
    });
  }, [searchParams]);

  const handleContinue = () => {
    // Redirecionar para a página da loteria correspondente com parâmetro para mostrar combinações
    // Usar localStorage para garantir que as combinações sejam exibidas mesmo após redirecionamento
    localStorage.setItem("showAdvancedCombinations", "true");
    localStorage.setItem("lotteryType", paymentInfo.lotteryType);
    navigate(`/${paymentInfo.lotteryType}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold">
                {paymentInfo.status === "approved"
                  ? "Pagamento Aprovado!"
                  : paymentInfo.status === "pending"
                    ? "Pagamento Pendente"
                    : "Status do Pagamento"}
              </h1>

              <p className="text-xl text-muted-foreground">
                {paymentInfo.status === "approved"
                  ? `Seu pagamento foi aprovado com sucesso! Você agora tem acesso a ${paymentInfo.combinationsCount} combinações otimizadas.`
                  : paymentInfo.status === "pending"
                    ? "Seu pagamento está sendo processado. Assim que for aprovado, você terá acesso às combinações."
                    : paymentInfo.message}
              </p>

              {paymentInfo.status === "approved" && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 w-full">
                  <p className="text-green-800">
                    Referência: {paymentInfo.externalReference}
                  </p>
                </div>
              )}

              <Button
                size="lg"
                onClick={handleContinue}
                className="mt-4 px-8 py-6 h-auto text-lg font-semibold"
              >
                {paymentInfo.status === "approved"
                  ? "Ver Minhas Combinações"
                  : "Voltar para o Gerador"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
