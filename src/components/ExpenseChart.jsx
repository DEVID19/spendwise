import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { getChartData, getExpensesByMonth } from "../utils/Expenses";
import { BarChart, PieChart } from "lucide-react";
import ExpenseBarChart from "./ExpenseBarChart";
import ExpensePieChart from "./ExpensePieChart";

const ExpenseChart = () => {
  const { expenses } = useExpenses();
  const [chartType, setChartType] = useState("pie");
  const chartData = getChartData(expenses);
  const monthlyDate = getExpensesByMonth(expenses);

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md text-center p-6">
        <h2 className="text-2xl font-semibold text-expense-dark mb-4">
          Expense Analytics
        </h2>
        <div className="flex justify-center mb-6  space-x-4">
          <button
            className={`flex items-center cursor-pointer px-4 py-2 transition-all rounded-md ${
              chartType === "pie"
                ? "bg-expense text-white "
                : "bg-gray-100  text-gray-600 hover:bg-gray-200"
            } `}
            onClick={() => setChartType("pie")}
          >
            <PieChart size={18} className="mr-2" />
            <span>PieChart</span>
          </button>
          <button
            className={`flex items-center cursor-pointer px-4 py-2 transition-all rounded-md ${
              chartType === "bar"
                ? "bg-expense text-white "
                : "bg-gray-100  text-gray-600 hover:bg-gray-200"
            } `}
            onClick={() => setChartType("bar")}
          >
            <BarChart size={18} className="mr-2" />
            <span>BarChart</span>
          </button>
        </div>
        <p className="text-gray-500">
          Add some expenses to see your spending analytics
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-expense-dark">
        Expense Analytics
      </h2>
      <div className="flex justify-center mb-6  space-x-4">
        <button
          className={`flex items-center cursor-pointer px-4 py-2 transition-all rounded-md ${
            chartType === "pie"
              ? "bg-expense text-white "
              : "bg-gray-100  text-gray-600 hover:bg-gray-200"
          } `}
          onClick={() => setChartType("pie")}
        >
          <PieChart size={18} className="mr-2" />
          <span>PieChart</span>
        </button>
        <button
          className={`flex items-center cursor-pointer px-4 py-2 transition-all rounded-md ${
            chartType === "bar"
              ? "bg-expense text-white "
              : "bg-gray-100  text-gray-600 hover:bg-gray-200"
          } `}
          onClick={() => setChartType("bar")}
        >
          <BarChart size={18} className="mr-2" />
          <span>BarChart</span>
        </button>
      </div>
      <div>
        {chartType === "pie" ? (
          <ExpensePieChart data={chartData} />
        ) : (
          <ExpenseBarChart data={monthlyDate} />
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
