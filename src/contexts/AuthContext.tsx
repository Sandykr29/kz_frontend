import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = (token: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", username);
    setToken(token);
    setUser(username);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
