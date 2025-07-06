import { NextResponse } from 'next/server';
import { Studio } from '@/types';

const studios: Studio[] = Array.from({ length: 50 }, (_, i) => ({
  id: `studio-${i + 1}`,
  name: `智能舞房 ${i + 1} 号店`,
  address: `北美某地 ${i + 1} 号街`,
  imageUrl: `https://picsum.photos/seed/${i}/400/300`,
  description: `这是智能舞房 ${i + 1} 号店的描述。欢迎您的到来！`,
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = studios.findIndex(s => s.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const endIndex = startIndex + limit;
  const data = studios.slice(startIndex, endIndex);
  const nextCursor = endIndex < studios.length ? studios[endIndex - 1].id : undefined;

  return NextResponse.json({
    data,
    nextCursor,
  });
}
