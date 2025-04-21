import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface NgrokUrlSetterProps {
  currentUrl?: string | null;
  onSave: (url: string) => void;
}

const NgrokUrlSetter: React.FC<NgrokUrlSetterProps> = ({ 
  currentUrl,
  onSave
}) => {
  const [ngrokUrl, setNgrokUrl] = useState<string>(currentUrl || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Atualizar o URL quando a prop mudar
  useEffect(() => {
    if (currentUrl) {
      setNgrokUrl(currentUrl);
    }
  }, [currentUrl]);

  const validateUrl = (url: string): boolean => {
    // Verificar se o URL é válido
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleSave = async () => {
    // Resetar estados
    setError(null);
    setSuccess(false);
    
    // Validar URL
    if (!validateUrl(ngrokUrl)) {
      setError('URL inválido. Deve ser um URL completo (ex: https://abcd1234.ngrok.io)');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verificar se o URL está acessível
      await fetch(`${ngrokUrl}/api/status`, { 
        method: 'GET',
        mode: 'no-cors' // Usar no-cors para evitar problemas de CORS
      });
      
      // Chamar a função de callback com o URL
      onSave(ngrokUrl);
      setSuccess(true);
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.warn('Não foi possível verificar o URL, mas será salvo mesmo assim:', err);
      // Mesmo com erro, salvar o URL (pode ser que o servidor esteja offline)
      onSave(ngrokUrl);
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-2">Configurar URL do Ngrok</h3>
      <p className="text-sm text-gray-500 mb-4">
        Configure o URL do Ngrok para receber notificações de pagamento em ambiente de desenvolvimento.
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="ngrok-url" className="block text-sm font-medium text-gray-700 mb-1">
            URL do Ngrok
          </label>
          <Input
            id="ngrok-url"
            type="text"
            value={ngrokUrl}
            onChange={(e) => setNgrokUrl(e.target.value)}
            placeholder="https://abcd1234.ngrok.io"
            className="w-full"
          />
          {error && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center mt-1 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              URL salvo com sucesso!
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setNgrokUrl(currentUrl || '')}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !ngrokUrl}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NgrokUrlSetter;
