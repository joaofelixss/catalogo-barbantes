import React, { useState } from 'react';
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, event) => {
    setQuantities({ ...quantities, [productId]: parseInt(event.target.value, 10) || 0 });
  };

  const handleAddToCartClick = (product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      onAddToCart(product.id, quantity);
      setQuantities({ ...quantities, [product.id]: 0 });
    }
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nossos Barbantes</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <span className="product-name-color">{product.name} - {product.color}</span>
            <span className="product-price">R$ {product.price.toFixed(2)}</span>
            <input
              type="number"
              min="0"
              value={quantities[product.id] || ''}
              onChange={(event) => handleQuantityChange(product.id, event)}
              className="quantity-input"
            />
            <button onClick={() => handleAddToCartClick(product)} className="add-to-cart-button">Adicionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;