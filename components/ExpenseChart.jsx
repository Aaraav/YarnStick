"use client";

import { useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

export default function ExpenseChart({ transactions }) {
  const [chartType, setChartType] = useState("pie");

  const chartData = transactions.reduce((acc, t) => {
    const key = t.description || "Other";
    acc[key] = (acc[key] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(chartData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-4 shadow rounded">
     <div className="flex justify-center mb-4 space-x-3">
  {["pie", "bar", "line"].map((type) => (
    <button
      key={type}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
        chartType === type
          ? "bg-indigo-600 text-white shadow"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      onClick={() => setChartType(type)}
    >
      {type.toUpperCase()}
    </button>
  ))}
</div>


      <div className="flex h-[50%] w-full justify-center">
        {chartType === "pie" && (
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}

        {chartType === "bar" && (
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}

        {chartType === "line" && (
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        )}
      </div>
    </div>
  );
}
