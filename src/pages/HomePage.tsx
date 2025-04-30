// src/pages/HomePage.tsx
import React from "react";
import styles from "./HomePage.module.css";
import { Product } from "../types/product";
import HeroSection from "../components/Hero/HeroSection";
import ProductList from "../components/ProductList/ProductList";
import ContactSection from "../components/Contact/ContactSection";
import Footer from "../components/Footer/Footer";

// Importe as imagens dos produtos
import produto1Image from "../assets/produto1.png";
import produto2Image from "../assets/produto2.png";
import produto3Image from "../assets/produto3.png";

// Defina o tipo para productImages
interface ProductImageMap {
  [key: number]: string | null | undefined;
}

// Mapeie as imagens para os IDs correspondentes
const productImages: ProductImageMap = {
  1: produto1Image,
  2: produto2Image,
  3: produto3Image,
  4: null,
};

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
        productImages={productImages}
      />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
