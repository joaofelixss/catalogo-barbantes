// src/components/CartItem/CartItem.tsx
import React from "react";
import styles from "./CartItem.module.css";
import { CartItem as CartItemType, Product } from "../../types/product";
import formatPrice from "../../utils/formatPrice"; // Importe a função

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

  const subtotal = formatPrice(product.price * (item.quantity || 0));
  const formattedPrice = formatPrice(product.price);

  const details: string[] = [`Cor: ${product.color}`];
  if (product.num) {
    details.push(`Numeração: ${product.num}`);
  }
  const itemDetailsText = details.join(" - ");

  return (
    <div className={styles.cartItem}>
      {product.images && product.images[0] && (
        <img
          src={`${process.env.PUBLIC_URL}${product.images[0]}`}
          alt={product.name}
          className={styles.itemImage}
        />
      )}
      <div className={styles.itemDetails}>
        <h3>{product.name}</h3>
        <p className={styles.itemDetailsText}>{itemDetailsText}</p>
        <p className={styles.itemPrice}>R$ {formattedPrice}</p>
      </div>
      <div className={styles.quantityControl}>
        <button onClick={handleDecrement} aria-label="Decrementar quantidade">
          -
        </button>
        <span>{item.quantity || 0}</span>
        <button onClick={handleIncrement} aria-label="Incrementar quantidade">
          +
        </button>
      </div>
      <div className={styles.subtotal}>Subtotal: R$ {subtotal}</div>
      <button className={styles.removeItem} onClick={handleRemove}>
        Remover
      </button>
    </div>
  );
};

export default CartItem;
