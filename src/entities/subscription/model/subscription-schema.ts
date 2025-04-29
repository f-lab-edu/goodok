import { z } from 'zod';

export const subscriptionSchema = z.object({
  planId: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  paymentMethodId: z.number().min(1),
  couponId: z.number().optional(),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
