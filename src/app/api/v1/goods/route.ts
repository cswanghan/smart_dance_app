import { NextResponse } from 'next/server';
import { Product } from '@/types';

const allProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `舞房周边商品 ${i + 1}`,
  description: `这是关于舞房周边商品 ${i + 1} 的详细描述。`,
  price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
  imageUrl: `https://picsum.photos/seed/${i + 300}/200/200`,
  stock: Math.floor(Math.random() * 50) + 1,
}));

export async function GET(request: Request) {
  return NextResponse.json({ data: allProducts });
}

export async function POST(request: Request) {
  const { name, description, price, imageUrl, stock } = await request.json();

  if (!name || !description || typeof price !== 'number' || !imageUrl || typeof stock !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newProduct: Product = {
    id: `product-${Date.now()}`,
    name,
    description,
    price,
    imageUrl,
    stock,
  };

  allProducts.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}