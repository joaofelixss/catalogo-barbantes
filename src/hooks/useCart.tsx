// src/hooks/useCart.tsx
import { useState, useEffect } from "react";
import { CartItem, Product } from "../types/product";

const CART_STORAGE_KEY = "catalogoBarbantesCart";

interface UseCartResult {
  cartItems: CartItem[];
  handleAddToCart: (productId: number) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleEmptyCart: () => void;
  calculateTotal: () => string;
}

const useCart = (products: Product[]): UseCartResult => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]); // O efeito será executado sempre que cartItems mudar

  const handleAddToCart = (productId: number) => {
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
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: parseInt(String(quantity), 10) }
          : item
      )
    );
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const product = products.find((p) => p.id === item.id);
        return total + (product ? product.price * item.quantity : 0);
      }, 0)
      .toFixed(2);
  };

  return {
    cartItems,
    handleAddToCart,
    handleQuantityChange,
    handleEmptyCart,
    calculateTotal,
  };
};

export default useCart;
