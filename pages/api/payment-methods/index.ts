import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

const dataFilePath = path.join(process.cwd(), 'data', 'payment-methods.json');

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
}

// 간단한 인메모리 락 (동시성 문제 완화 목적)
let isWriting = false;

async function readPaymentMethods() {
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

async function writePaymentMethods(data: PaymentMethod[]) {
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
  if (req.method === 'GET') {
    try {
      const paymentMethods = await readPaymentMethods();
      res.status(200).json(paymentMethods);
    } catch (error) {
      console.error('Error reading payment methods:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const newPaymentMethod = req.body;
      // 간단한 유효성 검사 (실제로는 더 상세해야 함)
      if (
        !newPaymentMethod ||
        typeof newPaymentMethod !== 'object' ||
        !newPaymentMethod.cardNumber ||
        !newPaymentMethod.cardHolderName
      ) {
        return res.status(400).json({ message: 'Invalid payment method data' });
      }

      const currentMethods = await readPaymentMethods();
      // 간단한 ID 생성
      const newId = currentMethods.length > 0 ? Math.max(...currentMethods.map((m: PaymentMethod) => m.id)) + 1 : 1;
      const methodToAdd = { ...newPaymentMethod, id: newId };

      // 카드 번호 중복 확인 (선택 사항)
      if (currentMethods.some((m: PaymentMethod) => m.last4 === methodToAdd.last4)) {
        return res.status(409).json({ message: 'Payment method already exists' });
      }

      currentMethods.push(methodToAdd);
      await writePaymentMethods(currentMethods);
      res.status(201).json(methodToAdd);
    } catch (error) {
      console.error('Error writing payment methods:', error);
      if (error instanceof Error && error.message.includes('Concurrent write attempt blocked')) {
        res.status(429).json({ message: 'Too Many Requests, please try again shortly.' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
