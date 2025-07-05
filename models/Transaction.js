// models/Transaction.js
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },

    //stage-2
    category: {
type: String,
  required: true,
  enum: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'],
  default: 'Other',
}

  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
