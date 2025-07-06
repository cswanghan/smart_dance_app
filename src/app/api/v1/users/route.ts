import { NextResponse } from 'next/server';
import { User } from '@/types';

const allUsers: User[] = Array.from({ length: 15 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `用户 ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['user', 'admin', 'coach'][Math.floor(Math.random() * 3)],
  createdAt: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
}));

export async function GET(request: Request) {
  return NextResponse.json({ data: allUsers });
}
