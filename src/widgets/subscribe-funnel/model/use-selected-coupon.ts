import { useCoupons } from '@/entities/coupon';

export function useSelectedCoupon(couponId?: number) {
  return useCoupons().find((c) => c.id === couponId);
}
