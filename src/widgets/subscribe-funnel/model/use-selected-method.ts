import { usePaymentMethods } from '@/entities/payment-method';

export function useSelectedPaymentMethod(paymentMethodId: number) {
  return usePaymentMethods().find((p) => p.id === paymentMethodId);
}
