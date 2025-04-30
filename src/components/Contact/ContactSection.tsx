import React from "react";
import styles from "./ContactSection.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import { contactLinks } from "../../config/contact";

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
          {/* Type assertion aplicada corretamente */}
          {(FaWhatsapp as React.FC)({
            className: styles.contactIcon,
            "aria-hidden": true,
          })}
          <span className={styles.visuallyHidden}>WhatsApp</span>
        </a>
        <a
          href={contactLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          {/* Type assertion aplicada corretamente */}
          {(FaInstagram as React.FC)({
            className: styles.contactIcon,
            "aria-hidden": true,
          })}
          <span className={styles.visuallyHidden}>Instagram</span>
        </a>
        <a
          href={contactLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          {/* Type assertion aplicada corretamente */}
          {(FaFacebook as React.FC)({
            className: styles.contactIcon,
            "aria-hidden": true,
          })}
          <span className={styles.visuallyHidden}>Facebook</span>
        </a>
        <a href={contactLinks.phone} className={styles.contactButton}>
          {/* Type assertion aplicada corretamente */}
          {(FaPhone as React.FC)({
            className: styles.contactIcon,
            "aria-hidden": true,
          })}
          <span className={styles.visuallyHidden}>Telefone</span>
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
