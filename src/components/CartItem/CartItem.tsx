// src/components/CartItem/CartItem.tsx
import React from "react";
import styles from "./CartItem.module.css";
import { CartItem as CartItemType, Product } from "../../types/product";

interface CartItemProps {
  item: CartItemType;
  product: Product | undefined;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  product,
  onQuantityChange,
  onRemoveFromCart,
}) => {
  if (!product) {
    return null;
  }

  const handleIncrement = () => {
    onQuantityChange(item.id, (item.quantity || 0) + 1);
  };

  const handleDecrement = () => {
    if ((item.quantity || 0) > 1) {
      onQuantityChange(item.id, (item.quantity || 0) - 1);
    }
  };

  const handleRemove = () => {
    onRemoveFromCart(item.id);
  };

  const subtotal = (product.price * (item.quantity || 0))
    .toFixed(2)
    .replace(".", ",");

  return (
    <div className={styles.cartItem}>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className={styles.itemImage}
        />
      )}
      <div className={styles.itemDetails}>
        <h3>{product.name}</h3>
        <p className={styles.itemPrice}>
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>
      </div>
      <div className={styles.quantityControl}>
        <button onClick={handleDecrement}>-</button>
        <span>{item.quantity || 0}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <div className={styles.subtotal}>Subtotal: R$ {subtotal}</div>
      <button className={styles.removeItem} onClick={handleRemove}>
        Remover
      </button>
    </div>
  );
};

export default CartItem;
