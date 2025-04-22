import { Button, Container, Typography, Divider, Card, CardContent, Stack } from '@mui/material';

type CheckoutData = {
  planName: string;
  planPrice: number;
  profile: {
    name: string;
    email: string;
  };
  cardLabel: string;
  couponLabel?: string;
  couponDiscount?: number; // 할인 금액
  finalPrice: number;
};

type CheckoutStepProps = {
  data?: CheckoutData;
  onSubmit?: () => void;
};

const CheckoutStep = ({
  data = {
    planName: 'Premium',
    planPrice: 9900,
    profile: { name: '홍길동', email: 'gil@example.com' },
    cardLabel: '국민카드 **** 1234',
    couponLabel: '10% 할인 쿠폰',
    couponDiscount: 990,
    finalPrice: 8910,
  },
  onSubmit,
}: CheckoutStepProps) => {
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
        최종 확인
      </Typography>

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
            {data.planName} ({data.planPrice.toLocaleString()}원)
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
          {data.finalPrice.toLocaleString()}원
        </Typography>
      </Stack>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={onSubmit}
      >
        구독 완료
      </Button>
    </Container>
  );
};

export default CheckoutStep;
