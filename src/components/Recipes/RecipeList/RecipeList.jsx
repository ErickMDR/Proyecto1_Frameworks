import React from 'react';
import { useRecipes } from '../../../context/RecipeContext.jsx';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import styles from './RecipeList.module.css';

const RecipeList = () => {
  const { recipes, viewMode } = useRecipes();

  const sortedRecipes = [...recipes].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className={`${styles.recipeList} ${styles[viewMode]}`}>
      {sortedRecipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;