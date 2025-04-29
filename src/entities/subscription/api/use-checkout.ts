import { useMutation } from '@tanstack/react-query';
import { checkout } from './checkout';

export function useCheckout() {
  const { mutate } = useMutation({ mutationFn: checkout });

  return { checkout: mutate };
}
