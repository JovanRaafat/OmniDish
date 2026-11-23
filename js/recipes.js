import loadRecipesCountry from './recipes/recipesCountries.js'
import loadRecipesCategories from './recipes/recipesCategories.js'

const category = new URLSearchParams(window.location.search).get("category");

category ? loadRecipesCategories(category) : loadRecipesCountry();