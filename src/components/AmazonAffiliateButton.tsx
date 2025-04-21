import React, { useEffect, useState } from "react";

/**
 * Componente de botão de afiliado da Amazon com efeito de piscar
 * Exibe um botão dourado com efeito de piscar para direcionar usuários para a Amazon
 */
const AmazonAffiliateButton: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Efeito de piscar a cada 2 segundos
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="w-full py-4 text-center">
      <a
        href="https://www.amazon.com.br?&linkCode=ll2&tag=sortia-20&linkId=bb227c8e443b0d2ca4a70d03ff6ae8ee&language=pt_BR&ref_=as_li_ss_tl"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-8 py-4 rounded-lg shadow-lg text-white text-lg md:text-xl font-bold transition-all duration-500 ${
          isBlinking
            ? "bg-amber-400 scale-105 shadow-amber-300/50"
            : "bg-amber-500 hover:bg-amber-600"
        }`}
        style={{
          animation: isBlinking ? "pulse 2s infinite" : "none",
          boxShadow: isBlinking
            ? "0 0 15px rgba(245, 158, 11, 0.7)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        🍀 Comprar Produtos da Sorte na Amazon 🍀
      </a>
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 5px rgba(245, 158, 11, 0.7);
            }
            50% {
              box-shadow: 0 0 20px rgba(245, 158, 11, 0.9);
            }
            100% {
              box-shadow: 0 0 5px rgba(245, 158, 11, 0.7);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AmazonAffiliateButton;
