// src/pages/ProductDetailsPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product";
import styles from "./ProductDetailsPage.module.css";
import { useFavorites } from "../contexts/FavoritesContext";

interface ProductDetailsPageProps {
  products: Product[];
  productImages: { [key: number]: string | null | undefined };
  onAddToCart: (product: Product) => void; // Adicione a prop onAddToCart
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  products,
  productImages,
  onAddToCart, // Receba a prop onAddToCart
}) => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : null;
  const product = productId ? products.find((p) => p.id === productId) : null;
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const imageUrl = (product && productImages[product.id]) || product?.image;

  if (!product) {
    return (
      <div className={styles.productDetailsContainer}>
        Produto não encontrado.
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className={styles.productDetailsContainer}>
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={product.name}
          className={styles.productImage}
        />
        {/* Se tivermos mais imagens, poderíamos adicioná-las aqui */}
      </div>
      <div className={styles.details}>
        <h1>{product.name}</h1>
        <p className={styles.color}>Cor: {product.color}</p>
        {product.num && <p className={styles.num}>Numeração: {product.num}</p>}
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.descricao}</p>
        <div className={styles.actions}>
          <button onClick={() => onAddToCart(product)}>
            {" "}
            {/* Use a prop onAddToCart */}
            Adicionar ao Carrinho
          </button>
          <button
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
          >
            {isFavorite(product.id) ? "❤️ Remover Favorito" : "🤍 Favoritar"}
          </button>
        </div>
        {/* Podemos adicionar sugestões de produtos relacionados aqui no futuro */}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
