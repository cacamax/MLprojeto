import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Brain, Sparkles } from "lucide-react";

interface GenerationAnimationProps {
  onComplete: () => void;
  duration?: number;
}

const GenerationAnimation = ({
  onComplete,
  duration = 3000,
}: GenerationAnimationProps) => {
  const [stage, setStage] = useState<number>(0);
  const stages = [
    "Analisando estatísticas...",
    "Processando padrões de sorteios anteriores...",
    "Aplicando algoritmos de IA...",
    "Otimizando combinações...",
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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <Brain size={64} className="text-primary" />
          </div>

          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
            Gerando Combinações com IA
          </h3>

          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <div
              style={{ width: `${(stage + 1) * (100 / stages.length)}%` }}
              className="h-full bg-gradient-to-r from-[#9C27B0] to-[#2196F3]"
            />
          </div>

          <div className="h-8 flex items-center justify-center">
            <p className="text-lg text-foreground">{stages[stage]}</p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Processando dados de milhares de sorteios anteriores
            </span>
          </div>

          <div className="mt-8 grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <span className="text-primary font-bold">
                  {Math.floor(Math.random() * 80) + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationAnimation;
