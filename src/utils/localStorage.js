const LOCAL_RECIPES_KEY = 'recipeApp_localRecipes';
const DELETED_RECIPES_KEY = 'recipeApp_deletedRecipes';

export const getLocalRecipes = () => {
  try {
    const recipes = localStorage.getItem(LOCAL_RECIPES_KEY);
    return recipes ? JSON.parse(recipes) : [];
  } catch (error) {
    console.error('Error loading local recipes:', error);
    return [];
  }
};

export const saveLocalRecipes = (recipes) => {
  try {
    localStorage.setItem(LOCAL_RECIPES_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving local recipes:', error);
  }
};

export const getDeletedRecipes = () => {
  try {
    const deleted = localStorage.getItem(DELETED_RECIPES_KEY);
    return deleted ? JSON.parse(deleted) : [];
  } catch (error) {
    console.error('Error loading deleted recipes:', error);
    return [];
  }
};

export const saveDeletedRecipes = (deletedIds) => {
  try {
    localStorage.setItem(DELETED_RECIPES_KEY, JSON.stringify(deletedIds));
  } catch (error) {
    console.error('Error saving deleted recipes:', error);
  }
};

export const addToDeletedRecipes = (recipeId) => {
  const deleted = getDeletedRecipes();
  if (!deleted.includes(recipeId)) {
    deleted.push(recipeId);
    saveDeletedRecipes(deleted);
  }
};