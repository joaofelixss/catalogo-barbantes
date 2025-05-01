// src/components/ProductCard/ProductCard.tsx
import React from "react";
import styles from "./ProductCard.module.css";
import { Product } from "../../types/product";
import { useFavorites } from "../../contexts/FavoritesContext"; // Importe o hook

interface ProductCardProps {
  produto: Product;
  onAddToCart: (product: Product) => void;
  productImages: { [key: number]: string | null | undefined };
}

const ProductCard: React.FC<ProductCardProps> = ({
  produto,
  onAddToCart,
  productImages,
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const imageUrl = productImages[produto.id] || produto.image;
  const isCurrentlyFavorite = isFavorite(produto.id);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Impede que o clique no favorito acione o addToCart
    if (isCurrentlyFavorite) {
      removeFromFavorites(produto.id);
    } else {
      addToFavorites(produto);
    }
  };

  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={produto.name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3>{produto.name}</h3>
        <p className={styles.productColor}>Cor: {produto.color}</p>
        {produto.num && (
          <p className={styles.productNum}>Numeração: {produto.num}</p>
        )}
        <p className={styles.productPrice}>R$ {produto.price.toFixed(2)}</p>
        <div className={styles.actions}>
          <button onClick={() => onAddToCart(produto)}>
            Adicionar ao Carrinho
          </button>
          <button
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
          >
            {isCurrentlyFavorite ? "❤️ Remover Favorito" : "🤍 Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
