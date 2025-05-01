// src/pages/ProductDetailsPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types/product";
import styles from "./ProductDetailsPage.module.css";
import { useFavorites } from "../../contexts/FavoritesContext";
import ProductCard from "../../components/ProductCard/ProductCard"; // Importe o ProductCard

interface ProductDetailsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  products,
  onAddToCart,
}) => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : null;
  const product = productId ? products.find((p) => p.id === productId) : null;
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [currentImage, setCurrentImage] = React.useState<string | undefined>(
    product?.images[0]
  );

  // Lógica para obter produtos relacionados (por enquanto, alguns outros produtos aleatórios)
  const relatedProducts = React.useMemo(() => {
    if (!product) {
      return [];
    }
    const otherProducts = products.filter((p) => p.id !== product.id);
    // Embaralha o array e pega os primeiros 3 para sugestão
    const shuffledProducts = [...otherProducts].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, 2);
  }, [product, products]);

  if (!product) {
    return (
      <div className={styles.productDetailsContainer}>
        Produto não encontrado.
      </div>
    );
  }

  const handleThumbnailClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  const handleFavoriteClick = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className={styles.productDetailsContainer}>
      <div className={styles.imageGallery}>
        <img
          src={currentImage}
          alt={product.name}
          className={styles.mainImage}
        />
        {product.images.length > 1 && (
          <div className={styles.thumbnailsContainer}>
            {product.images.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${product.name} - Miniatura ${index + 1}`}
                className={`${styles.thumbnail} ${
                  imgUrl === currentImage ? styles.active : ""
                }`}
                onClick={() => handleThumbnailClick(imgUrl)}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.details}>
        <h1>{product.name}</h1>
        <p className={styles.color}>Cor: {product.color}</p>
        {product.num && <p className={styles.num}>Numeração: {product.num}</p>}
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.descricao}</p>
        <div className={styles.actions}>
          <button onClick={() => onAddToCart(product)}>
            Adicionar ao Carrinho
          </button>
          <button
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
          >
            {isFavorite(product.id) ? "❤️ Remover Favorito" : "🤍 Favoritar"}
          </button>
        </div>
        {/* Podemos adicionar sugestões de produtos relacionados aqui no futuro */}
      </div>

      {relatedProducts.length > 0 && (
        <div className={styles.relatedProductsSection}>
          <h2>Produtos Relacionados</h2>
          <div className={styles.relatedProductsGrid}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                produto={relatedProduct}
                onAddToCart={onAddToCart}
                productImages={{}} // Por enquanto, passamos um objeto vazio
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
