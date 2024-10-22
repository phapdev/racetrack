import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export type AuthContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string>(() => {
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    async function isExistToken() {
      const tokenParam = searchParams.get("token");
      if (tokenParam) {
        setToken(tokenParam);
        return navigate("/login");
      } else if (!token && window.location.pathname !== "/leaderboard") {
        return navigate("/login");
      }
    }
    isExistToken();
  }, [navigate, searchParams, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context as AuthContextType;
};