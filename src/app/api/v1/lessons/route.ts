import { NextResponse } from 'next/server';
import { Lesson } from '@/types';

const allLessons: Lesson[] = [
  {
    id: 'lesson-1',
    studioId: 'studio-1',
    name: '瑜伽基础',
    coach: '张教练',
    time: '09:00 - 10:00',
    date: '2025-07-06',
    seatsAvailable: 10,
    price: 50,
  },
  {
    id: 'lesson-2',
    studioId: 'studio-1',
    name: '爵士舞入门',
    coach: '李教练',
    time: '10:30 - 11:30',
    date: '2025-07-06',
    seatsAvailable: 5,
    price: 60,
  },
  {
    id: 'lesson-3',
    studioId: 'studio-2',
    name: '街舞进阶',
    coach: '王教练',
    time: '14:00 - 15:00',
    date: '2025-07-06',
    seatsAvailable: 8,
    price: 70,
  },
  {
    id: 'lesson-4',
    studioId: 'studio-1',
    name: '瑜伽基础',
    coach: '张教练',
    time: '09:00 - 10:00',
    date: '2025-07-07',
    seatsAvailable: 12,
    price: 50,
  },
  {
    id: 'lesson-5',
    studioId: 'studio-1',
    name: '尊巴',
    coach: '赵教练',
    time: '16:00 - 17:00',
    date: '2025-07-07',
    seatsAvailable: 7,
    price: 55,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studioId = searchParams.get('studioId');
  const date = searchParams.get('date'); // YYYY-MM-DD

  let filteredLessons = allLessons;

  if (studioId) {
    filteredLessons = filteredLessons.filter(lesson => lesson.studioId === studioId);
  }

  if (date) {
    filteredLessons = filteredLessons.filter(lesson => lesson.date === date);
  }

  return NextResponse.json({ data: filteredLessons });
}
