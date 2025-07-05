'use client';

const categoryOrder = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Other',
];

export default function TransactionList({ transactions, onEdit, onChange }) {
  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    onChange();
  };

  // Group transactions by category
  const grouped = categoryOrder.reduce((acc, cat) => {
    acc[cat] = transactions.filter((t) => t.category === cat);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {categoryOrder.map((category) =>
        grouped[category] && grouped[category].length > 0 ? (
          <div key={category}>
            {/* <h2 className="text-lg font-bold text-indigo-700 mb-2">{category}</h2> */}
            <div className="space-y-3">
              {grouped[category].map((t) => (
                <div
                  key={t._id}
                  className="p-4 rounded shadow bg-white flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold">{t.description}</p>
                    <p className="text-sm text-gray-600">{t.date}</p>
                  </div>
                  <div className="text-right space-x-2">
                    <span className="text-indigo-600 font-bold">₹{t.amount}</span>
                  <button
  onClick={() => onEdit(t)}
  className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-200 transition"
>
  Edit
</button>

                    
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
