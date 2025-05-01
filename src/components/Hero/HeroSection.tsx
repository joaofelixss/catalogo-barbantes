// src/components/Hero/HeroSection.tsx
import React, { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.css";
import { Link } from "react-router-dom";

const images = [
  "/images/tapete-croche-floral.jpg",
  "/images/barroco-decore-avela.jpg",
  "/images/sonia1.jpeg",
];

const HeroSection: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (loaded && window.innerWidth >= 768) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Troca de imagem a cada 3 segundos (ajuste conforme necessário)

      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar ou quando 'loaded' muda
    }
  }, [loaded]);

  return (
    <section ref={heroSectionRef} className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={`${styles.heroTitle} ${loaded ? styles.fadeIn : ""}`}>
          Encontre os <span className={styles.barbantesColor}>Barbantes</span>{" "}
          <br />
          para seus Projetos de Crochê
        </h1>
        <p
          className={`${styles.heroSubtitle} ${
            loaded ? styles.fadeInDelay : ""
          }`}
        >
          Qualidade e variedade de fios para você criar peças únicas e
          encantadoras.
        </p>
        <Link
          to="/barbantes"
          className={`${styles.heroButton} ${
            loaded ? styles.fadeInDelayMore : ""
          }`}
        >
          Ver Barbantes
        </Link>
      </div>
      <div className={styles.imageStack}>
        <div
          className={`${styles.imageContainer} ${loaded ? styles.fadeIn : ""}`}
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            opacity: loaded ? 1 : 0,
          }}
        >
          {/* Não precisamos da tag <img> aqui para o carrossel */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
