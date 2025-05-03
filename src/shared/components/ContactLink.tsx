// src/shared/components/ContactLink.tsx
import React, { FunctionComponent } from 'react'
import styles from './ContactLink.module.css'
import { IconBaseProps } from 'react-icons'

interface ContactLinkProps {
  href: string
  icon: FunctionComponent<IconBaseProps>
  altText: string
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, icon: IconComponent, altText }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
      <span className={styles.iconWrapper}>
        <IconComponent size={24} /> {/* Renderizamos o componente diretamente */}
      </span>
      <span className={styles.altText}>{altText}</span>
    </a>
  )
}

export default ContactLink
