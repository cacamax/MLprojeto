import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, LayoutGrid } from "lucide-react";

interface LotofacilStatisticsProps {
  mostFrequentNumbers?: number[];
  acertoDistribution?: {
    "11": number;
    "12": number;
    "13": number;
    "14": number;
    "15": number;
  };
  blockDistribution?: { "1-10": number; "11-20": number; "21-25": number };
}

const LotofacilStatistics = ({
  mostFrequentNumbers = [10, 20, 13, 24, 11, 3, 7, 5, 14, 2],
  acertoDistribution = { "11": 15, "12": 25, "13": 35, "14": 20, "15": 5 },
  blockDistribution = { "1-10": 40, "11-20": 45, "21-25": 15 },
}: LotofacilStatisticsProps) => {
  return (
    <section className="w-full py-8 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#006622] to-[#00cc44]">
          Estatísticas da Lotofácil Analisadas por IA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0 max-w-5xl mx-auto">
          {/* Most Frequent Numbers Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-[#009933]" />
                <span>Números Mais Sorteados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-end justify-between gap-1 overflow-x-auto pb-2 px-2">
                {mostFrequentNumbers.map((number) => {
                  // Calculate a height based on the number value (just for visualization)
                  const height = 30 + (number % 15) * 8;
                  return (
                    <div key={`num-${number}`} className="flex flex-col items-center">
                      <div
                        className="bg-gradient-to-t from-[#006622] to-[#00cc44] w-6 md:w-8 rounded-t-md flex items-center justify-center text-primary-foreground font-medium shadow-md text-xs md:text-sm"
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
              <div className="mt-6">
              </div>
            </CardContent>
          </Card>

          {/* Acerto Distribution Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-[#009933]" />
                <span>Distribuição de Acertos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex flex-col items-center justify-center gap-2">
                {Object.entries(acertoDistribution).map(([acertos, porcentagem]) => (
                  <div key={`acertos-${acertos}`} className="w-full flex items-center gap-2">
                    <div className="w-10 text-right font-medium">
                      {acertos}
                    </div>
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#004d1a] to-[#00cc44] rounded-full shadow-inner"
                        style={{ width: `${porcentagem}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-left font-medium">
                      {porcentagem}%
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Distribuição de acertos nos últimos sorteios
              </p>
            </CardContent>
          </Card>

          {/* Block Distribution Chart */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-[#009933]" />
                <span>Distribuição por Blocos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] flex items-center justify-center">
                <div className="w-full grid grid-cols-3 gap-2 h-32">
                  {Object.entries(blockDistribution).map(([bloco, porcentagem]) => (
                    <div key={`block-${bloco}`} className="flex flex-col items-center">
                      <div className="flex-1 w-full flex items-end justify-center">
                        <div
                          className="w-16 bg-gradient-to-t from-[#006622] to-[#00cc44] rounded-t-md flex items-center justify-center text-white font-medium"
                          style={{ height: `${porcentagem}%` }}
                        >
                          {porcentagem}%
                        </div>
                      </div>
                      <span className="text-xs mt-2 font-medium">
                        {bloco}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Frequência de números por blocos
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 max-w-4xl mx-auto px-4 md:px-0">
          <Card className="bg-card border-[#009933] border-2">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-muted-foreground">
                Nossas combinações da Lotofácil são geradas com base nestas
                estatísticas e algoritmos de Inteligência Artificial para
                maximizar suas chances de ganhar. Utilizamos dados reais dos
                sorteios anteriores da Lotofácil.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LotofacilStatistics;
