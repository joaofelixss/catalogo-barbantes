import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Barroco Maxcolor', color: 'Azul Royal', price: 25.90 },
    { id: 2, name: 'Amigurumi', color: 'Amarelo Canário', price: 12.50 },
    { id: 3, name: 'Duna', color: 'Verde Musgo', price: 18.75 },
    { id: 4, name: 'Charme', color: 'Vermelho Paixão', price: 15.30 },
    // ... mais produtos
  ]);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productId, quantity) => {
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCartItems([...cartItems, { id: productId, quantity }]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
    ));
  };

  return (
    <div>
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <ShoppingCart
        cartItems={cartItems} // Passando cartItems
        onQuantityChange={handleQuantityChange} // Passando handleQuantityChange
        products={products}
      />
    </div>
  );
};

export default App;