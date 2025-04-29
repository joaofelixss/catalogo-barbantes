// App.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import styles from "./App.module.css"; 
import logoImage from './assets/logo.png';

const App = () => {
  const [products] = useState([
    { id: 1, name: "Barroco Maxcolor", color: "Azul Royal", price: 25.9 },
    { id: 2, name: "Amigurumi", color: "Amarelo Canário", price: 12.5 },
    { id: 3, name: "Duna", color: "Verde Musgo", price: 18.75 },
    { id: 4, name: "Charme", color: "Vermelho Paixão", price: 15.3 },
    // ... mais produtos
  ]);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productId, quantity) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { id: productId, quantity: quantity || 1 }]); // Garante que a quantidade seja pelo menos 1
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: parseInt(quantity, 10) }
          : item
      )
    );
  };

  console.log("App Render - Cart Items:", cartItems);

  const whatsappNumber = '5569992784621'; // Substitua pelo seu número!
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <Link to="/" className={styles.logo}>
            <img src={logoImage} alt="Logo da Loja" className={styles.logoImage} />
          </Link>
          <ul className={styles.centerNav}>
            <li className={styles.navItem}>
              <a href="#cardapio" className={styles.navLink}>Cardápio</a>
            </li>
            <li className={styles.navItem}>
              <Link to="/carrinho" className={styles.navLink}>Carrinho</Link>
            </li>
          </ul>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>
            Peça Aqui
          </a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carrinho" element={<ShoppingCart cartItems={cartItems} onQuantityChange={handleQuantityChange} products={products} />} />
      </Routes>
    </div>
  );
};

export default App;