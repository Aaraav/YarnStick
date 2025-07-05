'use client';

import { useState, useEffect } from 'react';

export default function IncomeSetter({ income, onChange }) {
  const [value, setValue] = useState(income || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      onChange(num);
      localStorage.setItem('monthlyIncome', num);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('monthlyIncome');
    if (saved) onChange(Number(saved));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">Set Monthly Income</label>
      <div className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter income (₹)"
          required
        />
        <button className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700">
          Save
        </button>
      </div>
    </form>
  );
}
