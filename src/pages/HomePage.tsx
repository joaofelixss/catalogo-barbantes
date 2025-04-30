import React from "react";
import styles from "./HomePage.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaShoppingCart } from "react-icons/fa";
import heroImage from "../assets/barbantes-bonitos.jpg";
import { Product } from "../types/product";

// Importe as imagens dos produtos (substitua pelos caminhos reais)
import produto1Image from "../assets/produto1.png";
import produto2Image from "../assets/produto2.png";
import produto3Image from "../assets/produto3.png";

// Defina a interface para as props do HomePage
interface HomePageProps {
  onAddToCart: (productId: number) => void; // 'onAddToCart' é uma função que recebe um number e não retorna nada (void)
  products: Product[]; // 'products' é um array de objetos 'Product'
}

// Defina o tipo para productImages
interface ProductImageMap {
  [key: number]: string | null | undefined; // Permite chaves numéricas e valores string, null ou undefined
}

// Mapeie as imagens para os IDs correspondentes (isso é importante)
const productImages: ProductImageMap = {
  1: produto1Image,
  2: produto2Image,
  3: produto3Image,
  4: null, // Se houver um quarto produto no seu estado `products`
};

const HomePage: React.FC<HomePageProps> = ({ onAddToCart, products }) => {
  const handleAddToCartClick = (productId: number) => {
    onAddToCart(productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      alert(`${product.name} adicionado ao carrinho!`);
    }
  };

  return (
    <div className={styles.container}>
      {/* ... restante do seu componente HomePage ... */}
      <section id="cardapio" className={styles.cardapioSection}>
        <h2>Nosso Cardápio</h2>
        <div className={styles.listaDeProdutos}>
          {products.map((produto) => (
            <div key={produto.id} className={styles.produtoCard}>
              <img
                src={productImages[produto.id] || "URL_DA_IMAGEM_PADRAO"} // Use o mapeamento de imagens
                alt={produto.name}
                className={styles.produtoImagem}
              />
              <h3 className={styles.produtoTitulo}>{produto.name}</h3>
              {/* Você pode querer exibir a cor aqui também */}
              <p className={styles.produtoDescricao}>{produto.descricao}</p>
              <div className={styles.produtoPrecoArea}>
                <span className={styles.produtoPreco}>R$ {produto.price.toFixed(2)}</span> {/* Use o preço do estado */}
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

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Loja de Barbantes. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;