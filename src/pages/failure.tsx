import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowRight } from "lucide-react";

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Redirecionar para a página inicial
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>

              <h1 className="text-3xl font-bold">Pagamento não Concluído</h1>

              <p className="text-xl text-muted-foreground">
                Infelizmente, seu pagamento não foi concluído com sucesso. Você
                pode tentar novamente ou escolher outra forma de pagamento.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-md p-4 w-full">
                <p className="text-red-800">
                  O pagamento foi recusado ou cancelado. Nenhum valor foi
                  cobrado.
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleContinue}
                className="mt-4 px-8 py-6 h-auto text-lg font-semibold"
              >
                Voltar para o Gerador
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

export default PaymentFailurePage;
