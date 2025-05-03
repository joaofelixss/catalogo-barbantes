// src/features/search/pages/SearchResultsPage.tsx
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Product } from '../../../types/product'
import ProductCard from '../../product-catalog/components/ProductCard'
import styles from '../styles/SearchResultsPage.module.css'

interface SearchResultsPageProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = React.memo(
  ({ products, onAddToCart }) => {
    const [searchParams] = useSearchParams()
    const searchTerm = searchParams.get('q') || ''

    const filteredProducts = React.useMemo(() => {
      if (!searchTerm.trim()) {
        return []
      }
      const lowerSearchTerm = searchTerm.toLowerCase()
      return products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerSearchTerm) ||
          (product.color && product.color.toLowerCase().includes(lowerSearchTerm)) ||
          product.descricao.toLowerCase().includes(lowerSearchTerm)
      )
    }, [products, searchTerm])

    return (
      <div className={styles.searchResultsContainer}>
        <h1>Resultados da Busca por &quot;{searchTerm}&quot;</h1>
        {filteredProducts.length > 0 ? (
          <div className={styles.searchResultsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                produto={product}
                onAddToCart={onAddToCart}
                productImages={{}} // Por enquanto
              />
            ))}
          </div>
        ) : (
          <p>Nenhum produto encontrado para &quot;{searchTerm}&quot;.</p>
        )}
      </div>
    )
  }
)

SearchResultsPage.displayName = 'SearchResultsPage' // Opcional

export default SearchResultsPage
