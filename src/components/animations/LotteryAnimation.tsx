import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Brain, Sparkles } from "lucide-react";

interface LotteryAnimationProps {
  onComplete: () => void;
  duration?: number;
  lotteryType: string;
}

const LotteryAnimation = ({
  onComplete,
  duration = 3000,
  lotteryType = "quina",
}: LotteryAnimationProps) => {
  const [stage, setStage] = useState<number>(0);
  const stages = [
    `Analisando estatísticas da ${getLotteryName()}...`,
    "Processando padrões de sorteios anteriores...",
    "Aplicando algoritmos de IA...",
    `Otimizando combinações de ${getNumbersCount()} números...`,
    lotteryType === "timemania"
      ? "Selecionando Times do Coração..."
      : "Finalizando geração...",
  ];

  useEffect(() => {
    const stageInterval = duration / (stages.length + 1);

    const timer = setTimeout(() => {
      if (stage < stages.length - 1) {
        setStage(stage + 1);
      } else {
        setTimeout(() => {
          onComplete();
        }, stageInterval);
      }
    }, stageInterval);

    return () => clearTimeout(timer);
  }, [stage, stages.length, duration, onComplete]);

  function getLotteryName() {
    switch (lotteryType) {
      case "megasena":
        return "Mega Sena";
      case "lotofacil":
        return "Lotofácil";
      case "timemania":
        return "Timemania";
      case "duplasena":
        return "Dupla Sena";
      case "quina":
      default:
        return "Quina";
    }
  }

  function getNumbersCount() {
    switch (lotteryType) {
      case "megasena":
        return "6";
      case "lotofacil":
        return "15";
      case "timemania":
        return "10";
      case "duplasena":
        return "6";
      case "quina":
      default:
        return "5";
    }
  }

  function getRange() {
    switch (lotteryType) {
      case "megasena":
        return 60;
      case "lotofacil":
        return 25;
      case "timemania":
        return 80;
      case "duplasena":
        return 50;
      case "quina":
      default:
        return 80;
    }
  }

  function getColor() {
    switch (lotteryType) {
      case "megasena":
        return "text-[#003399]";
      case "lotofacil":
        return "text-[#009933]";
      case "timemania":
        return "text-[#CC0000]";
      case "duplasena":
        return "text-[#FF6600]";
      case "quina":
      default:
        return "text-[#660099]";
    }
  }

  function getGradient() {
    switch (lotteryType) {
      case "megasena":
        return "from-[#001a66] to-[#0055ff]";
      case "lotofacil":
        return "from-[#006622] to-[#00cc44]";
      case "timemania":
        return "from-[#990000] to-[#ff3333]";
      case "duplasena":
        return "from-[#cc5200] to-[#ff8533]";
      case "quina":
      default:
        return "from-[#9C27B0] to-[#2196F3]";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-card border rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2, rotate: [0, 360] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
            className="relative mb-6"
          >
            <Brain size={64} className={getColor()} />
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles size={80} className="text-accent opacity-70" />
            </motion.div>
          </motion.div>

          <h3
            className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${getGradient()}`}
          >
            Gerando Combinações da {getLotteryName()} com IA
          </h3>

          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stage + 1) * (100 / stages.length)}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full bg-gradient-to-r ${getGradient()}`}
            />
          </div>

          <div className="h-8 flex items-center justify-center">
            <motion.p
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-foreground"
            >
              {stages[stage]}
            </motion.p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <Loader2 className={`h-5 w-5 animate-spin ${getColor()}`} />
            <span className="text-sm text-muted-foreground">
              Processando dados de milhares de sorteios anteriores
            </span>
          </div>

          <div className="mt-8 grid grid-cols-5 gap-2">
            {Array.from({ length: parseInt(getNumbersCount()) }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: i * 0.2 + stage * 0.1 },
                }}
                className={`w-10 h-10 rounded-full bg-${lotteryType === "quina" ? "primary" : getColor().replace("text-", "")}/20 flex items-center justify-center`}
              >
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                  className={getColor()}
                >
                  {Math.floor(Math.random() * getRange()) + 1}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {lotteryType === "timemania" && stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-2 border border-[#CC0000]/30 rounded-md bg-[#CC0000]/10 text-[#CC0000] font-medium"
            >
              Time do Coração:{" "}
              {
                ["Flamengo", "Corinthians", "São Paulo", "Palmeiras", "Santos"][
                  Math.floor(Math.random() * 5)
                ]
              }
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LotteryAnimation;
