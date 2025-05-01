// src/pages/HomePage.tsx
import React from "react";
import styles from "./HomePage.module.css";
import { Product } from "../types/product";
import HeroSection from "../components/Hero/HeroSection";
import ProductList from "../components/ProductList/ProductList";
import ContactSection from "../components/Contact/ContactSection";
import Footer from "../components/Footer/Footer";

// Defina o tipo para productImages
interface ProductImageMap {
  [key: number]: string | null | undefined;
}

// Mapeie as imagens para os IDs correspondentes
const productImages: ProductImageMap = {
  1: "/images/produto1.png",
  2: "/images/produto2.png",
  3: "/images/produto3.png",
  4: null,
};

interface HomePageProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart, products }) => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <ProductList
        products={products}
        onAddToCart={onAddToCart}
        productImages={productImages} // Passe a prop aqui
      />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
