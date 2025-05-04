// src/features/product-catalog/components/ProductCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'
import { Product } from '../../../types/product'
import { BrowserRouter } from 'react-router-dom' // Importe depois do mock

// Mock do módulo react-router-dom
jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ children, to }) => <a href={to}>{children}</a>),
}))

const mockProduct: Product = {
  id: 1,
  name: 'Barbante Teste',
  color: 'Azul',
  price: 19.99,
  images: ['/images/teste.jpg'],
  descricao: 'Um barbante para testes.',
  num: '8', // Exemplo de numeração
}

const mockOnAddToCart = jest.fn()

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard produto={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>
    )

    expect(screen.getByText('Barbante Teste')).toBeInTheDocument()
    expect(screen.getByText('Cor: Azul')).toBeInTheDocument()
    expect(screen.getByText('Numeração: 8')).toBeInTheDocument()
    expect(screen.getByText('R$ 19.99')).toBeInTheDocument()
    const productImage = screen.getByAltText('Barbante Teste')
    expect(productImage).toHaveAttribute('src', '/images/teste.jpg')
  })

  it('should render a link to the product details page', () => {
    render(
      <BrowserRouter>
        <ProductCard produto={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>
    )
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', 'produto/1')
  })
})
