import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

const dataFilePath = path.join(process.cwd(), 'data', 'user.json');

interface User {
  name: string;
  email: string;
}

// 간단한 인메모리 락 (동시성 문제 완화 목적)
let isWriting = false;

async function readUser() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return {}; // 파일 없으면 빈 객체 반환
    }
    throw error; // 다른 에러는 다시 던짐
  }
}

async function writeUser(data: User) {
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
      const user = await readUser();
      res.status(200).json(user);
    } catch (error) {
      console.error('Error reading user data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedUserData = req.body;
      // 간단한 유효성 검사
      if (!updatedUserData || typeof updatedUserData !== 'object') {
        return res.status(400).json({ message: 'Invalid user data' });
      }

      // 기존 데이터를 읽어와서 업데이트 (파일 전체를 덮어쓰므로)
      const currentUserData = await readUser();
      const newUser = { ...currentUserData, ...updatedUserData };

      await writeUser(newUser);
      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error writing user data:', error);
      if (error instanceof Error && error.message.includes('Concurrent write attempt blocked')) {
        res.status(429).json({ message: 'Too Many Requests, please try again shortly.' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
