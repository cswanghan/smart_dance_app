'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Record } from '@/types';

export default function RecordDetailPage() {
  const params = useParams();
  const recordId = params.id as string;

  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/v1/records/${recordId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch record');
        }
        const data = await response.json();
        setRecord(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (recordId) {
      fetchRecord();
    }
  }, [recordId]);

  if (loading) return <div className="text-center p-8">加载训练记录...</div>;
  if (error) return <div className="text-center p-8 text-red-500">错误: {error}</div>;
  if (!record) return <div className="text-center p-8">训练记录未找到。</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{record.title}</h1>
      <div className="flex justify-center mb-6">
        <video controls src={record.videoUrl} className="w-full max-w-3xl rounded-lg shadow-lg"></video>
      </div>
      <p className="text-gray-600 text-center">创建日期: {new Date(record.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
