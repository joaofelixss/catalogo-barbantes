import React, { useState } from 'react';

const ProductList = ({ products, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, event) => {
    setQuantities({ ...quantities, [productId]: parseInt(event.target.value, 10) || 0 });
  };

  const handleAddToCartClick = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      onAddToCart(product.id, quantity);
      setQuantities({ ...quantities, [product.id]: 0 }); // Reset quantity after adding
    }
  };

  return (
    <div>
      <h2>Nossos Barbantes</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.color} - R$ {product.price.toFixed(2)}
            <input
              type="number"
              min="0"
              value={quantities[product.id] || ''}
              onChange={(event) => handleQuantityChange(product.id, event)}
              style={{ width: '50px', marginLeft: '10px' }}
            />
            <button onClick={() => handleAddToCartClick(product)}>Adicionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;