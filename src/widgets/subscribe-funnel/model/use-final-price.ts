import { isNotNil } from 'es-toolkit';
import { useSelectedPlanPrice } from './use-plan-price';
import { useSelectedCoupon } from './use-selected-coupon';

export function useFinalPrice(planId: string, couponId?: number) {
  const planPrice = useSelectedPlanPrice(planId);
  const selectedCoupon = useSelectedCoupon(couponId);

  if (isNotNil(selectedCoupon)) {
    if (selectedCoupon.type === 'percentage') return Math.max(0, planPrice * (1 - selectedCoupon.value / 100));
    if (selectedCoupon.type === 'fixed') return Math.max(0, planPrice - selectedCoupon.value);
  }

  return planPrice;
}
