const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const fetchAllRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE}/search.php?s=`);
    const data = await response.json();
    
    if (data.meals) {
      return data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        image: meal.strMealThumb,
        ingredients: extractIngredients(meal),
        instructions: meal.strInstructions,
        comments: '',
        isLocal: false
      }));
    }
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

const extractIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient,
        quantity: measure || ''
      });
    }
  }
  return ingredients;
};