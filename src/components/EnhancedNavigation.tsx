import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface LotteryType {
  id: string;
  name: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
  icon: React.ReactNode;
  description: string;
}

const lotteries: LotteryType[] = [
  {
    id: "",
    name: "Início",
    color: "#9C27B0",
    textColor: "text-[#9C27B0]",
    bgColor: "bg-[#9C27B0]",
    borderColor: "border-[#9C27B0]",
    hoverColor: "hover:bg-[#9C27B0]/90",
    description: "Página inicial",
    icon: (
      <div className="flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-current" />
      </div>
    ),
  },
  {
    id: "megasena",
    name: "Mega Sena",
    color: "#003399",
    textColor: "text-[#003399]",
    bgColor: "bg-[#003399]",
    borderColor: "border-[#003399]",
    hoverColor: "hover:bg-[#003399]/90",
    description: "6 números de 1 a 60",
    icon: (
      <div className="flex items-center space-x-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-current" />
        ))}
      </div>
    ),
  },
  {
    id: "lotofacil",
    name: "Lotofácil",
    color: "#009933",
    textColor: "text-[#009933]",
    bgColor: "bg-[#009933]",
    borderColor: "border-[#009933]",
    hoverColor: "hover:bg-[#009933]/90",
    description: "15 números de 1 a 25",
    icon: (
      <div className="flex flex-wrap w-6 h-6 items-center justify-center">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 m-0.5 rounded-full bg-current" />
        ))}
      </div>
    ),
  },
  {
    id: "timemania",
    name: "Timemania",
    color: "#CC0000",
    textColor: "text-[#CC0000]",
    bgColor: "bg-[#CC0000]",
    borderColor: "border-[#CC0000]",
    hoverColor: "hover:bg-[#CC0000]/90",
    description: "10 números de 1 a 80",
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
  {
    id: "duplasena",
    name: "Dupla Sena",
    color: "#FF6600",
    textColor: "text-[#FF6600]",
    bgColor: "bg-[#FF6600]",
    borderColor: "border-[#FF6600]",
    hoverColor: "hover:bg-[#FF6600]/90",
    description: "6 números de 1 a 50",
    icon: (
      <div className="flex space-x-1">
        <div className="w-3 h-3 rounded-full bg-current opacity-70" />
        <div className="w-3 h-3 rounded-full bg-current" />
      </div>
    ),
  },
  {
    id: "quina",
    name: "Quina",
    color: "#660099",
    textColor: "text-[#660099]",
    bgColor: "bg-[#660099]",
    borderColor: "border-[#660099]",
    hoverColor: "hover:bg-[#660099]/90",
    description: "5 números de 1 a 80",
    icon: (
      <div className="flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-current" />
      </div>
    ),
  },
];

const EnhancedNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Determine current lottery based on path
  const getCurrentLottery = () => {
    const path = location.pathname.split("/").filter(Boolean)[0] || "quina";
    return lotteries.find((lottery) => lottery.id === path) || lotteries[4]; // Default to Quina
  };

  const currentLottery = getCurrentLottery();

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <div className={cn("text-2xl font-bold", currentLottery.textColor)}>
            Loterias
          </div>
        </div>

        {isMobile ? (
          <div className="relative w-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center justify-between w-full px-4 py-2 rounded-md border",
                currentLottery.borderColor,
                currentLottery.textColor,
              )}
            >
              <div className="flex items-center gap-2">
                <span>{currentLottery.icon}</span>
                <span className="font-bold">{currentLottery.name}</span>
                <span className="text-xs text-muted-foreground">
                  {currentLottery.description}
                </span>
              </div>
              <ChevronDown
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50"
              >
                {lotteries.map((lottery) => (
                  <Link
                    key={lottery.id}
                    to={`/${lottery.id}`}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 hover:bg-muted transition-colors",
                      lottery.id === currentLottery.id
                        ? lottery.textColor + " font-bold"
                        : "",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{lottery.icon}</span>
                    <span>{lottery.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {lottery.description}
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ) : (
          <nav className="flex items-center space-x-2 lg:space-x-6 mx-6 overflow-x-auto pb-2">
            {lotteries.map((lottery) => {
              const isActive = currentLottery.id === lottery.id;
              return (
                <Link
                  key={lottery.id}
                  to={`/${lottery.id}`}
                  className={cn(
                    "h-9 px-4 py-2 rounded-full transition-all flex items-center whitespace-nowrap gap-2",
                    isActive
                      ? lottery.bgColor + " text-white"
                      : "hover:" + lottery.bgColor + "/20",
                  )}
                >
                  <span>{lottery.icon}</span>
                  <span className={isActive ? "font-bold" : ""}>
                    {lottery.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {lottery.description}
                  </span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export type { LotteryType };
export { lotteries };
export default EnhancedNavigation;
