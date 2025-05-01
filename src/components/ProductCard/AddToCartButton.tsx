// src/components/ProductCard/AddToCartButton.tsx
import React from "react";
import styles from "./ProductCard.module.css";
import { Product } from "../../types/product";

interface AddToCartButtonProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  onAddToCart,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onAddToCart(product);
  };

  return <button onClick={handleClick}>Adicionar ao Carrinho</button>;
};

export default AddToCartButton;
