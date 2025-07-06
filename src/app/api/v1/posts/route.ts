import { NextResponse } from 'next/server';
import { Post } from '@/types';

const allPosts: Post[] = Array.from({ length: 40 }, (_, i) => ({
  id: `post-${i + 1}`,
  userId: `user-${i % 5}`,
  userName: `用户${i % 5 + 1}`,
  userAvatar: `https://i.pravatar.cc/150?img=${i % 20}`,
  content: `这是用户${i % 5 + 1}发布的第 ${i + 1} 条动态，分享我的舞房生活！`,
  imageUrl: i % 3 === 0 ? `https://picsum.photos/seed/${i + 200}/400/300` : undefined,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 20),
  createdAt: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = allPosts.findIndex(p => p.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const endIndex = startIndex + limit;
  const data = allPosts.slice(startIndex, endIndex);
  const nextCursor = endIndex < allPosts.length ? allPosts[endIndex - 1].id : undefined;

  return NextResponse.json({
    data,
    nextCursor,
  });
}

export async function POST(request: Request) {
  const newPostData = await request.json();
  const newPost: Post = {
    id: `post-${Date.now()}`,
    userId: newPostData.userId || 'anonymous',
    userName: newPostData.userName || '匿名用户',
    userAvatar: newPostData.userAvatar || 'https://i.pravatar.cc/150',
    content: newPostData.content,
    imageUrl: newPostData.imageUrl,
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
  };
  allPosts.unshift(newPost); // Add to the beginning for demonstration
  return NextResponse.json(newPost, { status: 201 });
}
