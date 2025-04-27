import { isNil, isNotNil } from 'es-toolkit';
import { Button } from '@mui/material';
import { FunnelStep } from '@/shared/ui/funnel-step';
import { QueryBoundary } from '@/shared/ui/query-boundary';
import { SelectablePlanList } from '@/features/select-plan';
import { SubscribeFunnelSchema } from '../../model/subscribe-funnel-type';
import { useState } from 'react';

interface PlanStepProps {
  onNext?: (planId: SubscribeFunnelSchema['planId']) => void;
}

export default function PlanStep({ onNext }: PlanStepProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<SubscribeFunnelSchema['planId']>();

  const handleNext = () => {
    if (isNotNil(selectedPlanId)) {
      onNext?.(selectedPlanId);
    }
  };

  return (
    <FunnelStep title="구독 플랜 선택">
      <QueryBoundary>
        <SelectablePlanList
          value={selectedPlanId}
          onChange={setSelectedPlanId}
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
