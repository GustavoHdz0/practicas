import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      const token = res.data.token;
      await SecureStore.setItemAsync("token", token);
      setToken(token);

      const userRes = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async ({
    username,
    email,
    password,
    phoneNumber,
    userPfp,
  }) => {
    await axios.post("/auth/register", {
      username,
      email,
      password,
      phoneNumber,
      userPfp,
    });
    await login(username, password);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setToken(null);
    setUser(null);
  };

  const checkAuth = async () => {
    const storedToken = await SecureStore.getItemAsync("token");
    if (storedToken) {
      try {
        const { data } = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setToken(storedToken);
        setUser(data.user);
      } catch {
        setToken(null);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
