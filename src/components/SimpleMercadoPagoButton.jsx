import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";

/**
 * Botão simples de pagamento do Mercado Pago baseado no exemplo que funciona
 */
const SimpleMercadoPagoButton = ({
  onSuccess,
  onError,
  label = "Pagar R$1,00 e Desbloquear",
  className = "",
  disabled = false,
  style = {}
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Dados do pagamento - exatamente como no exemplo que funciona
      const paymentData = {
        title: "Acesso Premium ao Gerador de Loteria",
        price: 1.00,
        description: "Acesso ao gerador avançado de combinações para Mega-Sena",
        lotteryType: "megasena",
        quantity: 1,
        buyerEmail: "cliente@exemplo.com"
      };
      
      // Enviar requisição para criar preferência
      const response = await fetch('http://localhost:3000/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      // Verificar resposta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ${response.status}`);
      }
      
      // Processar dados da preferência
      const data = await response.json();
      
      // Chamar callback de sucesso
      if (onSuccess) onSuccess(data.id);
      
      // Restaurar o botão para estado normal
      setIsLoading(false);
      
      // Redirecionar para o checkout após 1 segundo
      setTimeout(() => {
        window.location.href = data.init_point;
      }, 1000);
      
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      setError(err.message || "Erro ao processar pagamento. Tente novamente.");
      if (onError) onError(err);
      setIsLoading(false);
    }
  };

  return (
    <div className={className} style={style}>
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

SimpleMercadoPagoButton.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object
};

export default SimpleMercadoPagoButton;
