# 💰 YarnStick – Personal Finance Tracker

YarnStick is a modern, mobile-friendly personal finance tracker built with **Next.js**, **MongoDB**, and **Tailwind CSS**. It helps you record, categorize, and analyze your income and expenses effortlessly.

---

## 🚀 Features

### ✅ Stage 1: Basic Tracker
- Add, edit, and delete transactions
- Set a monthly income
- See live calculations:
  - Total income
  - Total expenses
  - Available balance
- Smart alerts:
  - Toast when you spend 50% or 90% of your income

### ✅ Stage 2: Categories & Mobile Design
- Categorize transactions (Food, Transport, Bills, etc.)
- Filter transactions by category
- View category-wise expense chart
- Mobile-friendly:
  - Transaction list hidden by default
  - View with a button tap (overlay style)

### ✅ Stage 3: Budget & Insights
- Set monthly budgets for each category
- Budget vs Spent comparison bar chart
- Spending insights per category
  - How much spent
  - How much left
  - Visual progress bar
- Export all transactions to CSV

---

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB with Mongoose
- **Charts**: Recharts
- **UI Enhancements**: react-hot-toast, responsive design,Shadcn

---

## 🧪 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Aaraav/YarnStick.git
cd YarnStick
npm install
MONGODB_URI=your-mongodb-connection-string
npm run dev


