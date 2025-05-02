import { create } from "zustand";
import { Product } from "../types/product";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  // Podemos adicionar mais estados relacionados a produtos aqui no futuro (ex: loading, error)
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
