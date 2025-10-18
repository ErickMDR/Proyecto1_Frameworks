import React from 'react';
import { useRecipes } from '../../../context/RecipeContext';
import Modal from '../../Layout/Modal/Modal.jsx';
import styles from './RecipeDetail.module.css';

const RecipeDetail = () => {
  const { selectedRecipe, isDetailModalOpen, closeModals } = useRecipes();

  if (!selectedRecipe) return null;

  return (
    <Modal isOpen={isDetailModalOpen} onClose={closeModals} title={selectedRecipe.name}>
      <div className={styles.detailContent}>
        <div className={styles.leftColumn}>
          <div className={styles.imageSection}>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} className={styles.image} />
            {selectedRecipe.category && (
              <p className={styles.category}>Category: {selectedRecipe.category}</p>
            )}
          </div>
          
          <div className={styles.ingredientsSection}>
            <h3 className={styles.sectionTitle}>Ingredients</h3>
            <ul className={styles.ingredientsList}>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>{ingredient.name}</span>
                  {ingredient.quantity && (
                    <span className={styles.ingredientQuantity}> - {ingredient.quantity}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Steps to Follow</h3>
            <div className={styles.instructions}>
              {selectedRecipe.instructions.split('\n').map((step, index) => (
                step.trim() && (
                  <div key={index} className={styles.instructionStep}>
                    <span className={styles.stepNumber}></span>
                    <span className={styles.stepText}>{step}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {selectedRecipe.comments && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Extra Comments</h3>
              <p className={styles.comments}>{selectedRecipe.comments}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RecipeDetail;