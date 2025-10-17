/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchAllRecipes } from '../services/mealDB';
import { getLocalRecipes, saveLocalRecipes, getDeletedRecipes, addToDeletedRecipes } from '../utils/localStorage';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const apiRecipesData = await fetchAllRecipes();
      const localRecipes = getLocalRecipes();
      const deletedRecipes = getDeletedRecipes();
      
      // Filtra recetas API excluir las eliminadas y las que tienen versión local
      const filteredApiRecipes = apiRecipesData.filter(apiRecipe => 
        !deletedRecipes.includes(apiRecipe.id) && 
        !localRecipes.find(localRecipe => localRecipe.id === apiRecipe.id)
      );
      
      const mergedRecipes = [...localRecipes, ...filteredApiRecipes];
      
      setRecipes(mergedRecipes);
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  const addRecipe = (recipeData) => {
    const newRecipe = {
      id: `local-${Date.now()}`,
      ...recipeData
    };
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    saveLocalRecipes(updatedRecipes.filter(recipe => !recipe.id.startsWith('local-')));
  };

  const updateRecipe = (id, recipeData) => {
    let updatedRecipes;
    
    if (!id.startsWith('local-')) {
      const updatedRecipe = {
        ...recipeData,
        id: id 
      };
      updatedRecipes = [...recipes.filter(recipe => recipe.id !== id), updatedRecipe];
    } else {
      updatedRecipes = recipes.map(recipe => 
        recipe.id === id ? { ...recipeData, id } : recipe
      );
    }
    
    setRecipes(updatedRecipes);
    saveLocalRecipes(updatedRecipes.filter(recipe => !recipe.id.startsWith('local-')));
  };

  const deleteRecipe = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    
    if (!id.startsWith('local-')) {
      addToDeletedRecipes(id);
    } else {
      saveLocalRecipes(updatedRecipes.filter(recipe => !recipe.id.startsWith('local-')));
    }
  };

  const openDetailModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailModalOpen(true);
  };

  const openFormModal = (recipe = null) => {
    setEditingRecipe(recipe);
    setIsFormModalOpen(true);
  };

  const closeModals = () => {
    setIsDetailModalOpen(false);
    setIsFormModalOpen(false);
    setSelectedRecipe(null);
    setEditingRecipe(null);
  };

  return (
    <RecipeContext.Provider value={{
      recipes,
      viewMode,
      setViewMode,
      selectedRecipe,
      isDetailModalOpen,
      isFormModalOpen,
      editingRecipe,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      openDetailModal,
      openFormModal,
      closeModals
    }}>
      {children}
    </RecipeContext.Provider>
  );
};