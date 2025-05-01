// src/pages/CategoryBarbantesPage.tsx
import React from "react";
import { Product } from "../../types/product";
import styles from "./CategoryPage.module.css";
import ProductCard from "../../components/ProductCard/ProductCard"; 

interface CategoryPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const CategoryBarbantesPage: React.FC<CategoryPageProps> = ({
  products,
  onAddToCart,
}) => {
  const barbantes = products.filter(
    (product) =>
      product.name.includes("Barbante Eco Brasil") ||
      product.name.includes("Barroco Maxcolor") ||
      product.name.includes("Amigurumi") ||
      product.name.includes("Duna") ||
      product.name.includes("Charme") // Adicione outros nomes de barbantes se houver
  );

  return (
    <div className={styles.categoryPageContainer}>
      <h1>Nossos Barbantes</h1>
      <div className={styles.productList}>
        {barbantes.map((product) => (
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

export default CategoryBarbantesPage;
