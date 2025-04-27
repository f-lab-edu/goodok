import { FormProvider, useForm } from 'react-hook-form';
import { Button, Divider } from '@mui/material';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import PaymentMethodField from './payment-method-field';
import CouponField from './coupon-field';
import PriceSummary from './price-summary';
import { subscribeFunnelSchema } from '../../../model/subscribe-funnel-type';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunnelStep } from '@/shared/ui/funnel-step';

const paymentSchema = subscribeFunnelSchema.shape.payment;

export type PaymentStepSchema = z.infer<typeof paymentSchema>;

type PaymentStepProps = {
  planId: string;
  onNext?: (payment: PaymentStepSchema) => void;
};

const PaymentStep = ({ planId, onNext }: PaymentStepProps) => {
  const methods = useForm<PaymentStepSchema>({
    resolver: zodResolver(paymentSchema),
    mode: 'onChange',
    defaultValues: {
      paymentMethodId: 0,
      couponId: 0,
    },
  });

  const onSubmit = (data: PaymentStepSchema) => {
    onNext?.(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FunnelStep title="결제 수단 선택">
          <QueryBoundary>
            <PaymentMethodField />
            <Divider sx={{ my: 4 }} />
            <CouponField />
            <PriceSummary
              planId={planId}
              couponId={methods.watch('couponId')}
            />
          </QueryBoundary>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 4 }}
            disabled={!methods.formState.isValid}
            type="submit"
          >
            다음
          </Button>
        </FunnelStep>
      </form>
    </FormProvider>
  );
};

export default PaymentStep;
