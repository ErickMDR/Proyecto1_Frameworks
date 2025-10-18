import React, { useState, useEffect } from 'react';
import { useRecipes } from '../../../context/RecipeContext.jsx';
import Modal from '../../Layout/Modal/Modal.jsx';
import styles from './RecipeForm.module.css';

const RecipeForm = () => {
  const { addRecipe, updateRecipe, editingRecipe, isFormModalOpen, closeModals } = useRecipes();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    ingredients: [{ name: '', quantity: '' }],
    instructions: '',
    comments: ''
  });

  useEffect(() => {
    if (editingRecipe) {
      setFormData({
        name: editingRecipe.name || '',
        category: editingRecipe.category || '',
        image: editingRecipe.image || '',
        ingredients: editingRecipe.ingredients?.length > 0 
          ? editingRecipe.ingredients 
          : [{ name: '', quantity: '' }],
        instructions: editingRecipe.instructions || '',
        comments: editingRecipe.comments || ''
      });
    } else {
      setFormData({
        name: '',
        category: '',
        image: '',
        ingredients: [{ name: '', quantity: '' }],
        instructions: '',
        comments: ''
      });
    }
  }, [editingRecipe]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '' }]
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const filteredIngredients = formData.ingredients.filter(ing => 
      ing.name.trim() !== ''
    );
    
    const recipeData = {
      ...formData,
      ingredients: filteredIngredients
    };

    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipeData);
    } else {
      addRecipe(recipeData);
    }
    closeModals();
  };

  return (
    <Modal 
      isOpen={isFormModalOpen} 
      onClose={closeModals} 
      title={editingRecipe ? 'Edit' : 'Create'}
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://frameworks.com/ejemplo.jpg"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Ingredients</label>
          <div className={styles.ingredientsList}>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className={styles.ingredientRow}>
                <input
                  type="text"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  className={styles.ingredientInput}
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  className={styles.quantityInput}
                />
                <button 
                  type="button" 
                  onClick={() => removeIngredient(index)}
                  className={styles.removeButton}
                  disabled={formData.ingredients.length === 1}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button 
            type="button" 
            onClick={addIngredient} 
            className={styles.addButton}
          >
            + Add Ingredient
          </button>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            rows="6"
            placeholder="Describe the steps to prepare the recipe..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comments">Additional Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            rows="3"
            placeholder="Additional notes, variations, tips..."
          />
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={closeModals} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            {editingRecipe ? 'Update' : 'Create'} Recipe
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RecipeForm;