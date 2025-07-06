import React from 'react';
import { Product } from '@/types';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description.substring(0, 60)}...</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
}
