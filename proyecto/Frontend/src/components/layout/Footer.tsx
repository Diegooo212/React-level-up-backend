// src/components/layout/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';
import { footerContent } from '../../data/uiContent'; 

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <p>{footerContent.copyright}</p>
    </footer>
  );
};

export default Footer;