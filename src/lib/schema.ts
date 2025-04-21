export const generateSchemaMarkup = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gerador de Combinações Loterias com IA Avançada",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "BRL",
    },
    description:
      "Gerador de combinações para loterias utilizando Inteligência Artificial avançada e análise estatística para aumentar suas chances de ganhar. Números gerados com base em estatísticas reais de milhares de sorteios anteriores para Quina, Mega Sena, Lotofácil, Timemania e Dupla Sena. Algoritmos de machine learning e redes neurais identificam padrões vencedores.",
    operatingSystem: "Web",
    keywords:
      "Loterias, IA, Inteligência Artificial, Machine Learning, Redes Neurais, Loteria, Combinações, Estatísticas, Gerador de números, Quina, Mega Sena, Lotofácil, Timemania, Dupla Sena, Números da sorte, Gerador de jogos, Combinações, Estatísticas, Probabilidade, Números quentes, Números mais sorteados, Algoritmo IA, Análise preditiva, Padrões estatísticos",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1580",
      bestRating: "5",
      worstRating: "1",
    },
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "Lottery Tool",
    datePublished: "2023-09-01",
    dateModified: new Date().toISOString().split("T")[0],
    sameAs: [
      "https://geradorquinaia.com.br",
      "https://www.facebook.com/geradorloteriasia",
      "https://twitter.com/geradorloteria",
    ],
    mainEntity: {
      "@type": "WebApplication",
      name: "Gerador de Combinações para Loterias",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      featureList: [
        "Geração de combinações para Quina",
        "Geração de combinações para Mega Sena",
        "Geração de combinações para Lotofácil",
        "Geração de combinações para Timemania",
        "Geração de combinações para Dupla Sena",
        "Análise estatística avançada",
        "Algoritmos de IA e Machine Learning",
        "Padrões personalizados",
      ],
    },
  };
};
