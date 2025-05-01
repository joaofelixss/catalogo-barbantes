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

export interface CartItem {
  id: number;
  quantity: number;
  name: string;
  price: number;
  // Adicione outras propriedades relevantes do produto aqui, se necessário
}
