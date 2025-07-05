'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Other',
];

export default function TransactionForm({ selected, onDone }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    if (selected) {
      setAmount(selected.amount.toString());
      setDate(selected.date.slice(0, 10));
      setDescription(selected.description);
      setCategory(
        categories.includes(selected.category) ? selected.category : 'Other'
      );
    }
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      amount: Number(amount),
      date,
      description,
      category,
    };

    try {
      const res = await fetch(
        selected ? `/api/transactions/${selected._id}` : '/api/transactions',
        {
          method: selected ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction),
        }
      );

      if (!res.ok) throw new Error('Failed to save');

      toast.success(`Transaction ${selected ? 'updated' : 'added'}!`);
      onDone();
      setAmount('');
      setDate('');
      setDescription('');
      setCategory('Food');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        {selected ? 'Update' : 'Add'} Transaction
      </button>
    </form>
  );
}
