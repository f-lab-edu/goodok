import { queryOptions } from '@tanstack/react-query';
import { fetchPlans } from './fetch-plans';

export const planQueries = {
  all: () => ['plans'],
  list: () =>
    queryOptions({
      queryKey: [...planQueries.all(), 'list'],
      queryFn: fetchPlans,
    }),
};
