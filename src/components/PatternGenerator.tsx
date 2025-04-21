import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Brain, Sparkles } from "lucide-react";
import { Slider } from "./ui/slider";
import { useToast } from "./ui/use-toast";
import MercadoPagoButton from "./MercadoPagoButton";
import LotteryAnimation from "./animations/LotteryAnimation";

interface PatternGeneratorProps {
  onGenerate: (count: number, patterns?: PatternOptions) => void;
  onAdvancedGenerate: (count: number) => void;
  lotteryType: string;
  maxNumbers: number;
  range: number;
}

interface PatternOptions {
  includeEven: boolean;
  includeOdd: boolean;
  includePrime: boolean;
  includeConsecutive: boolean;
  balancedDistribution: boolean;
  frequentNumbers: boolean;
  coldNumbers: boolean;
  sumRange: boolean;
}

const PatternGenerator: React.FC<PatternGeneratorProps> = ({
  onGenerate,
  onAdvancedGenerate,
  lotteryType = "quina",
  maxNumbers = 5,
  range = 80,
}) => {
  const [combinationsCount, setCombinationsCount] = useState(10);
  const [patterns, setPatterns] = useState<PatternOptions>({
    includeEven: true,
    includeOdd: true,
    includePrime: true,
    includeConsecutive: true,
    balancedDistribution: true,
    frequentNumbers: true,
    coldNumbers: false,
    sumRange: true,
  });
  const [isPremium, setIsPremium] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se o usuário tem acesso premium para esta loteria específica
    const hasAdvancedAccess = localStorage.getItem(`${lotteryType}_premium`) === "true";
    setIsPremium(hasAdvancedAccess);
  }, [lotteryType]);

  const handleGenerateCombinations = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      onGenerate(combinationsCount);
    }, 2000);
  };

  const handleAdvancedGeneration = () => {
    // Verificar se o usuário já pagou pelo recurso premium
    const hasAdvancedAccess = localStorage.getItem(`${lotteryType}_premium`) === "true";
    
    if (hasAdvancedAccess) {
      // Se já tem acesso, gerar as combinações avançadas
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        onAdvancedGenerate(50); // Sempre gerar 50 combinações avançadas
      }, 2000);
      
      // Limpar o localStorage para não gerar novamente ao atualizar
      localStorage.removeItem(`${lotteryType}_premium`);
    } else {
      // Se não tem acesso, mostrar mensagem para o usuário
      toast({
        title: "Acesso Premium Necessário",
        description: "Por favor, adquira o acesso premium para usar o gerador avançado.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = (preferenceId: string) => {
    console.log("Pagamento iniciado com sucesso:", preferenceId);
    // Não definir acesso premium aqui, apenas quando o pagamento for confirmado
    // localStorage.setItem(`${lotteryType}_premium`, "true");
    
    // Salvar o ID da preferência para verificação posterior
    localStorage.setItem("mp_payment_preference_id", preferenceId);
    localStorage.setItem("mp_payment_lottery_type", lotteryType);
    
    toast({
      title: "Pagamento iniciado",
      description: "Você será redirecionado para o checkout do Mercado Pago.",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto p-8 shadow-lg">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 p-1 gap-2 bg-muted/50">
          <TabsTrigger 
            value="basic" 
            className="flex items-center justify-center gap-2 text-lg py-3 rounded-md overflow-visible bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 data-[state=active]:shadow-[0_4px_12px_rgba(0,0,0,0.25)] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Brain className="h-6 w-6" />
            Modo Básico
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="flex items-center justify-center gap-2 text-lg py-3 rounded-md overflow-visible bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 data-[state=active]:shadow-[0_4px_12px_rgba(0,0,0,0.25)] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Sparkles className="h-6 w-6" />
            Modo Avançado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-8">
          <div className="space-y-6">
            <div>
              <Label className="text-xl font-medium mb-4 block text-center">Quantas combinações você deseja?</Label>
              <p className="text-base text-gray-500 text-center mb-4">
                Escolha quantas combinações de {maxNumbers} números você deseja gerar (máximo 100)
              </p>
              <Slider
                value={[combinationsCount]}
                onValueChange={(value) => setCombinationsCount(value[0])}
                min={1}
                max={100}
                step={1}
                className="my-6"
              />
              <p className="text-lg text-gray-700 text-center font-medium">{combinationsCount} combinações</p>
            </div>
            <Button 
              onClick={handleGenerateCombinations} 
              className="w-full text-lg py-6 bg-green-600 hover:bg-green-700"
            >
              <Sparkles className="h-5 w-5 mr-2" /> Gerar Combinações Grátis
            </Button>
            <p className="text-sm text-center text-gray-500 mt-2">
              O Gerador Básico é totalmente gratuito. Para recursos avançados, utilize o Gerador Avançado.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-8">
          {isPremium ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label className="text-lg font-medium block">Padrões de Números</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern1"
                        checked={patterns.includeEven}
                        onCheckedChange={(checked) =>
                          setPatterns({ ...patterns, includeEven: !!checked })
                        }
                      />
                      <Label htmlFor="pattern1" className="text-base">Pares</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern2"
                        checked={patterns.includeOdd}
                        onCheckedChange={(checked) =>
                          setPatterns({ ...patterns, includeOdd: !!checked })
                        }
                      />
                      <Label htmlFor="pattern2" className="text-base">Ímpares</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern3"
                        checked={patterns.includePrime}
                        onCheckedChange={(checked) =>
                          setPatterns({ ...patterns, includePrime: !!checked })
                        }
                      />
                      <Label htmlFor="pattern3" className="text-base">Primos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern4"
                        checked={patterns.includeConsecutive}
                        onCheckedChange={(checked) =>
                          setPatterns({
                            ...patterns,
                            includeConsecutive: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="pattern4" className="text-base">Consecutivos</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium block">Distribuição</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern5"
                        checked={patterns.balancedDistribution}
                        onCheckedChange={(checked) =>
                          setPatterns({
                            ...patterns,
                            balancedDistribution: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="pattern5" className="text-base">Equilibrada</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern6"
                        checked={patterns.frequentNumbers}
                        onCheckedChange={(checked) =>
                          setPatterns({
                            ...patterns,
                            frequentNumbers: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="pattern6" className="text-base">Frequentes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern7"
                        checked={patterns.coldNumbers}
                        onCheckedChange={(checked) =>
                          setPatterns({ ...patterns, coldNumbers: !!checked })
                        }
                      />
                      <Label htmlFor="pattern7" className="text-base">Frios</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pattern8"
                        checked={patterns.sumRange}
                        onCheckedChange={(checked) =>
                          setPatterns({ ...patterns, sumRange: !!checked })
                        }
                      />
                      <Label htmlFor="pattern8" className="text-base">Soma Ideal</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xl font-medium mb-4 block text-center">Quantas combinações você deseja?</Label>
                <p className="text-base text-gray-500 text-center mb-4">
                  Escolha quantas combinações de {maxNumbers} números você deseja gerar (máximo 100)
                </p>
                <Slider
                  value={[combinationsCount]}
                  onValueChange={(value) => setCombinationsCount(value[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="my-6"
                />
                <p className="text-lg text-gray-700 text-center font-medium">{combinationsCount} combinações</p>
              </div>

              <Button
                onClick={handleAdvancedGeneration}
                className="w-full text-lg py-6 bg-green-600 hover:bg-green-700"
              >
                <Sparkles className="h-5 w-5 mr-2" /> Gerar Combinações Avançadas
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 my-4">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">Recursos Premium:</h4>
                  <ul className="space-y-2 text-left list-disc pl-6 text-yellow-700">
                    <li>Padrões estatísticos avançados</li>
                    <li>Combinações baseadas em números frequentes</li>
                    <li>Distribuição equilibrada de números</li>
                    <li>Análise de padrões vencedores</li>
                    <li>Apenas R$1,00 para gerar combinações avançadas</li>
                  </ul>
                </div>
              </div>

              <MercadoPagoButton
                lotteryType={lotteryType}
                onSuccess={handlePaymentSuccess}
                onError={(error) => {
                  console.error("Erro no pagamento:", error);
                  toast({
                    title: "Erro no pagamento",
                    description: "Ocorreu um erro ao processar o pagamento.",
                    variant: "destructive",
                  });
                }}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      {showAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <LotteryAnimation 
            onComplete={() => setShowAnimation(false)}
            lotteryType={lotteryType}
          />
        </div>
      )}
    </Card>
  );
};

export default PatternGenerator;
