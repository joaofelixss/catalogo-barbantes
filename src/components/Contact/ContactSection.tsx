// src/components/Contact/ContactSection.tsx
import React from "react";
import styles from "./ContactSection.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import { contactLinks } from "../../config/contact"; // Importe a configuração dos links

const ContactSection: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <h2>Entre em Contato</h2>
      <p>Estamos prontos para atender você!</p>
      <div className={styles.contactMethods}>
        <a
          href={contactLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          <FaWhatsapp className={styles.contactIcon} aria-hidden="true" />
          <span className={styles.visuallyHidden}>WhatsApp</span>
        </a>
        <a
          href={contactLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          <FaInstagram className={styles.contactIcon} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Instagram</span>
        </a>
        <a
          href={contactLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          <FaFacebook className={styles.contactIcon} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Facebook</span>
        </a>
        <a href={contactLinks.phone} className={styles.contactButton}>
          <FaPhone className={styles.contactIcon} aria-hidden="true" />
          <span className={styles.visuallyHidden}>Telefone</span>
        </a>
      </div>
    </section>
  );
};

export default ContactSection;