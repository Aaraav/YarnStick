import { connectDB } from "@/lib/mongo";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { amount, date, description } = await req.json();

    if (!id || !amount || !date || !description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await Transaction.findByIdAndUpdate(id, { amount, date, description });
    return NextResponse.json({ message: "Transaction updated successfully." });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update transaction." }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Transaction ID is required." }, { status: 400 });
    }

    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: "Transaction deleted successfully." });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete transaction." }, { status: 500 });
  }
}
