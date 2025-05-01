// src/hooks/useCart.tsx
import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "../types/product";

const CART_STORAGE_KEY = "catalogoBarbantesCart";

interface UseCartResult {
  cartItems: CartItem[];
  handleAddToCart: (productId: number) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleEmptyCart: () => void;
  calculateTotal: () => string;
}

const useCart = (getProducts: () => Product[]): UseCartResult => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = useCallback(
    (productId: number) => {
      const products = getProducts();
      const existingItem = cartItems.find((item) => item.id === productId);
      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        const productToAdd = products.find((p) => p.id === productId);
        if (productToAdd) {
          setCartItems([...cartItems, { id: productId, quantity: 1 }]);
        }
      }
    },
    [cartItems, getProducts]
  );

  const handleQuantityChange = useCallback(
    (productId: number, quantity: number) => {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: parseInt(String(quantity), 10) }
            : item
        )
      );
    },
    [cartItems]
  );

  const handleEmptyCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const calculateTotal = useCallback(() => {
    const products = getProducts();
    return cartItems
      .reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
      }, 0)
      .toFixed(2);
  }, [cartItems, getProducts]);

  return {
    cartItems,
    handleAddToCart,
    handleQuantityChange,
    handleEmptyCart,
    calculateTotal,
  };
};

export default useCart;
