import { useSuspenseQuery } from '@tanstack/react-query';
import { planQueries } from './plan-queries';

export function usePlans() {
  const { data } = useSuspenseQuery(planQueries.list());
  return data;
}
