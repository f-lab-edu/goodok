import { useFormContext } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import { SubscriptionSchema } from '@/entities/subscription';

export default function ProfileField() {
  const { register } = useFormContext<SubscriptionSchema>();

  return (
    <Stack spacing={2}>
      <TextField
        label="이름"
        fullWidth
        {...register('name')}
      />
      <TextField
        label="이메일"
        type="email"
        fullWidth
        {...register('email')}
      />
    </Stack>
  );
}
