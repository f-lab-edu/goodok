import { useSuspenseQuery } from '@tanstack/react-query';
import { couponQueries } from './coupon-queries';

export function useCoupons() {
  const { data } = useSuspenseQuery(couponQueries.list());
  return data;
}
