// src/features/shopping-cart/components/CartItem.tsx
import React from 'react'
import styles from './CartItem.module.css'
import { CartItem as CartItemType, Product } from '../../../types/product'
import formatPrice from '../../../shared/utils/formatPrice'

interface CartItemProps {
  product: Product // Garante que product não seja undefined aqui
  quantity: number
  onQuantityChange: (productId: number, quantity: number) => void
  onRemoveFromCart: (productId: number) => void
}

const CartItem: React.FC<CartItemProps> = React.memo(
  ({ product, quantity, onQuantityChange, onRemoveFromCart }) => {
    const handleIncrement = () => {
      onQuantityChange(product.id, quantity + 1)
    }

    const handleDecrement = () => {
      if (quantity > 1) {
        onQuantityChange(product.id, quantity - 1)
      }
    }

    const handleRemove = () => {
      onRemoveFromCart(product.id)
    }

    const subtotal = formatPrice(product.price * quantity)
    const formattedPrice = formatPrice(product.price)

    const details: string[] = [`Cor: ${product.color}`]
    if (product.num) {
      details.push(`Numeração: ${product.num}`)
    }
    const itemDetailsText = details.join(' - ')

    console.log(`CartItem renderizou para: ${product.name}, quantidade: ${quantity}`) // Para debug

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
          <span>{quantity}</span>
          <button onClick={handleIncrement} aria-label="Incrementar quantidade">
            +
          </button>
        </div>
        <div className={styles.subtotal}>Subtotal: R$ {subtotal}</div>
        <button className={styles.removeItem} onClick={handleRemove}>
          Remover
        </button>
      </div>
    )
  }
)

CartItem.displayName = 'CartItem' // Opcional

export default CartItem
