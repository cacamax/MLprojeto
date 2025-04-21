import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LegalDisclaimer from "./LegalDisclaimer";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Brain, Sparkles, ArrowUp } from "lucide-react";
import { generateQuinaCombinations } from "./CombinationsGenerator";
import {
  motion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import EnhancedNavigation from "./EnhancedNavigation";
import LandingPage from "./LandingPage";

interface HomeProps {
  className?: string;
}

const Home = ({ className = "" }: HomeProps) => {
  const navigate = useNavigate();
  const [showCombinations, setShowCombinations] = useState(false);
  const [combinations, setCombinations] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Don't generate combinations initially
  useEffect(() => {
    // Initialize with empty combinations
    setCombinations([]);
    setShowCombinations(false);

    // Update document title for SEO
    document.title =
      "🎲 Gerador de Combinações para Loterias com IA Avançada | Mega Sena, Quina, Lotofácil e mais";

    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Gere combinações inteligentes para todas as loterias com IA avançada! Aumente suas chances na Mega Sena, Quina, Lotofácil, Timemania e Dupla Sena usando análises estatísticas baseadas em milhares de sorteios anteriores, algoritmos de machine learning e redes neurais que identificam padrões vencedores.",
      );
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateCombinations = (count: number, patterns = null) => {
    // Here we would use the patterns to generate optimized combinations
    // For now, we'll use the existing function but in a real implementation
    // we would apply the pattern filters to the generated combinations
    const newCombinations = generateQuinaCombinations(count);
    setCombinations(newCombinations);
    setShowCombinations(true);
  };

  const scrollToTop = () => {
    if (showCombinations) {
      // Reset to generator view
      setShowCombinations(false);
    } else {
      // Just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <Header />

      <main className="flex-grow">
        <LandingPage />
      </main>

      <Footer />

      {/* Floating button to scroll to top */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {showScrollButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <Button
                onClick={scrollToTop}
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                aria-label={
                  showCombinations ? "Voltar ao gerador" : "Voltar ao topo"
                }
              >
                {showCombinations ? (
                  <Brain className="h-6 w-6" />
                ) : (
                  <ArrowUp className="h-6 w-6" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default Home;
