// src/components/ContactSection/ContactSection.tsx
import React, { FunctionComponent } from "react";
import styles from "./ContactSection.module.css";
import { FaWhatsapp, FaInstagram, FaPhone } from "react-icons/fa";
import { MapPin } from "react-feather";
import { IconBaseProps } from "react-icons";
import { contactLinks } from "../../config/contact";
import ContactLink from "./ContactLink";

const ContactSection: React.FC = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2>Conecte-se Conosco</h2>
        <p className={styles.subtitle}>
          Estamos ansiosos para te ajudar e responder suas perguntas!
        </p>
        <div className={styles.contactMethods}>
          <div className={styles.contactLinks}>
            {" "}
            {/* Envolvemos os links */}
            <ContactLink
              href={contactLinks.whatsapp}
              icon={FaWhatsapp as FunctionComponent<IconBaseProps>}
              altText="Fale conosco no WhatsApp"
            />
            <ContactLink
              href={contactLinks.instagram}
              icon={FaInstagram as FunctionComponent<IconBaseProps>}
              altText="Siga-nos no Instagram"
            />
            <ContactLink
              href={`tel:${contactLinks.phone}`}
              icon={FaPhone as FunctionComponent<IconBaseProps>}
              altText="Ligue para nossa loja"
            />
          </div>
          <div className={styles.addressContainer}>
            {" "}
            {/* Container para o endereço */}
            <div className={styles.address}>
              <span className={styles.iconWrapper}>
                <MapPin size={24} />
              </span>
              <div className={styles.addressText}>
                <p>Sala c. Rua E.</p>
                <p>Bairro Bnh1 - Casa</p>
                <p>Pimenta Bueno - RO</p>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.callToAction}>
          Visite nossa loja ou entre em contato online para descobrir a
          qualidade dos nossos barbantes!
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
