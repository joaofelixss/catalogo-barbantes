// src/features/shopping-cart/components/__tests__/CartItem.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartItem from '../CartItem'
import { CartItem as CartItemType, Product } from '../../../../types/product'
import formatPrice from '../../../../shared/utils/formatPrice' // Importe a função se necessário

jest.mock('../../../../shared/utils/formatPrice.ts') // Mock da função formatPrice para não afetar o teste

const mockFormatPrice = formatPrice as jest.Mock

const mockProduct: Product = {
  id: 1,
  name: 'Produto de Teste',
  price: 10.0,
  images: ['/imagem-teste.jpg'],
  color: 'Teste',
}

const mockCartItem: CartItemType = {
  id: 1,
  quantity: 2,
}

const mockOnQuantityChange = jest.fn()
const mockOnRemoveFromCart = jest.fn()

describe('CartItem Component', () => {
  beforeEach(() => {
    mockFormatPrice.mockClear() // Limpa o mock antes de cada teste
    mockOnQuantityChange.mockClear()
    mockOnRemoveFromCart.mockClear()
  })

  it('should render the product name and quantity', () => {
    mockFormatPrice.mockReturnValue('R$ 10,00') // Mock para o preço unitário
    render(
      <CartItem
        item={mockCartItem}
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    )

    expect(screen.getByText('Produto de Teste')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should call onQuantityChange with incremented quantity when the "+" button is clicked', async () => {
    mockFormatPrice.mockReturnValue('R$ 10,00') // Mock para o preço unitário
    render(
      <CartItem
        item={mockCartItem}
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    )

    const incrementButton = screen.getByRole('button', {
      name: 'Incrementar quantidade',
    })
    await userEvent.click(incrementButton)

    expect(mockOnQuantityChange).toHaveBeenCalledWith(mockProduct.id, 3)
  })

  it('should call onQuantityChange with decremented quantity when the "-" button is clicked', async () => {
    mockFormatPrice.mockReturnValue('R$ 10,00') // Mock para o preço unitário
    render(
      <CartItem
        item={{ ...mockCartItem, quantity: 3 }} // Inicializa com quantidade maior que 1
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    )

    const decrementButton = screen.getByRole('button', {
      name: 'Decrementar quantidade',
    })
    await userEvent.click(decrementButton)

    expect(mockOnQuantityChange).toHaveBeenCalledWith(mockProduct.id, 2)
  })

  it('should call onRemoveFromCart when the "Remover" button is clicked', async () => {
    mockFormatPrice.mockReturnValue('R$ 10,00') // Mock para o preço unitário
    render(
      <CartItem
        item={mockCartItem}
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    )

    const removeButton = screen.getByText('Remover')
    await userEvent.click(removeButton)

    expect(mockOnRemoveFromCart).toHaveBeenCalledWith(mockProduct.id)
  })

  it('should render the formatted price and subtotal', () => {
    mockFormatPrice
      .mockReturnValueOnce('R$ 10,00') // Para o preço unitário
      .mockReturnValueOnce('R$ 20,00') // Para o subtotal

    render(
      <CartItem
        item={mockCartItem}
        product={mockProduct}
        onQuantityChange={mockOnQuantityChange}
        onRemoveFromCart={mockOnRemoveFromCart}
      />
    )

    // Vamos procurar pelo texto completo do subtotal como ele aparece no HTML do teste
    expect(screen.getByText(/Subtotal: R\$ R\$ 10,00/)).toBeInTheDocument()
    // E também verificar o preço unitário
    expect(screen.getByText(/R\$ R\$ 20,00/)).toBeInTheDocument()
  })
})
