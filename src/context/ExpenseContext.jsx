import { createContext, useContext, useEffect, useReducer } from "react";

const ExpenseContext = createContext();

const initialValue = {
  expenses: [],
  error: null,
  loading: false,
};

const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSES":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "DELETE_EXPENSES":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "UPDATE_EXPENSES":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpenseReducer, initialValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("Expenses");
      if (stored) {
        dispatch({ type: "SET_EXPENSES", payload: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Failed to load expenses:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load expenses" });
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("Expenses", JSON.stringify(state.expenses));
    } catch (error) {
      console.error("Failed to save expenses:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to save expenses" });
    }
  }, [state.expenses]);

  const value = {
    ...state,
    addExpenses: (expenses) => {
      const newExpenses = {
        ...expenses,
        id: crypto.randomUUID(),
      };
      dispatch({ type: "ADD_EXPENSES", payload: newExpenses });
    },

    deleteExpenses: (id) => {
      dispatch({ type: "DELETE_EXPENSES", payload: { id } });
    },

    updateExpenses: (expenses) => {
      dispatch({ type: "UPDATE_EXPENSES", payload: expenses });
    },
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
