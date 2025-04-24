import { useFormContext } from 'react-hook-form';
import { Button, Typography, Divider, Card, CardContent, Stack } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { useCoupons } from '@/entities/coupon';
import { usePaymentMethods } from '@/entities/payment-method';
import { usePlans } from '@/entities/plan';
import { SubscriptionSchema } from '@/entities/subscription';
import { useFinalPrice } from '../../../model/use-final-price';
import { usePlanPrice } from '../../../model/use-plan-price';

const CheckoutStep = () => {
  const { getValues } = useFormContext<SubscriptionSchema>();

  const { planId, name, email, paymentMethodId, couponId } = getValues();

  const plans = usePlans();

  const coupons = useCoupons();

  const paymentMethods = usePaymentMethods();

  const plan = plans.find((plan) => plan.id === planId);
  const coupon = coupons.find((coupon) => coupon.id === couponId);
  const paymentMethod = paymentMethods.find((paymentMethod) => paymentMethod.id === paymentMethodId);

  const data = {
    planName: plan?.name,
    planPrice: plan?.price,
    profile: { name, email },
    cardLabel: paymentMethod?.brand,
    couponLabel: coupon?.description,
    couponDiscount: coupon?.value,
  };

  const planPrice = usePlanPrice();
  const finalPrice = useFinalPrice();

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
            {data.planName} ({planPrice.toLocaleString()}원)
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
          <Typography>{data.profile.name}</Typography>
          <Typography color="text.secondary">{data.profile.email}</Typography>
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
          <Typography>{data.cardLabel}</Typography>
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
            {data.couponLabel || '사용 안 함'}
            {data.couponDiscount ? ` (-${data.couponDiscount.toLocaleString()}원)` : ''}
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
      >
        구독 완료
      </Button>
    </FunnelStep>
  );
};

export default CheckoutStep;
