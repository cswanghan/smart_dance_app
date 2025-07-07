import React, { useState } from 'react';
import { Studio } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface StudioCardProps {
  studio: Studio;
}

export function StudioCard({ studio }: StudioCardProps) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <Link href={`/studio/${studio.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-full h-48">
          <Image
            src={imgError ? '/placeholder-studio.jpg' : studio.imageUrl}
            alt={studio.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImgError(true)}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{studio.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{studio.address}</p>
          <p className="text-gray-700 text-base">{studio.description}</p>
        </div>
      </div>
    </Link>
  );
}

