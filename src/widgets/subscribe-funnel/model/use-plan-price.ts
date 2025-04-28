import { useSelectedPlan } from './use-selected-plan';

export function useSelectedPlanPrice(planId: string) {
  return useSelectedPlan(planId)?.price ?? 0;
}
