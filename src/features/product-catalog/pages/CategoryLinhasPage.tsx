// src/features/product-catalog/pages/CategoryLinhasPage.tsx
import React from 'react'
import { Product } from '../../../types/product'
import styles from '../styles/CategoryPage.module.css'
import ProductCard from '../components/ProductCard'

interface CategoryPageProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

const CategoryLinhasPage: React.FC<CategoryPageProps> = ({ products, onAddToCart }) => {
  const linhas = products.filter(
    (product) =>
      product.name.includes('Barroco Multicolor') || product.name.includes('Barroco Decore')
  )

  return (
    <div className={styles.categoryPageContainer}>
      <h1>Nossas Linhas Barroco</h1>
      <div className={styles.productList}>
        {linhas.map((product) => (
          <ProductCard key={product.id} produto={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

export default CategoryLinhasPage
