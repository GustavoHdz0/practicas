import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (username, password) => {
    const res = await axios.post("/auth/login", { username, password });
    await SecureStore.setItemAsync("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
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
