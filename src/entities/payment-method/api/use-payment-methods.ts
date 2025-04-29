import { useSuspenseQuery } from '@tanstack/react-query';
import { paymentMethodQueries } from './payment-method-queries';

export function usePaymentMethods() {
  const { data } = useSuspenseQuery(paymentMethodQueries.list());
  return data;
}
