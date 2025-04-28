import { useFunnel } from '@use-funnel/next';
import { subscribeFunnelSteps } from '../model/subscribe-funnel-type';
import PlanStep from './steps/plan-step';
import ProfileStep from './steps/profile-step';

export default function SubscribeFunnel() {
  const funnel = useFunnel({
    id: 'subscribe-funnel',
    steps: subscribeFunnelSteps,
    initial: {
      step: 'plan',
      context: {},
    },
  });

  return (
    <funnel.Render
      plan={({ history }) => <PlanStep onNext={(planId) => history.push('profile', { planId })} />}
      profile={() => <ProfileStep />}
    />
  );
}
