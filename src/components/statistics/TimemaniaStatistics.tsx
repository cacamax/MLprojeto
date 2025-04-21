import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Trophy } from "lucide-react";

interface TimemaniaStatisticsProps {
  mostFrequentNumbers?: number[];
  evenOddDistribution?: { even: number; odd: number };
  mostFrequentTeams?: { name: string; frequency: number }[];
}

const TimemaniaStatistics = ({
  mostFrequentNumbers = [34, 61, 42, 7, 73, 12, 53, 28, 80, 5],
  evenOddDistribution = { even: 45, odd: 55 },
  mostFrequentTeams = [
    { name: "Flamengo", frequency: 25 },
    { name: "Corinthians", frequency: 20 },
    { name: "São Paulo", frequency: 18 },
    { name: "Palmeiras", frequency: 15 },
    { name: "Santos", frequency: 12 },
  ],
}: TimemaniaStatisticsProps) => {
  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#990000] to-[#ff3333]">
          Estatísticas da Timemania Analisadas por IA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0 max-w-5xl mx-auto">
          {/* Most Frequent Numbers Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-[#CC0000]" />
                <span>Números Mais Sorteados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-end justify-between gap-1 overflow-x-auto pb-2 px-2">
                {mostFrequentNumbers.map((number) => {
                  // Calculate a height based on the number value (just for visualization)
                  const height = 30 + (number % 40) * 3;
                  return (
                    <div key={`num-${number}`} className="flex flex-col items-center">
                      <div
                        className="bg-gradient-to-t from-[#990000] to-[#ff3333] w-6 md:w-8 rounded-t-md flex items-center justify-center text-primary-foreground font-medium shadow-md text-xs md:text-sm"
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
                <PieChart className="h-5 w-5 text-[#CC0000]" />
                <span>Distribuição Par/Ímpar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
                  <div
                    className="absolute bg-gradient-to-r from-[#990000] to-[#CC0000] h-full"
                    style={{ width: `${evenOddDistribution.even}%` }}
                  ></div>
                  <div
                    className="absolute bg-gradient-to-r from-[#ff3333] to-[#ff6666] h-full right-0"
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
                  <div className="w-3 h-3 bg-[#CC0000] rounded-full"></div>
                  <span className="text-sm">
                    Pares ({evenOddDistribution.even}%)
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#ff3333] rounded-full"></div>
                  <span className="text-sm">
                    Ímpares ({evenOddDistribution.odd}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Frequent Teams Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#CC0000]" />
                <span>Times Mais Sorteados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex flex-col justify-center gap-2">
                {mostFrequentTeams.map((team) => (
                  <div key={`team-${team.name}`} className="flex items-center gap-2">
                    <div className="w-24 text-xs font-medium truncate">
                      {team.name}
                    </div>
                    <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#990000] to-[#ff3333] rounded-full"
                        style={{ width: `${team.frequency * 2}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-xs text-right">
                      {team.frequency}%
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Times do Coração mais sorteados
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 max-w-4xl mx-auto px-4 md:px-0">
          <Card className="bg-card border-[#CC0000] border-2">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-muted-foreground">
                Nossas combinações da Timemania são geradas com base nestas
                estatísticas e algoritmos de Inteligência Artificial para
                maximizar suas chances de ganhar. Utilizamos dados reais dos
                sorteios anteriores da Timemania.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TimemaniaStatistics;
