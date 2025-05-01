// src/App.tsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import styles from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navigation/Navbar";
import { Product } from "./types/product";
import useCart from "./hooks/useCart";

const App: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Barroco Maxcolor",
      color: "Azul Royal",
      price: 25.9,
      descricao: "Fio de algodão mercerizado para peças de decoração.",
      image: "/images/barbantes-bonitos.jpg",
    },
    {
      id: 2,
      name: "Amigurumi",
      color: "Amarelo Canário",
      price: 12.5,
      descricao: "Fio de algodão ideal para a técnica japonesa de amigurumi.",
      image: "/images/barbantes-bonitos2.jpg",
    },
    {
      id: 3,
      name: "Duna",
      color: "Verde Musgo",
      price: 18.75,
      descricao: "Fio leve e macio para peças de vestuário.",
      image: "/images/produto2.png",
    },
    {
      id: 4,
      name: "Charme",
      color: "Vermelho Paixão",
      price: 15.3,
      descricao: "Fio de algodão penteado com toque macio e brilho.",
      image: "/images/produto3.png",
    },
  ]);

  const {
    cartItems,
    handleAddToCart,
    handleQuantityChange,
    handleEmptyCart,
    calculateTotal,
    handleRemoveFromCart,
  } = useCart(() => products); // Passa uma função que retorna o estado products

  const whatsappNumber = "5569992784621";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn(
        "Seu carrinho está vazio. Adicione itens para fazer o pedido.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    const orderDetails = cartItems
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
          console.error(
            `Produto com ID ${item.id} não encontrado no array de produtos.`
          );
          return null;
        }
        return `- ${item.quantity} x ${product.name} - R$ **${(
          product.price * item.quantity
        ).toFixed(2)}**`;
      })
      .filter(Boolean)
      .join("\n");

    if (orderDetails.length === 0 && cartItems.length > 0) {
      console.error(
        "Erro crítico: Nenhum produto válido encontrado no carrinho durante o checkout."
      );
      toast.error(
        "Houve um erro ao preparar seu pedido. Por favor, revise seu carrinho.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    const total = calculateTotal();
    const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n${orderDetails}\n\nTotal do pedido: R$ **${total}**\n\nQual o valor do frete para minha região?`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`${whatsappLink}?text=${encodedMessage}`, "_blank");
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
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
              onCheckout={handleCheckout}
              onRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
