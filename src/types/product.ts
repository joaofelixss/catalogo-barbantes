// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  color?: string;
  price: number;
  descricao: string;
  images: string[];
  num?: string;
}

// src/types/cart-item.ts
export interface CartItem {
  id: number;
  quantity: number;
}
