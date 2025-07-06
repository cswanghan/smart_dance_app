import { NextResponse } from 'next/server';
import { Post } from '@/types';

// In a real application, this would interact with a database
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
  status: i % 4 === 0 ? 'rejected' : (i % 3 === 0 ? 'approved' : 'pending'), // Simulate different statuses
}));

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const post = allPosts.find(p => p.id === id);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await request.json();

  const postIndex = allPosts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  allPosts[postIndex].status = status;

  return NextResponse.json(allPosts[postIndex]);
}
