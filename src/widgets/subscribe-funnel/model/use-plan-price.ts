import { usePlans } from '@/entities/plan';

export function usePlanPrice(planId: string) {
  return usePlans().find((p) => p.id === planId)?.price ?? 0;
}
