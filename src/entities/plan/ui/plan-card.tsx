import { Typography, Card, CardActionArea, CardContent } from '@mui/material';
import { Plan } from '../model/plan';

interface PlanCardProps {
  plan: Plan;
  selected?: boolean;
  onClick?: () => void;
}
export default function PlanCard({ plan, selected, onClick }: PlanCardProps) {
  return (
    <Card
      key={plan.id}
      variant={selected ? 'outlined' : 'elevation'}
      sx={{
        borderColor: selected ? 'primary.main' : 'grey.300',
        borderWidth: 2,
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
          >
            {plan.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {plan.description}
          </Typography>
          <Typography
            variant="body1"
            mt={1}
          >
            ₩{plan.price.toLocaleString()} / 월
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
