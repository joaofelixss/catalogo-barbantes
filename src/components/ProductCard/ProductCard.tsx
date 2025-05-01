// src/components/ProductCard/ProductCard.tsx
import React from "react";
import styles from "./ProductCard.module.css";
import { Product } from "../../types/product";
import { useNavigate, Link } from "react-router-dom"; // Importe Link
import useProductImage from "../../hooks/useProductImage";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";

interface ProductCardProps {
  produto: Product;
  onAddToCart: (product: Product) => void;
  productImages?: { [key: number]: string | null | undefined };
}

const ProductCard: React.FC<ProductCardProps> = ({
  produto,
  onAddToCart,
  productImages,
}) => {
  const imageUrl = useProductImage(produto, productImages);

  return (
    <Link to={`/produto/${produto.id}`} className={styles.productLink}>
      {" "}
      {/* Envolva com Link */}
      <div className={styles.productCard}>
        {" "}
        {/* Mantenha o div para os estilos do card */}
        <img
          src={imageUrl}
          alt={produto.name}
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <h3>{produto.name}</h3>
          <p className={styles.productColor}>Cor: {produto.color}</p>
          {produto.num && (
            <p className={styles.productNum}>Numeração: {produto.num}</p>
          )}
          <p className={styles.productPrice}>R$ {produto.price.toFixed(2)}</p>
          <div className={styles.actions}>
            <AddToCartButton product={produto} onAddToCart={onAddToCart} />
            <FavoriteButton productId={produto.id} product={produto} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
