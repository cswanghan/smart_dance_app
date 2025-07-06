import { NextResponse } from 'next/server';
import { Order } from '@/types';

const allOrders: Order[] = Array.from({ length: 25 }, (_, i) => ({
  id: `order-${i + 1}`,
  userId: `user-${i % 5}`,
  userName: `用户${i % 5 + 1}`,
  totalAmount: parseFloat((Math.random() * 200 + 50).toFixed(2)),
  status: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'][Math.floor(Math.random() * 5)],
  createdAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
}));

export async function GET(request: Request) {
  return NextResponse.json({ data: allOrders });
}
