import React from "react";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseChart from "./ExpenseChart";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
const Dashboard = () => {
  return (
    <div className="space-y-8">
      <ExpenseSummary />
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-2">
          <ExpenseChart />
        </div>
        <div>
          <ExpenseForm />
        </div>
      </div>
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
