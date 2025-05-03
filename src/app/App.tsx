//src/app/App.tsx
import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from '../pages/HomePage/HomePage'
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage'
import ProductDetailsPage from '../features/product-catalog/pages/ProductDetailsPage'
import SearchResultsPage from '../features/search/pages/SearchResultsPage'
import PedidoEnviadoPage from '../features/checkout/pages/PedidoEnviadoPage'
import CategoryBarbantesPage from '../features/product-catalog/pages/CategoryBarbantesPage'
import CategoryLinhasPage from '../features/product-catalog/pages/CategoryLinhasPage'
import CategoryTapetesPage from '../features/product-catalog/pages/CategoryTapetesPage'

import ShoppingCart from '../features/shopping-cart/components/ShoppingCart'
import CheckoutForm from '../features/checkout/components/CheckoutForm'
import Navbar from '../shared/components/Navbar'

import { FavoritesProvider } from '../shared/contexts/FavoritesContext'
import { useCartStore } from '../store/cartStore'
import { useProductStore } from '../store/productStore'
import { Product } from '../types/product'
import styles from './App.module.css'
import useLoadInitialProducts from '../hooks/useLoadInitialProducts'

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
              element={<CategoryBarbantesPage products={products} onAddToCart={handleAddToCart} />}
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
            <Route
              path="/carrinho"
              element={<ShoppingCart />} // Remova as props aqui
            />
            <Route
              path="/checkout"
              element={<CheckoutForm />} // Remova as props aqui também
            />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </FavoritesProvider>
  )
}

export default App
