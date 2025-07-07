import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Papa from "papaparse";
import toast from "react-hot-toast";

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const getExpensesByCategory = (expenses) => {
  const categories = {
    food: 0,
    transport: 0,
    entertainment: 0,
    shopping: 0,
    utilities: 0,
    other: 0,
    health: 0,
  };

  expenses.forEach((expense) => {
    categories[expense.category] += expense.amount;
  });
  return categories;
};

export const getChartData = (expenses) => {
  const expensesByCategory = getExpensesByCategory(expenses);
  return Object.entries(expensesByCategory)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
};

export const getCategoryTextColor = (category) => {
  const colors = {
    food: "text-indigo-500",
    transport: "text-cyan-500",
    entertainment: "text-purple-500",
    utilities: "text-teal-500",
    health: "text-green-500",
    shopping: "text-orange-500",
    other: "text-slate-500",
  };

  return colors[category] || "text-gray-500";
};

export const getMonthName = (date) => {
  return date.toLocaleString("default", { month: "long" });
};

export const getExpensesByMonth = (expenses, numMonths = 6) => {
  const now = new Date();
  const result = {};

  for (let i = 0; i < numMonths; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthYear = `${getMonthName(d)} ${d.getFullYear()}`;
    result[monthYear] = 0;
  }

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    const monthYear = `${getMonthName(
      expenseDate
    )} ${expenseDate.getFullYear()}`;

    if (result[monthYear] !== undefined) {
      result[monthYear] += expense.amount;
    }
  });

  return result;
};

export const createuserProfile = async (user) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    await setDoc(userRef, {
      name: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL || "/public/profile_image.png",
    });
  }
};

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url;
};

// Function to export expenses to CSV
// Uses PapaParse to convert JSON to CSV format

export const exportExpensesToCSV = (expenses) => {
  if (!expenses || expenses.length === 0) {
    toast("No expenses to export.");
    return;
  }

  const formatted = expenses.map((exp) => ({
    Description: exp.description,
    Amount: exp.amount,
    Category: exp.category,
    Date: exp.createdAt?.toDate().toLocaleDateString() || "", // format Firestore timestamp
  }));

  const csv = Papa.unparse(formatted);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "expenses.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("Expenses exported successfully!");
};
