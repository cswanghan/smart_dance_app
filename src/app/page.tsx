'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useStudios } from '@/hooks/use-studios';
import { StudioCard } from '@/components/studio-card';
import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, error: authError, isLoading: authLoading } = useUser();
  const { studios, isLoading, isLoadingMore, isReachingEnd, setSize, size, error: studiosError } = useStudios();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastStudioElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isReachingEnd) {
        setSize(size + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, isReachingEnd, setSize, size]);

  if (authLoading) return <div>Loading authentication...</div>;
  if (authError) return <div>Authentication Error: {authError.message}</div>;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <h1 className="text-4xl font-bold mb-8">智能舞房</h1>
      
      {!user && (
        <a href="/api/auth/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
          登录 / 注册
        </a>
      )}

      {user && (
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">欢迎, {user.name}!</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="flex justify-center space-x-4 mb-4">
              <Link href="/profile/records" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300">
                我的训练记录
              </Link>
              <Link href="/community" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300">
                社区
              </Link>
              <a href="/api/auth/logout" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
                登出
              </a>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center">探索门店</h2>
          {studiosError && <div className="text-red-500 text-center">Error loading studios: {studiosError.message}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio, index) => {
              if (studios.length === index + 1) {
                return (
                  <div ref={lastStudioElementRef} key={studio.id}>
                    <StudioCard studio={studio} />
                  </div>
                );
              }
              return <StudioCard key={studio.id} studio={studio} />;
            })}
          </div>

          {(isLoading || isLoadingMore) && (
            <div className="text-center mt-8 text-lg text-gray-500">加载中...</div>
          )}

          {isReachingEnd && !isLoading && studios.length > 0 && (
            <div className="text-center mt-8 text-gray-500">所有门店已加载完毕。</div>
          )}

          {!isLoading && studios.length === 0 && !studiosError && (
            <div className="text-center mt-8 text-gray-500">暂无门店数据。</div>
          )}
        </div>
      )}
    </main>
  );
}
