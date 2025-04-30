import React from "react";
import styles from "./HomePage.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaShoppingCart } from "react-icons/fa";
import { Product } from "../types/product";
import HeroSection from "../components/Hero/HeroSection";
import ProductList from "../components/ProductList/ProductList"; // Importe o ProductList

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
      <ProductList products={products} onAddToCart={onAddToCart} productImages={productImages} /> {/* Use o componente ProductList */}

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Sua Loja de Barbantes. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;