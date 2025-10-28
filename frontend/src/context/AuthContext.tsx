// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  _id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  setLogin: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // On mount, restore auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    if (token && userJson) {
      try {
        setUser(JSON.parse(userJson));
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const setLogin = (token: string, userObj: User) => {
    // persist token + user
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
