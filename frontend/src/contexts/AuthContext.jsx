import { createContext, useContext, useEffect, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || null
  );
  const [error, setError] = useState(null);
  const [aliasData, setAliasData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAliasData = async (aliasId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/account-alias/${aliasId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch account alias data");
      }
      const data = await response.json();
      setAliasData(data);
      return data;
    } catch (error) {
      console.error(error);
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("userType", userType);

    const initializeAliasData = async () => {
      if (isAuthenticated && userType === "vendor") {
        await fetchAliasData("0193134e-02da-a5b3-eb56-519f71a31219");
      } else if (isAuthenticated && userType === "customer") {
        await fetchAliasData("01931490-8000-5986-bf5e-90a6c0d4c534");
      }

      setLoading(false);
    };

    initializeAliasData();
  }, [isAuthenticated, userType]);

  const login = async ({ email, password }) => {
    setError(null);

    return new Promise((resolve, reject) => {
      try {
        if (email === "customer@customer" && password === "password") {
          setIsAuthenticated(true);
          setUserType("customer");
          resolve();
        } else if (email === "vendor@vendor" && password === "password") {
          setIsAuthenticated(true);
          setUserType("vendor");
          resolve();
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (err) {
        setError(err.message);
        setIsAuthenticated(false);
        setUserType(null);
        reject(err);
      }
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setError(null);
    setAliasData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        aliasData,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
