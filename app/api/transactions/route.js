import { connectDB } from '@/lib/mongo';
import Transaction from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, date, description,category } = body;

    if (!amount || !date || !description) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    await connectDB();
    const transaction = await Transaction.create({ amount, date, description,category });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
