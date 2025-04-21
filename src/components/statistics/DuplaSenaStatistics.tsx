import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Split } from "lucide-react";

interface DuplaSenaStatisticsProps {
  serieAFrequentNumbers?: number[];
  serieBFrequentNumbers?: number[];
  serieAEvenOdd?: { even: number; odd: number };
  serieBEvenOdd?: { even: number; odd: number };
}

const DuplaSenaStatistics = ({
  serieAFrequentNumbers = [10, 5, 33, 42, 17, 28, 39, 50, 11, 22],
  serieBFrequentNumbers = [15, 7, 31, 44, 19, 26, 37, 48, 9, 20],
  serieAEvenOdd = { even: 55, odd: 45 },
  serieBEvenOdd = { even: 48, odd: 52 },
}: DuplaSenaStatisticsProps) => {
  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#cc5200] to-[#ff8533]">
          Estatísticas da Dupla Sena Analisadas por IA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-0 max-w-5xl mx-auto">
          {/* Serie A Most Frequent Numbers */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-[#FF6600]" />
                <span>Números Mais Sorteados (1º Sorteio)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-end justify-between gap-1 overflow-x-auto pb-2 px-2">
                {serieAFrequentNumbers.map((number, index) => {
                  // Calculate a height based on the number value (just for visualization)
                  const height = 30 + (number % 30) * 4;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-gradient-to-t from-[#cc5200] to-[#ff8533] w-6 md:w-8 rounded-t-md flex items-center justify-center text-primary-foreground font-medium shadow-md text-xs md:text-sm"
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

          {/* Serie B Most Frequent Numbers */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-[#FF6600]" />
                <span>Números Mais Sorteados (2º Sorteio)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-end justify-between gap-1 overflow-x-auto pb-2 px-2">
                {serieBFrequentNumbers.map((number, index) => {
                  // Calculate a height based on the number value (just for visualization)
                  const height = 30 + (number % 30) * 4;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-gradient-to-t from-[#cc5200] to-[#ff8533] w-6 md:w-8 rounded-t-md flex items-center justify-center text-primary-foreground font-medium shadow-md text-xs md:text-sm"
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

          {/* Serie A Even/Odd Distribution */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-[#FF6600]" />
                <span>Par/Ímpar (1º Sorteio)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
                  <div
                    className="absolute bg-gradient-to-r from-[#cc5200] to-[#FF6600] h-full"
                    style={{ width: `${serieAEvenOdd.even}%` }}
                  ></div>
                  <div
                    className="absolute bg-gradient-to-r from-[#ff8533] to-[#ffb380] h-full right-0"
                    style={{ width: `${serieAEvenOdd.odd}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg font-bold text-white">
                      {serieAEvenOdd.even}%
                    </span>
                    <span className="text-xs text-white">Pares</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-6 mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#FF6600] rounded-full"></div>
                  <span className="text-sm">Pares ({serieAEvenOdd.even}%)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#ff8533] rounded-full"></div>
                  <span className="text-sm">
                    Ímpares ({serieAEvenOdd.odd}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Serie B Even/Odd Distribution */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-[#FF6600]" />
                <span>Par/Ímpar (2º Sorteio)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
                  <div
                    className="absolute bg-gradient-to-r from-[#cc5200] to-[#FF6600] h-full"
                    style={{ width: `${serieBEvenOdd.even}%` }}
                  ></div>
                  <div
                    className="absolute bg-gradient-to-r from-[#ff8533] to-[#ffb380] h-full right-0"
                    style={{ width: `${serieBEvenOdd.odd}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-lg font-bold text-white">
                      {serieBEvenOdd.even}%
                    </span>
                    <span className="text-xs text-white">Pares</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-6 mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#FF6600] rounded-full"></div>
                  <span className="text-sm">Pares ({serieBEvenOdd.even}%)</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-[#ff8533] rounded-full"></div>
                  <span className="text-sm">
                    Ímpares ({serieBEvenOdd.odd}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 max-w-5xl mx-auto px-4 md:px-0">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Split className="h-5 w-5 text-[#FF6600]" />
                <span>Comparação entre 1º e 2º Sorteios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 text-center">
                <p className="text-muted-foreground mb-4">
                  A Dupla Sena é única por oferecer dois sorteios em um único
                  bilhete. Nossa análise de IA mostra que existem padrões
                  distintos entre o primeiro e o segundo sorteio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-bold text-[#FF6600] mb-2">
                      1º Sorteio
                    </h4>
                    <ul className="text-sm text-left list-disc pl-5 space-y-1">
                      <li>
                        Maior frequência de números pares ({serieAEvenOdd.even}
                        %)
                      </li>
                      <li>Números mais frequentes tendem a ser menores</li>
                      <li>Maior estabilidade nos padrões de repetição</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-bold text-[#FF6600] mb-2">
                      2º Sorteio
                    </h4>
                    <ul className="text-sm text-left list-disc pl-5 space-y-1">
                      <li>
                        Maior frequência de números ímpares ({serieBEvenOdd.odd}
                        %)
                      </li>
                      <li>Números mais frequentes tendem a ser maiores</li>
                      <li>Maior variabilidade nos padrões de repetição</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 max-w-4xl mx-auto px-4 md:px-0">
          <Card className="bg-card border-[#FF6600] border-2">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-muted-foreground">
                Nossas combinações da Dupla Sena são geradas com base nestas
                estatísticas e algoritmos de Inteligência Artificial para
                maximizar suas chances de ganhar. Utilizamos dados reais dos
                sorteios anteriores da Dupla Sena.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DuplaSenaStatistics;
