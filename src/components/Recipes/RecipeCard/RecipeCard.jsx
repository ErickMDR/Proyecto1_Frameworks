import React, { useState } from 'react';
import { useRecipes } from '../../../context/RecipeContext.jsx';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  const { openDetailModal, openFormModal, deleteRecipe, viewMode } = useRecipes();
  const [showOptions, setShowOptions] = useState(false);

  const handleCardClick = () => {
    openDetailModal(recipe);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    openFormModal(recipe);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteRecipe(recipe.id);
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'grid':
        return (
          <>
            <img src={recipe.image} alt={recipe.name} className={styles.image} />
            <div className={styles.content}>
              <h3 className={styles.title}>{recipe.name}</h3>
              <p className={styles.category}>{recipe.category}</p>
            </div>
          </>
        );
      
      case 'list':
        return (
          <div className={styles.listLayout}>
            <div className={styles.listContent}>
              <h3 className={styles.title}>{recipe.name}</h3>
              {recipe.category && (
                <p className={styles.category}>{recipe.category}</p>
              )}
              <div className={styles.ingredientsPreview}>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <li key={index} className={styles.ingredientPreview}>
                      {ingredient.name} 
                      {ingredient.quantity && <span> - {ingredient.quantity}</span>}
                    </li>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <li className={styles.moreIngredients}>+{recipe.ingredients.length - 3} more...</li>
                  )}
                </ul>
              </div>
            </div>
            <img src={recipe.image} alt={recipe.name} className={styles.listImage} />
          </div>
        );
      
      case 'column':
        return (
          <div className={styles.columnLayout}>
            <img src={recipe.image} alt={recipe.name} className={styles.columnImage} />
            <div className={styles.columnContent}>
              <h3 className={styles.title}>{recipe.name}</h3>
              {recipe.category && (
                <p className={styles.category}>{recipe.category}</p>
              )}
              <div className={styles.ingredientsPreview}>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                    <li key={index} className={styles.ingredientPreview}>
                      {ingredient.name} 
                      {ingredient.quantity && <span> - {ingredient.quantity}</span>}
                    </li>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <li className={styles.moreIngredients}>+{recipe.ingredients.length - 4} more...</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'mosaic':
        return (
          <img src={recipe.image} alt={recipe.name} className={styles.mosaicImage} />
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={`${styles.recipeCard} ${styles[viewMode]}`}
      onClick={handleCardClick}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {renderContent()}
      
      {showOptions && (
        <div className={styles.options}>
          <button 
            onClick={handleEdit}
            className={styles.editButton}
            title="Edit"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className={styles.deleteButton}
            title="Delete"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;