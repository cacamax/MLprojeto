import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import { Download, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Combination {
  id: number;
  numbers: number[];
  team?: string;
}

interface CombinationsDisplayProps {
  combinations?: Combination[];
  isVisible?: boolean;
  packageType?: string;
  lotteryType?: "quina" | "megasena" | "lotofacil" | "timemania" | "duplasena";
}

const CombinationsDisplay = ({
  combinations = [
    { id: 1, numbers: [1, 15, 23, 45, 67] },
    { id: 2, numbers: [5, 18, 27, 39, 72] },
    { id: 3, numbers: [7, 14, 31, 52, 65] },
    { id: 4, numbers: [2, 19, 33, 47, 61] },
    { id: 5, numbers: [9, 22, 36, 48, 70] },
    { id: 6, numbers: [3, 17, 29, 44, 68] },
    { id: 7, numbers: [6, 21, 34, 50, 63] },
    { id: 8, numbers: [8, 16, 30, 46, 69] },
    { id: 9, numbers: [4, 20, 35, 51, 64] },
    { id: 10, numbers: [10, 25, 38, 53, 71] },
    { id: 11, numbers: [12, 26, 41, 58, 77] },
    { id: 12, numbers: [11, 30, 46, 59, 75] },
    { id: 13, numbers: [13, 32, 48, 62, 79] },
    { id: 14, numbers: [14, 35, 50, 64, 78] },
    { id: 15, numbers: [20, 40, 54, 67, 80] },
    { id: 16, numbers: [6, 19, 32, 48, 70] },
    { id: 17, numbers: [8, 22, 35, 51, 75] },
    { id: 18, numbers: [3, 17, 30, 46, 66] },
    { id: 19, numbers: [9, 24, 39, 53, 72] },
    { id: 20, numbers: [1, 15, 28, 42, 60] },
  ],
  isVisible = true,
  lotteryType = "quina",
}: CombinationsDisplayProps) => {
  // Limit combinations to 100 maximum
  const displayCombinations = combinations.slice(0, 100);
  const [email, setEmail] = useState("");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const { toast } = useToast();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Start with animation not complete
      setAnimationComplete(false);

      // Set animation to complete after a delay
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const handleDownload = () => {
    // Create CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Numbers,Team\n" +
      combinations
        .map(
          (combo) =>
            `${combo.id},${combo.numbers.join(" ")},${combo.team || ""}`,
        )
        .join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quina_combinations.csv");
    document.body.appendChild(link);

    // Trigger download
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download iniciado",
      description: "Suas combinações estão sendo baixadas.",
    });
  };

  const handleCopy = () => {
    const textToCopy = combinations
      .map((combo) => {
        let text = `Combinação ${combo.id}: ${combo.numbers.join(" ")}`;
        if (combo.team) {
          text += ` | Time: ${combo.team}`;
        }
        return text;
      })
      .join("\n");

    navigator.clipboard.writeText(textToCopy);

    toast({
      title: "Copiado com sucesso!",
      description:
        "As combinações foram copiadas para a área de transferência.",
    });
  };

  const handleSendEmail = () => {
    // Get lottery name based on type
    const lotteryName =
      lotteryType === "megasena"
        ? "Mega Sena"
        : lotteryType === "lotofacil"
          ? "Lotofácil"
          : lotteryType === "timemania"
            ? "Timemania"
            : lotteryType === "duplasena"
              ? "Dupla Sena"
              : "Quina";

    // Format the combinations for WhatsApp
    const textToSend = combinations
      .map((combo) => {
        let text = `Combinação ${combo.id}: ${combo.numbers.join(" ")}`;
        if (combo.team) {
          text += ` | Time: ${combo.team}`;
        }
        return text;
      })
      .join("\n");

    // Create WhatsApp URL with the combinations and Amazon affiliate link
    const amazonLink =
      "\n\n🍀 Compre produtos para aumentar sua sorte: https://amzn.to/4hia7uz 🍀";
    const pixInfo =
      "\n\nGostou do gerador? Ajude a manter o site no ar com uma doação simbólica ou compartilhe parte da sua sorte caso ganhe!\nPIX: sortiainteligente@gmail.com";
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Suas combinações da ${lotteryName} geradas por IA:\n\n${textToSend}${amazonLink}${pixInfo}`)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    setEmailDialogOpen(false);

    toast({
      title: "WhatsApp aberto!",
      description: `As combinações da ${lotteryName} foram preparadas para compartilhamento via WhatsApp`,
      action: (
        <ToastAction altText="OK">
          <Check size={16} />
        </ToastAction>
      ),
    });
  };

  return (
    <div
      id="combinations-display"
      className="w-full p-6 bg-white dark:bg-gray-900"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#660099] to-[#9C27B0]">
            Suas {displayCombinations.length} Combinações Geradas por
            Inteligência Artificial
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
            Aqui estão suas combinações estratégicas da{" "}
            {lotteryType === "megasena"
              ? "Mega Sena"
              : lotteryType === "lotofacil"
                ? "Lotofácil"
                : lotteryType === "timemania"
                  ? "Timemania"
                  : lotteryType === "duplasena"
                    ? "Dupla Sena"
                    : "Quina"}{" "}
            geradas por Inteligência Artificial com base em análise avançada de
            estatísticas e padrões de milhares de sorteios anteriores.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="grid">Visualização em Grid</TabsTrigger>
              <TabsTrigger value="list">Visualização em Lista</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <AnimatePresence>
                  {displayCombinations.map((combo, index) => (
                    <motion.div
                      key={combo.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={
                        animationComplete ? { opacity: 1, y: 0, scale: 1 } : {}
                      }
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <Card className="p-4 text-center">
                        <div className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">
                          Combinação {combo.id}
                        </div>
                        {combo.team && (
                          <div className="text-xs font-medium mb-2 p-1 rounded bg-[#CC0000]/10 text-[#CC0000]">
                            Time: {combo.team}
                          </div>
                        )}
                        <div className="flex flex-wrap justify-center gap-2">
                          {combo.numbers.map((num, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={
                                animationComplete
                                  ? {
                                      opacity: 1,
                                      scale: 1,
                                      transition: {
                                        delay: index * 0.1 + idx * 0.05,
                                        duration: 0.3,
                                        type: "spring",
                                        stiffness: 200,
                                      },
                                    }
                                  : {}
                              }
                              className="w-8 h-8 rounded-full bg-[#660099]/20 dark:bg-[#660099]/30 flex items-center justify-center text-white font-medium"
                            >
                              {num}
                            </motion.div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-3">
                <AnimatePresence>
                  {displayCombinations.map((combo, index) => (
                    <motion.div
                      key={combo.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={animationComplete ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      className="p-3 border rounded-md flex justify-between items-center"
                    >
                      <div className="font-medium">Combinação {combo.id}</div>
                      {combo.team && (
                        <div className="text-xs font-medium p-1 rounded bg-[#CC0000]/10 text-[#CC0000] mr-2">
                          Time: {combo.team}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        {combo.numbers.map((num, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={
                              animationComplete
                                ? {
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                      delay: index * 0.05 + idx * 0.05,
                                      duration: 0.3,
                                    },
                                  }
                                : {}
                            }
                            className="w-8 h-8 rounded-full bg-[#660099]/20 dark:bg-[#660099]/30 flex items-center justify-center text-white font-medium"
                          >
                            {num}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 text-white"
            style={{
              backgroundColor: "rgba(102, 0, 153, 0.9)",
              borderColor: "rgba(102, 0, 153, 1)",
            }}
          >
            <Download size={18} />
            Baixar CSV
          </Button>
          <Button
            onClick={handleCopy}
            variant="outline"
            style={{
              borderColor: "rgba(102, 0, 153, 0.5)",
              color: "rgba(102, 0, 153, 0.8)",
            }}
            className="flex items-center gap-2"
          >
            <Copy size={18} />
            Copiar
          </Button>
          <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                style={{
                  backgroundColor: "rgba(102, 0, 153, 0.2)",
                  color: "rgba(102, 0, 153, 1)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                </svg>
                Compartilhar via WhatsApp
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-center">
                <DialogTitle className="text-center">
                  Compartilhar combinações via WhatsApp
                </DialogTitle>
              </DialogHeader>
              <div className="py-4 text-center">
                <p className="mb-4">
                  Ao clicar em "Compartilhar", o WhatsApp será aberto para você
                  selecionar um contato ou grupo para compartilhar suas
                  combinações da{" "}
                  {lotteryType === "megasena"
                    ? "Mega Sena"
                    : lotteryType === "lotofacil"
                      ? "Lotofácil"
                      : lotteryType === "timemania"
                        ? "Timemania"
                        : lotteryType === "duplasena"
                          ? "Dupla Sena"
                          : "Quina"}
                  .
                </p>
                <p className="text-xs text-muted-foreground">
                  Incluiremos também informações sobre o PIX para doações:
                  sortiainteligente@gmail.com
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleSendEmail}
                  className="w-full text-white"
                  style={{
                    backgroundColor: "rgba(102, 0, 153, 0.9)",
                    borderColor: "rgba(102, 0, 153, 1)",
                  }}
                >
                  Compartilhar no WhatsApp
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-base md:text-lg text-gray-500 dark:text-gray-400">
          <p>
            Estas combinações foram geradas com base em análises estatísticas
            avançadas e algoritmos de Inteligência Artificial que processam os
            padrões dos sorteios anteriores. Nossa IA analisa frequência de
            números, distribuição par/ímpar e relação entre números altos e
            baixos para maximizar suas chances.
          </p>
          <p className="mt-2 font-medium">Boa sorte com seus jogos!</p>
          <p className="mt-4 text-sm border-t pt-4">
            Gostou do gerador? Ajude a manter o site no ar com uma doação
            simbólica ou compartilhe parte da sua sorte caso ganhe! <br />
            <span className="font-bold">PIX: sortiainteligente@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombinationsDisplay;
