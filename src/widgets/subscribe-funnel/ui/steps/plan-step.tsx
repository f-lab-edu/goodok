import { isNil, isNotNil } from 'es-toolkit';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import { SelectablePlanList } from '@/features/select-plan';
import { SubscriptionSchema } from '@/entities/subscription';

interface PlanStepProps {
  onNext?: () => void;
}

export default function PlanStep({ onNext }: PlanStepProps) {
  const { control, watch } = useFormContext<SubscriptionSchema>();

  const selectedPlanId = watch('planId');

  const handleNext = () => {
    if (isNotNil(selectedPlanId)) {
      onNext?.();
    }
  };

  return (
    <FunnelStep title="구독 플랜 선택">
      <QueryBoundary>
        <Controller
          control={control}
          name="planId"
          render={({ field }) => <SelectablePlanList {...field} />}
        />
      </QueryBoundary>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 4 }}
        disabled={isNil(selectedPlanId)}
        onClick={handleNext}
      >
        다음
      </Button>
    </FunnelStep>
  );
}
