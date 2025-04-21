import React, { useState, useEffect } from "react";
import { Moon, Sun, Zap, Menu } from "lucide-react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference stored
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const lotteries = [
    { id: "", name: "Início", color: "#9C27B0" },
    { id: "megasena", name: "Mega Sena", color: "#003399" },
    { id: "lotofacil", name: "Lotofácil", color: "#009933" },
    { id: "timemania", name: "Timemania", color: "#CC0000" },
    { id: "duplasena", name: "Dupla Sena", color: "#FF6600" },
    { id: "quina", name: "Quina", color: "#660099" },
  ];

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-40 h-20 flex items-center justify-between px-4 md:px-8 bg-background/95 backdrop-blur-sm border-b shadow-sm",
        className,
      )}
    >
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <LazyMotion features={domAnimation}>
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap
                  className="h-8 w-8 text-primary"
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(156, 39, 176, 0.5))",
                  }}
                />
              </motion.div>
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm -z-10"></div>
            </div>
          </LazyMotion>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
            🎲{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
              Gerador Loterias IA
            </span>{" "}
            <span className="hidden sm:inline">
              | Combinações Inteligentes com IA e Estatísticas
            </span>
          </h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {lotteries.map((lottery) => (
          <Link
            key={lottery.id}
            to={`/${lottery.id}`}
            className="px-3 py-2 rounded-full text-sm md:text-base font-medium hover:bg-muted transition-colors"
            style={{ color: lottery.color }}
          >
            {lottery.name}
          </Link>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          className="ml-2"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-20 right-0 w-48 bg-background border rounded-md shadow-lg py-2 z-50">
            {lotteries.map((lottery) => (
              <Link
                key={lottery.id}
                to={`/${lottery.id}`}
                className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                style={{ color: lottery.color }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {lottery.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
