export interface Coupon {
  id: number;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
}
