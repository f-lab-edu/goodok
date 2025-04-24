import { useFormContext } from 'react-hook-form';
import { useCoupons } from '@/entities/coupon';
import { SubscriptionSchema } from '@/entities/subscription';

export function useSelectedCoupon() {
  const { watch } = useFormContext<SubscriptionSchema>();

  const coupons = useCoupons();
  const couponId = watch('couponId');

  return coupons.find((c) => c.id === couponId);
}
