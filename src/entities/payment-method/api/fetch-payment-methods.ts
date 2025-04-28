import { goodokApi } from '@/shared/api/goodok-api';
import { PaymentMethod } from '../model/payment-method';

export function fetchPaymentMethods(): Promise<PaymentMethod[]> {
  return goodokApi.get('payment-methods').json();
}
