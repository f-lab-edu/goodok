import { z } from 'zod';

export const subscriptionSchema = z.object({
  planId: z.string(),
  name: z.string(),
  email: z.string(),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
