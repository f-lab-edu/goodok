import { useFormContext } from 'react-hook-form';
import { Button, Box } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import { SubscriptionSchema } from '@/entities/subscription';
import ProfileField from './profile-field';

interface ProfileStepProps {
  onNext?: () => void;
}

const ProfileStep = ({ onNext }: ProfileStepProps) => {
  const { watch } = useFormContext<SubscriptionSchema>();

  const isValid = watch('name') && watch('email');

  return (
    <FunnelStep title="프로필 입력">
      <QueryBoundary>
        <ProfileField />
      </QueryBoundary>
      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={!isValid}
          onClick={onNext}
        >
          다음
        </Button>
      </Box>
    </FunnelStep>
  );
};

export default ProfileStep;
