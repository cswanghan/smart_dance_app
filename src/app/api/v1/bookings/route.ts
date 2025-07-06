import { NextResponse } from 'next/server';
import { Booking } from '@/types';

export async function POST(request: Request) {
  const { lessonId, userId } = await request.json();

  if (!lessonId || !userId) {
    return NextResponse.json({ error: 'lessonId and userId are required' }, { status: 400 });
  }

  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    lessonId,
    userId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  // In a real application, you would save this booking to a database
  console.log('New booking created:', newBooking);

  return NextResponse.json(newBooking, { status: 201 });
}
