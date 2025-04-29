// App.js
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogoPage from "./pages/CatalogoPage";
import ShoppingCart from "./components/ShoppingCart";

const App = () => {
  const [products, setProducts] = useState([
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

  console.log("App Render - Cart Items:", cartItems); // ADICIONE ESTE LOG

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalogo">Catálogo</Link>
          </li>
          <li>
            <Link to="/carrinho">Carrinho</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage onAddToCart={handleAddToCart} />} />
        <Route path="/carrinho" element={<ShoppingCart cartItems={cartItems} onQuantityChange={handleQuantityChange} products={products} />} />
      </Routes>
    </div>
  );
};

export default App;