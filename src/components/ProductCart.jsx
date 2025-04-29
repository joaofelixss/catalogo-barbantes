// src/components/ProdutoCard.js
import React from "react";

const ProductCart = ({ product, onAddToCart }) => {
  const handleAddToCartClick = () => {
    onAddToCart(product.id, 1); // Ou a quantidade que você desejar
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Cor: {product.color}</p>
      <p>Preço: R$ {product.price.toFixed(2)}</p>
      <button onClick={handleAddToCartClick}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCart;
