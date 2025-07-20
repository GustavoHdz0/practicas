import { createContext, useState, useContext, useEffect } from "react";
import axios from "../services/api";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (token) fetchUserProfile();
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(res.data);
    } catch (err) {
      console.error("Error al obtener perfil:", err);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
