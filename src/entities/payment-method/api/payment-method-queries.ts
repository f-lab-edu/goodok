import { queryOptions } from '@tanstack/react-query';
import { fetchPaymentMethods } from './fetch-payment-methods';

export const paymentMethodQueries = {
  all: () => ['payment-methods'],
  list: () =>
    queryOptions({
      queryKey: [...paymentMethodQueries.all(), 'list'],
      queryFn: fetchPaymentMethods,
    }),
};
