import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const { data } = await api.post("/auth/login", { username, password });
    await SecureStore.setItemAsync("token", data.token);
    const res = await api.get("/auth/me");
    setUser(res.data.user);
  };

  const register = async (username, password) => {
    await api.post("/auth/register", { username, password });
    await login(username, password);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
