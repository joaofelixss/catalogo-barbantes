// src/components/Navigation/Navbar.tsx
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa"; // Importe o FaHeart
import { Link, useNavigate } from "react-router-dom"; // Importe useNavigate

interface NavbarProps {
  cartItemCount: number;
  whatsappLink: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, whatsappLink }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const navigate = useNavigate(); // Hook para navegação

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" aria-label="Página inicial">
          <img
            src="/images/logo.png"
            alt="Logo da Loja"
            className={styles.logo}
          />
          {/* Se você colocou a logo em public/images/logo, o caminho seria: */}
          {/* <img src="/images/logo/logo.png" alt="Logo da Loja" className={styles.logo} /> */}
        </Link>
      </div>

      {/* Botão de menu hambúrguer (visível em telas menores) */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        <div className={styles.menuIcon}></div>
        <div className={styles.menuIcon}></div>
        <div className={styles.menuIcon}></div>
      </button>

      <div className={styles.searchContainer}>
        {" "}
        {/* Container para o formulário de busca */}
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar barbantes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </form>
      </div>

      <ul className={`${styles.navList} ${isMenuOpen ? styles.open : ""}`}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink} aria-label="Página inicial">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/favoritos"
            className={styles.navLink}
            aria-label="Lista de favoritos"
          >
            Favoritos {(FaHeart as React.FC)({ className: styles.heartIcon })}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/carrinho"
            className={`${styles.navLink} ${styles.cartLink}`}
            aria-label={`Carrinho de compras. ${cartItemCount} itens`}
          >
            Carrinho ({cartItemCount})
            {(FaShoppingCart as React.FC)({ className: styles.cartIcon })}
          </Link>
        </li>
        <li className={styles.navItem}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
            aria-label="Contato via WhatsApp"
          >
            Contato via WhatsApp
          </a>
        </li>
      </ul>

      {/* Carrinho flutuante (visível em telas menores) */}
      <Link
        to="/carrinho"
        className={styles.floatingCart}
        aria-label={`Carrinho de compras. ${cartItemCount} itens`}
      >
        {(FaShoppingCart as React.FC)({})}
        {cartItemCount > 0 && (
          <span className={styles.cartCounter}>{cartItemCount}</span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
