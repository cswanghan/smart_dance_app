import useSWRInfinite from 'swr/infinite';
import { Studio, PaginatedResponse } from '@/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useStudios() {
  const getKey = (pageIndex: number, previousPageData: PaginatedResponse<Studio>) => {
    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    if (pageIndex === 0) return '/api/v1/studios'; // first page
    return `/api/v1/studios?cursor=${previousPageData.nextCursor}`;
  };

  const { data, size, setSize, isValidating, error } = useSWRInfinite<PaginatedResponse<Studio>>(
    getKey,
    fetcher
  );

  const studios = data ? data.flatMap(page => page.data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.nextCursor);

  return {
    studios,
    isLoading: isValidating,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    size,
    setSize,
    error,
  };
}
