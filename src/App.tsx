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
    },
    {
      id: 2,
      name: "Amigurumi",
      color: "Amarelo Canário",
      price: 12.5,
      descricao: "Fio de algodão ideal para a técnica japonesa de amigurumi.",
    },
    {
      id: 3,
      name: "Duna",
      color: "Verde Musgo",
      price: 18.75,
      descricao: "Fio leve e macio para peças de vestuário.",
    },
    {
      id: 4,
      name: "Charme",
      color: "Vermelho Paixão",
      price: 15.3,
      descricao: "Fio de algodão penteado com toque macio e brilho.",
    },
  ]);

  const { cartItems, handleAddToCart, handleQuantityChange, handleEmptyCart } =
    useCart();

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
        return `${item.quantity} x ${product.name}`;
      })
      .filter(Boolean) // Remove os valores null do array
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
    const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n${orderDetails}\n\nTotal: R$ ${total}`;
    const encodedMessage = encodeURIComponent(message);

    window.open(`${whatsappLink}?text=${encodedMessage}`, "_blank");
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
      }, 0)
      .toFixed(2);
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <Navbar cartItemCount={cartItemCount} whatsappLink={whatsappLink} />{" "}
      {/* Use o componente Navbar */}
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
            />
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;