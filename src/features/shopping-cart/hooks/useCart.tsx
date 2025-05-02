// src/features/shopping-cart/hooks/useCart.tsx
import { useState, useEffect, useCallback } from "react";
import { CartItem, Product } from "../../../types/product";
import { toast } from "react-toastify";

const CART_STORAGE_KEY = "catalogoBarbantesCart";

interface UseCartResult {
  cartItems: CartItem[];
  handleAddToCart: (product: Product) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleEmptyCart: () => void;
  calculateTotal: () => string;
  handleRemoveFromCart: (productId: number) => void;
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
    (productToAdd: Product) => {
      const existingItem = cartItems.find(
        (item) => item.id === productToAdd.id
      );
      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.id === productToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            id: productToAdd.id,
            quantity: 1,
            name: productToAdd.name,
            price: productToAdd.price,
            // Adicione outras propriedades do produto que você precisa aqui
          },
        ]);
      }
      toast.success(`${productToAdd.name} adicionado ao carrinho!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [cartItems, toast]
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

  const handleRemoveFromCart = useCallback(
    (productId: number) => {
      const productToRemove = getProducts().find((p) => p.id === productId);
      setCartItems(cartItems.filter((item) => item.id !== productId));
      if (productToRemove) {
        toast.error(`${productToRemove.name} removido do carrinho!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    [cartItems, setCartItems, getProducts, toast]
  );

  const calculateTotal = useCallback(() => {
    return cartItems
      .reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0)
      .toFixed(2);
  }, [cartItems]);

  return {
    cartItems,
    handleAddToCart,
    handleQuantityChange,
    handleEmptyCart,
    calculateTotal,
    handleRemoveFromCart,
  };
};

export default useCart;
