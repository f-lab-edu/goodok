import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

const dataFilePath = path.join(process.cwd(), 'data', 'subscriptions.json');

interface Subscription {
  id: number;
  planId: string;
  userId: string;
  paymentMethodId: number;
  couponCode: string;
  createdAt: string;
}

// 간단한 인메모리 락 (동시성 문제 완화 목적)
let isWriting = false;

async function readSubscriptions() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // 파일 없으면 빈 배열 반환
    }
    throw error; // 다른 에러는 다시 던짐
  }
}

async function writeSubscriptions(data: Subscription[]) {
  if (isWriting) {
    throw new Error('Concurrent write attempt blocked');
  }
  isWriting = true;
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
  } finally {
    isWriting = false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const checkoutData = req.body;
      console.log('Checkout data received:', checkoutData);

      // 간단한 유효성 검사 (필요에 따라 확장)
      if (!checkoutData || typeof checkoutData !== 'object' || !checkoutData.planId) {
        return res.status(400).json({ message: 'Invalid checkout data' });
      }

      const currentSubscriptions = await readSubscriptions();

      // 간단한 ID 생성
      const newId =
        currentSubscriptions.length > 0 ? Math.max(...currentSubscriptions.map((s: Subscription) => s.id)) + 1 : 1;
      const newSubscription = { ...checkoutData, id: newId, createdAt: new Date().toISOString() };

      currentSubscriptions.push(newSubscription);
      await writeSubscriptions(currentSubscriptions);

      res.status(201).json({ message: 'Subscription successful!', data: newSubscription });
    } catch (error) {
      console.error('Checkout error:', error);
      if (error instanceof Error && error.message.includes('Concurrent write attempt blocked')) {
        res.status(429).json({ message: 'Too Many Requests, please try again shortly.' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
