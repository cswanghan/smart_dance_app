import React from 'react';
import { Lesson } from '@/types';

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{lesson.name}</h3>
      <p className="text-gray-600 text-sm">教练: {lesson.coach}</p>
      <p className="text-gray-600 text-sm">时间: {lesson.time}</p>
      <p className="text-gray-600 text-sm">剩余座位: {lesson.seatsAvailable}</p>
      <p className="text-lg font-bold mt-2">${lesson.price}</p>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
        预约
      </button>
    </div>
  );
}
