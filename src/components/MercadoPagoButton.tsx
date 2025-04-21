import React from 'react';
import { MERCADOPAGO_CONFIG } from '../lib/mercadopago-config';
import { Button } from "./ui/button";
import { Loader2, CreditCard } from "lucide-react";
import NgrokUrlSetter from './NgrokUrlSetter';

interface MercadoPagoButtonProps {
  lotteryType: string;
  onSuccess?: (preferenceId: string) => void;
  onError?: (error: Error) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const MercadoPagoButton: React.FC<MercadoPagoButtonProps> = ({ 
  lotteryType,
  onSuccess,
  onError,
  label = "Pagar R$1,00 e Desbloquear",
  className = "",
  disabled = false,
  style = {}
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [serverStatus, setServerStatus] = React.useState<'checking' | 'online' | 'offline'>('checking');
  const [ngrokUrl, setNgrokUrl] = React.useState<string | null>(null);
  const [showNgrokSetter, setShowNgrokSetter] = React.useState(false);
  const [hasPremiumAccess, setHasPremiumAccess] = React.useState(false);
  const [hasPendingPayment, setHasPendingPayment] = React.useState(false);

  // Verificar se o servidor está online
  React.useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const baseUrl = ngrokUrl || 'http://localhost:3001';
        const response = await fetch(`${baseUrl}/api/status`);
        
        if (response.ok) {
          setServerStatus('online');
          console.log('Servidor online');
        } else {
          setServerStatus('offline');
          console.error('Servidor retornou status não-OK:', response.status);
        }
      } catch (err) {
        setServerStatus('offline');
        console.error('Erro ao verificar status do servidor:', err);
      }
    };

    checkServerStatus();
    
    // Verificar status a cada 30 segundos
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, [ngrokUrl]);

  // Verificar se o usuário já tem acesso premium
  React.useEffect(() => {
    const checkPremiumAccess = () => {
      const hasPremium = localStorage.getItem(`${lotteryType}_premium`) === 'true';
      setHasPremiumAccess(hasPremium);
      
      // Verificar se há um pagamento pendente
      const pendingPaymentId = localStorage.getItem(`${lotteryType}_pending_payment`);
      setHasPendingPayment(!!pendingPaymentId);
      
      // Se houver um pagamento pendente, verificar o status
      if (pendingPaymentId) {
        checkPaymentStatus();
      }
    };
    
    checkPremiumAccess();
  }, [lotteryType, setHasPremiumAccess]);

  // Verificar status de pagamento pendente
  const checkPaymentStatus = async () => {
    const pendingPaymentId = localStorage.getItem(`${lotteryType}_pending_payment`);
    
    if (!pendingPaymentId) {
      return;
    }
    
    try {
      const baseUrl = ngrokUrl || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/mercadopago/payment-status/${pendingPaymentId}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao verificar status do pagamento: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Status do pagamento:', data);
      
      if (data.status === 'approved') {
        // Pagamento aprovado, conceder acesso premium
        localStorage.setItem(`${lotteryType}_premium`, 'true');
        localStorage.removeItem(`${lotteryType}_pending_payment`);
        setHasPremiumAccess(true);
        setHasPendingPayment(false);
        
        if (onSuccess) {
          onSuccess(pendingPaymentId);
        }
      } else if (['rejected', 'cancelled', 'refunded', 'charged_back'].includes(data.status)) {
        // Pagamento rejeitado ou cancelado, remover referência
        localStorage.removeItem(`${lotteryType}_pending_payment`);
        setHasPendingPayment(false);
      }
      // Se o status for 'pending' ou outro, manter o estado de pendente
      
    } catch (err) {
      console.error('Erro ao verificar status do pagamento:', err);
    }
  };

  // Verificar status de pagamento a cada 10 segundos se houver um pagamento pendente
  React.useEffect(() => {
    if (!hasPendingPayment) {
      return;
    }
    
    const interval = setInterval(checkPaymentStatus, 10000);
    
    return () => clearInterval(interval);
  }, [hasPendingPayment, ngrokUrl, lotteryType]);

  // Função para atualizar o URL do Ngrok
  const updateNgrokUrl = (url: string) => {
    setNgrokUrl(url);
    localStorage.setItem('ngrok_url', url);
  };

  const handlePayment = async () => {
    if (serverStatus !== 'online') {
      setError('Servidor offline. Não é possível processar pagamentos no momento.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Usar URL do Ngrok se disponível, caso contrário usar localhost
      const baseUrl = ngrokUrl || 'http://localhost:3001';
      
      // Criar preferência de pagamento
      const response = await fetch(`${baseUrl}/api/mercadopago/create-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Acesso Premium ao Gerador Avançado',
          price: MERCADOPAGO_CONFIG.DEFAULT_PRICE,
          quantity: 1,
          description: `Acesso ao gerador avançado de combinações para ${lotteryType}`,
          lotteryType: lotteryType, // Enviar o tipo de loteria para o servidor
          // Usar URL do Ngrok para notificações se disponível
          notification_url: ngrokUrl ? `${ngrokUrl}/api/mercadopago/webhook` : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar preferência: ${response.status}`);
      }

      const data = await response.json();
      console.log('Preferência criada:', data);

      // Salvar ID da preferência, tipo de loteria e external_reference para verificação posterior
      localStorage.setItem('preference_id', data.id);
      localStorage.setItem('preference_lottery_type', lotteryType);
      localStorage.setItem('external_reference', data.external_reference);

      // Redirecionar para o checkout do Mercado Pago
      window.location.href = MERCADOPAGO_CONFIG.USE_SANDBOX 
        ? data.sandbox_init_point 
        : data.init_point;
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao processar pagamento');
      
      if (onError && err instanceof Error) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se há um pagamento pendente ao montar o componente
  React.useEffect(() => {
    // Verificar se há um ngrok URL salvo
    const savedNgrokUrl = localStorage.getItem('ngrok_url');
    if (savedNgrokUrl) {
      setNgrokUrl(savedNgrokUrl);
    }
    
    // Verificar se há um pagamento pendente
    checkPaymentStatus();
  }, [ngrokUrl, lotteryType]);

  return (
    <div className="space-y-4">
      {serverStatus === 'offline' && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
          <p className="text-red-700">
            Servidor offline. Não é possível processar pagamentos no momento.
          </p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {ngrokUrl && (
        <div className="mb-2">
          <p className="text-sm text-gray-500">Usando Ngrok URL: {ngrokUrl}</p>
          <Button 
            onClick={() => setShowNgrokSetter(true)}
            variant="outline"
            className="text-xs py-1 mt-1"
          >
            Atualizar URL do Ngrok
          </Button>
        </div>
      )}
      
      {showNgrokSetter && (
        <NgrokUrlSetter 
          currentUrl={ngrokUrl} 
          onSave={updateNgrokUrl} 
        />
      )}
      
      <Button
        onClick={handlePayment}
        disabled={disabled || isLoading || hasPendingPayment}
        className={`w-full py-6 text-lg ${className}`}
        style={style}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            {label}
          </>
        )}
      </Button>
    </div>
  );
};

export default MercadoPagoButton;
