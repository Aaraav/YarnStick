"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function TransactionForm({ selected, onDone }) {
  const [form, setForm] = useState({ amount: "", date: "", description: "" });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = selected ? "PUT" : "POST";
    const url = selected
      ? `/api/transactions/${selected._id}`
      : "/api/transactions";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Something went wrong");
    } else {
      toast.success(`Transaction ${selected ? "updated" : "added"}!`);
      setForm({ amount: "", date: "", description: "" });
      onDone();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <Button type="submit">{selected ? "Update" : "Add"} Transaction</Button>
    </form>
  );
}
