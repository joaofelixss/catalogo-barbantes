import React from "react";
import styles from "./HomePage.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaShoppingCart } from "react-icons/fa";
import { Product } from "../types/product";
import HeroSection from "../components/Hero/HeroSection"; // Importe o HeroSection

// Importe as imagens dos produtos (substitua pelos caminhos reais)
import produto1Image from "../assets/produto1.png";
import produto2Image from "../assets/produto2.png";
import produto3Image from "../assets/produto3.png";

// Defina o tipo para productImages
interface ProductImageMap {
  [key: number]: string | null | undefined;
}

// Mapeie as imagens para os IDs correspondentes (isso é importante)
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
  const handleAddToCartClick = (productId: number) => {
    onAddToCart(productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      alert(`${product.name} adicionado ao carrinho!`);
    }
  };

  return (
    <div className={styles.container}>
      <HeroSection /> {/* Use o componente HeroSection */}

      <section id="cardapio" className={styles.cardapioSection}>
        <h2>Nosso Cardápio</h2>
        <div className={styles.listaDeProdutos}>
          {products.map((produto) => (
            <div key={produto.id} className={styles.produtoCard}>
              <img
                src={productImages[produto.id] || "URL_DA_IMAGEM_PADRAO"}
                alt={produto.name}
                className={styles.produtoImagem}
              />
              <h3 className={styles.produtoTitulo}>{produto.name}</h3>
              <p className={styles.produtoDescricao}>{produto.descricao}</p>
              <div className={styles.produtoPrecoArea}>
                <span className={styles.produtoPreco}>R$ {produto.price.toFixed(2)}</span>
                <button
                  className={styles.adicionarAoCarrinho}
                  onClick={() => handleAddToCartClick(produto.id)}
                >
                  <FaShoppingCart /> Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Loja de Barbantes. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;