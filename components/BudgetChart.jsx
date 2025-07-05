'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'];

export default function BudgetChart({ budgets, transactions }) {
  const data = categories.map((cat) => {
    const budgetEntry = budgets.find((b) => b.category === cat);
    const budgetAmount = budgetEntry ? budgetEntry.amount : 0;

    const spent = transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      category: cat,
      Budget: budgetAmount,
      Spent: spent,
    };
  });

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold text-indigo-700 mb-2">📊 Budget vs Spent</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#60a5fa" />
          <Bar dataKey="Spent" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
