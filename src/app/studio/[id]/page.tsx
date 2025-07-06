'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Studio, Lesson } from '@/types';
import { DateSelector } from '@/components/date-selector';
import { LessonCard } from '@/components/lesson-card';

export default function StudioDetailPage() {
  const params = useParams();
  const studioId = params.id as string;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loadingStudio, setLoadingStudio] = useState(true);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch studio details
  useEffect(() => {
    const fetchStudio = async () => {
      setLoadingStudio(true);
      setError(null);
      try {
        // In a real app, you'd fetch a single studio by ID
        // For now, we'll use the mock data from /api/v1/studios
        const response = await fetch('/api/v1/studios');
        if (!response.ok) {
          throw new Error('Failed to fetch studios');
        }
        const data = await response.json();
        const foundStudio = data.data.find((s: Studio) => s.id === studioId);
        if (foundStudio) {
          setStudio(foundStudio);
        } else {
          setError('Studio not found');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingStudio(false);
      }
    };

    if (studioId) {
      fetchStudio();
    }
  }, [studioId]);

  // Fetch lessons for selected date and studio
  useEffect(() => {
    const fetchLessons = async () => {
      setLoadingLessons(true);
      setError(null);
      try {
        const response = await fetch(`/api/v1/lessons?studioId=${studioId}&date=${selectedDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        const data = await response.json();
        setLessons(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingLessons(false);
      }
    };

    if (studioId && selectedDate) {
      fetchLessons();
    }
  }, [studioId, selectedDate]);

  if (loadingStudio) return <div className="text-center p-8">加载门店信息...</div>;
  if (error) return <div className="text-center p-8 text-red-500">错误: {error}</div>;
  if (!studio) return <div className="text-center p-8">门店未找到。</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{studio.name}</h1>
      <p className="text-gray-600 mb-2">{studio.address}</p>
      <p className="text-gray-700 mb-4">{studio.description}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">课程安排</h2>
      <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {loadingLessons ? (
        <div className="text-center">加载课程...</div>
      ) : lessons.length > 0 ? (
        <div>
          {lessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">该日期暂无课程。</div>
      )}
    </div>
  );
}
