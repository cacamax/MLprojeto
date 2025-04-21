import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Header from "../Header";
import QuinaStatistics from "../statistics/QuinaStatistics";
import PatternGenerator from "../PatternGenerator";
import CombinationsDisplay from "../CombinationsDisplay";
import Footer from "../Footer";
import { Button } from "../ui/button";
import AmazonAffiliateButton from "../AmazonAffiliateButton";

import { generateQuinaCombinations } from "../CombinationsGenerator";

interface QuinaPageProps {
  className?: string;
}

const QuinaPage = ({ className = "" }: QuinaPageProps) => {
  const navigate = useNavigate();
  const [showCombinations, setShowCombinations] = useState(false);

  const [combinations, setCombinations] = useState([]);

  // Verificar se deve mostrar combinações avançadas (após pagamento)
  useEffect(() => {
    // Initialize with empty combinations
    setCombinations([]);
    setShowCombinations(false);

    // Verificar se há flag no localStorage para mostrar combinações avançadas
    const showAdvanced = localStorage.getItem("showAdvancedCombinations");
    const storedLotteryType = localStorage.getItem("lotteryType");

    // Verificar se é para esta loteria
    if (
      showAdvanced === "true" &&
      (!storedLotteryType || storedLotteryType === "quina")
    ) {
      // Gerar 50 combinações fixas do Gerador Avançado
      const advancedCombinations = generateQuinaCombinations(50, true);
      setCombinations(advancedCombinations);
      setShowCombinations(true);

      // Limpar o localStorage para não gerar novamente ao atualizar
      localStorage.removeItem("showAdvancedCombinations");
      localStorage.removeItem("lotteryType");
      localStorage.removeItem("selectedPatterns");

      // Scroll para as combinações
      setTimeout(() => {
        const combinationsElement = document.getElementById(
          "combinations-display",
        );
        if (combinationsElement) {
          combinationsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  const handleGenerateCombinations = (count: number, patterns?: any) => {
    const newCombinations = generateQuinaCombinations(count, false, patterns);
    setCombinations(newCombinations);
    setShowCombinations(true);
  };

  const handleAdvancedGenerate = (count: number) => {
    const advancedCombinations = generateQuinaCombinations(count, true);
    setCombinations(advancedCombinations);
    setShowCombinations(true);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <Header />

      <main className="flex-grow">
        {/* Statistics Section - Always visible */}
        <QuinaStatistics />

        {/* Pattern Generator */}
        <PatternGenerator
          onGenerate={handleGenerateCombinations}
          onAdvancedGenerate={handleAdvancedGenerate}
          lotteryType="quina"
          maxNumbers={5}
          range={80}
        />

        {/* Amazon Affiliate Button with blinking effect */}
        <AmazonAffiliateButton />

        {/* Combinations Display */}
        <CombinationsDisplay
          isVisible={showCombinations}
          combinations={combinations}
          lotteryType="quina"
        />
      </main>

      <Footer />

      {/* Floating button to go home */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => navigate("/")}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-[#660099] hover:bg-[#660099]/90 text-white"
          aria-label="Voltar ao início"
        >
          <Home className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default QuinaPage;
