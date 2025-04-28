import { goodokApi } from '@/shared/api/goodok-api';
import { User } from '../model/user';

export function fetchCurrentUser(): Promise<User> {
  return goodokApi.get('user').json();
}
