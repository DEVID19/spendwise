import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import EditProfile from "../components/EditProfile";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center md:justify-between items-center gap-2 md:gap-0">
            <h1 className="text-3xl font-bold text-expense">
              SpendWise <span className="text-sm text-expense ">({user.displayName || "Users"}'s Expenses)</span>
            </h1>
            <div className="justify-center items-center flex  gap-4">
              <button
                onClick={() => setShowModel(true)}
                className="w-10 h-10 cursor-pointer rounded-full overflow-hidden border-2 border-gray-300 hover:border-[#7e69ab] transition"
              >
                <img
                  src={
                    user?.photoURL ||
                    "/public/profile_image.png"
                  }
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                className="w-20 h-10 rounded-md p-2 border-gray-300 border-2 hover:border-[#7e69ab] transition bg-[#7e69ab]  text-white font-bold cursor-pointer"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            SpendWise &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
      {showModel && <EditProfile onClose={() => setShowModel(false)} />}
    </div>
  );
};

export default DashboardLayout;
