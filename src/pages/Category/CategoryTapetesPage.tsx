// src/pages/CategoryTapetesPage.tsx
import React from "react";
import { Product } from "../../types/product";
import styles from "./CategoryPage.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";

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
          <ProductCard
            key={product.id}
            produto={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryTapetesPage;
