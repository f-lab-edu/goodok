import { useFunnel } from '@use-funnel/next';
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

  return <funnel.Render plan={() => <PlanStep />} />;
}
