import { useCoupons } from '@/entities/coupon';

export function useSelectedCoupon(couponId?: number) {
  const coupons = useCoupons();

  return coupons.find((c) => c.id === couponId);
}
