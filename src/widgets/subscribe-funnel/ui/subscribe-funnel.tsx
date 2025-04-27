import { useFunnel } from '@use-funnel/next';
import { subscribeFunnelSteps } from '../model/subscribe-funnel-type';
import PlanStep from './steps/plan-step';
import ProfileStep from './steps/profile-step';
import PaymentStep from './steps/payment-step';
import CheckoutStep from './steps/checkout-step';
import { OverlayProvider } from 'overlay-kit';

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
    <OverlayProvider>
      <funnel.Render
        plan={({ history }) => <PlanStep onNext={(planId) => history.push('profile', { planId })} />}
        profile={({ history }) => <ProfileStep onNext={(profile) => history.push('payment', { profile })} />}
        payment={({ context, history }) => (
          <PaymentStep
            planId={context.planId}
            onNext={(payment) => history.push('checkout', { payment })}
          />
        )}
        checkout={({ context }) => <CheckoutStep subscription={context} />}
      />
    </OverlayProvider>
  );
}
