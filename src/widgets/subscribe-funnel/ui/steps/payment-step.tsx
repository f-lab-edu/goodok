import {
  Box,
  Button,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useState, useMemo } from 'react';

// 예시 데이터
const mockCards = [
  { id: 'card_1', label: '국민카드 **** 1234' },
  { id: 'card_2', label: '현대카드 **** 5678' },
];

const mockCoupons = [
  { id: 'none', label: '쿠폰 사용 안 함', type: 'none' },
  { id: 'coupon_percent', label: '10% 할인 쿠폰', type: 'percent', amount: 10 },
  { id: 'coupon_fixed', label: '₩3,000 할인 쿠폰', type: 'fixed', amount: 3000 },
];

const PLAN_PRICE = 9900; // 원가 기준

type PaymentStepProps = {
  onNext?: (data: { cardId: string; couponId: string; finalPrice: number }) => void;
};

const PaymentStep = ({ onNext }: PaymentStepProps) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedCouponId, setSelectedCouponId] = useState<string>('none');

  const selectedCoupon = useMemo(() => mockCoupons.find((c) => c.id === selectedCouponId), [selectedCouponId]);

  const finalPrice = useMemo(() => {
    if (selectedCoupon?.type === 'percent') {
      return Math.max(0, PLAN_PRICE * (1 - (selectedCoupon.amount ?? 0) / 100));
    }
    if (selectedCoupon?.type === 'fixed') {
      return Math.max(0, PLAN_PRICE - (selectedCoupon.amount ?? 0));
    }
    return PLAN_PRICE;
  }, [selectedCoupon]);

  return (
    <Container
      maxWidth="xs"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        결제 수단 선택
      </Typography>

      <RadioGroup
        value={selectedCard}
        onChange={(e) => setSelectedCard(e.target.value)}
      >
        {mockCards.map((card) => (
          <FormControlLabel
            key={card.id}
            value={card.id}
            control={<Radio />}
            label={card.label}
          />
        ))}
      </RadioGroup>

      <Box mt={3}>
        <Button
          variant="outlined"
          fullWidth
        >
          새 카드 등록
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
      >
        쿠폰 선택
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="coupon-label">쿠폰</InputLabel>
        <Select
          labelId="coupon-label"
          value={selectedCouponId}
          label="쿠폰"
          onChange={(e) => setSelectedCouponId(e.target.value)}
        >
          {mockCoupons.map((coupon) => (
            <MenuItem
              key={coupon.id}
              value={coupon.id}
            >
              {coupon.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography color="text.secondary">원가</Typography>
          <Typography>{PLAN_PRICE.toLocaleString()}원</Typography>
        </Stack>
        {selectedCoupon?.type !== 'none' && (
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography color="text.secondary">쿠폰 할인</Typography>
            <Typography color="error">
              -{' '}
              {selectedCoupon?.type === 'percent'
                ? `${selectedCoupon.amount}%`
                : `${selectedCoupon?.amount?.toLocaleString()}원`}
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

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 4 }}
        disabled={!selectedCard}
        onClick={() =>
          onNext?.({
            cardId: selectedCard!,
            couponId: selectedCouponId,
            finalPrice,
          })
        }
      >
        다음
      </Button>
    </Container>
  );
};

export default PaymentStep;
