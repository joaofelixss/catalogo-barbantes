// src/hooks/useProductImage.ts
import { Product } from "../types/product";

interface ProductImageMap {
  [key: number]: string | null | undefined;
}

const useProductImage = (
  product: Product,
  productImages?: ProductImageMap
): string | undefined => {
  const imageFromMap = productImages?.[product.id];
  if (typeof imageFromMap === "string") {
    return imageFromMap;
  }
  return product.images?.[0];
};

export default useProductImage;
