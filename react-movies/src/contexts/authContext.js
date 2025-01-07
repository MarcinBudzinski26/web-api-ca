import React, { useState, createContext } from "react";
import { login, signup } from "../api/movies-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(""); // Add userId to state

  // Function to put JWT token in local storage
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  // Authenticate user and store userId
  const authenticate = async (username, password) => {
    try {
      const result = await login(username, password);
      if (result.token && result.userId) {
        setToken(result.token);
        setIsAuthenticated(true);
        setUserName(username);
        setUserId(result.userId);
        return { success: true }; // Indicate successful login
      } else {
        return { success: false, message: "Invalid username or password." }; // Handle invalid login
      }
    } catch (error) {
      return { success: false, message: error.message || "An error occurred during login." }; // Return error message
    }
  };
  

const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success; 
};


  // Sign out user
  const signout = () => {
    setTimeout(() => {
      setIsAuthenticated(false);
      setAuthToken(null);
      setUserName("");
      setUserId(""); // Clear userId
      localStorage.removeItem("token"); // Clear token
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        userId, // Make userId accessible
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
