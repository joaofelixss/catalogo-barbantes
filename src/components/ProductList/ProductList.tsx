import React from 'react';
import styles from './ProductList.module.css'; // Crie este arquivo CSS
import { Product } from '../../types/product';
import { FaShoppingCart } from 'react-icons/fa';

// Defina a interface para as props do ProductList
interface ProductListProps {
  products: Product[];
  onAddToCart: (productId: number) => void;
}

// Defina o tipo para productImages (vamos passá-lo como prop também para melhor organização)
interface ProductImageMap {
  [key: number]: string | null | undefined;
}

interface Props extends ProductListProps {
  productImages: ProductImageMap;
}

const ProductList: React.FC<Props> = ({ products, onAddToCart, productImages }) => {
  const handleAddToCartClick = (productId: number) => {
    onAddToCart(productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      alert(`${product.name} adicionado ao carrinho!`);
    }
  };

  return (
    <section id="cardapio" className={styles.cardapioSection}>
      <h2>Nosso Cardápio</h2>
      <div className={styles.listaDeProdutos}>
        {products.map((produto) => (
          <div key={produto.id} className={styles.produtoCard}>
            <img
              src={productImages[produto.id] || "URL_DA_IMAGEM_PADRAO"}
              alt={produto.name}
              className={styles.produtoImagem}
            />
            <h3 className={styles.produtoTitulo}>{produto.name}</h3>
            <p className={styles.produtoDescricao}>{produto.descricao}</p>
            <div className={styles.produtoPrecoArea}>
              <span className={styles.produtoPreco}>R$ {produto.price.toFixed(2)}</span>
              <button
                className={styles.adicionarAoCarrinho}
                onClick={() => handleAddToCartClick(produto.id)}
              >
                <FaShoppingCart /> Adicionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;