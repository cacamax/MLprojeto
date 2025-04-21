import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { ArrowRight, Package } from "lucide-react";
import GenerationAnimation from "./GenerationAnimation";
import HotmartButton from "./HotmartButton";

interface PackageOption {
  id: string;
  title: string;
  description: string;
  price: number;
  combinations: number;
}

interface PackageSelectionProps {
  onPurchase?: (packageId: string) => void;
  options?: PackageOption[];
}

const PackageSelection = ({
  onPurchase = () => window.open("https://hotmart.com/checkout", "_blank"),
  options = [
    {
      id: "free",
      title: "Amostra Grátis",
      description: "Uma combinação gratuita para testar nossa tecnologia de IA",
      price: 0,
      combinations: 1,
    },
    {
      id: "basic",
      title: "Pacote Básico",
      description:
        "Combinações estratégicas geradas por IA para aumentar suas chances",
      price: 1.0,
      combinations: 15,
    },
    {
      id: "premium",
      title: "Pacote Premium",
      description:
        "Mais combinações geradas por IA avançada para maximizar suas possibilidades",
      price: 5.0,
      combinations: 50,
    },
  ],
}: PackageSelectionProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string>(options[1].id);
  const [showAnimation, setShowAnimation] = useState(false);

  const handlePurchase = () => {
    // Show animation for all package types
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    onPurchase(selectedPackage);
  };

  return (
    <div className="w-full py-8 bg-background">
      {showAnimation && (
        <GenerationAnimation onComplete={handleAnimationComplete} />
      )}
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
            Escolha seu Pacote de Combinações da Quina com IA
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Selecione o pacote de combinações da Quina geradas por Inteligência
            Artificial que melhor atende às suas necessidades
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <RadioGroup
            value={selectedPackage}
            onValueChange={setSelectedPackage}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {options.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:border-primary hover:shadow-md text-center ${selectedPackage === option.id ? "border-primary border-2 shadow-md" : ""} ${option.id === "basic" ? "relative md:scale-105 z-10" : ""}`}
                onClick={() => setSelectedPackage(option.id)}
              >
                {option.id === "basic" && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-4 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-md">
                    MAIS POPULAR
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-center mb-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                  </div>
                  <CardTitle className="text-xl text-center">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-medium">
                      {option.combinations} combinações
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary text-center">
                    {option.price === 0
                      ? "GRÁTIS"
                      : `R$ ${option.price.toFixed(2)}`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>

          <CardFooter className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={handlePurchase}
              className="w-full md:w-auto shadow-md hover:shadow-lg transition-all text-lg font-semibold px-8 py-6 h-auto"
            >
              {selectedPackage === "free"
                ? "Gerar Combinação Grátis"
                : "Comprar Agora"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;
