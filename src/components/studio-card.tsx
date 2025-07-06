import React from 'react';
import { Studio } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface StudioCardProps {
  studio: Studio;
}

export function StudioCard({ studio }: StudioCardProps) {
  return (
    <Link href={`/studio/${studio.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Image
          src={studio.imageUrl}
          alt={studio.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{studio.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{studio.address}</p>
          <p className="text-gray-700 text-base">{studio.description}</p>
        </div>
      </div>
    </Link>
  );
}

