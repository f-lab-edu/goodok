import { goodokApi } from '@/shared/api/goodok-api';

interface CheckoutParams {
  planId: string;
  name: string;
  email: string;
  paymentMethodId: number;
  couponId?: number;
}

export function checkout({ planId, name, email, paymentMethodId, couponId }: CheckoutParams) {
  console.log('checkout', planId, name, email, paymentMethodId, couponId);

  return goodokApi.post('subscriptions/checkout', {
    json: {
      planId,
      name,
      email,
      paymentMethodId,
      couponId,
    },
  });
}
