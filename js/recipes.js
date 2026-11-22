import loadRecipesCountry from './recipes/recipesCountries.js'
import loadRecipesCategories from './recipes/recipesCategories.js'
// loadRecipesCategories()
// loadRecipesCountry()
function back() {
  const link = document.querySelector("#backLink")
  const text = document.querySelector("#back")

  text.innerHTML = "Back to Categories";
  link.href = "categories.html";
}

const category = new URLSearchParams(window.location.search).get("category");

category ? loadRecipesCategories(category) : loadRecipesCountry();