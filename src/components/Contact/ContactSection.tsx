// src/components/Contact/ContactSection.tsx
import React from "react";
import styles from "./ContactSection.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";

const ContactSection: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <h2>Entre em Contato</h2>
      <p>Estamos prontos para atender você!</p>
      <div className={styles.contactMethods}>
        <a
          href={`https://wa.me/SEU_NUMERO_WHATSAPP`} // Substitua pelo seu número real
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          <FaWhatsapp className={styles.contactIcon} /> WhatsApp
        </a>
        <a
          href={`https://instagram.com/SEU_INSTAGRAM`} // Substitua pelo seu perfil real
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          <FaInstagram className={styles.contactIcon} /> Instagram
        </a>
        <a
          href={`https://facebook.com/SUA_PAGINA_FACEBOOK`} // Substitua pela sua página real
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          <FaFacebook className={styles.contactIcon} /> Facebook
        </a>
        <a href={`tel:SEU_TELEFONE`} className={styles.contactButton}>
          <FaPhone className={styles.contactIcon} /> Telefone
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
