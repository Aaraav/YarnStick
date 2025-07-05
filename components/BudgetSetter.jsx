'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Other',
];

export default function BudgetSetter() {
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    const res = await fetch('/api/budgets');
    const data = await res.json();
    const formatted = {};
    data.forEach((b) => (formatted[b.category] = b.amount));
    setBudgets(formatted);
  };

  const updateBudget = async (category, amount) => {
    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, amount }),
    });

    if (res.ok) {
      toast.success(`Budget set for ${category}`);
      fetchBudgets();
    } else {
      toast.error('Failed to set budget');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-indigo-700">📊 Monthly Category Budgets</h2>
      {categories.map((cat) => (
        <div key={cat} className="flex items-center justify-between gap-2">
          <span className="w-24">{cat}</span>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={budgets[cat] ?? ''}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBudgets({ ...budgets, [cat]: val });
            }}
          />
          <button
            onClick={() => updateBudget(cat, budgets[cat] || 0)}
            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
}
