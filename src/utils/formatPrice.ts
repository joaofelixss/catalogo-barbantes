// src/utils/formatPrice.ts
const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(".", ",");
};

export default formatPrice;
