// script.js

// DOM Elements
const recipeForm = document.getElementById('recipe-form');
const recipesContainer = document.getElementById('recipes-container');
const searchBar = document.getElementById('search-bar');

// Recipe Storage
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Add Recipe
recipeForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const name = document.getElementById('recipe-name').value;
  const ingredients = document.getElementById('ingredients').value.split(',');
  const steps = document.getElementById('steps').value;
  const imageFile = document.getElementById('recipe-image').files[0];
  
  const reader = new FileReader();
  reader.onload = function () {
    const newRecipe = {
      name,
      ingredients,
      steps,
      image: reader.result
    };
    
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes(recipes);
    recipeForm.reset();
  };
  reader.readAsDataURL(imageFile);
});

// Display Recipes
function displayRecipes(recipesToDisplay) {
    recipesContainer.innerHTML = '';
    recipesToDisplay.forEach((recipe, index) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      
      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        <p><strong>Steps:</strong> ${recipe.steps}</p>
        <button class="delete-button" data-index="${index}">Delete</button>
      `;
      
      recipesContainer.appendChild(recipeCard);
    });
  
    // Attach event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', deleteRecipe);
    });
  }
  
// Delete Recipe
function deleteRecipe(event) {
    const recipeIndex = event.target.getAttribute('data-index');
    recipes.splice(recipeIndex, 1); // Remove the recipe from the array
    localStorage.setItem('recipes', JSON.stringify(recipes)); // Update localStorage
    displayRecipes(recipes); // Refresh the displayed recipes
  }
  