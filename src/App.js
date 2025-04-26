import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

const App = () => {
  // Dados de exemplo dos barbantes
  const [products] = useState([
    { id: 1, name: 'Barroco Maxcolor', color: 'Azul Royal', price: 15.90 },
    { id: 2, name: 'Amigurumi', color: 'Amarelo Canário', price: 8.50 },
    { id: 3, name: 'Duna', color: 'Verde Musgo', price: 12.20 },
    { id: 4, name: 'Charme', color: 'Vermelho Paixão', price: 18.70 },
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (productId, quantity) => {
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      const productToAdd = products.find(product => product.id === productId);
      if (productToAdd) {
        setCart([...cart, { ...productToAdd, quantity }]);
      }
    }
  };

  const updateCartItemQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: parseInt(quantity, 10) || 0 } : item
    );
    setCart(updatedCart.filter(item => item.quantity > 0)); // Remove itens com quantidade zero
  };

  return (
    <div>
      <h1>Catálogo de Barbantes</h1>
      <ProductList products={products} onAddToCart={addToCart} />
      <ShoppingCart cartItems={cart} onQuantityChange={updateCartItemQuantity} />
    </div>
  );
};

export default App;