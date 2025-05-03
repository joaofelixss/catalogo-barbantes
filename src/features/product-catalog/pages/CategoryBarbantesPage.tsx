// src/features/product-catalog/pages/CategoryBarbantesPage.tsx
import React from 'react'
import { Product } from '../../../types/product'
import styles from '../styles/CategoryPage.module.css'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'

interface CategoryPageProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

const CategoryBarbantesPage: React.FC<CategoryPageProps> = ({ products, onAddToCart }) => {
  const navigate = useNavigate()

  const handleVoltar = () => {
    navigate(-1) // Navega para a página anterior no histórico
  }
  const barbantes = products.filter(
    (product) =>
      product.name.includes('Barbante Eco Brasil') ||
      product.name.includes('Barroco Maxcolor') ||
      product.name.includes('Amigurumi') ||
      product.name.includes('Duna') ||
      product.name.includes('Charme')
  )

  return (
    <div className={styles.categoryPageContainer}>
      <h1>Nossos Barbantes</h1>
      <button className={styles.voltarButton} onClick={handleVoltar}>
        Voltar
      </button>
      <div className={styles.productList}>
        {barbantes.map((product) => (
          <ProductCard key={product.id} produto={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

export default CategoryBarbantesPage
