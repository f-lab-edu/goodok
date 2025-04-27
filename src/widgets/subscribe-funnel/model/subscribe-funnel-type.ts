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

export const planSchema = subscribeFunnelSchema.partial();
export const profileSchema = planSchema.required({ planId: true });
export const paymentSchema = profileSchema.required({ profile: true });
export const checkoutSchema = paymentSchema.required({ payment: true });

export const subscribeFunnelSteps = {
  plan: { parse: planSchema.parse },
  profile: { parse: profileSchema.parse },
  payment: { parse: paymentSchema.parse },
  checkout: { parse: checkoutSchema.parse },
};
