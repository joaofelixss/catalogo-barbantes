import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import styles from "./App.module.css";
import logoImage from "./assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navigation/Navbar";
import { Product, CartItem } from "./types/product";

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const whatsappNumber = "5569992784621";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      const existingItem = cartItems.find((item) => item.id === productId);
      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        toast.success(
          `${productToAdd.name} adicionado novamente ao carrinho!`,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        setCartItems([...cartItems, { id: productId, quantity: 1 }]);
        toast.success(`${productToAdd.name} adicionado ao carrinho!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: parseInt(String(quantity), 10) }
          : item
      )
    );
  };

  const handleEmptyCart = () => {
    setCartItems([]);
    toast.info("Carrinho esvaziado!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
        return `${item.quantity} x ${
          product ? product.name : "Produto Desconhecido"
        }`;
      })
      .join("\n");

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
