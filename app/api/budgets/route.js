// app/api/budgets/route.js
import { connectDB } from '@/lib/mongo';
import Budget from '@/models/Budget';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const budgets = await Budget.find({});
  return NextResponse.json(budgets);
}

export async function POST(req) {
  await connectDB();
  const { category, amount } = await req.json();

  if (!category || amount === undefined) {
    return NextResponse.json({ error: 'Category and amount are required' }, { status: 400 });
  }

  // upsert: update if exists, insert if not
  const budget = await Budget.findOneAndUpdate(
    { category },
    { amount },
    { new: true, upsert: true }
  );

  return NextResponse.json(budget);
}
