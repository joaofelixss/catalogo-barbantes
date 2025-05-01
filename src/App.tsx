// src/App.tsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage/HomePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import PedidoEnviadoPage from "./pages/PedidoEnviadoPage/PedidoEnviadoPage";
import CategoryBarbantesPage from "./pages/Category/CategoryBarbantesPage"; // Importe as novas páginas
import CategoryLinhasPage from "./pages/Category/CategoryLinhasPage";
import CategoryTapetesPage from "./pages/Category/CategoryTapetesPage";

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

    // Novos produtos: Barbante Eco Brasil
    {
      id: 5,
      name: "Barbante Eco Brasil",
      color: "Azul Bebê",
      price: 19.9,
      descricao: "Barbante ecológico de alta qualidade.",
      images: ["/images/barbante-eco-brasil-azul.jpg"], // Adicione as imagens reais
      num: "6",
    },
    {
      id: 6,
      name: "Barbante Eco Brasil",
      color: "Vermelho Vivo",
      price: 19.9,
      descricao: "Barbante ecológico de alta qualidade.",
      images: ["/images/barbante-eco-brasil-vermelho.jpg"], // Adicione as imagens reais
      num: "6",
    },
    {
      id: 7,
      name: "Barbante Eco Brasil",
      color: "Cru",
      price: 18.5,
      descricao: "Barbante ecológico de alta qualidade.",
      images: ["/images/barbante-eco-brasil-cru.jpg"], // Adicione as imagens reais
      num: "8",
    },
    // Adicione as outras cores do Barbante Eco Brasil aqui...

    // Novos produtos: Linhas Barroco
    {
      id: 15,
      name: "Barroco Multicolor",
      color: "Floral",
      price: 32.5,
      descricao: "Fio Barroco com cores vibrantes e mescladas.",
      images: ["/images/barroco-multicolor-floral.jpg"], // Adicione as imagens reais
    },
    {
      id: 16,
      name: "Barroco Decore",
      color: "Avelã",
      price: 28.0,
      descricao: "Fio Barroco com toque felpudo, ideal para detalhes.",
      images: ["/images/barroco-decore-avela.jpg"], // Adicione as imagens reais
    },
    // Adicione outras linhas Barroco aqui...

    // Novos produtos: CrocHês (Tapetes)
    {
      id: 20,
      name: "Tapete de Crochê Geométrico",
      color: "Cinza e Amarelo",
      price: 75.0,
      descricao: "Tapete feito à mão com design geométrico moderno.",
      images: ["/images/tapete-croche-geometrico.jpg"], // Adicione as imagens reais
    },
    {
      id: 21,
      name: "Tapete de Crochê Floral",
      color: "Tons de Rosa",
      price: 89.9,
      descricao: "Tapete artesanal com delicadas flores em crochê.",
      images: ["/images/tapete-croche-floral.jpg"], // Adicione as imagens reais
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
          <Route path="/pedido-enviado" element={<PedidoEnviadoPage />} />
          <Route
            path="/barbantes"
            element={
              <CategoryBarbantesPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/linhas"
            element={
              <CategoryLinhasPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/tapetes"
            element={
              <CategoryTapetesPage
                products={products}
                onAddToCart={handleAddToCart}
              />
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </FavoritesProvider>
  );
};

export default App;
