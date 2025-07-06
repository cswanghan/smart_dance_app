import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { bookingId, amount } = await request.json();

  if (!bookingId || !amount) {
    return NextResponse.json({ error: 'bookingId and amount are required' }, { status: 400 });
  }

  // In a real application, you would interact with Stripe API here
  // For now, we simulate a successful payment intent creation
  const clientSecret = `pi_mock_${Date.now()}_secret`;

  return NextResponse.json({
    clientSecret,
    status: 'requires_action',
  });
}
