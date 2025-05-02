// src/contexts/FavoritesContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Product } from "../../types/product";

interface FavoritesContextProps {
  favorites: number[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem("catalogoBarbantesFavorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "catalogoBarbantesFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addToFavorites = useCallback(
    (product: Product) => {
      if (!favorites.includes(product.id)) {
        setFavorites([...favorites, product.id]);
      }
    },
    [favorites, setFavorites]
  );

  const removeFromFavorites = useCallback(
    (productId: number) => {
      setFavorites(favorites.filter((id) => id !== productId));
    },
    [favorites, setFavorites]
  );

  const isFavorite = useCallback(
    (productId: number) => {
      return favorites.includes(productId);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
