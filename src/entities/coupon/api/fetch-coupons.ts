import { goodokApi } from '@/shared/api/goodok-api';
import { Coupon } from '../model/coupon';

export function fetchCoupons(): Promise<Coupon[]> {
  return goodokApi.get('coupons').json();
}
