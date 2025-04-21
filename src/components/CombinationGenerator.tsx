import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Brain, Sparkles, RefreshCw } from "lucide-react";
import { Slider } from "./ui/slider";

interface CombinationGeneratorProps {
  onGenerate: (count: number) => void;
  lotteryType: string;
  maxNumbers: number;
  range: number;
}

const CombinationGenerator = ({
  onGenerate,
  lotteryType = "quina",
  maxNumbers = 5,
  range = 80,
}: CombinationGeneratorProps) => {
  const [combinationsCount, setCombinationsCount] = useState<number>(15);

  const handleGenerateCombinations = () => {
    // Limit to 100 combinations
    const count = Math.min(combinationsCount, 100);
    onGenerate(count);
  };

  const getLotteryColor = () => {
    switch (lotteryType) {
      case "megasena":
        return "from-[#001a66] to-[#0055ff]";
      case "lotofacil":
        return "from-[#006622] to-[#00cc44]";
      case "timemania":
        return "from-[#990000] to-[#ff3333]";
      case "duplasena":
        return "from-[#cc5200] to-[#ff8533]";
      case "quina":
      default:
        return "from-[#9C27B0] to-[#2196F3]";
    }
  };

  const getLotteryName = () => {
    switch (lotteryType) {
      case "megasena":
        return "Mega Sena";
      case "lotofacil":
        return "Lotofácil";
      case "timemania":
        return "Timemania";
      case "duplasena":
        return "Dupla Sena";
      case "quina":
      default:
        return "Quina";
    }
  };

  return (
    <div className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${getLotteryColor()}`}
          >
            Gerador de Combinações da {getLotteryName()}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Gere combinações estratégicas de {maxNumbers} números de 1 a {range}{" "}
            utilizando nossa Inteligência Artificial
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-8 shadow-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                Quantas combinações você deseja?
              </h3>
              <p className="text-muted-foreground">
                Escolha quantas combinações de {maxNumbers} números você deseja
                gerar (máximo 100)
              </p>
            </div>

            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="combinations-count">
                    Número de combinações: {combinationsCount}
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {combinationsCount} combinações
                  </span>
                </div>
                <Slider
                  id="combinations-count"
                  min={1}
                  max={100}
                  step={1}
                  value={[combinationsCount]}
                  onValueChange={(value) => setCombinationsCount(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={handleGenerateCombinations}
                  className="flex-1 shadow-md hover:shadow-lg transition-all text-lg font-semibold px-8 py-6 h-auto"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Gerar Combinações
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onGenerate(combinationsCount)}
                  className="h-auto w-14 shadow-md hover:shadow-lg transition-all"
                  title="Gerar novas combinações"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CombinationGenerator;
