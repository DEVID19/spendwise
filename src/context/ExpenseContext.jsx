import { createContext, useContext, useEffect, useReducer } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };

    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { user } = useAuth();

  // Fetch expenses from Firestore when user changes
  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return;

      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const q = query(
          collection(db, "expenses"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);

        const expensesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        dispatch({ type: "SET_EXPENSES", payload: expensesData });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchExpenses();
  }, [user]);

  // Add a new expense to Firestore
  const addExpense = async (expense) => {
    const newExpense = {
      ...expense,
      userId: user.uid,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "expenses"), newExpense);
    console.log("Document written with ID: ", docRef.id);

    dispatch({
      type: "ADD_EXPENSE",
      payload: { id: docRef.id, ...newExpense },
    });
  };

  // Delete an expense from Firestore
  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "expenses", id));
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  };

  // Update an expense in Firestore
  const updateExpense = async (expense) => {
    await updateDoc(doc(db, "expenses", expense.id), expense);
    dispatch({ type: "UPDATE_EXPENSE", payload: expense });
  };

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
