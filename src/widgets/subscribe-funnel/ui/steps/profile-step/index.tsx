import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Box, Stack, TextField } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { fetchCurrentUser } from '@/entities/user';
import { subscribeFunnelSchema } from '../../../model/subscribe-funnel-type';

const profileSchema = subscribeFunnelSchema.shape.profile;

type ProfileStepSchema = z.infer<typeof profileSchema>;

async function defaultValues(): Promise<ProfileStepSchema> {
  return fetchCurrentUser();
}

interface ProfileStepProps {
  onNext?: (profile: ProfileStepSchema) => void;
}

const ProfileStep = ({ onNext }: ProfileStepProps) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<ProfileStepSchema>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit = (data: ProfileStepSchema) => {
    onNext?.(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FunnelStep title="프로필 입력">
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
        <Box mt={4}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={!isValid}
          >
            다음
          </Button>
        </Box>
      </FunnelStep>
    </form>
  );
};

export default ProfileStep;
