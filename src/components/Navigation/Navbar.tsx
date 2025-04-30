import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../App.module.css'; // Ajuste o caminho se necessário
import logoImage from '../../assets/logo.png'; // Ajuste o caminho se necessário
import { FaShoppingCart } from 'react-icons/fa';

interface NavbarProps {
  cartItemCount: number;
  whatsappLink: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, whatsappLink }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <img
            src={logoImage}
            alt="Logo da Loja"
            className={styles.logoImage}
          />
        </Link>
        <ul className={styles.centerNav}>
          <li className={styles.navItem}>
            <a href="#cardapio" className={styles.navLink}>
              Cardápio
            </a>
          </li>
          <li className={styles.navItem}>
            <Link to="/carrinho" className={styles.navLink}>
              <div className={styles.cartIconContainer}>
                <FaShoppingCart className={styles.cartIcon} />
                {cartItemCount > 0 && (
                  <span className={styles.cartCount}>{cartItemCount}</span>
                )}
              </div>
            </Link>
          </li>
        </ul>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappLink}
        >
          Peça Aqui
        </a>
      </div>
    </nav>
  );
};

export default Navbar;