import React from 'react';
import { Record } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface RecordCardProps {
  record: Record;
}

export function RecordCard({ record }: RecordCardProps) {
  return (
    <Link href={`/profile/records/${record.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <Image
          src={record.thumbnailUrl}
          alt={record.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{record.title}</h3>
          <p className="text-gray-600 text-sm">{new Date(record.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
}
