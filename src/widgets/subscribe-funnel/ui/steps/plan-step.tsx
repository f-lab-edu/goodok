import { useState } from 'react';
import { isNil, isNotNil } from 'es-toolkit';
import { Button, Stack } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { Plan, PlanCard, usePlans } from '@/entities/plan';

interface PlanStepProps {
  onNext?: (plan: Plan) => void;
}

export default function PlanStep({ onNext }: PlanStepProps) {
  const plans = usePlans();

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleNext = () => {
    if (isNotNil(selectedPlan)) {
      onNext?.(selectedPlan);
    }
  };

  return (
    <FunnelStep title="구독 플랜 선택">
      <Stack spacing={2}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selectedPlan?.id === plan.id}
            onClick={() => setSelectedPlan(plan)}
          />
        ))}
      </Stack>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 4 }}
        disabled={isNil(selectedPlan)}
        onClick={handleNext}
      >
        다음
      </Button>
    </FunnelStep>
  );
}
