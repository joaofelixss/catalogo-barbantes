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
  let imageUrl: string | undefined;

  if (typeof imageFromMap === "string") {
    imageUrl = imageFromMap;
  } else if (Array.isArray(product.images) && product.images.length > 0) {
    imageUrl = product.images[0];
  }

  // Adiciona o prefixo PUBLIC_URL se imageUrl existir e começar com '/'
  if (imageUrl && imageUrl.startsWith("/")) {
    return `${process.env.PUBLIC_URL}${imageUrl}`;
  }

  return imageUrl;
};

export default useProductImage;
