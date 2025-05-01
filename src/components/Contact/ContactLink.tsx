import React from "react";
import styles from "./ContactSection.module.css"; // Usa o mesmo CSS Module
import { IconType } from "react-icons";

interface ContactLinkProps {
  href: string;
  icon: IconType;
  altText: string;
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, icon, altText }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.contactButton}
    >
      {(icon as React.FC)({
        className: styles.contactIcon,
        "aria-hidden": true,
      })}
      <span className={styles.visuallyHidden}>{altText}</span>
    </a>
  );
};

export default ContactLink;
