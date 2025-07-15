import { createContext, useState, useContext, useEffect } from "react";
import axios from "../services/api";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) {
      setProducts([]);
    }
  }, [user]);

  const fetchProducts = async () => {
    const res = await axios.get("/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  const addProduct = async (name, description, image) => {
    await axios.post(
      "/products",
      { name, description, image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await fetchProducts();
  };

  const updateProduct = async (id, name, description, image) => {
    const res = await axios.put(
      `/products/${id}`,
      { name, description, image },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, fetchProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
