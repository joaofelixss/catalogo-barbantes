// src/components/CategoryHighlightSection/CategoryHighlightSection.tsx
import React, { useRef } from "react";
import styles from "./CategoryHighlightSection.module.css";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";
import FavoriteButton from "../ProductCard/FavoriteButton";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Importe os ícones se o FavoriteButton usar

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
  const productListRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (productListRef.current) {
      productListRef.current.scrollLeft -= productListRef.current.offsetWidth;
    }
  };

  const handleScrollRight = () => {
    if (productListRef.current) {
      productListRef.current.scrollLeft += productListRef.current.offsetWidth;
    }
  };

  return (
    <section className={styles.categorySection}>
      <h2>{title}</h2>
      <div className={styles.carouselContainer}>
        <button
          className={styles.carouselButtonLeft}
          onClick={handleScrollLeft}
        >
          &lt;
        </button>
        <div ref={productListRef} className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCardWrapper}>
              <div className={styles.favoriteIcon}>
                <FavoriteButton productId={product.id} product={product} />
              </div>
              <Link
                to={`/produto/${product.id}`}
                className={styles.productLink}
              >
                <img
                  src={`${process.env.PUBLIC_URL}${product.images[0]}`} // ADICIONADO PUBLIC_URL AQUI
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
        <button
          className={styles.carouselButtonRight}
          onClick={handleScrollRight}
        >
          &gt;
        </button>
      </div>
      <div className={styles.viewMore}>
        <Link to={viewMoreLink}>Ver Mais {title.split(" ")[2]}</Link>
      </div>
    </section>
  );
};

export default CategoryHighlightSection;
