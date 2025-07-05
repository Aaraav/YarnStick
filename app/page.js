'use client';

import { useState, useEffect } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpenseChart from "@/components/ExpenseChart";
import { Toaster } from "react-hot-toast";

export default function HomePage() {
  const [selected, setSelected] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data.reverse());
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        💰 Personal Finance Tracker
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: Form + List */}
        <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col space-y-4 max-h-[80vh]">
          <TransactionForm
            selected={selected}
            onDone={() => {
              setSelected(null);
              fetchTransactions();
            }}
          />

          <div className="overflow-y-auto flex-1 pr-2">
            <TransactionList
              transactions={transactions}
              onEdit={setSelected}
              onDeleteComplete={fetchTransactions}
            />
          </div>
        </div>

        {/* Right column: Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-5 h-[80vh] overflow-hidden">
          <ExpenseChart transactions={transactions} />
        </div>
      </div>

      <Toaster position="top-right" />
    </main>
  );
}
