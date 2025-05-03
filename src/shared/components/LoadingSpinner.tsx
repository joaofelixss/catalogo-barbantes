// src/shared/components/LoadingSpinner.tsx
import React from 'react'
import styles from './LoadingSpinner.module.css'

const LoadingSpinner: React.FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner} />
    <span className={styles.loadingText}>Carregando...</span>
  </div>
)

export default LoadingSpinner
