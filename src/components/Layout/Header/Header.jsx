import React from 'react';
import { useRecipes } from '../../../context/RecipeContext.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import styles from './Header.module.css';

const Header = () => {
  const { viewMode, setViewMode } = useRecipes();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Ramii</h1>
        
        <div className={styles.viewSelector}>
          <button 
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid"
          >
            Grid
          </button>
          <button 
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
            title="List"
          >
            List
          </button>
          <button 
            className={`${styles.viewButton} ${viewMode === 'column' ? styles.active : ''}`}
            onClick={() => setViewMode('column')}
            title="Column"
          >
            Column
          </button>
          <button 
            className={`${styles.viewButton} ${viewMode === 'mosaic' ? styles.active : ''}`}
            onClick={() => setViewMode('mosaic')}
            title="Mosaic"
          >
            Mosaic
          </button>
        </div>

        <div className={styles.userSection}>
          <span>Welcome, {user.username}</span>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;