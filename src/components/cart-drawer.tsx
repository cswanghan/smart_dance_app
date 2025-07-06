'use client';

import React, { useState, useEffect } from 'react';
import { Cart, CartItem } from '@/types';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { user, isLoading: userLoading } = useUser();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    if (!user || userLoading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/cart?userId=${user.sub}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCart(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, user, userLoading]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (!user || userLoading) return;
    setLoading(true);
    try {
      const response = await fetch('/api/v1/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.sub,
          productId,
          quantity: newQuantity - (cart?.items.find(item => item.productId === productId)?.quantity || 0),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '更新购物车失败');
      }
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!user || !cart || cart.items.length === 0) {
      alert('购物车为空，无法结算。');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/v1/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: cart.id,
          totalAmount: cart.total,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '创建结算会话失败');
      }
      const data = await response.json();
      window.location.href = data.checkoutUrl; // Redirect to simulated checkout
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto z-50" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">购物车</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl">
          &times;
        </button>

        {loading && <div className="text-center">加载购物车...</div>}
        {error && <div className="text-red-500 text-center">错误: {error}</div>}

        {!loading && !error && (!cart || cart.items.length === 0) && (
          <div className="text-center text-gray-500">购物车为空。</div>
        )}

        {cart && cart.items.length > 0 && (
          <>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex items-center border-b pb-4">
                  <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="rounded mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-1">
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                    </div>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center text-xl font-bold mb-4">
                <span>总计:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading || cart.items.length === 0}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '结算中...' : '去结算'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
