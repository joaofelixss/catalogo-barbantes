// App.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import styles from "./App.module.css";
import logoImage from "./assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Importe o ToastContainer e toast
import "react-toastify/dist/ReactToastify.css"; // Importe os estilos do react-toastify

const App = () => {
  const [products] = useState([
    { id: 1, name: "Barroco Maxcolor", color: "Azul Royal", price: 25.9 },
    { id: 2, name: "Amigurumi", color: "Amarelo Canário", price: 12.5 },
    { id: 3, name: "Duna", color: "Verde Musgo", price: 18.75 },
    { id: 4, name: "Charme", color: "Vermelho Paixão", price: 15.3 },
  ]);
  const [cartItems, setCartItems] = useState([]);

  const whatsappNumber = '5569992784621';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleAddToCart = (productId) => {
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

  const handleQuantityChange = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: parseInt(quantity, 10) }
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

    window.open(`${whatsappLink}?text=${encodedMessage}`, '_blank');
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
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <Link to="/" className={styles.logo}>
            <img
              src={logoImage}
              alt="Logo da Loja"
              className={styles.logoImage}
            />
          </Link>
          <ul className={styles.centerNav}>
            <li className={styles.navItem}>
              <a href="#cardapio" className={styles.navLink}>
                Cardápio
              </a>
            </li>
            <li className={styles.navItem}>
              <Link to="/carrinho" className={styles.navLink}>
                <div className={styles.cartIconContainer}>
                  <FaShoppingCart className={styles.cartIcon} />
                  {cartItemCount > 0 && (
                    <span className={styles.cartCount}>{cartItemCount}</span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappLink}
          >
            Peça Aqui
          </a>
        </div>
      </nav>

      <Routes>
      <Route path="/" element={<HomePage onAddToCart={handleAddToCart} products={products} />} />
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