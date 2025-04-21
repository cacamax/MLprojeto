import React from "react";
import { Button } from "./ui/button";
import { CreditCard } from "lucide-react";

interface HotmartButtonProps {
  productId: string;
  text?: string;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

const HotmartButton = ({
  productId,
  text = "Comprar Agora",
  className = "",
  variant = "default",
  size = "default",
  onClick,
}: HotmartButtonProps) => {
  const handleClick = () => {
    // Registrar o clique se houver um callback
    if (onClick) {
      onClick();
    }

    // Redirecionar para o checkout do Hotmart
    const hotmartUrl = `https://pay.hotmart.com/${productId}`;
    window.open(hotmartUrl, "_blank");
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {text}
    </Button>
  );
};

export default HotmartButton;
