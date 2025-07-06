import React from 'react';
import { Post } from '@/types';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex items-center">
        <Image
          src={post.userAvatar}
          alt={post.userName}
          width={40}
          height={40}
          className="rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">{post.userName}</p>
          <p className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          alt="Post image"
          width={400}
          height={300}
          className="w-full object-cover"
        />
      )}
      <div className="p-4">
        <p className="text-gray-800 mb-3">{post.content}</p>
        <div className="flex items-center text-gray-600 text-sm">
          <span className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
            {post.likes}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            {post.comments}
          </span>
        </div>
      </div>
    </div>
  );
}
