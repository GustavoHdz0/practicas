import { createContext, useState, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Producto A", description: "Descripción A", image: null },
    { id: 2, name: "Producto B", description: "Descripción B", image: null },
  ]);

  const updateProduct = (id, name, description, image) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name, description, image } : p))
    );
  };

  const addProduct = (name, description, image) => {
    const newProduct = {
      id: Date.now(),
      name,
      description,
      image,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <ProductContext.Provider
      value={{ products, updateProduct, addProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
