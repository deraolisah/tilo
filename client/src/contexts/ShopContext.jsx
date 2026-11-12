// context/ShopContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default | price-asc | price-desc | name
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      sortBy,
      setSortBy,
      priceRange,
      setPriceRange,
    }),
    [searchQuery, sortBy, priceRange]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShopContext = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShopContext must be used within ShopProvider");
  return ctx;
};