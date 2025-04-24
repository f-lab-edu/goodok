import { FormProvider, useForm } from 'react-hook-form';
import { useFunnel } from '@use-funnel/next';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscriptionSchema, SubscriptionSchema } from '@/entities/subscription';
import { SubscribeFunnelType } from '../model/subscribe-funnel-type';
import PlanStep from './steps/plan-step';

export default function SubscribeFunnel() {
  const funnel = useFunnel<SubscribeFunnelType>({
    id: 'subscribe-funnel',
    initial: {
      step: 'plan',
      context: {},
    },
  });

  const methods = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
  });

  return (
    <FormProvider {...methods}>
      <funnel.Render plan={() => <PlanStep />} />
    </FormProvider>
  );
}
