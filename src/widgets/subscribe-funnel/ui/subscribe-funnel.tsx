import { FormProvider, useForm } from 'react-hook-form';
import { useFunnel } from '@use-funnel/next';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscriptionSchema, SubscriptionSchema } from '@/entities/subscription';
import { fetchCurrentUser } from '@/entities/user';
import { SubscribeFunnelType } from '../model/subscribe-funnel-type';
import PlanStep from './steps/plan-step';
import ProfileStep from './steps/profile-step';
import PaymentStep from './steps/payment-step';
import CheckoutStep from './steps/checkout-step';

async function defaultValues(): Promise<SubscriptionSchema> {
  const user = await fetchCurrentUser();

  return {
    name: user.name,
    email: user.email,
    planId: '',
    paymentMethodId: 0,
    couponId: 0,
  };
}

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
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <funnel.Render
        plan={({ history }) => <PlanStep onNext={() => history.push('profile')} />}
        profile={({ history }) => <ProfileStep onNext={() => history.push('payment')} />}
        payment={({ history }) => <PaymentStep onNext={() => history.push('checkout')} />}
        checkout={() => <CheckoutStep />}
      />
    </FormProvider>
  );
}
