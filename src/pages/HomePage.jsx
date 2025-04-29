import React from 'react';
import styles from './HomePage.module.css';
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaShoppingCart } from 'react-icons/fa';
import heroImage from '../assets/barbantes-bonitos.jpg';

// Importe as imagens dos produtos (substitua pelos caminhos reais)
import produto1Image from '../assets/produto1.png';
import produto2Image from '../assets/produto2.png';
import produto3Image from '../assets/produto3.png';

const produtos = [
  {
    id: 1,
    nome: "Barroco Maxcolor",
    descricao: "Fio de algodão 100% mercerizado, ideal para peças de decoração e artesanato.",
    preco: "R$ 25,90",
    imagem: produto1Image,
  },
  {
    id: 2,
    nome: "Amigurumi",
    descricao: "Fio de algodão ideal para a técnica japonesa de criar pequenos bonecos.",
    preco: "R$ 12,50",
    imagem: produto2Image,
  },
  {
    id: 3,
    nome: "Duna",
    descricao: "Fio leve e macio, perfeito para peças de vestuário com ótimo caimento.",
    preco: "R$ 18,75",
    imagem: produto3Image,
  },
];

const HomePage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroLeftColumn}>
          <h2 className={styles.heroMainText}>Os melhores barbantes<br></br> da região</h2>
          <p className={styles.heroShortText}>Encontre uma vasta seleção de fios de alta qualidade para todos os seus projetos de crochê e tricô.</p>
          <div className={styles.heroButtons}>
            <button className={styles.heroButton}>Ver Cardápio</button>
            <a href="tel:+5569992784621" className={styles.phoneButton}>
              <FaPhone className={styles.phoneIcon} /> (69) 99278-4621
            </a>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://wa.me/SEU_NUMERO_DE_WHATSAPP" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaWhatsapp className={styles.socialIcon} /> WhatsApp
            </a>
            <a href="https://instagram.com/SEU_INSTAGRAM" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaInstagram className={styles.socialIcon} /> Instagram
            </a>
            <a href="https://facebook.com/SUA_PAGINA" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaFacebook className={styles.socialIcon} /> Facebook
            </a>
          </div>
        </div>
        <div className={styles.heroRightColumn}>
          <img src={heroImage} alt="Barbantes Bonitos" className={styles.heroImage} />
        </div>
      </section>

      <section id="cardapio" className={styles.cardapioSection}> {/* Renomeei a classe */}
        <h2>Nosso Cardápio</h2>
        <div className={styles.listaDeProdutos}>
          {produtos.map(produto => (
            <div key={produto.id} className={styles.produtoCard}>
              <img src={produto.imagem} alt={produto.nome} className={styles.produtoImagem} />
              <h3 className={styles.produtoTitulo}>{produto.nome}</h3>
              <p className={styles.produtoDescricao}>{produto.descricao}</p>
              <div className={styles.produtoPrecoArea}>
                <span className={styles.produtoPreco}>{produto.preco}</span>
                <button className={styles.adicionarAoCarrinho}>
                  <FaShoppingCart /> Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Loja de Barbantes. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;