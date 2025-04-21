import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { CreditCard, Loader2 } from "lucide-react";

/**
 * Novo botão de pagamento do Mercado Pago baseado no exemplo mercadopago-novo-teste.html
 */
const NewMercadoPagoButton = ({
  title = "Acesso Premium ao Gerador de Loteria",
  description = "Acesso ao gerador avançado de combinações para Mega-Sena",
  price = 1.00,
  lotteryType = "megasena",
  onSuccess,
  onError,
  label = "Pagar R$1,00 e Desbloquear",
  className = "",
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Função para criar preferência e iniciar pagamento
  const createPreferenceAndPay = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Criando preferência de pagamento...');
      
      // Criar preferência via API - exatamente como no exemplo
      const response = await fetch('http://localhost:3000/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          lotteryType,
          quantity: 1,
          buyerEmail: "cliente@exemplo.com"
        }),
      });
      
      // Verificar resposta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar preferência');
      }
      
      // Processar resposta
      const data = await response.json();
      console.log('Preferência criada com sucesso:', data);
      
      // Armazenar informações
      setPreferenceId(data.id);
      setPaymentUrl(data.init_point);
      
      // Chamar callback de sucesso
      if (onSuccess) onSuccess(data.id);
      
      // Armazenar dados no localStorage para referência
      if (typeof window !== 'undefined') {
        localStorage.setItem('mp_last_preference_id', data.id);
        localStorage.setItem('mp_payment_data', JSON.stringify({
          title,
          description,
          price,
          lotteryType,
          timestamp: new Date().toISOString(),
          preferenceId: data.id
        }));
      }
      
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
        onClick={createPreferenceAndPay}
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
      
      {preferenceId && paymentUrl && (
        <div className="mt-2 text-sm">
          <p>ID da Preferência: {preferenceId}</p>
          <a 
            href={paymentUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Abrir checkout
          </a>
        </div>
      )}
    </div>
  );
};

NewMercadoPagoButton.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  lotteryType: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default NewMercadoPagoButton;
