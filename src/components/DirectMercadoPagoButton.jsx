import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";

/**
 * Botão de pagamento do Mercado Pago implementado exatamente como o exemplo que funciona
 */
const DirectMercadoPagoButton = ({
  onSuccess,
  onError,
  label = "Pagar R$1,00 e Desbloquear",
  className = "",
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Exatamente os mesmos dados e URL do exemplo que funciona
      const paymentData = {
        title: "Acesso Premium ao Gerador de Loteria",
        price: 1.00,
        description: "Acesso ao gerador avançado de combinações para Mega-Sena",
        lotteryType: "megasena",
        quantity: 1,
        buyerEmail: "cliente@exemplo.com"
      };
      
      // URL completa igual ao exemplo
      const response = await fetch('http://localhost:3000/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Preferência criada:', data);
      
      if (onSuccess) onSuccess(data.id);
      
      // Redirecionar para o checkout do Mercado Pago
      window.location.href = data.init_point;
      
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      setError(err.message || "Erro ao processar pagamento");
      if (onError) onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Button
        onClick={handlePayment}
        disabled={disabled || isLoading}
        className="w-full flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <CreditCard className="h-4 w-4" />
            {label}
          </>
        )}
      </Button>
    </div>
  );
};

DirectMercadoPagoButton.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default DirectMercadoPagoButton;
