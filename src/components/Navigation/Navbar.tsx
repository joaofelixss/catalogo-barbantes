// src/components/Navigation/Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faSearch,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp as faWhatsappBrand } from "@fortawesome/free-brands-svg-icons"; // Renomeando para evitar conflito
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importe useLocation

interface NavbarProps {
  cartItemCount: number;
  whatsappLink: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, whatsappLink }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const navigate = useNavigate(); // Hook para navegação
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation(); // Hook para obter informações sobre a localização atual

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

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, navRef]); // Adicionei navRef como dependência

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Link to="/" aria-label="Página inicial">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="Logo da Loja"
              className={styles.logo}
            />
          </Link>
        </div>

        <div className={styles.searchContainer}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              id="searchInput"
              placeholder="Buscar" // Placeholder agora contém "Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Buscar"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </div>

      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label={
          isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
        }
        aria-expanded={isMenuOpen}
        aria-controls="navbarNav"
      >
        {isMenuOpen ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>

      <ul
        className={`${styles.navList} ${isMenuOpen ? styles.open : ""}`}
        id="navbarNav"
      >
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink} aria-label="Página inicial">
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/barbantes"
            className={styles.navLink}
            aria-label="Ver barbantes"
          >
            Barbantes
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/linhas" className={styles.navLink} aria-label="Ver linhas">
            Linhas
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/tapetes"
            className={styles.navLink}
            aria-label="Ver tapetes"
          >
            Tapetes
          </Link>
        </li>
        <li className={`${styles.navItem} ${styles.dropdown}`}>
          {" "}
          {/* Adicionei a classe dropdown ao item do carrinho */}
          <Link
            to="/carrinho"
            className={`${styles.navLink} ${styles.cartLink}`}
            aria-label={`Carrinho de compras. ${cartItemCount} itens`}
          >
            Carrinho ({cartItemCount})
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={styles.cartIcon}
            />
          </Link>
          <ul className={styles.dropdownMenu}>
            {" "}
            {/* Adicionei o submenu de favoritos */}
            <li className={styles.navItem}>
              <Link
                to="/favoritos"
                className={styles.navLink}
                aria-label="Lista de favoritos"
              >
                Favoritos{" "}
                <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
              </Link>
            </li>
          </ul>
        </li>
        {/* Removido o link de contato via WhatsApp do menu principal */}
      </ul>

      {/* Carrinho flutuante (visível em telas menores) */}
      <Link
        to="/carrinho"
        className={styles.floatingCart}
        aria-label={`Carrinho de compras. ${cartItemCount} itens`}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItemCount > 0 && (
          <span className={styles.cartCounter}>{cartItemCount}</span>
        )}
      </Link>

      {/* Botão de contato via WhatsApp flutuante (visível em telas menores) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWhatsapp}
        aria-label="Contato via WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsappBrand} />
      </a>
    </nav>
  );
};

export default Navbar;
