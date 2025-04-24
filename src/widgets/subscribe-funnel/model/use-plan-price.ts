import { useFormContext } from 'react-hook-form';
import { SubscriptionSchema } from '@/entities/subscription';
import { usePlans } from '@/entities/plan';

export function usePlanPrice() {
  const { watch } = useFormContext<SubscriptionSchema>();

  const plans = usePlans();
  const planId = watch('planId');
  const plan = plans.find((p) => p.id === planId);

  return plan?.price ?? 0;
}
