'use client';

import { useState, useEffect } from 'react';
import { Order } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/v1/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center p-8">加载订单...</div>;
  if (error) return <div className="text-center p-8 text-red-500">错误: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">订单管理</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">用户</th>
              <th className="py-3 px-4 text-left">总金额</th>
              <th className="py-3 px-4 text-left">状态</th>
              <th className="py-3 px-4 text-left">创建时间</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.userName}</td>
                <td className="py-3 px-4">${order.totalAmount.toFixed(2)}</td>
                <td className="py-3 px-4">{order.status}</td>
                <td className="py-3 px-4">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && !loading && !error && (
        <div className="text-center mt-8 text-gray-500">暂无订单数据。</div>
      )}
    </div>
  );
}
