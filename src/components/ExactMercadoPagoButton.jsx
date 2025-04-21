import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";

/**
 * Implementação exata do botão de pagamento do Mercado Pago baseada no arquivo mercadopago-teste-1real.html
 * Usa exatamente as mesmas credenciais e abordagem que está funcionando
 */
const ExactMercadoPagoButton = ({
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
      console.log('Iniciando processo de pagamento...');
      
      // Dados do pagamento - exatamente os mesmos do exemplo que funciona
      const paymentData = {
        title: "Acesso Premium ao Gerador de Loteria",
        price: 1.00,
        description: "Acesso ao gerador avançado de combinações para Mega-Sena",
        lotteryType: "megasena",
        quantity: 1,
        buyerEmail: "cliente@exemplo.com"
      };
      
      console.log('Enviando dados para criar preferência:', paymentData);
      
      // Enviar requisição para criar preferência - usando URL completa como no exemplo
      const response = await fetch('http://localhost:3000/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      // Verificar resposta
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: errorText || `Erro ${response.status}` };
        }
        throw new Error(errorData.error || `Erro ${response.status}`);
      }
      
      // Processar dados da preferência
      const data = await response.json();
      console.log('Preferência criada com sucesso:', data);
      
      // Chamar callback de sucesso
      if (onSuccess) onSuccess(data.id);
      
      // Armazenar dados no localStorage para referência
      if (typeof window !== 'undefined') {
        localStorage.setItem('mp_last_preference_id', data.id);
        localStorage.setItem('mp_payment_data', JSON.stringify({
          title: paymentData.title,
          description: paymentData.description,
          price: paymentData.price,
          lotteryType: paymentData.lotteryType,
          timestamp: new Date().toISOString(),
          preferenceId: data.id
        }));
      }
      
      // Redirecionar para o checkout do Mercado Pago
      console.log('Redirecionando para:', data.init_point);
      window.location.href = data.init_point;
      
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      setError(err.message || "Erro ao processar pagamento");
      if (onError) onError(err);
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

ExactMercadoPagoButton.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default ExactMercadoPagoButton;
