// src/pages/FavoritesPage.tsx
import React from 'react'
import { useFavorites } from '../../shared/contexts/FavoritesContext'
import { Product } from '../../types/product'
import ProductCard from '../../features/product-catalog/components/ProductCard'
import styles from './FavoritesPage.module.css'
import { Link } from 'react-router-dom'

interface FavoritesPageProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  productImages: { [key: number]: string | null | undefined }
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ products, onAddToCart, productImages }) => {
  const { favorites } = useFavorites()

  // Filtra a lista de produtos para incluir apenas os que estão nos favoritos
  const favoriteProducts = products.filter((product) => favorites.includes(product.id))

  if (favoriteProducts.length === 0) {
    return (
      <div className={styles.favoritesPageContainer}>
        <h2>Meus Favoritos</h2>
        <p>Sua lista de favoritos está vazia.</p>
        <Link to="/">Voltar para a loja</Link>
      </div>
    )
  }

  return (
    <div className={styles.favoritesPageContainer}>
      <h2>Meus Favoritos</h2>
      <ul className={styles.favoritesList}>
        {favoriteProducts.map((product) => (
          <li key={product.id} className={styles.favoriteItem}>
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

export default FavoritesPage
