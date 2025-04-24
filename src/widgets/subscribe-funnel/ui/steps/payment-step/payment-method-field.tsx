import { Controller, useFormContext } from 'react-hook-form';
import { Box, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { usePaymentMethods } from '@/entities/payment-method';
import { SubscriptionSchema } from '@/entities/subscription';

export default function PaymentMethodField() {
  const { control } = useFormContext<SubscriptionSchema>();

  const paymentMethods = usePaymentMethods();

  return (
    <>
      <Controller
        control={control}
        name="paymentMethodId"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
          >
            {paymentMethods.map((card) => (
              <FormControlLabel
                key={card.id}
                value={card.id}
                control={<Radio />}
                label={`${card.brand} **** ${card.last4}`}
              />
            ))}
          </RadioGroup>
        )}
      />
      <Box mt={3}>
        <Button
          variant="outlined"
          fullWidth
        >
          새 카드 등록
        </Button>
      </Box>
    </>
  );
}
