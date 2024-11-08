import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Pay from "./pages/Pay";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="app-main">{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  console.log('Protected Route - isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    console.log('Redirecting to login...');
    return <Navigate to="/login" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
