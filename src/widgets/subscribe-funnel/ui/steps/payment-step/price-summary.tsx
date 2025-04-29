import { isNotNil } from 'es-toolkit';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Divider, Stack } from '@mui/material';
import { usePlanPrice } from '../../../model/use-plan-price';
import { useSelectedCoupon } from '../../../model/use-selected-coupon';
import { useFinalPrice } from '../../../model/use-final-price';
import { PaymentStepSchema } from '.';

interface PriceSummaryProps {
  planId: string;
}

export default function PriceSummary({ planId }: PriceSummaryProps) {
  const { watch } = useFormContext<PaymentStepSchema>();
  const couponId = watch('couponId');

  const planPrice = usePlanPrice(planId);
  const selectedCoupon = useSelectedCoupon(couponId);
  const finalPrice = useFinalPrice(planId, couponId);

  return (
    <Box mt={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography color="text.secondary">원가</Typography>
        <Typography>{planPrice.toLocaleString()}원</Typography>
      </Stack>
      {isNotNil(selectedCoupon) && (
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography color="text.secondary">쿠폰 할인</Typography>
          <Typography color="error">
            -{' '}
            {selectedCoupon?.type === 'percentage'
              ? `${selectedCoupon.value}%`
              : `${selectedCoupon?.value?.toLocaleString()}원`}
          </Typography>
        </Stack>
      )}
      <Divider sx={{ my: 2 }} />
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          최종 결제 금액
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          {finalPrice.toLocaleString()}원
        </Typography>
      </Stack>
    </Box>
  );
}
