import { NextResponse } from 'next/server';
import { Product } from '@/types';

// In a real application, this would interact with a database
const allProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `舞房周边商品 ${i + 1}`,
  description: `这是关于舞房周边商品 ${i + 1} 的详细描述。`,
  price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  imageUrl: `https://picsum.photos/seed/${i + 300}/200/200`,
  stock: Math.floor(Math.random() * 50) + 1,
}));

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedData = await request.json();

  const productIndex = allProducts.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  allProducts[productIndex] = { ...allProducts[productIndex], ...updatedData };

  return NextResponse.json(allProducts[productIndex]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const initialLength = allProducts.length;
  allProducts = allProducts.filter(p => p.id !== id);

  if (allProducts.length === initialLength) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Product deleted successfully' });
}
