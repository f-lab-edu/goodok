import { useMemo } from 'react';
import { isNotNil } from 'es-toolkit';
import { usePlanPrice } from './use-plan-price';
import { useSelectedCoupon } from './use-selected-coupon';

export function useFinalPrice() {
  const planPrice = usePlanPrice();
  const selectedCoupon = useSelectedCoupon();

  return useMemo(() => {
    if (isNotNil(selectedCoupon)) {
      if (selectedCoupon.type === 'percentage') return Math.max(0, planPrice * (1 - selectedCoupon.value / 100));
      if (selectedCoupon.type === 'fixed') return Math.max(0, planPrice - selectedCoupon.value);
    }
    return planPrice;
  }, [planPrice, selectedCoupon]);
}
