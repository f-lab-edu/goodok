import { usePlans } from '@/entities/plan';

export function usePlanPrice(planId: string) {
  const plans = usePlans();
  const plan = plans.find((p) => p.id === planId);

  return plan?.price ?? 0;
}
