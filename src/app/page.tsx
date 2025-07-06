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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">认证错误</h2>
          <p className="text-gray-600 mb-4">{authError.message}</p>
          <a 
            href="/api/auth/login" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            重新登录
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">智能舞房</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            让舞蹈学习更智能，让社区连接更紧密。发现最棒的舞蹈工作室，记录你的成长历程。
          </p>
          
          {!user ? (
            <div className="space-y-4">
              <a 
                href="/api/auth/login" 
                className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                开始你的舞蹈之旅
              </a>
              <p className="text-purple-200">
                登录后可以预约课程、记录训练、参与社区讨论
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">欢迎回来, {user.name}!</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/profile/records" 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  我的训练记录
                </Link>
                <Link 
                  href="/community" 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  社区动态
                </Link>
                <Link 
                  href="/shop" 
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  舞蹈用品
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section for unauthenticated users */}
      {!user && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">平台特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">智能预约</h3>
                <p className="text-gray-600">浏览附近的舞蹈工作室，查看课程时间表，一键预约你喜欢的课程</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">训练记录</h3>
                <p className="text-gray-600">上传你的训练视频，记录成长历程，与教练和朋友分享进步</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">舞蹈社区</h3>
                <p className="text-gray-600">加入活跃的舞蹈社区，分享经验，互相学习，结识志同道合的朋友</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Studios Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {user ? '探索门店' : '精选舞蹈工作室'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {user ? '发现更多优质的舞蹈工作室，预约你心仪的课程' : '来看看这些优质的舞蹈工作室，每一家都有自己的特色'}
            </p>
          </div>

          {studiosError && (
            <div className="text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-red-800 font-semibold mb-2">加载失败</h3>
                <p className="text-red-600 text-sm">无法加载门店信息，请稍后重试</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studios.slice(0, user ? studios.length : 6).map((studio, index) => {
              if (user && studios.length === index + 1) {
                return (
                  <div ref={lastStudioElementRef} key={studio.id}>
                    <StudioCard studio={studio} />
                  </div>
                );
              }
              return <StudioCard key={studio.id} studio={studio} />;
            })}
          </div>

          {user && (isLoading || isLoadingMore) && (
            <div className="text-center mt-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">加载更多门店...</p>
            </div>
          )}

          {user && isReachingEnd && !isLoading && studios.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-500">已经看完所有门店了 🎉</p>
            </div>
          )}

          {!user && studios.length > 6 && (
            <div className="text-center mt-12">
              <a 
                href="/api/auth/login" 
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                登录查看更多门店
              </a>
            </div>
          )}

          {!isLoading && studios.length === 0 && !studiosError && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">暂无门店数据</p>
              <p className="text-gray-400 text-sm mt-2">请稍后再试</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section for unauthenticated users */}
      {!user && (
        <section className="py-16 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">准备开始你的舞蹈之旅了吗？</h2>
            <p className="text-xl mb-8 text-purple-100">
              加入我们，发现更多可能，让舞蹈成为你生活的一部分
            </p>
            <a 
              href="/api/auth/login" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              立即注册
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
