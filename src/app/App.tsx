import React, { useState, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Carregamento lazy das páginas
const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'))
const ProductDetailsPage = lazy(
  () => import('../features/product-catalog/pages/ProductDetailsPage')
)
const SearchResultsPage = lazy(() => import('../features/search/pages/SearchResultsPage'))
const PedidoEnviadoPage = lazy(() => import('../features/checkout/pages/PedidoEnviadoPage'))
const CategoryBarbantesPage = lazy(
  () => import('../features/product-catalog/pages/CategoryBarbantesPage')
)
const CategoryLinhasPage = lazy(
  () => import('../features/product-catalog/pages/CategoryLinhasPage')
)
const CategoryTapetesPage = lazy(
  () => import('../features/product-catalog/pages/CategoryTapetesPage')
)
const ShoppingCart = lazy(() => import('../features/shopping-cart/components/ShoppingCart'))
const CheckoutForm = lazy(() => import('../features/checkout/components/CheckoutForm'))

import Navbar from '../shared/components/Navbar'
import { FavoritesProvider } from '../shared/contexts/FavoritesContext'
import { useCartStore } from '../store/cartStore'
import { useProductStore } from '../store/productStore'
import { Product } from '../types/product'
import styles from './App.module.css'
import useLoadInitialProducts from '../hooks/useLoadInitialProducts'
import LoadingSpinner from '../shared/components/LoadingSpinner' // Crie um componente de loading

const App: React.FC = () => {
  const { addItem: handleAddToCartZustand, getTotalItems } = useCartStore()
  const products = useProductStore((state) => state.products)

  const [whatsappNumber] = useState('5569992784621')
  const whatsappLink = `https://wa.me/${whatsappNumber}`

  const handleAddToCart = (product: Product) => {
    handleAddToCartZustand(product)
    toast.success(`${product.name} adicionado ao carrinho!`, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  useLoadInitialProducts()

  return (
    <FavoritesProvider>
      <div className={styles.appContainer}>
        <Navbar cartItemCount={getTotalItems()} whatsappLink={whatsappLink} />
        <div className={styles.mainContent}>
          <Suspense fallback={<LoadingSpinner />}>
            {' '}
            {/* Usando o LoadingSpinner como fallback */}
            <Routes>
              <Route
                path="/"
                element={<HomePage onAddToCart={handleAddToCart} products={products.slice(0, 8)} />}
              />
              <Route
                path="/favoritos"
                element={
                  <FavoritesPage
                    products={products}
                    onAddToCart={handleAddToCart}
                    productImages={{}}
                  />
                }
              />
              <Route
                path="/buscar"
                element={<SearchResultsPage products={products} onAddToCart={handleAddToCart} />}
              />
              <Route path="/pedido-enviado" element={<PedidoEnviadoPage />} />
              <Route
                path="/barbantes"
                element={
                  <CategoryBarbantesPage products={products} onAddToCart={handleAddToCart} />
                }
              />
              <Route
                path="/linhas"
                element={<CategoryLinhasPage products={products} onAddToCart={handleAddToCart} />}
              />
              <Route
                path="/tapetes"
                element={<CategoryTapetesPage products={products} onAddToCart={handleAddToCart} />}
              />
              <Route
                path="/produto/:id"
                element={<ProductDetailsPage products={products} onAddToCart={handleAddToCart} />}
              />
              <Route path="/carrinho" element={<ShoppingCart />} />
              <Route path="/checkout" element={<CheckoutForm />} />
            </Routes>
          </Suspense>
        </div>
        <ToastContainer />
      </div>
    </FavoritesProvider>
  )
}

export default App
