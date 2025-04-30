// src/components/Footer/Footer.tsx
import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} Sua Loja de Barbantes. Todos os
        direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
