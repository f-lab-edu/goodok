import { queryOptions } from '@tanstack/react-query';
import { fetchCoupons } from './fetch-coupons';

export const couponQueries = {
  all: () => ['coupons'],
  list: () =>
    queryOptions({
      queryKey: [...couponQueries.all(), 'list'],
      queryFn: fetchCoupons,
    }),
};
