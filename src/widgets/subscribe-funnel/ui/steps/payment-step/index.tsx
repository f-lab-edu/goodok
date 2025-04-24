import { useFormContext } from 'react-hook-form';
import { Button, Divider } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import { SubscriptionSchema } from '@/entities/subscription';
import PaymentMethodField from './payment-method-field';
import CouponField from './coupon-field';
import PriceSummary from './price-summary';

type PaymentStepProps = {
  onNext?: () => void;
};

const PaymentStep = ({ onNext }: PaymentStepProps) => {
  const { watch } = useFormContext<SubscriptionSchema>();

  const paymentMethodId = watch('paymentMethodId');

  return (
    <FunnelStep title="결제 수단 선택">
      <QueryBoundary>
        <PaymentMethodField />
        <Divider sx={{ my: 4 }} />
        <CouponField />
        <PriceSummary />
      </QueryBoundary>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 4 }}
        disabled={paymentMethodId === 0}
        onClick={onNext}
      >
        다음
      </Button>
    </FunnelStep>
  );
};

export default PaymentStep;
