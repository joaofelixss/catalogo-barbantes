// src/features/product-catalog/components/ProductCard.tsx
import React from 'react'
import { Product } from '../../../types/product'
import ProductCard from './ProductCard'
import styles from './ProductList.module.css'

interface ProductListProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  productImages: { [key: number]: string | null | undefined }
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, productImages }) => {
  return (
    <div className={styles.cardapioSection}>
      {' '}
      {/* Use cardapioSection aqui */}
      <h2>Nosso Cardápio</h2>
      <ul className={styles.listaDeProdutos}>
        {' '}
        {/* Use listaDeProdutos aqui */}
        {products.map((product) => (
          <li key={product.id} className={styles.listItem}>
            <ProductCard
              produto={product}
              onAddToCart={onAddToCart}
              productImages={productImages}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
