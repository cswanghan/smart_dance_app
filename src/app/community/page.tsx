'use client';

import useSWRInfinite from 'swr/infinite';
import { Post, PaginatedResponse } from '@/types';
import { PostCard } from '@/components/post-card';
import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CommunityPage() {
  const getKey = (pageIndex: number, previousPageData: PaginatedResponse<Post>) => {
    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    if (pageIndex === 0) return '/api/v1/posts'; // first page
    return `/api/v1/posts?cursor=${previousPageData.nextCursor}`;
  };

  const { data, size, setSize, isValidating, error } = useSWRInfinite<PaginatedResponse<Post>>(
    getKey,
    fetcher
  );

  const posts = data ? data.flatMap(page => page.data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.nextCursor);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isReachingEnd) {
        setSize(size + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, isReachingEnd, setSize, size]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">社区</h1>
        <Link href="/community/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
          发布 🖋
        </Link>
      </div>

      {error && <div className="text-red-500 text-center">加载帖子失败: {error.message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <PostCard post={post} />
              </div>
            );
          }
          return <PostCard key={post.id} post={post} />;
        })}
      </div>

      {(isLoading || isLoadingMore) && (
        <div className="text-center mt-8 text-lg text-gray-500">加载更多帖子...</div>
      )}

      {isReachingEnd && !isLoading && posts.length > 0 && (
        <div className="text-center mt-8 text-gray-500">所有帖子已加载完毕。</div>
      )}

      {!isLoading && posts.length === 0 && !error && (
        <div className="text-center mt-8 text-gray-500">暂无帖子。</div>
      )}
    </div>
  );
}
