import { NextResponse } from 'next/server';
import { Record } from '@/types';

const allRecords: Record[] = Array.from({ length: 30 }, (_, i) => ({
  id: `record-${i + 1}`,
  userId: 'user-123',
  title: `我的第 ${i + 1} 次训练记录`,
  videoUrl: `https://www.w3schools.com/html/mov_bbb.mp4`,
  thumbnailUrl: `https://picsum.photos/seed/${i + 100}/300/200`,
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = allRecords.findIndex(r => r.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const endIndex = startIndex + limit;
  const data = allRecords.slice(startIndex, endIndex);
  const nextCursor = endIndex < allRecords.length ? allRecords[endIndex - 1].id : undefined;

  return NextResponse.json({
    data,
    nextCursor,
  });
}
