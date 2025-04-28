import { usePlans } from '@/entities/plan';

export function useSelectedPlan(planId: string) {
  return usePlans().find((p) => p.id === planId);
}
