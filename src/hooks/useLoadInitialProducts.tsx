// src/hooks/useLoadInitialProducts.tsx
import { useEffect } from 'react'
import { Product } from '../types/product'
import { useProductStore } from '../store/productStore'

const useLoadInitialProducts = () => {
  const { setProducts } = useProductStore()

  useEffect(() => {
    const initialProducts: Product[] = [
      {
        id: 1,
        name: 'Barroco Maxcolor',
        color: 'Azul Royal',
        price: 25.9,
        descricao: 'Fio de algodão mercerizado para peças de decoração.',
        images: ['/images/barbantes-bonitos.jpg', '/images/produto3.png', '/images/produto2.png'],
        num: '6',
      },
      {
        id: 2,
        name: 'Amigurumi',
        color: 'Amarelo Canário',
        price: 12.5,
        descricao: 'Fio de algodão ideal para a técnica japonesa de amigurumi.',
        images: ['/images/barbantes-bonitos.jpg', '/images/produto3.png', '/images/produto2.png'],
        num: '6',
      },
      {
        id: 3,
        name: 'Duna',
        color: 'Verde Musgo',
        price: 18.75,
        descricao: 'Fio leve e macio para peças de vestuário.',
        images: ['/images/barbantes-bonitos.jpg', '/images/produto3.png', '/images/produto2.png'],
        num: '8',
      },
      {
        id: 4,
        name: 'Charme',
        color: 'Vermelho Paixão',
        price: 15.3,
        descricao: 'Fio de algodão penteado com toque macio e brilho.',
        images: ['/images/barbantes-bonitos.jpg', '/images/produto3.png', '/images/produto2.png'],
        num: '8',
      },
      {
        id: 5,
        name: 'Barbante Eco Brasil',
        color: 'Azul Bebê',
        price: 19.9,
        descricao: 'Barbante ecológico de alta qualidade.',
        images: ['/images/barbante-eco-brasil-azul.jpg'],
        num: '6',
      },
      {
        id: 6,
        name: 'Barbante Eco Brasil',
        color: 'Vermelho Vivo',
        price: 19.9,
        descricao: 'Barbante ecológico de alta qualidade.',
        images: ['/images/barbante-eco-brasil-vermelho.jpg'],
        num: '6',
      },
      {
        id: 7,
        name: 'Barbante Eco Brasil',
        color: 'Cru',
        price: 18.5,
        descricao: 'Barbante ecológico de alta qualidade.',
        images: ['/images/barbante-eco-brasil-cru.jpg'],
        num: '8',
      },
      {
        id: 15,
        name: 'Barroco Multicolor',
        color: 'Floral',
        price: 32.5,
        descricao: 'Fio Barroco com cores vibrantes e mescladas.',
        images: ['/images/barroco-multicolor-floral.jpg'],
      },
      {
        id: 16,
        name: 'Barroco Decore',
        color: 'Avelã',
        price: 28.0,
        descricao: 'Fio Barroco com toque felpudo, ideal para detalhes.',
        images: ['/images/barroco-decore-avela.jpg'],
      },
      {
        id: 20,
        name: 'Tapete de Crochê Geométrico',
        color: 'Cinza e Amarelo',
        price: 75.0,
        descricao: 'Tapete feito à mão com design geométrico moderno.',
        images: ['/images/tapete-croche-geometrico.jpg'],
      },
      {
        id: 21,
        name: 'Tapete de Crochê Floral',
        color: 'Tons de Rosa',
        price: 89.9,
        descricao: 'Tapete artesanal com delicadas flores em crochê.',
        images: ['/images/tapete-croche-floral.jpg'],
      },
    ]
    setProducts(initialProducts)
  }, [setProducts])
}

export default useLoadInitialProducts
