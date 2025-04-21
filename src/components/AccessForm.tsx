import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Brain, Sparkles, Mail } from "lucide-react";
import AccessAnimation from "./AccessAnimation";

interface AccessFormProps {
  onAccessGranted: () => void;
}

const AccessForm = ({ onAccessGranted }: AccessFormProps) => {
  const [email, setEmail] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show animation
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    // Store email in localStorage to remember the user
    if (email) {
      localStorage.setItem("user_email", email);
    }
    // Grant access
    onAccessGranted();
  };

  return (
    <div className="w-full py-12 bg-background">
      {showAnimation && (
        <AccessAnimation onComplete={handleAnimationComplete} />
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#9C27B0] to-[#2196F3]">
            Gerador de Combinações com IA
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Acesse nosso gerador de combinações inteligentes para loterias
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-8 shadow-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Brain className="h-8 w-8 text-primary" />
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                Libere Acesso ao Gerador de Combinações
              </h3>
              <p className="text-muted-foreground">
                Informe seu e-mail para acessar o gerador de combinações
                inteligentes baseado em Inteligência Artificial
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div>
                <Label htmlFor="email">Seu e-mail</Label>
                <div className="flex mt-2">
                  <div className="bg-muted flex items-center px-3 rounded-l-md border-y border-l">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-l-none"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full shadow-md hover:shadow-lg transition-all text-lg font-semibold px-8 py-6 h-auto"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Liberar Acesso
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center">
              Ao acessar, você concorda com nossos termos de uso e política de
              privacidade. Não compartilhamos seus dados com terceiros.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccessForm;
