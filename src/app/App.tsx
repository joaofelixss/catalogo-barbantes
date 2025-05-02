// src/app/App.tsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "../pages/HomePage/HomePage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import ProductDetailsPage from "../features/product-catalog/pages/ProductDetailsPage";
import SearchResultsPage from "../features/search/pages/SearchResultsPage";
import PedidoEnviadoPage from "../features/checkout/pages/PedidoEnviadoPage";
import CategoryBarbantesPage from "../features/product-catalog/pages/CategoryBarbantesPage";
import CategoryLinhasPage from "../features/product-catalog/pages/CategoryLinhasPage";
import CategoryTapetesPage from "../features/product-catalog/pages/CategoryTapetesPage";

import ShoppingCart from "../features/shopping-cart/components/ShoppingCart";
import CheckoutForm from "../features/checkout/components/CheckoutForm";
import Navbar from "../shared/components/Navbar";

import { FavoritesProvider } from "../shared/contexts/FavoritesContext";
import { useCartStore } from "../store/cartStore";
import { useProductStore } from "../store/productStore";
import { Product } from "../types/product";
import styles from "./App.module.css";

const App: React.FC = () => {
  const {
    items: cartItems,
    addItem: handleAddToCartZustand,
    increaseQuantity: handleQuantityChangeZustand,
    decreaseQuantity: handleDecreaseQuantityZustand,
    clearCart: handleEmptyCartZustand,
    getTotalItems,
    getTotalPrice,
    removeItem: handleRemoveFromCartZustand,
  } = useCartStore();
  const { setProducts } = useProductStore();
  const products = useProductStore((state) => state.products);
  const navigate = useNavigate();

  const [whatsappNumber] = useState("5569992784621");
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleAddToCart = (product: Product) => {
    handleAddToCartZustand(product);
    toast.success(`${product.name} adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity > 0) {
      handleQuantityChangeZustand(productId);
    } else if (quantity === 0) {
      handleRemoveFromCartZustand(productId);
    }
  };

  const handleEmptyCart = () => {
    handleEmptyCartZustand();
  };

  const handleRemoveFromCart = (productId: number) => {
    const productToRemove = products.find((p) => p.id === productId);
    handleRemoveFromCartZustand(productId);
    if (productToRemove) {
      toast.error(`${productToRemove.name} removido do carrinho!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const calculateTotal = () => {
    return getTotalPrice().toFixed(2);
  };

  useEffect(() => {
    const initialProducts: Product[] = [
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
      {
        id: 5,
        name: "Barbante Eco Brasil",
        color: "Azul Bebê",
        price: 19.9,
        descricao: "Barbante ecológico de alta qualidade.",
        images: ["/images/barbante-eco-brasil-azul.jpg"],
        num: "6",
      },
      {
        id: 6,
        name: "Barbante Eco Brasil",
        color: "Vermelho Vivo",
        price: 19.9,
        descricao: "Barbante ecológico de alta qualidade.",
        images: ["/images/barbante-eco-brasil-vermelho.jpg"],
        num: "6",
      },
      {
        id: 7,
        name: "Barbante Eco Brasil",
        color: "Cru",
        price: 18.5,
        descricao: "Barbante ecológico de alta qualidade.",
        images: ["/images/barbante-eco-brasil-cru.jpg"],
        num: "8",
      },
      {
        id: 15,
        name: "Barroco Multicolor",
        color: "Floral",
        price: 32.5,
        descricao: "Fio Barroco com cores vibrantes e mescladas.",
        images: ["/images/barroco-multicolor-floral.jpg"],
      },
      {
        id: 16,
        name: "Barroco Decore",
        color: "Avelã",
        price: 28.0,
        descricao: "Fio Barroco com toque felpudo, ideal para detalhes.",
        images: ["/images/barroco-decore-avela.jpg"],
      },
      {
        id: 20,
        name: "Tapete de Crochê Geométrico",
        color: "Cinza e Amarelo",
        price: 75.0,
        descricao: "Tapete feito à mão com design geométrico moderno.",
        images: ["/images/tapete-croche-geometrico.jpg"],
      },
      {
        id: 21,
        name: "Tapete de Crochê Floral",
        color: "Tons de Rosa",
        price: 89.9,
        descricao: "Tapete artesanal com delicadas flores em crochê.",
        images: ["/images/tapete-croche-floral.jpg"],
      },
    ];
    setProducts(initialProducts);
  }, [setProducts]);

  return (
    <FavoritesProvider>
      <div className={styles.appContainer}>
        <Navbar cartItemCount={getTotalItems()} whatsappLink={whatsappLink} />
        <div className={styles.mainContent}>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={handleAddToCart}
                  products={products.slice(0, 8)}
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
              path="/carrinho"
              element={<ShoppingCart />} // Remova as props aqui
            />
            <Route
              path="/checkout"
              element={<CheckoutForm />} // Remova as props aqui também
            />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </FavoritesProvider>
  );
};

export default App;
