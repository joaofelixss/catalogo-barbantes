// src/components/ProductCard/FavoriteButton.tsx
import React from "react";
import styles from "./ProductCard.module.css";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Product } from "../../types/product";

interface FavoriteButtonProps {
  productId: number;
  product: Product;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  product,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(productId);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isCurrentlyFavorite) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <button className={styles.favoriteButton} onClick={handleClick}>
      {isCurrentlyFavorite ? "❤️ Remover Favorito" : "🤍 Favoritar"}
    </button>
  );
};

export default FavoriteButton;
