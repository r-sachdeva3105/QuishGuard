import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./components/Header";
import CustomerDashboard from "./pages/Customer/Dashboard";
import CustomerTransactions from "./pages/Customer/Transactions";
import CustomerPayment from "./pages/Customer/Pay";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";

CustomerDashboard;

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

  console.log("Protected Route - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("Redirecting to login...");
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
                <Route
                  path="/"
                  element={<Navigate to="/customer-dashboard" replace />}
                />
                <Route
                  path="/customer-dashboard"
                  element={<CustomerDashboard />}
                />
                <Route
                  path="/customer-transactions"
                  element={<CustomerTransactions />}
                />
                <Route path="/customer-payment" element={<CustomerPayment />} />
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
