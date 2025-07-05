'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import IncomeSetter from '@/components/IncomeSetter';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import SummaryCards from '@/components/SummaryCards';
import ExpenseChart from '@/components/ExpenseChart';
import BudgetChart from '@/components/BudgetChart';
import BudgetSetter from '@/components/BudgetSetter';
import SpendingInsights from '@/components/SpendingInsights';
import ExportCSV from '@/components/ExportCSV';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Other',
];

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
const [budgets, setBudgets] = useState([]); 

  const toastFlags = useRef({ fifty: false, ninety: false });

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  const fetchBudgets = async () => {
  const res = await fetch('/api/budgets');
  const data = await res.json();
  setBudgets(Array.isArray(data) ? data : []); // ✅ Ensure data is an array
};

useEffect(()=>{
fetchBudgets();
},[])


  const calculateSpendingPercent = () => {
    const totalSpent = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const spent = Math.abs(totalSpent);
    const percent = (spent / monthlyIncome) * 100;

    if (monthlyIncome > 0) {
      if (percent >= 90 && !toastFlags.current.ninety) {
        toast.error('⚠️ You’ve spent over 90% of your income!');
        toastFlags.current.ninety = true;
      } else if (percent >= 50 && !toastFlags.current.fifty) {
        toast('🟡 You’ve used up 50% of your income!', { icon: '⚠️' });
        toastFlags.current.fifty = true;
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateSpendingPercent();
  }, [transactions, monthlyIncome]);

  return (
    <main className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
        💰 Personal Finance Tracker
      </h1>

      <IncomeSetter
        income={monthlyIncome}
        onChange={(value) => {
          setMonthlyIncome(value);
          toastFlags.current = { fifty: false, ninety: false };
        }}
      />

      <SummaryCards
        transactions={transactions}
        monthlyIncome={monthlyIncome}
      />

     

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <TransactionForm
            selected={selected}
            onDone={() => {
              setSelected(null);
              fetchTransactions();
              toastFlags.current = { fifty: false, ninety: false };
            }}
          />

      {/* Category Filter */}

           <div className="flex flex-wrap gap-2 justify-center">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm border ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
<ExportCSV transactions={transactions} />

          <TransactionList
            transactions={
              selectedCategory === 'All'
                ? transactions
                : transactions.filter((t) => t.category === selectedCategory)
            }
            onEdit={setSelected}
            onChange={() => {
              fetchTransactions();
              toastFlags.current = { fifty: false, ninety: false };
            }}
          />
        </div>
        <BudgetSetter
  budgets={budgets}
  onUpdate={(cat, value) =>
    setBudgets((prev) => ({ ...prev, [cat]: value }))
  }
/>

<SpendingInsights
  budgets={budgets}
  transactions={
    selectedCategory === 'All'
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory)
  }
  selectedCategory={selectedCategory}
/>

<BudgetChart budgets={budgets} transactions={transactions} />


<ExpenseChart
  allTransactions={transactions}
  visibleTransactions={
    selectedCategory === 'All'
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory)
  }
/>
      </div>
    </main>
  );
}
