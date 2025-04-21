import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";

/**
 * Botão de pagamento do Mercado Pago
 * Implementação baseada em https://github.com/dedekpo/mercadopago-nextjs-by-andredev
 * @typedef {Object} MercadoPagoButtonProps
 * @property {Function} onSuccess - Callback chamado quando o pagamento é iniciado com sucesso
 * @property {Function} onError - Callback chamado quando ocorre um erro no pagamento
 * @property {string} label - Texto do botão
 * @property {string} className - Classes CSS adicionais
 * @property {boolean} disabled - Se o botão está desabilitado
 * @property {Object} style - Estilos inline adicionais
 * @property {string} lotteryType - Tipo de loteria (megasena, lotofacil, etc)
 */

/**
 * Componente de botão para pagamento via Mercado Pago
 * @param {MercadoPagoButtonProps} props 
 */
const MercadoPagoButton = ({
  onSuccess,
  onError,
  label = "Pagar R$1,00 e Desbloquear",
  className = "",
  disabled = false,
  style = {},
  lotteryType = "megasena"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Dados do pagamento
      const paymentData = {
        title: "Acesso Premium ao Gerador de Loteria",
        price: 1.00,
        description: `Acesso ao gerador avançado de combinações para ${lotteryType}`,
        quantity: 1,
        lotteryType,
        buyerEmail: "cliente@exemplo.com"
      };
      
      // Criar preferência de pagamento
      const response = await fetch('http://localhost:3001/api/mercadopago/create-preference', {
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
      
      // Obter dados da preferência
      const data = await response.json();
      
      if (!data.init_point) {
        throw new Error("URL de pagamento não encontrada na resposta");
      }
      
      // Salvar informações para verificação posterior
      localStorage.setItem("mp_payment_initiated", "true");
      localStorage.setItem("mp_lottery_type", lotteryType);
      
      // Notificar sucesso
      if (onSuccess) {
        onSuccess(data.id);
      }
      
      // Redirecionar para a página de pagamento
      window.location.href = data.init_point;
      
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

MercadoPagoButton.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  lotteryType: PropTypes.string
};

export default MercadoPagoButton;
