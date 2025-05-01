// src/components/ShoppingCart/ShoppingCart.tsx
import React from "react";
import styles from "./ShoppingCart.module.css";
import { CartItem as CartItemType, Product } from "../../types/product";
import CartItem from "../CartItem/CartItem"; // Importe o CartItem
import { Link } from "react-router-dom";

interface ShoppingCartProps {
  cartItems: CartItemType[];
  products: Product[];
  onQuantityChange: (productId: number, quantity: number) => void;
  onEmptyCart: () => void;
  onCheckout: () => void;
  onRemoveFromCart: (productId: number) => void; // Certifique-se de ter esta linha
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  products,
  onQuantityChange,
  onEmptyCart,
  onCheckout,
  onRemoveFromCart,
}) => {
  const handleRemoveFromCartInternal = (productId: number) => {
    onRemoveFromCart(productId); // Chama a função passada como prop
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);
        return total + (product ? product.price * (item.quantity || 1) : 0);
      }, 0)
      .toFixed(2)
      .replace(".", ",");
  };

  return (
    <div className={styles.shoppingCartContainer}>
      <h1>Seu Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Seu carrinho está vazio.</p>
          <Link to="/">Voltar para a loja</Link>
        </div>
      ) : (
        <>
          <ul className={styles.cartItemsList}>
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.id);
              return (
                <li key={item.id} className={styles.cartItem}>
                  <CartItem
                    item={item}
                    product={product}
                    onQuantityChange={onQuantityChange}
                    onRemoveFromCart={handleRemoveFromCartInternal} // Passa a função de remover
                  />
                </li>
              );
            })}
          </ul>
          <div className={styles.cartSummary}>
            <p className={styles.total}>Total: R$ {calculateTotal()}</p>
            <div className={styles.actions}>
              <button onClick={onEmptyCart}>Esvaziar Carrinho</button>
              <button onClick={onCheckout}>Finalizar Pedido</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
