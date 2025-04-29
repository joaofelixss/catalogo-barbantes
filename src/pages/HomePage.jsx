import React from "react";
import styles from "./HomePage.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaShoppingCart } from "react-icons/fa";
import heroImage from "../assets/barbantes-bonitos.jpg";

// Importe as imagens dos produtos (substitua pelos caminhos reais)
import produto1Image from "../assets/produto1.png";
import produto2Image from "../assets/produto2.png";
import produto3Image from "../assets/produto3.png";

// Mapeie as imagens para os IDs correspondentes (isso é importante)
const productImages = {
  1: produto1Image,
  2: produto2Image,
  3: produto3Image,
};

const HomePage = ({ onAddToCart, products }) => {
  const handleAddToCartClick = (productId) => {
    onAddToCart(productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      alert(`${product.name} adicionado ao carrinho!`);
    }
  };
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroLeftColumn}>
          <h2 className={styles.heroMainText}>
            Os melhores barbantes<br></br> da região
          </h2>
          <p className={styles.heroShortText}>
            Encontre uma vasta seleção de fios de alta qualidade para todos os
            seus projetos de crochê e tricô.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.heroButton}>Ver Cardápio</button>
            <a href="tel:+5569992784621" className={styles.phoneButton}>
              <FaPhone className={styles.phoneIcon} /> (69) 99278-4621
            </a>
          </div>
          <div className={styles.socialLinks}>
            <a
              href="https://wa.me/SEU_NUMERO_DE_WHATSAPP"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaWhatsapp className={styles.socialIcon} /> WhatsApp
            </a>
            <a
              href="https://instagram.com/SEU_INSTAGRAM"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaInstagram className={styles.socialIcon} /> Instagram
            </a>
            <a
              href="https://facebook.com/SUA_PAGINA"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaFacebook className={styles.socialIcon} /> Facebook
            </a>
          </div>
        </div>
        <div className={styles.heroRightColumn}>
          <img
            src={heroImage}
            alt="Barbantes Bonitos"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section id="cardapio" className={styles.cardapioSection}>
        <h2>Nosso Cardápio</h2>
        <div className={styles.listaDeProdutos}>
          {products.map((produto) => (
            <div key={produto.id} className={styles.produtoCard}>
              <img
                src={productImages[produto.id] || "URL_DA_IMAGEM_PADRAO"} // Use o mapeamento de imagens
                alt={produto.name}
                className={styles.produtoImagem}
              />
              <h3 className={styles.produtoTitulo}>{produto.name}</h3>
              {/* Você pode querer exibir a cor aqui também */}
              <p className={styles.produtoDescricao}>{produto.descricao}</p>
              <div className={styles.produtoPrecoArea}>
                <span className={styles.produtoPreco}>R$ {produto.price.toFixed(2)}</span> {/* Use o preço do estado */}
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
        <p>
          &copy; {new Date().getFullYear()} Loja de Barbantes. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;