'use client';

export default function SpendingInsights({ budgets, transactions, selectedCategory }) {
  if (!Array.isArray(budgets) || !Array.isArray(transactions)) return null;

  const filteredBudgets =
    selectedCategory === 'All'
      ? budgets
      : budgets.filter((b) => b.category === selectedCategory);

  const insights = filteredBudgets.map((budget) => {
    const spent = transactions
      .filter((t) => t.category?.trim() === budget.category?.trim())
      .reduce((sum, t) => sum + Math.abs(t.amount), 0); // remove t.amount < 0

    const left = Math.max(budget.amount - spent, 0);
    const percent = budget.amount > 0 ? Math.min((spent / budget.amount) * 100, 100) : 0;

    return {
      category: budget.category,
      spent,
      budgeted: budget.amount,
      left,
      percent,
    };
  });

  return (
    <div className="bg-white p-5 rounded shadow-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">📊 Spending Insights</h2>
      <div className="space-y-4">
        {insights.map((item) => (
          <div key={item.category} className="space-y-1">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">{item.category}</span>
              <span className="text-sm text-gray-600">
                ₹{item.spent} spent / ₹{item.budgeted} budgeted
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className={`h-2 rounded ${
                  item.percent >= 100 ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              ₹{item.left} remaining in {item.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
