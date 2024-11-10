import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userType)) {
    // Fix the role check
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
