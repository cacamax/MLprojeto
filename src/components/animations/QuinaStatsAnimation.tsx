import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Brain,
  BarChart,
  PieChart,
  LineChart,
  Sparkles,
} from "lucide-react";

interface QuinaStatsAnimationProps {
  onComplete: () => void;
  duration?: number;
}

const QuinaStatsAnimation = ({
  onComplete,
  duration = 3000,
}: QuinaStatsAnimationProps) => {
  const [stage, setStage] = useState<number>(0);
  const stages = [
    "Analisando dados históricos da Quina...",
    "Processando estatísticas de frequência...",
    "Calculando distribuições par/ímpar...",
    "Analisando relação entre números altos e baixos...",
    "Verificando somas totais das combinações vencedoras...",
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
            animate={{ scale: 1.2 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
            className="relative mb-6"
          >
            <Brain size={64} className="text-primary" />
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
              <Sparkles size={80} className="text-secondary opacity-70" />
            </motion.div>
          </motion.div>

          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
            Analisando Estatísticas da Quina com IA
          </h3>

          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stage + 1) * (100 / stages.length)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#9C27B0] to-[#2196F3]"
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
              {stages[stage].split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <motion.span
              className="text-sm text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Processando dados de milhares de sorteios anteriores
            </motion.span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {/* Números mais frequentes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: stage >= 1 ? 1 : 0.3,
                y: stage >= 1 ? 0 : 10,
              }}
              className="flex flex-col items-center"
            >
              <BarChart
                className={`h-10 w-10 ${stage >= 1 ? "text-primary" : "text-muted"}`}
              />
              <motion.div
                animate={{
                  y: stage >= 1 ? [0, -3, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-xs mt-2 text-center"
              >
                Frequência
              </motion.div>
            </motion.div>

            {/* Par/Ímpar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: stage >= 2 ? 1 : 0.3,
                y: stage >= 2 ? 0 : 10,
              }}
              className="flex flex-col items-center"
            >
              <PieChart
                className={`h-10 w-10 ${stage >= 2 ? "text-primary" : "text-muted"}`}
              />
              <motion.div
                animate={{
                  y: stage >= 2 ? [0, -3, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.2,
                }}
                className="text-xs mt-2 text-center"
              >
                Par/Ímpar
              </motion.div>
            </motion.div>

            {/* Alto/Baixo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: stage >= 3 ? 1 : 0.3,
                y: stage >= 3 ? 0 : 10,
              }}
              className="flex flex-col items-center"
            >
              <LineChart
                className={`h-10 w-10 ${stage >= 3 ? "text-primary" : "text-muted"}`}
              />
              <motion.div
                animate={{
                  y: stage >= 3 ? [0, -3, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.4,
                }}
                className="text-xs mt-2 text-center"
              >
                Alto/Baixo
              </motion.div>
            </motion.div>
          </div>

          {/* Números da Quina animados */}
          <motion.div
            className="mt-6 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 4 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {[5, 23, 47, 61, 72].map((num, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{
                  scale: stage >= 4 ? 1 : 0,
                  transition: { delay: i * 0.1 + 0.2 },
                }}
                className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <motion.span
                  animate={{
                    opacity: stage >= 4 ? [0.5, 1, 0.5] : 0.5,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                  className="text-primary font-bold"
                >
                  {num}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuinaStatsAnimation;
