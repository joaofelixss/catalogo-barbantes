// src/pages/CategoryTapetesPage.tsx
import React from "react";
import { Product } from "../../types/product";
import styles from "./CategoryPage.module.css";
import ProductCard from "../../components/ProductCard/ProductCard"; // Se já existir

interface CategoryPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CategoryTapetesPage: React.FC<CategoryPageProps> = ({
  products,
  onAddToCart,
}) => {
  const tapetes = products.filter((product) =>
    product.name.includes("Tapete de Crochê")
  );

  return (
    <div className={styles.categoryPageContainer}>
      <h1>Nossos Tapetes de Crochê</h1>
      <div className={styles.productList}>
        {tapetes.map((product) => (
          <div key={product.id} className={styles.productCardWrapper}>
            <img
              src={product.images[0]}
              alt={product.name}
              className={styles.productImage}
            />
            <h3>
              {product.name} - {product.color}
            </h3>
            <p>R$ {product.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(product)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTapetesPage;
