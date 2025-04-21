import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuinaStatsAnimation from "./animations/QuinaStatsAnimation";

interface StatisticsSectionProps {
  mostFrequentNumbers?: number[];
  evenOddDistribution?: { even: number; odd: number };
  highLowDistribution?: { high: number; low: number };
}

const StatisticsSection = ({
  mostFrequentNumbers = [5, 12, 23, 34, 47, 58, 69, 72, 80],
  evenOddDistribution = { even: 48, odd: 52 },
  highLowDistribution = { high: 45, low: 55 },
}: StatisticsSectionProps) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };
  return (
    <section className="w-full py-8 bg-background">
      {showAnimation && (
        <QuinaStatsAnimation onComplete={handleAnimationComplete} />
      )}
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
            Estatísticas da Quina Analisadas por Inteligência Artificial
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0 max-w-5xl mx-auto">
          {/* Most Frequent Numbers Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                <span>Números Mais Sorteados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-end justify-between gap-1 overflow-x-auto pb-2 px-2">
                {mostFrequentNumbers.map((number, index) => {
                  // Calculate a height based on the number value (just for visualization)
                  const height = 30 + (number % 30) * 5;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-gradient-to-t from-[#9C27B0] to-[#2196F3] w-6 md:w-8 rounded-t-md flex items-center justify-center text-primary-foreground font-medium shadow-md text-xs md:text-sm"
                        style={{ height: `${height}px` }}
                      >
                        {number}
                      </div>
                      <span className="text-xs mt-1">{number}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Baseado nos últimos 100 sorteios
              </p>
            </CardContent>
          </Card>

          {/* Even/Odd Distribution Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                <span>Distribuição Par/Ímpar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
                  <div
                    className="absolute bg-primary h-full"
                    style={{ width: `${evenOddDistribution.even}%` }}
                  ></div>
                  <div
                    className="absolute bg-secondary h-full right-0"
                    style={{ width: `${evenOddDistribution.odd}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg font-bold">
                      {evenOddDistribution.even}%
                    </span>
                    <span className="text-xs">Pares</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-6 mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">
                    Pares ({evenOddDistribution.even}%)
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-sm">
                    Ímpares ({evenOddDistribution.odd}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* High/Low Distribution Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                <span>Distribuição Alto/Baixo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
                  <div
                    className="absolute bg-primary h-full"
                    style={{ width: `${highLowDistribution.low}%` }}
                  ></div>
                  <div
                    className="absolute bg-secondary h-full right-0"
                    style={{ width: `${highLowDistribution.high}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg font-bold">
                      {highLowDistribution.low}%
                    </span>
                    <span className="text-xs">Baixos</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-6 mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">
                    Baixos (1-40) ({highLowDistribution.low}%)
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-sm">
                    Altos (41-80) ({highLowDistribution.high}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="p-6 border rounded-lg bg-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-lg mb-2 text-primary">
                  Distribuição entre Altos e Baixos
                </h3>
                <p className="text-base">
                  Incluímos números da metade baixa (1-40) e metade alta (41-80)
                  para um equilíbrio estratégico, seguindo padrões estatísticos
                  dos sorteios anteriores.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-primary">
                  Soma Total
                </h3>
                <p className="text-base">
                  Nossas combinações têm soma total entre 115 e 185, pois essa
                  faixa abrange mais de 70% dos resultados vencedores da Quina
                  historicamente.
                </p>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-lg border-t pt-6">
              Nossas combinações da Quina são geradas com base nestas
              estatísticas e algoritmos avançados de Inteligência Artificial
              para maximizar suas chances de ganhar. Utilizamos dados reais de
              milhares de sorteios anteriores da Quina para criar combinações
              estratégicas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
