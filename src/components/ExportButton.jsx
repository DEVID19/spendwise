import { exportExpensesToCSV } from "../utils/Expenses";
import { useExpenses } from "../context/ExpenseContext";
const ExportButton = () => {
  const { expenses } = useExpenses();

  return (
    <button
      onClick={() => exportExpensesToCSV(expenses)}
      className="bg-[#7e69ab] text-white md:px-4 md:py-2 px-1 py-1 rounded cursor-pointer hover:bg-[#6a59a5] transition"
    >
      Export to CSV
    </button>
  );
};

export default ExportButton;
