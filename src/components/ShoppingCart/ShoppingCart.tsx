// src/components/ShoppingCart.tsx
import React from "react";
import styles from "./ShoppingCart.module.css";
import { Product } from "../../types/product";
import { toast } from "react-toastify";

interface CartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  onQuantityChange: (itemId: number, quantity: number) => void;
  products: Product[];
  onEmptyCart: () => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  onQuantityChange,
  products,
  onEmptyCart,
  onCheckout,
}) => {
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
      }, 0)
      .toFixed(2);
  };

  const handleEmptyCart = () => {
    onEmptyCart();
    toast.info("Seu carrinho foi esvaziado!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{product.name}</div>
                    <div className={styles.itemColor}>{product.color}</div>
                  </div>
                  <div className={styles.itemQuantity}>
                    <label
                      htmlFor={`quantity-${item.id}`}
                      className={styles.quantityLabel}
                    >
                      Qtd:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      className={styles.quantityInput}
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        onQuantityChange(item.id, parseInt(e.target.value, 10))
                      }
                      aria-label={`Quantidade de ${product.name}`}
                    />
                  </div>
                  <span className={styles.itemPrice}>
                    R$ {(product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={styles.total}>
            Total:{" "}
            <span className={styles.totalValue}>R$ {calculateTotal()}</span>
          </div>

          <button
            className={styles.emptyButton}
            onClick={handleEmptyCart}
            aria-label="Esvaziar todos os itens do carrinho"
          >
            Esvaziar Carrinho
          </button>
          <button
            className={styles.checkoutButton}
            onClick={onCheckout}
            aria-label="Finalizar pedido e enviar mensagem via WhatsApp"
          >
            Enviar Pedido por WhatsApp
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
