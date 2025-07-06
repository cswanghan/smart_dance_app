'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

export default function AdminGoodsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/goods');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('/api/v1/goods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '添加商品失败');
      }
      fetchProducts(); // Refresh list
      setShowAddModal(false);
      alert('商品添加成功！');
    } catch (err: any) {
      alert(`添加商品失败: ${err.message}`);
    }
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`/api/v1/goods/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '更新商品失败');
      }
      fetchProducts(); // Refresh list
      setShowEditModal(false);
      setCurrentProduct(null);
      alert('商品更新成功！');
    } catch (err: any) {
      alert(`更新商品失败: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('确定要删除此商品吗？')) return;
    try {
      const response = await fetch(`/api/v1/goods/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '删除商品失败');
      }
      fetchProducts(); // Refresh list
      alert('商品删除成功！');
    } catch (err: any) {
      alert(`删除商品失败: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center p-8">加载商品...</div>;
  if (error) return <div className="text-center p-8 text-red-500">错误: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">商品管理</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        添加新商品
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">名称</th>
              <th className="py-3 px-4 text-left">描述</th>
              <th className="py-3 px-4 text-left">价格</th>
              <th className="py-3 px-4 text-left">图片</th>
              <th className="py-3 px-4 text-left">库存</th>
              <th className="py-3 px-4 text-left">操作</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map(product => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{product.id}</td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.description.substring(0, 50)}...</td>
                <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <img src={product.imageUrl} alt="Product" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentProduct(product);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products.length === 0 && !loading && !error && (
        <div className="text-center mt-8 text-gray-500">暂无商品数据。</div>
      )}

      {showAddModal && (
        <ProductFormModal
          title="添加新商品"
          onSubmit={handleAddProduct}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && currentProduct && (
        <ProductFormModal
          title="编辑商品"
          product={currentProduct}
          onSubmit={handleEditProduct}
          onClose={() => {
            setShowEditModal(false);
            setCurrentProduct(null);
          }}
        />
      )}
    </div>
  );
}

interface ProductFormModalProps {
  title: string;
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'> | Product) => void;
  onClose: () => void;
}

function ProductFormModal({ title, product, onSubmit, onClose }: ProductFormModalProps) {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [stock, setStock] = useState(product?.stock.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !imageUrl || !stock) {
      alert('所有字段都是必填项。');
      return;
    }
    onSubmit({
      ...(product && { id: product.id }),
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      stock: parseInt(stock, 10),
    } as Product);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">名称:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">描述:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">价格:</label>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">图片 URL:</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">库存:</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">取消</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">保存</button>
          </div>
        </form>
      </div>
    </div>
  );
}