import { Button, Typography, Divider, Card, CardContent, Stack } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { useCheckout } from '@/entities/subscription';
import { useFinalPrice } from '../../../model/use-final-price';
import { useSelectedPlanPrice } from '../../../model/use-plan-price';
import { SubscribeFunnelSchema } from '../../../model/subscribe-funnel-type';
import { useSelectedPlan } from '../../../model/use-selected-plan';
import { useSelectedCoupon } from '../../../model/use-selected-coupon';
import { useSelectedPaymentMethod } from '../../../model/use-selected-method';

interface CheckoutStepProps {
  subscription: SubscribeFunnelSchema;
}

const CheckoutStep = ({ subscription }: CheckoutStepProps) => {
  const {
    planId,
    profile: { name, email },
    payment: { paymentMethodId, couponId },
  } = subscription;

  const plan = useSelectedPlan(planId);
  const planName = plan?.name;
  const planPrice = useSelectedPlanPrice(planId);

  const coupon = useSelectedCoupon(couponId);
  const couponLabel = coupon?.description;
  const couponDiscount = coupon?.value;

  const paymentMethod = useSelectedPaymentMethod(paymentMethodId);
  const cardLabel = paymentMethod?.brand;

  const finalPrice = useFinalPrice(planId, couponId);

  const { checkout } = useCheckout();

  const handleCheckout = () => {
    checkout({ planId, name, email, paymentMethodId, couponId });
  };

  return (
    <FunnelStep title="최종 확인">
      <Card
        variant="outlined"
        sx={{ mb: 3 }}
      >
        <CardContent>
          <Typography
            variant="subtitle2"
            gutterBottom
          >
            선택한 플랜
          </Typography>
          <Typography
            variant="body1"
            fontWeight="medium"
          >
            {planName} ({planPrice.toLocaleString()}원)
          </Typography>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        sx={{ mb: 3 }}
      >
        <CardContent>
          <Typography
            variant="subtitle2"
            gutterBottom
          >
            프로필 정보
          </Typography>
          <Typography>{name}</Typography>
          <Typography color="text.secondary">{email}</Typography>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        sx={{ mb: 3 }}
      >
        <CardContent>
          <Typography
            variant="subtitle2"
            gutterBottom
          >
            결제 수단
          </Typography>
          <Typography>{cardLabel}</Typography>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        sx={{ mb: 3 }}
      >
        <CardContent>
          <Typography
            variant="subtitle2"
            gutterBottom
          >
            쿠폰
          </Typography>
          <Typography>
            {couponLabel || '사용 안 함'}
            {couponDiscount ? ` (-${couponDiscount.toLocaleString()}원)` : ''}
          </Typography>
        </CardContent>
      </Card>

      <Divider sx={{ my: 2 }} />

      <Stack
        direction="row"
        justifyContent="space-between"
        mb={1}
      >
        <Typography color="text.secondary">결제 예정 금액</Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {finalPrice.toLocaleString()}원
        </Typography>
      </Stack>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleCheckout}
      >
        구독 완료
      </Button>
    </FunnelStep>
  );
};

export default CheckoutStep;
