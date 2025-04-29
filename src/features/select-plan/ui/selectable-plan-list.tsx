import { Stack } from '@mui/material';
import { Plan, PlanCard, usePlans } from '@/entities/plan';

interface SelectablePlanListProps {
  value?: Plan['id'];
  onChange?: (value: Plan['id']) => void;
}

export default function SelectablePlanList({ value, onChange }: SelectablePlanListProps) {
  const plans = usePlans();

  return (
    <Stack spacing={2}>
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          plan={plan}
          selected={value === plan.id}
          onClick={() => onChange?.(plan.id)}
        />
      ))}
    </Stack>
  );
}
