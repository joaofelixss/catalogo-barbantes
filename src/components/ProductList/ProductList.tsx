// src/components/ProductList/ProductList.tsx
import React from "react";
import styles from "./ProductList.module.css";
import { Product } from "../../types/product";
import ProductCard from "../ProductCard/ProductCard";
interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <section className={styles.cardapioSection} id="cardapio">
      <h2>Nosso Cardápio de Barbantes</h2>
      <ul className={styles.listaDeProdutos}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <ProductCard
              produto={product}
              onAddToCart={onAddToCart}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
