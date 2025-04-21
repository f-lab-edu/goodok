import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

const dataFilePath = path.join(process.cwd(), 'data', 'coupons.json');

interface Coupon {
  id: number;
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
}

// 간단한 인메모리 락 (동시성 문제 완화 목적)
let isWriting = false;

async function readCoupons() {
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

async function writeCoupons(data: Coupon[]) {
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
      const coupons = await readCoupons();
      res.status(200).json(coupons);
    } catch (error) {
      console.error('Error reading coupons:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const newCoupon = req.body;
      // 간단한 유효성 검사
      if (!newCoupon || typeof newCoupon !== 'object' || !newCoupon.code || !newCoupon.description) {
        return res.status(400).json({ message: 'Invalid coupon data' });
      }

      const currentCoupons = await readCoupons();
      // 간단한 ID 생성
      const newId = currentCoupons.length > 0 ? Math.max(...currentCoupons.map((c: Coupon) => c.id)) + 1 : 1;
      const couponToAdd = { ...newCoupon, id: newId };

      // 쿠폰 코드 중복 확인 (선택 사항)
      if (currentCoupons.some((c: Coupon) => c.code === couponToAdd.code)) {
        return res.status(409).json({ message: 'Coupon code already exists' });
      }

      currentCoupons.push(couponToAdd);
      await writeCoupons(currentCoupons);
      res.status(201).json(couponToAdd);
    } catch (error) {
      console.error('Error writing coupons:', error);
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
