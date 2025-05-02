// src/features/shopping-cart/components/ShoppingCart.tsx
import React, { useState } from "react";
import styles from "./ShoppingCart.module.css";
import { Product } from "../../../types/product";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../../store/cartStore";
import { useProductStore } from "../../../store/productStore";

const ShoppingCart: React.FC = () => {
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const products = useProductStore((state) => state.products);
  const navigate = useNavigate();
  const [cartEmptyMessageVisible, setCartEmptyMessageVisible] = useState(false);

  const calculateTotal = () => {
    return getTotalPrice().toFixed(2).replace(".", ",");
  };

  const handleEmptyCart = () => {
    clearCart();
    setCartEmptyMessageVisible(true);
    setTimeout(() => {
      setCartEmptyMessageVisible(false);
    }, 3000);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity > 0) {
      const itemInCart = cartItems.find(
        (item) => item.product.id === productId
      );
      if (itemInCart) {
        if (quantity > itemInCart.quantity) {
          increaseQuantity(productId);
        } else if (quantity < itemInCart.quantity) {
          decreaseQuantity(productId);
        }
      }
    } else if (quantity === 0) {
      removeItem(productId);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    removeItem(productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <h1>Seu Carrinho de Compras</h1>
      {cartEmptyMessageVisible && (
        <div className={styles.cartEmptyConfirmation}>
          Carrinho esvaziado com sucesso!
        </div>
      )}
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Seu carrinho está vazio.</p>
          <Link to="/">Voltar para a loja</Link>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <ul className={styles.cartItemsList}>
            {cartItems.map((cartItem) => {
              const product = products.find(
                (p) => p.id === cartItem.product.id
              );
              if (!product) {
                return null;
              }
              return (
                <li key={cartItem.product.id} className={styles.cartItem}>
                  <CartItem
                    product={product}
                    quantity={cartItem.quantity}
                    onQuantityChange={handleQuantityChange}
                    onRemoveFromCart={handleRemoveFromCart}
                  />
                </li>
              );
            })}
          </ul>
          <div className={styles.cartSummary}>
            <p className={styles.total}>Total: R$ {calculateTotal()}</p>
            <div className={styles.actions}>
              <button onClick={handleEmptyCart} className={styles.emptyButton}>
                Esvaziar Carrinho
              </button>
              <button
                onClick={handleCheckout}
                className={styles.checkoutButton}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
