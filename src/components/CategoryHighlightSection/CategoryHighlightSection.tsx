// src/components/CategoryHighlightSection/CategoryHighlightSection.tsx
import React from "react";
import styles from "./CategoryHighlightSection.module.css";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";

interface CategoryHighlightSectionProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  viewMoreLink: string;
}

const CategoryHighlightSection: React.FC<CategoryHighlightSectionProps> = ({
  title,
  products,
  onAddToCart,
  viewMoreLink,
}) => {
  return (
    <section className={styles.categorySection}>
      <h2>{title}</h2>
      <div className={styles.productList}>
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className={styles.productCardWrapper}>
            <Link to={`/produto/${product.id}`} className={styles.productLink}>
              <img
                src={product.images[0]}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>
                {product.name} - {product.color}
              </h3>
              <p>R$ {product.price.toFixed(2)}</p>
            </Link>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onAddToCart(product);
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
      <div className={styles.viewMore}>
        <Link to={viewMoreLink}>Ver Mais {title.split(" ")[2]}</Link>{" "}
        {/* Tentativa de tornar "Ver Mais" dinâmico */}
      </div>
    </section>
  );
};

export default CategoryHighlightSection;
