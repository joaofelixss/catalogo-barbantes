// src/pages/HomePage.tsx
import React from 'react'
import styles from './HomePage.module.css'
import { Product } from '../../types/product'
import HeroSection from './components/HeroSection'
import ContactSection from './components/ContactSection'
import CategoryHighlightSection from '../../shared/components/CategoryHighlightSection/CategoryHighlightSection' // Importe o novo componente

interface HomePageProps {
  onAddToCart: (product: Product) => void
  products: Product[]
}

const HomePage: React.FC<HomePageProps> = ({ onAddToCart, products }) => {
  // Filtrar produtos por categoria (abordagem inicial baseada no nome)
  const barbanteEcoBrasil = products.filter(
    (product) =>
      product.name.includes('Barbante Eco Brasil') ||
      product.name.includes('Barroco Maxcolor') ||
      product.name.includes('Amigurumi') ||
      product.name.includes('Duna') ||
      product.name.includes('Charme')
  )
  const linhasBarroco = products.filter(
    (product) =>
      product.name.includes('Barroco Multicolor') || product.name.includes('Barroco Decore')
  )
  const crochesTapetes = products.filter((product) => product.name.includes('Tapete de Crochê'))

  return (
    <div className={styles.container}>
      <HeroSection />

      <CategoryHighlightSection
        title="Destaque dos Barbantes"
        products={barbanteEcoBrasil}
        onAddToCart={onAddToCart}
        viewMoreLink="barbantes"
      />

      <CategoryHighlightSection
        title="Destaque das Linhas Barroco"
        products={linhasBarroco}
        onAddToCart={onAddToCart}
        viewMoreLink="linhas"
      />

      <CategoryHighlightSection
        title="Destaque dos Tapetes de Crochê"
        products={crochesTapetes}
        onAddToCart={onAddToCart}
        viewMoreLink="tapetes"
      />

      <ContactSection />
    </div>
  )
}

export default HomePage
