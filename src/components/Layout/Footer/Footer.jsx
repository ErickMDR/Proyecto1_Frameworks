import React from 'react';
import { useRecipes } from '../../../context/RecipeContext.jsx';
import styles from './Footer.module.css';

const Footer = () => {
  const { openFormModal } = useRecipes();

  return (
    <footer className={styles.footer}>
      <button 
        onClick={() => openFormModal()} 
        className={styles.crudButton}
      >
        + Add
      </button>
    </footer>
  );
};

export default Footer;