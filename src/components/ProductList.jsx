// src/components/ProductList.js
import React from "react";
import ProductCart from "./ProductCart";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCart
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
