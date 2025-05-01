import React from "react";
import styles from "./ContactSection.module.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";
import { contactLinks } from "../../config/contact";
import ContactLink from "./ContactLink"; // Importe o novo componente

const ContactSection: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <h2>Entre em Contato</h2>
      <p>Estamos prontos para atender você!</p>
      <div className={styles.contactMethods}>
        <ContactLink
          href={contactLinks.whatsapp}
          icon={FaWhatsapp}
          altText="WhatsApp"
        />
        <ContactLink
          href={contactLinks.instagram}
          icon={FaInstagram}
          altText="Instagram"
        />
        <ContactLink
          href={contactLinks.facebook}
          icon={FaFacebook}
          altText="Facebook"
        />
        <ContactLink
          href={contactLinks.phone}
          icon={FaPhone}
          altText="Telefone"
        />
      </div>
    </section>
  );
};

export default ContactSection;
