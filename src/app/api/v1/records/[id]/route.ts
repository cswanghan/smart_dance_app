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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const record = allRecords.find(r => r.id === id);

  if (!record) {
    return NextResponse.json({ error: 'Record not found' }, { status: 404 });
  }

  return NextResponse.json(record);
}
