import { Plan } from './plan';

const PLANS: Plan[] = [
  {
    id: 'freemium',
    name: '체험판',
    price: 0,
    description: '간단한 기능만 사용 가능해요.',
  },
  {
    id: 'basic',
    name: '베이직 플랜',
    price: 4900,
    description: '일반적인 구독 기능을 제공합니다.',
  },
  {
    id: 'premium',
    name: '프리미엄 플랜',
    price: 9900,
    description: '모든 기능과 쿠폰 혜택을 포함해요.',
  },
];

export function usePlans() {
  return PLANS;
}
