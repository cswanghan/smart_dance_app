import React, { useState } from 'react';
import { Lesson } from '@/types';
import { useUser } from '@auth0/nextjs-auth0/client';

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const { user, isLoading: userLoading } = useUser();
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBook = async () => {
    if (!user || userLoading) {
      alert('请先登录才能预约课程。');
      return;
    }

    if (lesson.seatsAvailable <= 0) {
      alert('该课程已无可用座位。');
      return;
    }

    setBookingLoading(true);
    try {
      const response = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          userId: user.sub, // Auth0 user ID
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '预约失败');
      }

      const booking = await response.json();
      alert(`预约成功！预约ID: ${booking.id}，状态: ${booking.status}`);
      // TODO: 刷新课程列表或更新座位数
    } catch (error: any) {
      alert(`预约失败: ${error.message}`);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{lesson.name}</h3>
      <p className="text-gray-600 text-sm">教练: {lesson.coach}</p>
      <p className="text-gray-600 text-sm">时间: {lesson.time}</p>
      <p className="text-gray-600 text-sm">剩余座位: {lesson.seatsAvailable}</p>
      <p className="text-lg font-bold mt-2">${lesson.price}</p>
      <button
        onClick={handleBook}
        disabled={bookingLoading || lesson.seatsAvailable <= 0}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {bookingLoading ? '预约中...' : (lesson.seatsAvailable <= 0 ? '已满' : '预约')}
      </button>
    </div>
  );
}
