'use client';

import { saveAs } from 'file-saver';

export default function ExportCSV({ transactions }) {
  const handleExport = () => {
    if (!transactions || transactions.length === 0) return;

    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const rows = transactions.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      t.category,
      t.amount,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'transactions.csv');
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 transition ml-[75%]"
    >
      ⬇️ Export CSV
    </button>
  );
}
