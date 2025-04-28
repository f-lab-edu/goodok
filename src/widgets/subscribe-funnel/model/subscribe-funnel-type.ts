import { z } from 'zod';

export const subscribeFunnelSchema = z.object({
  planId: z.string(),
  profile: z.object({
    name: z.string(),
    email: z.string(),
  }),
  payment: z.object({
    paymentMethodId: z.number(),
    couponId: z.number().optional(),
  }),
});

export type SubscribeFunnelSchema = z.infer<typeof subscribeFunnelSchema>;

export const planStepSchema = subscribeFunnelSchema.partial();

export const subscribeFunnelSteps = {
  plan: { parse: planStepSchema.parse },
};
