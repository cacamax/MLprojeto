import { ReactNode } from 'react';

export interface PaymentData {
  title: string;
  price: number;
  description?: string;
  lotteryType?: string;
  quantity?: number;
  buyerEmail?: string;
  [key: string]: any;
}

export interface MercadoPagoButtonProps {
  preferenceId?: string;
  onSuccess?: (prefId: string) => void;
  onError?: (error: any) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  createPreference?: boolean;
  paymentData?: PaymentData;
  style?: React.CSSProperties;
  lotteryType?: string;
}

declare const MercadoPagoButton: React.FC<MercadoPagoButtonProps>;

export default MercadoPagoButton;
