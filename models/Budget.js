// models/Budget.js
import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'],
      unique: true, // One budget per category
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
