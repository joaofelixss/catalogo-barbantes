// src/hooks/useCart.tsx
import { useState } from "react";
import { CartItem } from "../types/product"; // Importe a tipagem CartItem

interface UseCartResult {
  cartItems: CartItem[];
  handleAddToCart: (productId: number) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleEmptyCart: () => void;
}

const useCart = (): UseCartResult => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: number) => {
    // Implementação da lógica de adicionar ao carrinho (copiada de App.tsx)
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
    // Implementação da lógica de alterar a quantidade (copiada de App.tsx)
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: parseInt(String(quantity), 10) }
          : item
      )
    );
  };

  const handleEmptyCart = () => {
    // Implementação da lógica de esvaziar o carrinho (copiada de App.tsx)
    setCartItems([]);
  };

  return {
    cartItems,
    handleAddToCart,
    handleQuantityChange,
    handleEmptyCart,
  };
};

export default useCart;
