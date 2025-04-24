import { z } from 'zod';

export const subscriptionSchema = z.object({
  planId: z.string(),
  name: z.string(),
  email: z.string(),
  paymentMethodId: z.number(),
  couponId: z.number().optional(),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
