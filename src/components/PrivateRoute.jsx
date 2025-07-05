import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Layout } from "lucide-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return user ? children : <Navigate to="/signup" />;
};

export default PrivateRoute;
