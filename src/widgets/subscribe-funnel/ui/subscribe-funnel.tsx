import { useFunnel } from '@use-funnel/next';
import { subscribeFunnelSteps } from '../model/subscribe-funnel-type';
import PlanStep from './steps/plan-step';

export default function SubscribeFunnel() {
  const funnel = useFunnel({
    id: 'subscribe-funnel',
    steps: subscribeFunnelSteps,
    initial: {
      step: 'plan',
      context: {},
    },
  });

  return <funnel.Render plan={() => <PlanStep />} />;
}
