export default function SummaryCards({ transactions, monthlyIncome }) {
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const available = monthlyIncome - totalSpent;

  const spentPercent =
    monthlyIncome > 0 ? Math.min((totalSpent / monthlyIncome) * 100, 100) : 0;

  const Card = ({ title, value, color, extra }) => (
    <div className={`bg-white rounded-lg shadow p-4 border-l-4 ${color}`}>
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-semibold">
        {value < 0 ? `-₹${Math.abs(value)}` : `₹${value}`}
      </p>
      {extra && <p className="text-xs text-gray-500 mt-1">{extra}</p>}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card
        title="Monthly Income"
        value={monthlyIncome}
        color="border-green-500"
      />
      <Card
        title="Total Spent"
        value={totalSpent}
        color="border-red-500"
        extra={`(${spentPercent.toFixed(1)}% of income spent)`}
      />
      <Card
        title="Available Funds"
        value={available}
        color="border-indigo-500"
      />
    </div>
  );
}
