import React from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon, GithubIcon, TwitterIcon } from "lucide-react";
import { useTheme } from "../lib/utils";

interface FooterProps {
  onThemeToggle?: () => void;
}

const Footer = ({ onThemeToggle }: FooterProps) => {
  // Mock theme toggle function if not provided
  const toggleTheme = onThemeToggle || (() => {});

  // Mock theme state
  const theme = "light";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border py-4 px-6">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground text-center w-full">
          <p className="mb-2 text-base md:text-lg">
            © 2025 Gerador de Combinações Sortia.com.br. Todos os direitos
            reservados.
          </p>

          <p className="text-xs md:text-sm">
            Este site é meramente informativo e não está vinculado à Caixa
            Econômica Federal. As combinações geradas são sugestões baseadas em
            análises estatísticas e algoritmos de Inteligência Artificial, mas
            não garantem resultados. O usuário é responsável por suas próprias
            apostas. Dados históricos são obtidos de fontes públicas e podem não
            refletir o sorteio atual.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <TwitterIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
