// src/components/ShoppingCart.jsx
import React from 'react';
import styles from './ShoppingCart.module.css';

const ShoppingCart = ({ cartItems, onQuantityChange, products, onEmptyCart, onCheckout }) => { // Receba onEmptyCart e onCheckout
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Seu Carrinho de Compras</h2>

      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className={styles.cartItems}>
            {cartItems.map((item) => {
              const product = products.find((p) => p.id === item.id);
              if (!product) return null;

              return (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{product.name}</div>
                    <div className={styles.itemColor}>{product.color}</div>
                  </div>
                  <div className={styles.itemQuantity}>
                    <label className={styles.quantityLabel}>Qtd:</label>
                    <input
                      type="number"
                      className={styles.quantityInput}
                      value={item.quantity}
                      min="1"
                      onChange={(e) => onQuantityChange(item.id, e.target.value)}
                    />
                  </div>
                  <span className={styles.itemPrice}>R$ {(product.price * item.quantity).toFixed(2)}</span>
                </li>
              );
            })}
          </ul>

          <div className={styles.total}>
            Total: <span className={styles.totalValue}>R$ {calculateTotal()}</span>
          </div>

          <button className={styles.emptyButton} onClick={onEmptyCart}>
            Esvaziar Carrinho
          </button>
          <button className={styles.checkoutButton} onClick={onCheckout}>
            Enviar Pedido por WhatsApp
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;