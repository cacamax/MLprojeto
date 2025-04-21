import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Brain, Sparkles } from "lucide-react";

interface MegaSenaAnimationProps {
  onComplete: () => void;
  duration?: number;
}

const MegaSenaAnimation = ({
  onComplete,
  duration = 3000,
}: MegaSenaAnimationProps) => {
  const [stage, setStage] = useState<number>(0);
  const stages = [
    "Analisando estatísticas da Mega Sena...",
    "Processando padrões de sorteios anteriores...",
    "Aplicando algoritmos de IA...",
    "Otimizando combinações de 6 números...",
    "Finalizando geração...",
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
            animate={{ scale: 1.2, rotate: [0, 360] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
            className="relative mb-6"
          >
            <Brain size={64} className="text-[#003399]" />
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
              <Sparkles size={80} className="text-blue-300 opacity-70" />
            </motion.div>
          </motion.div>

          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#001a66] to-[#0055ff]">
            Gerando Combinações da Mega Sena com IA
          </h3>

          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stage + 1) * (100 / stages.length)}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#001a66] to-[#0055ff]"
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
            <Loader2 className="h-5 w-5 animate-spin text-[#003399]" />
            <span className="text-sm text-muted-foreground">
              Processando dados de milhares de sorteios anteriores
            </span>
          </div>

          <div className="mt-8 grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: i * 0.2 + stage * 0.1 },
                }}
                className="w-10 h-10 rounded-full bg-[#003399]/20 flex items-center justify-center"
              >
                <motion.span
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                  className="text-[#003399] font-bold"
                >
                  {Math.floor(Math.random() * 60) + 1}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaSenaAnimation;
