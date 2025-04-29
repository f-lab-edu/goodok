import ky from 'ky';
import { isServer } from '@tanstack/react-query';

export const goodokApi = ky.create({
  prefixUrl: isServer ? 'http://localhost:3000/api' : '/api',
});
