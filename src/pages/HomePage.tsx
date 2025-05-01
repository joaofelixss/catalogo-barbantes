// src/pages/HomePage.tsx
import React from "react";
import styles from "./HomePage.module.css";
import { Product } from "../types/product";
import HeroSection from "../components/Hero/HeroSection";
import ProductList from "../components/ProductList/ProductList";
import ContactSection from "../components/Contact/ContactSection";
import Footer from "../components/Footer/Footer";

interface HomePageProps {
  onAddToCart: (productId: number) => void;
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart, products }) => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <ProductList
        products={products}
        onAddToCart={onAddToCart}
        // Remova a prop productImages
        // productImages={productImages}
      />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
