'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import useSWRInfinite from 'swr/infinite';
import { Record, PaginatedResponse } from '@/types';
import { RecordCard } from '@/components/record-card';
import { useEffect, useRef, useCallback } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RecordsPage() {
  const { user, isLoading: authLoading } = useUser();

  const getKey = (pageIndex: number, previousPageData: PaginatedResponse<Record>) => {
    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    if (pageIndex === 0) return '/api/v1/records'; // first page
    return `/api/v1/records?cursor=${previousPageData.nextCursor}`;
  };

  const { data, size, setSize, isValidating, error } = useSWRInfinite<PaginatedResponse<Record>>(
    getKey,
    fetcher
  );

  const records = data ? data.flatMap(page => page.data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.nextCursor);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRecordElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isReachingEnd) {
        setSize(size + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, isReachingEnd, setSize, size]);

  if (authLoading) return <div className="text-center p-8">加载用户认证信息...</div>;
  if (!user) return <div className="text-center p-8">请登录以查看训练记录。</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">我的训练记录</h1>

      {error && <div className="text-red-500 text-center">加载记录失败: {error.message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {records.map((record, index) => {
          if (records.length === index + 1) {
            return (
              <div ref={lastRecordElementRef} key={record.id}>
                <RecordCard record={record} />
              </div>
            );
          }
          return <RecordCard key={record.id} record={record} />;
        })}
      </div>

      {(isLoading || isLoadingMore) && (
        <div className="text-center mt-8 text-lg text-gray-500">加载更多记录...</div>
      )}

      {isReachingEnd && !isLoading && records.length > 0 && (
        <div className="text-center mt-8 text-gray-500">所有记录已加载完毕。</div>
      )}

      {!isLoading && records.length === 0 && !error && (
        <div className="text-center mt-8 text-gray-500">暂无训练记录。</div>
      )}
    </div>
  );
}
