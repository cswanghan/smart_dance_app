import { NextResponse } from 'next/server';
import { Cart, CartItem } from '@/types';

// In a real app, this would be stored in a database per user session/ID
const userCarts: { [userId: string]: Cart } = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const cart = userCarts[userId] || { id: `cart-${userId}`, userId, items: [], total: 0 };
  return NextResponse.json(cart);
}

export async function PUT(request: Request) {
  const { userId, productId, name, price, imageUrl, quantity } = await request.json();

  if (!userId || !productId || !name || typeof price !== 'number' || typeof quantity !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  let cart = userCarts[userId] || { id: `cart-${userId}`, userId, items: [], total: 0 };

  const existingItemIndex = cart.items.findIndex(item => item.productId === productId);

  if (existingItemIndex > -1) {
    // Update quantity
    cart.items[existingItemIndex].quantity += quantity;
    if (cart.items[existingItemIndex].quantity <= 0) {
      cart.items.splice(existingItemIndex, 1);
    }
  } else if (quantity > 0) {
    // Add new item
    cart.items.push({ productId, name, price, imageUrl, quantity });
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  userCarts[userId] = cart;

  return NextResponse.json(cart);
}
