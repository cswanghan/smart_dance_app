import React, { useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user, isLoading: userLoading } = useUser();
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!user || userLoading) {
      alert('请先登录才能添加商品到购物车。');
      return;
    }

    setAddingToCart(true);
    try {
      const response = await fetch('/api/v1/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.sub,
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '添加到购物车失败');
      }

      alert('商品已添加到购物车！');
      // TODO: Update cart context or state
    } catch (error: any) {
      alert(`添加到购物车失败: ${error.message}`);
    } finally {
      setAddingToCart(false);
    }
  };

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
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || product.stock <= 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart ? '添加中...' : (product.stock <= 0 ? '缺货' : '加入购物车')}
          </button>
        </div>
      </div>
    </div>
  );
}
