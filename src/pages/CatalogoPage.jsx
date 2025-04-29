// src/pages/CatalogoPage.js
import React, { useState } from "react";
import ProductList from "../components/ProductList";

const CatalogoPage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Barroco Maxcolor", color: "Azul Royal", price: 25.9 },
    { id: 2, name: "Amigurumi", color: "Amarelo Canário", price: 12.5 },
    { id: 3, name: "Duna", color: "Verde Musgo", price: 18.75 },
    { id: 4, name: "Charme", color: "Vermelho Paixão", price: 15.3 },
    // ... mais produtos (você pode adicionar mais aqui para teste)
  ]);

  return (
    <div>
      <h1>Catálogo de Barbantes</h1>
      <ProductList products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default CatalogoPage;
