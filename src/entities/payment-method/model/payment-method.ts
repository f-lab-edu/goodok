export interface PaymentMethod {
  id: number;
  type: 'card';
  last4: string;
  brand: string;
}
