import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Brain, Sparkles } from "lucide-react";

interface DuplaSenaAnimationProps {
  onComplete: () => void;
  duration?: number;
}

const DuplaSenaAnimation = ({
  onComplete,
  duration = 3000,
}: DuplaSenaAnimationProps) => {
  const [stage, setStage] = useState<number>(0);
  const stages = [
    "Analisando estatísticas da Dupla Sena...",
    "Processando padrões de sorteios anteriores...",
    "Aplicando algoritmos de IA...",
    "Otimizando combinações para o 1º sorteio...",
    "Otimizando combinações para o 2º sorteio...",
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
            <Brain size={64} className="text-[#FF6600]" />
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
              <Sparkles size={80} className="text-orange-300 opacity-70" />
            </motion.div>
          </motion.div>

          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#cc5200] to-[#ff8533]">
            Gerando Combinações da Dupla Sena com IA
          </h3>

          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stage + 1) * (100 / stages.length)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#cc5200] to-[#ff8533]"
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
            <Loader2 className="h-5 w-5 animate-spin text-[#FF6600]" />
            <span className="text-sm text-muted-foreground">
              Processando dados de milhares de sorteios anteriores
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {/* First draw */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#FF6600] flex items-center justify-center text-white font-bold text-xs">
                1
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`first-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: stage >= 3 ? 1 : 0.3,
                      y: stage >= 3 ? 0 : 10,
                      transition: {
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      },
                    }}
                    className="w-8 h-8 rounded-full bg-[#FF6600]/20 flex items-center justify-center"
                  >
                    <motion.span
                      animate={{
                        opacity: stage >= 3 ? [0.5, 1, 0.5] : 0.5,
                        y: stage >= 3 && i % 2 === 0 ? [0, -3, 0] : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1,
                      }}
                      className="text-[#FF6600] font-bold"
                    >
                      {Math.floor(Math.random() * 50) + 1}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Second draw */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#FF6600] flex items-center justify-center text-white font-bold text-xs">
                2
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`second-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: stage >= 4 ? 1 : 0.3,
                      y: stage >= 4 ? 0 : 10,
                      transition: {
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      },
                    }}
                    className="w-8 h-8 rounded-full bg-[#FF6600]/20 flex items-center justify-center"
                  >
                    <motion.span
                      animate={{
                        opacity: stage >= 4 ? [0.5, 1, 0.5] : 0.5,
                        y: stage >= 4 && i % 2 === 1 ? [0, -3, 0] : 0,
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.1,
                      }}
                      className="text-[#FF6600] font-bold"
                    >
                      {Math.floor(Math.random() * 50) + 1}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DuplaSenaAnimation;
