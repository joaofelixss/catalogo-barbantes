// src/components/ProductCard/ProductCard.tsx
import React from "react";
import styles from "./ProductCard.module.css";
import { Product } from "../../types/product";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

interface ProductCardProps {
  produto: Product;
  onAddToCart: (product: Product) => void;
  productImages: { [key: number]: string | null | undefined }; // Adicione a prop productImages aqui
}

const ProductCard: React.FC<ProductCardProps> = ({
  produto,
  onAddToCart,
  productImages,
}) => {
  const handleAddToCartClick = () => {
    onAddToCart(produto);
    toast.success(`${produto.name} adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className={styles.produtoCard}>
      <img
        src={productImages[produto.id] || "URL_DA_IMAGEM_PADRAO"} // Use productImages aqui
        alt={produto.name}
        className={styles.produtoImagem}
      />
      <h3 className={styles.produtoTitulo}>{produto.name}</h3>
      <p className={styles.produtoDescricao}>{produto.descricao}</p>
      <div className={styles.produtoPrecoArea}>
        <span className={styles.produtoPreco}>
          R$ {produto.price.toFixed(2)}
        </span>
        <button
          className={styles.adicionarAoCarrinho}
          onClick={handleAddToCartClick}
          aria-label={`Adicionar ${produto.name} ao carrinho`}
        >
          {(FaShoppingCart as React.FC)({})} Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
