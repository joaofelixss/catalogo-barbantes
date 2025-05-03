// src/features/product-catalog/components/ProductCard.tsx
import React from 'react'
import styles from './ProductCard.module.css'
import { Product } from '../../../types/product'
import { Link } from 'react-router-dom'
import useProductImage from '../../../shared/hooks/useProductImage'
import AddToCartButton from '../../shopping-cart/components/AddToCartButton'
import FavoriteButton from '../../favorites/components/FavoriteButton'

interface ProductCardProps {
  produto: Product
  onAddToCart: (product: Product) => void
  productImages?: { [key: number]: string | null | undefined }
}

const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ produto, onAddToCart, productImages }) => {
    const imageUrl = useProductImage(produto, productImages)

    return (
      <div className={styles.productCardContainer}>
        {' '}
        {/* Container principal */}
        <Link to={`produto/${produto.id}`} className={styles.productLink}>
          <div className={styles.productCard}>
            {' '}
            {/* Card do produto (clicável para detalhes) */}
            <img src={imageUrl} alt={produto.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3>{produto.name}</h3>
              <p className={styles.productColor}>Cor: {produto.color}</p>
              {produto.num && <p className={styles.productNum}>Numeração: {produto.num}</p>}
              <p className={styles.productPrice}>R$ {produto.price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
        <div className={styles.actions}>
          {' '}
          {/* Container para os botões de ação */}
          <AddToCartButton product={produto} onAddToCart={onAddToCart} />
          <div className={styles.favoriteButtonWrapper}>
            <FavoriteButton productId={produto.id} product={produto} />
          </div>
        </div>
      </div>
    )
  }
)

ProductCard.displayName = 'ProductCard'

export default ProductCard
