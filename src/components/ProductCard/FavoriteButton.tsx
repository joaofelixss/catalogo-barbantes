// src/components/ProductCard/FavoriteButton.tsx
import React from "react";
import styles from "./ProductCard.module.css";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Product } from "../../types/product";
import { Heart } from "react-feather";

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
    <div className={styles.favoriteIcon} onClick={handleClick}>
      <button className={styles.favoriteButton}>
        <Heart
          size={20}
          className={isCurrentlyFavorite ? "favorited" : ""}
          fill={isCurrentlyFavorite ? "#e53935" : "none"}
          stroke={!isCurrentlyFavorite ? "currentColor" : undefined}
        />
      </button>
    </div>
  );
};

export default FavoriteButton;
