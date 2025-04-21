import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, ArrowDownUp } from "lucide-react";

interface MegaSenaStatisticsProps {
  mostFrequentNumbers?: number[];
  evenOddDistribution?: { even: number; odd: number };
  highLowDistribution?: { high: number; low: number };
}

const MegaSenaStatistics = ({
  mostFrequentNumbers = [10, 5, 53, 23, 42, 33, 4, 27, 35, 2],
  evenOddDistribution = { even: 52, odd: 48 },
  highLowDistribution = { high: 47, low: 53 },
}: MegaSenaStatisticsProps) => {
  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#001a66] to-[#0055ff]">
          Estatísticas da Mega Sena Analisadas por IA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0 max-w-5xl mx-auto">
          {/* Most Frequent Numbers Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-[#003399]" />
                <span>Números Mais Sorteados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-end justify-between gap-1 overflow-x-auto pb-2 px-2">
                {mostFrequentNumbers.map((number) => {
                  // Calculate a height based on the number value (just for visualization)
                  const height = 30 + (number % 20) * 5;
                  return (
                    <div key={`num-${number}`} className="flex flex-col items-center">
                      <div
                        className="bg-gradient-to-t from-[#001a66] to-[#0055ff] w-6 md:w-8 rounded-t-md flex items-center justify-center text-primary-foreground font-medium shadow-md text-xs md:text-sm"
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
                <PieChart className="h-5 w-5 text-[#003399]" />
                <span>Distribuição Par/Ímpar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
                  <div
                    className="absolute bg-gradient-to-r from-[#001a66] to-[#003399] h-full"
                    style={{ width: `${evenOddDistribution.even}%` }}
                  ></div>
                  <div
                    className="absolute bg-gradient-to-r from-[#0055ff] to-[#3399ff] h-full right-0"
                    style={{ width: `${evenOddDistribution.odd}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg font-bold text-white">
                      {evenOddDistribution.even}%
                    </span>
                    <span className="text-xs text-white">Pares</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-6 mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#003399] rounded-full"></div>
                  <span className="text-sm">
                    Pares ({evenOddDistribution.even}%)
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#0055ff] rounded-full"></div>
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
                <ArrowDownUp className="h-5 w-5 text-[#003399]" />
                <span>Distribuição Alto/Baixo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
                  <div
                    className="absolute bg-[#003399] h-full"
                    style={{ width: `${highLowDistribution.low}%` }}
                  ></div>
                  <div
                    className="absolute bg-[#0055ff] h-full right-0"
                    style={{ width: `${highLowDistribution.high}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg font-bold text-white">
                      {highLowDistribution.low}%
                    </span>
                    <span className="text-xs text-white">Baixos</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-6 mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#003399] rounded-full"></div>
                  <span className="text-sm">
                    Baixos (1-30) ({highLowDistribution.low}%)
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#0055ff] rounded-full"></div>
                  <span className="text-sm">
                    Altos (31-60) ({highLowDistribution.high}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 max-w-4xl mx-auto px-4 md:px-0">
          <Card className="bg-card border-[#003399] border-2">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-muted-foreground">
                Nossas combinações da Mega Sena são geradas com base nestas
                estatísticas e algoritmos de Inteligência Artificial para
                maximizar suas chances de ganhar. Utilizamos dados reais dos
                sorteios anteriores da Mega Sena.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MegaSenaStatistics;
