import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/Customer/Dashboard";
import CustomerTransactions from "./pages/Customer/Transactions";
import CustomerPayment from "./pages/Customer/Payer";
import VendorDashboard from "./pages/Vendor/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import VendorTransactions from "./pages/Vendor/Transactions";
import VendorPayment from "./pages/Vendor/Payee";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-transactions"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-payment"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-transactions"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-payment"
          element={
            <ProtectedRoute allowedRoles={["vendor"]}>
              <VendorPayment />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
