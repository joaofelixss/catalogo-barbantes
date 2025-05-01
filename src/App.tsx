// src/App.tsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import PedidoEnviadoPage from "./pages/PedidoEnviadoPage"; // Importe a nova página

import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import Navbar from "./components/Navigation/Navbar";

import { FavoritesProvider } from "./contexts/FavoritesContext";
import useCart from "./hooks/useCart";

import { Product } from "./types/product";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Barroco Maxcolor",
      color: "Azul Royal",
      price: 25.9,
      descricao: "Fio de algodão mercerizado para peças de decoração.",
      images: [
        "/images/barbantes-bonitos.jpg",
        "/images/produto3.png",
        "/images/produto2.png",
      ],
      num: "6",
    },
    {
      id: 2,
      name: "Amigurumi",
      color: "Amarelo Canário",
      price: 12.5,
      descricao: "Fio de algodão ideal para a técnica japonesa de amigurumi.",
      images: [
        "/images/barbantes-bonitos.jpg",
        "/images/produto3.png",
        "/images/produto2.png",
      ],
      num: "6",
    },
    {
      id: 3,
      name: "Duna",
      color: "Verde Musgo",
      price: 18.75,
      descricao: "Fio leve e macio para peças de vestuário.",
      images: [
        "/images/barbantes-bonitos.jpg",
        "/images/produto3.png",
        "/images/produto2.png",
      ],
      num: "8",
    },
    {
      id: 4,
      name: "Charme",
      color: "Vermelho Paixão",
      price: 15.3,
      descricao: "Fio de algodão penteado com toque macio e brilho.",
      images: [
        "/images/barbantes-bonitos.jpg",
        "/images/produto3.png",
        "/images/produto2.png",
      ],
      num: "8",
    },
  ]);

  const {
    cartItems,
    handleAddToCart,
    handleQuantityChange,
    handleEmptyCart,
    calculateTotal,
    handleRemoveFromCart,
  } = useCart(() => products);

  const whatsappNumber = "5569992784621";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <FavoritesProvider>
      <div>
        <Navbar cartItemCount={cartItemCount} whatsappLink={whatsappLink} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage onAddToCart={handleAddToCart} products={products} />
            }
          />
          <Route
            path="/carrinho"
            element={
              <ShoppingCart
                cartItems={cartItems}
                onQuantityChange={handleQuantityChange}
                products={products}
                onEmptyCart={handleEmptyCart}
                onCheckout={() => navigate("/checkout")}
                onRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutForm
                cartItems={cartItems}
                products={products}
                calculateTotal={calculateTotal}
                onEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            path="/favoritos"
            element={
              <FavoritesPage
                products={products}
                onAddToCart={handleAddToCart}
                productImages={{}}
              />
            }
          />
          <Route
            path="/produto/:id"
            element={
              <ProductDetailsPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/buscar"
            element={
              <SearchResultsPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/pedido-enviado" element={<PedidoEnviadoPage />} />{" "}
          {/* Adicione a rota para a página de pedido enviado */}
        </Routes>
        <ToastContainer />
      </div>
    </FavoritesProvider>
  );
};

export default App;
