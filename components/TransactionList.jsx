"use client";

import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onEdit, onDeleteComplete }) {
  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    onDeleteComplete();
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
      {transactions.map((t) => (
        <div
          key={t._id}
          className="flex justify-between items-center border border-gray-200 shadow-sm rounded-lg px-4 py-3 bg-gray-50 hover:bg-white transition"
        >
          <div>
            <div className="text-lg font-medium text-gray-800">₹{t.amount}</div>
            <div className="text-sm text-gray-600">{t.description}</div>
            <div className="text-xs text-gray-400">{t.date.slice(0, 10)}</div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => onEdit(t)} size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-white">
              Edit
            </Button>
            <Button onClick={() => handleDelete(t._id)} size="sm" variant="destructive" className="bg-red-500 hover:bg-red-700 text-white">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
