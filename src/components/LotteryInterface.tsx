import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type LotteryGame = "megasena" | "lotofacil" | "timemania" | "duplasena";

const LotteryInterface = () => {
  const [activeGame, setActiveGame] = useState<LotteryGame>("megasena");

  const games = {
    megasena: {
      name: "Mega Sena",
      color: "#209869", // Verde
      textColor: "text-[#209869]",
      bgColor: "bg-[#209869]",
      borderColor: "border-[#209869]",
      hoverColor: "hover:bg-[#209869]/90",
      fontClass: "font-extrabold tracking-tight",
      description:
        "Escolha 6 números dos 60 disponíveis e concorra a prêmios milionários.",
      icon: (
        <div className="flex items-center space-x-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-current" />
          ))}
        </div>
      ),
    },
    lotofacil: {
      name: "Lotofácil",
      color: "#930089", // Roxo
      textColor: "text-[#930089]",
      bgColor: "bg-[#930089]",
      borderColor: "border-[#930089]",
      hoverColor: "hover:bg-[#930089]/90",
      fontClass: "font-medium tracking-wide",
      description:
        "Marque de 15 a 20 números dentre os 25 disponíveis e fature prêmios.",
      icon: (
        <div className="flex flex-wrap w-6 h-6 items-center justify-center">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 m-0.5 rounded-full bg-current"
            />
          ))}
        </div>
      ),
    },
    timemania: {
      name: "Timemania",
      color: "#00ff9f", // Verde claro
      textColor: "text-[#00ff9f]",
      bgColor: "bg-[#00ff9f]",
      borderColor: "border-[#00ff9f]",
      hoverColor: "hover:bg-[#00ff9f]/90",
      fontClass: "font-bold italic",
      description:
        "Escolha 10 números e um Time do Coração para concorrer a prêmios.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 0-6.88 17.23l3.12-7.21a3 3 0 0 1 7.52 0l3.12 7.21A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
    duplasena: {
      name: "Dupla Sena",
      color: "#ae0000", // Vermelho
      textColor: "text-[#ae0000]",
      bgColor: "bg-[#ae0000]",
      borderColor: "border-[#ae0000]",
      hoverColor: "hover:bg-[#ae0000]/90",
      fontClass: "font-black tracking-tight",
      description:
        "Marque de 6 a 15 números e concorra a 2 sorteios por concurso.",
      icon: (
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-current opacity-70" />
          <div className="w-3 h-3 rounded-full bg-current" />
        </div>
      ),
    },
  };

  const currentGame = games[activeGame];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Barra superior fixa */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <div className={cn("text-2xl font-bold", currentGame.textColor)}>
              Loterias
            </div>
          </div>
          <nav className="flex items-center space-x-2 lg:space-x-6 mx-6">
            {Object.entries(games).map(([key, game]) => (
              <Button
                key={key}
                variant={activeGame === key ? "default" : "ghost"}
                className={cn(
                  "h-9 px-4 py-2 rounded-full transition-all",
                  activeGame === key
                    ? game.bgColor + " text-white"
                    : "hover:" + game.bgColor + "/20",
                )}
                onClick={() => setActiveGame(key as LotteryGame)}
              >
                <span className="mr-2">{game.icon}</span>
                <span className={activeGame === key ? game.fontClass : ""}>
                  {game.name}
                </span>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 container py-8">
        <div
          className={cn(
            "p-8 rounded-lg border-2 transition-all",
            currentGame.borderColor,
          )}
        >
          <h1
            className={cn(
              "text-4xl md:text-5xl mb-6",
              currentGame.textColor,
              currentGame.fontClass,
            )}
          >
            {currentGame.name}
          </h1>

          <p className="text-xl mb-8">{currentGame.description}</p>

          <div className="grid grid-cols-10 gap-2 md:gap-4 mb-8">
            {[...Array(activeGame === "lotofacil" ? 25 : 60)].map((_, i) => (
              <Button
                key={i}
                variant="outline"
                className={cn(
                  "h-10 w-10 md:h-12 md:w-12 rounded-full font-bold hover:" +
                    currentGame.bgColor,
                  "hover:text-white transition-all",
                )}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button
              className={cn(
                "px-8 py-6 text-lg font-bold",
                currentGame.bgColor,
                "text-white",
                currentGame.hoverColor,
              )}
            >
              Gerar Jogo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LotteryInterface;
