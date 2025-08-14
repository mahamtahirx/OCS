import React from 'react';
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true); // loading while checking session

  useEffect(() => {
    // Check session on app start
    fetch("http://localhost:28000/Users/me/", {
      credentials: "include", // send cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUsername(data.username);
      })
      .catch(() => {
        setUsername(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ username, setUsername, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
