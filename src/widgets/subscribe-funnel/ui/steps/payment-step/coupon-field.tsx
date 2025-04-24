import { Controller, useFormContext } from 'react-hook-form';
import { Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useCoupons } from '@/entities/coupon';
import { SubscriptionSchema } from '@/entities/subscription';

const defaultCoupon = {
  id: 0,
  code: '',
  description: '쿠폰 사용 안 함',
  type: 'none',
  value: 0,
};

export default function CouponField() {
  const { control } = useFormContext<SubscriptionSchema>();

  const coupons = useCoupons();
  const couponOptions = [defaultCoupon, ...coupons];

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
      >
        쿠폰 선택
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="coupon-label">쿠폰</InputLabel>
        <Controller
          control={control}
          name="couponId"
          render={({ field }) => (
            <Select
              labelId="coupon-label"
              value={field.value}
              label="쿠폰"
              onChange={(e) => field.onChange(Number(e.target.value))}
            >
              {couponOptions.map((coupon) => (
                <MenuItem
                  key={coupon.id}
                  value={coupon.id}
                >
                  {coupon.description}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </>
  );
}
