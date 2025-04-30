// src/components/Navigation/Navbar.tsx
import React from "react";
import styles from "./Navbar.module.css";
import logoImage from "../../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface NavbarProps {
  cartItemCount: number;
  whatsappLink: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, whatsappLink }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" aria-label="Página inicial">
          <img src={logoImage} alt="Logo da Loja" className={styles.logo} />
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink} aria-label="Página inicial">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/carrinho"
            className={styles.navLink}
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
    </nav>
  );
};

export default Navbar;
