import React, { useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import {
  Brain,
  Sparkles,
  BarChart,
  PieChart,
  ArrowRight,
  Calculator,
  Award,
  TrendingUp,
  Zap,
  Target,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { lotteries } from "./LotteryNavigation";
import LoadingSpinner from "./LoadingSpinner";

const LandingPage = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title =
      "Gerador Loterias IA | Combinações Inteligentes Para Ganhar na Loteria com IA Avançada";

    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Gere combinações inteligentes para Quina, Mega Sena, Lotofácil, Timemania e Dupla Sena usando Inteligência Artificial avançada. Aumente suas chances com análises estatísticas baseadas em milhares de sorteios anteriores e algoritmos de IA que identificam padrões vencedores.",
      );
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Gerador de Combinações Loterias com IA",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "BRL",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1580",
        bestRating: "5",
        worstRating: "1",
      },
    };

    // Add structured data script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Clean up structured data script
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      scripts.forEach((s) => s.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <LazyMotion features={domAnimation}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
                Gerador de Combinações para Loterias com IA Avançada
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto mb-10">
                Aumente suas chances de ganhar na{" "}
                <span className="font-semibold text-[#660099]">Quina</span>,{" "}
                <span className="font-semibold text-[#003399]">Mega Sena</span>,{" "}
                <span className="font-semibold text-[#009933]">Lotofácil</span>,{" "}
                <span className="font-semibold text-[#CC0000]">Timemania</span>{" "}
                e{" "}
                <span className="font-semibold text-[#FF6600]">Dupla Sena</span>{" "}
                com combinações geradas por algoritmos de Inteligência
                Artificial que analisam milhares de sorteios anteriores para
                identificar padrões estatísticos vencedores
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {lotteries
                  .filter((l) => l.id !== "")
                  .map((lottery) => (
                    <div key={lottery.id}>
                      <Button
                        size="lg"
                        className="text-lg md:text-xl px-6 py-4 h-auto"
                        style={{ backgroundColor: lottery.color }}
                        asChild
                      >
                        <Link to={`/${lottery.id}`}>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Gerar {lottery.name}
                        </Link>
                      </Button>
                    </div>
                  ))}
              </div>
            </motion.div>
          </LazyMotion>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Como Nossa IA Gera Combinações Inteligentes
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Utilizamos algoritmos avançados de Inteligência Artificial para
              analisar padrões estatísticos de milhares de sorteios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl md:text-2xl">
                  Análise Estatística Avançada
                </CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Analisamos milhares de sorteios anteriores para identificar
                  padrões e tendências vencedoras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nossa IA processa dados históricos de todos os sorteios para
                  identificar números mais frequentes, distribuições par/ímpar e
                  relações entre números altos e baixos, criando um perfil
                  estatístico completo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl md:text-2xl">
                  Algoritmos de Machine Learning
                </CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Utilizamos modelos de aprendizado de máquina para otimizar
                  combinações com maior probabilidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nossos algoritmos de IA aprendem com os padrões identificados
                  e geram combinações estratégicas que maximizam suas chances de
                  acerto com base em probabilidades estatísticas e análise
                  preditiva.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl md:text-2xl">
                  Padrões Personalizados
                </CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Personalize os padrões estatísticos para suas combinações com
                  base em estratégias comprovadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ajuste parâmetros como equilíbrio par/ímpar, distribuição de
                  números altos/baixos e inclusão de números quentes/frios para
                  criar combinações que se alinhem com suas estratégias
                  pessoais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lottery Games Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Escolha Sua Loteria
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Geramos combinações inteligentes para todas as principais loterias
              da Caixa
            </p>
          </div>

          <Tabs defaultValue="cards" className="w-full mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="cards">Cartões</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
            </TabsList>

            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lotteries
                  .filter((l) => l.id !== "")
                  .map((lottery, index) => (
                    <div key={lottery.id}>
                      <Card
                        className="h-full overflow-hidden border-2 hover:shadow-lg transition-all"
                        style={{ borderColor: `${lottery.color}40` }}
                      >
                        <CardHeader>
                          <CardTitle
                            style={{
                              color: lottery.color,
                              textAlign: "center",
                            }}
                            className="text-xl md:text-2xl"
                          >
                            {lottery.name}
                          </CardTitle>
                          <CardDescription className="text-center text-base md:text-lg">
                            {lottery.description ||
                              `Gere combinações otimizadas para a ${lottery.name}`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                          <p className="text-muted-foreground mb-6 flex-grow text-base md:text-lg">
                            Gere combinações inteligentes para a {lottery.name}{" "}
                            com base em análises estatísticas e algoritmos de IA
                            avançados.
                          </p>
                          <Button
                            className="w-full mt-auto"
                            style={{
                              backgroundColor: lottery.color,
                              color: "white",
                            }}
                            asChild
                          >
                            <Link to={`/${lottery.id}`} prefetch="intent">
                              Gerar Combinações
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-8">
                <Suspense
                  fallback={
                    <div className="h-40 flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-[#003399] text-xl md:text-2xl">
                        Mega Sena
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-[#003399]" />
                            <span>
                              <strong>Números:</strong> 6 números de 1 a 60
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-[#003399]" />
                            <span>
                              <strong>Prêmio:</strong> Até R$ 300 milhões
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-[#003399]" />
                            <span>
                              <strong>Probabilidade:</strong> 1 em 50.063.860
                            </span>
                          </div>
                        </div>
                        <p>
                          A Mega Sena é a loteria com os maiores prêmios do
                          Brasil. Nossos algoritmos de IA analisam milhares de
                          sorteios anteriores para identificar padrões
                          estatísticos que podem aumentar suas chances.
                        </p>
                        <Button
                          className="bg-[#003399] hover:bg-[#003399]/90"
                          asChild
                        >
                          <Link to="/megasena">
                            Gerar Combinações da Mega Sena
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Suspense>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#009933] text-xl md:text-2xl">
                      Lotofácil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-[#009933]" />
                          <span>
                            <strong>Números:</strong> 15 números de 1 a 25
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-[#009933]" />
                          <span>
                            <strong>Prêmio:</strong> Até R$ 5 milhões
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-[#009933]" />
                          <span>
                            <strong>Probabilidade:</strong> 1 em 3.268.760
                          </span>
                        </div>
                      </div>
                      <p>
                        A Lotofácil é a loteria com maiores chances de acerto.
                        Nossa IA gera combinações otimizadas com base em
                        análises de frequência e distribuição de números para
                        aumentar suas possibilidades de ganhar.
                      </p>
                      <Button
                        className="bg-[#009933] hover:bg-[#009933]/90"
                        asChild
                      >
                        <Link to="/lotofacil">
                          Gerar Combinações da Lotofácil
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#CC0000] text-xl md:text-2xl">
                      Timemania
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-[#CC0000]" />
                          <span>
                            <strong>Números:</strong> 10 números de 1 a 80
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-[#CC0000]" />
                          <span>
                            <strong>Prêmio:</strong> Até R$ 8 milhões
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-[#CC0000]" />
                          <span>
                            <strong>Probabilidade:</strong> 1 em 26.472.637
                          </span>
                        </div>
                      </div>
                      <p>
                        A Timemania é uma loteria que também premia o acerto do
                        Time do Coração. Nossa IA analisa tanto os números
                        quanto os times mais sorteados para gerar combinações
                        otimizadas.
                      </p>
                      <Button
                        className="bg-[#CC0000] hover:bg-[#CC0000]/90"
                        asChild
                      >
                        <Link to="/timemania">
                          Gerar Combinações da Timemania
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#FF6600] text-xl md:text-2xl">
                      Dupla Sena
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-[#FF6600]" />
                          <span>
                            <strong>Números:</strong> 6 números de 1 a 50
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-[#FF6600]" />
                          <span>
                            <strong>Prêmio:</strong> Até R$ 5 milhões
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-[#FF6600]" />
                          <span>
                            <strong>Probabilidade:</strong> 1 em 15.890.700
                          </span>
                        </div>
                      </div>
                      <p>
                        A Dupla Sena oferece duas chances de ganhar em cada
                        concurso. Nossa IA analisa os padrões de ambos os
                        sorteios para gerar combinações com maior probabilidade
                        de acerto.
                      </p>
                      <Button
                        className="bg-[#FF6600] hover:bg-[#FF6600]/90"
                        asChild
                      >
                        <Link to="/duplasena">
                          Gerar Combinações da Dupla Sena
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#660099] text-xl md:text-2xl">
                      Quina
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-[#660099]" />
                          <span>
                            <strong>Números:</strong> 5 números de 1 a 80
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-[#660099]" />
                          <span>
                            <strong>Prêmio:</strong> Até R$ 10 milhões
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-[#660099]" />
                          <span>
                            <strong>Probabilidade:</strong> 1 em 24.040.016
                          </span>
                        </div>
                      </div>
                      <p>
                        A Quina é uma das loterias mais populares do Brasil, com
                        sorteios de segunda a sábado. Nossa IA analisa padrões
                        de distribuição par/ímpar e números quentes para
                        maximizar suas chances.
                      </p>
                      <Button
                        className="bg-[#660099] hover:bg-[#660099]/90"
                        asChild
                      >
                        <Link to="/quina">Gerar Combinações da Quina</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* AI Methods Section */}
      <section className="py-16 bg-gradient-to-r from-[#9C27B0]/5 to-[#2196F3]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Métodos de IA e Estatística Utilizados
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Conheça as tecnologias avançadas por trás do nosso gerador de
              combinações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl md:text-2xl">
                  Tecnologias de IA Utilizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Redes Neurais</span> -
                      Utilizamos redes neurais profundas para analisar padrões
                      complexos em sorteios anteriores e identificar combinações
                      com maior probabilidade de sucesso.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Algoritmos Genéticos</span>{" "}
                      - Nossos algoritmos evoluem e aprimoram combinações ao
                      longo do tempo, selecionando as mais promissoras com base
                      em critérios estatísticos.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">
                        Aprendizado por Reforço
                      </span>{" "}
                      - O sistema aprende continuamente com novos sorteios,
                      ajustando seus modelos para melhorar a precisão das
                      combinações geradas.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">
                        Processamento de Linguagem Natural
                      </span>{" "}
                      - Analisamos comentários e feedback de usuários para
                      aprimorar nossos algoritmos e estratégias de geração.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl md:text-2xl">
                  Métodos Estatísticos Avançados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Análise de Frequência</span>{" "}
                      - Identificamos os números que aparecem com maior
                      frequência em sorteios anteriores e os incorporamos
                      estrategicamente nas combinações.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">
                        Distribuição Par/Ímpar
                      </span>{" "}
                      - Analisamos a proporção ideal entre números pares e
                      ímpares com base em sorteios vencedores anteriores.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Soma Total Otimizada</span>{" "}
                      - Calculamos a faixa de soma total dos números que tem
                      maior probabilidade de ser sorteada com base em análises
                      históricas.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">
                        Distribuição Alto/Baixo
                      </span>{" "}
                      - Equilibramos números altos e baixos nas combinações
                      seguindo padrões identificados em sorteios anteriores.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Amazon Affiliate Section - Lazy loaded */}
      <section className="py-12 bg-gradient-to-r from-amber-100 to-amber-200 border-y-4 border-amber-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-800">
            Aumente Sua Sorte com Produtos da Amazon
          </h2>
          <p className="text-lg md:text-xl text-amber-700 max-w-3xl mx-auto mb-8">
            Descubra produtos que podem trazer mais sorte para seus jogos de
            loteria
          </p>

          <a
            href="https://www.amazon.com.br?&linkCode=ll2&tag=sortia-20&linkId=bb227c8e443b0d2ca4a70d03ff6ae8ee&language=pt_BR&ref_=as_li_ss_tl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-lg shadow-lg bg-amber-500 text-white text-lg md:text-xl font-bold hover:bg-amber-600 transition-colors"
            loading="lazy"
            onClick={(e) => {
              // Delay redirect slightly to improve Core Web Vitals
              e.preventDefault();
              setTimeout(() => {
                window.open(
                  "https://www.amazon.com.br?&linkCode=ll2&tag=sortia-20&linkId=bb227c8e443b0d2ca4a70d03ff6ae8ee&language=pt_BR&ref_=as_li_ss_tl",
                  "_blank",
                );
              }, 10);
            }}
          >
            🍀 Comprar Produtos da Sorte na Amazon 🍀
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#9C27B0]/10 to-[#2196F3]/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para Aumentar Suas Chances?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Comece a gerar combinações inteligentes agora mesmo e maximize suas
            possibilidades de ganhar nas loterias
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {lotteries
              .filter((l) => l.id !== "")
              .map((lottery) => (
                <Button
                  key={lottery.id}
                  variant="outline"
                  className="text-base md:text-lg px-4 py-2 h-auto border-2 transition-all"
                  style={{ borderColor: lottery.color, color: lottery.color }}
                  asChild
                >
                  <Link to={`/${lottery.id}`}>{lottery.name}</Link>
                </Button>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
