// src/pages/HomePage.tsx
import React from "react";
import styles from "./HomePage.module.css";
import { Product } from "../types/product";
import HeroSection from "../components/Hero/HeroSection";
import ContactSection from "../components/Contact/ContactSection";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom"; // Importe o Link do React Router

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart, products }) => {
  // Filtrar produtos por categoria (abordagem inicial baseada no nome)
  const barbanteEcoBrasil = products.filter(
    (product) =>
      product.name.includes("Barbante Eco Brasil") ||
      product.name.includes("Barroco Maxcolor") ||
      product.name.includes("Amigurumi") ||
      product.name.includes("Duna") ||
      product.name.includes("Charme")
  );
  const linhasBarroco = products.filter(
    (product) =>
      product.name.includes("Barroco Multicolor") ||
      product.name.includes("Barroco Decore")
  );
  const crochesTapetes = products.filter((product) =>
    product.name.includes("Tapete de Crochê")
  );

  return (
    <div className={styles.container}>
      <HeroSection />

      <section className={styles.categorySection}>
        <h2>Destaque dos Barbantes</h2>
        <div className={styles.productList}>
          {barbanteEcoBrasil.slice(0, 4).map((product) => (
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
        <div className={styles.viewMore}>
          <Link to="/barbantes">Ver Mais Barbantes</Link>
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2>Destaque das Linhas Barroco</h2>
        <div className={styles.productList}>
          {linhasBarroco.slice(0, 4).map((product) => (
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
        <div className={styles.viewMore}>
          <Link to="/linhas">Ver Mais Linhas Barroco</Link>
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2>Destaque dos Tapetes de Crochê</h2>
        <div className={styles.productList}>
          {crochesTapetes.slice(0, 4).map((product) => (
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
        <div className={styles.viewMore}>
          <Link to="/tapetes">Ver Mais Tapetes</Link>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
