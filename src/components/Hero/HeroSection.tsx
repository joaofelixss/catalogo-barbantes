// src/components/Hero/HeroSection.tsx
import React from "react";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Encontre os Melhores Barbantes para seus Projetos
        </h1>
        <p className={styles.heroSubtitle}>
          Qualidade e variedade em um só lugar.
        </p>
        <a href="#cardapio" className={styles.heroButton}>
          Ver Cardápio
        </a>
      </div>
      <img
        src="/images/barbantes-bonitos.jpg"
        alt="Diversos barbantes coloridos"
        className={styles.heroImage}
      />
    </section>
  );
};

export default HeroSection;
