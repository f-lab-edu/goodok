import { goodokApi } from '@/shared/api/goodok-api';
import { Plan } from '../model/plan';

export function fetchPlans(): Promise<Plan[]> {
  return goodokApi.get('subscriptions').json();
}
