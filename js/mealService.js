
const API_URL = "https://www.themealdb.com/api/json/v1/1";

// Get all meals by search name
async function getMeals(search = "") {
  const response = await fetch(`${API_URL}/search.php?s=${encodeURIComponent(search)}`);
  const data = await response.json();

  return data.meals || [];
}

// Get meal details by ID
async function getMealById(id) {
  const response = await fetch(`${API_URL}/lookup.php?i=${id}`);
  const data = await response.json();

  return data.meals?.[0] || null;
}

// Get all categories
async function getCategories() {
  const response = await fetch(`${API_URL}/categories.php`);
  const data = await response.json();

  return data.categories || [];
}

// Get all areas / countries
async function getAreas() {
  const response = await fetch(`${API_URL}/list.php?a=list`);
  const data = await response.json();

  return data.meals || [];
}

// Get random meal
async function getRandomMeal() {
  const response = await fetch(`${API_URL}/random.php`);
  const data = await response.json();

  return data.meals?.[0] || null;
}

// Filter by category
async function getMealsByCategory(category) {
  const response = await fetch(
    `${API_URL}/filter.php?c=${encodeURIComponent(category)}`
  );
  const data = await response.json();

  return data.meals || [];
}

// Filter by area
async function getMealsByArea(area) {
  const response = await fetch(
    `${API_URL}/filter.php?a=${encodeURIComponent(area)}`
  );
  const data = await response.json();

  return data.meals || [];
}

// Filter by ingredient
async function getMealsByIngredient(ingredient) {
  const response = await fetch(
    `${API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
  );
  const data = await response.json();

  return data.meals || [];
}

// Get meals by first letter
async function getMealsByLetter(letter) {
  const response = await fetch(
    `${API_URL}/search.php?f=${encodeURIComponent(letter)}`
  );
  const data = await response.json();

  return data.meals || [];
}
