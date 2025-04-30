// src/components/ProductList/ProductList.tsx
import React from "react";
import styles from "./ProductList.module.css";
import { Product } from "../../types/product";
import ProductCard from "../ProductCard/ProductCard";

interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
  productImages: { [key: number]: string | null | undefined };
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  productImages,
}) => {
  return (
    <section id="cardapio" className={styles.cardapioSection}>
      <h2>Nosso Cardápio</h2>
      <div className={styles.listaDeProdutos}>
        {products.map((produto) => (
          <ProductCard
            key={produto.id}
            produto={produto}
            onAddToCart={onAddToCart}
            productImages={productImages}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
