import { Plan } from '@/entities/plan';

type PlanStep = { plan?: Plan };

export type SubscribeFunnelType = {
  plan: PlanStep;
};
