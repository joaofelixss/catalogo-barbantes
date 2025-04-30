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
        <Link to="/">
          <img src={logoImage} alt="Logo da Loja" className={styles.logo} />
        </Link>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/carrinho" className={styles.navLink}>
            Carrinho ({cartItemCount}){" "}
            <FaShoppingCart className={styles.cartIcon} />
          </Link>
        </li>
        <li className={styles.navItem}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            Contato via WhatsApp
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
