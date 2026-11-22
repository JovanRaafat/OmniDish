
const recipesHeading = document.getElementById("recipesHeading");
const recipesMessage = document.getElementById("recipesMessage");
const recipesContainer = document.getElementById("recipesContainer");
const titleCountry = document.getElementById("title");
const flag = document.querySelector("#icon");


// Get country name from URL or HTML
function getCountryName() {
  const params = new URLSearchParams(window.location.search);
  const countryFromURL = params.get("country");

  return countryFromURL;
}
function getCountryCode() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  return code;
}


// Show loading
function showLoading() {
  recipesMessage.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mt-3">Discovering delicious recipes...</p>
    </div>
  `;

  recipesContainer.innerHTML = "";
}

// Show message
function showMessage(message, type = "warning") {
  recipesMessage.innerHTML = `
    <div class="alert alert-${type} text-center mx-auto">
      ${message}
    </div>
  `;

  recipesContainer.innerHTML = "";
}

// Create recipe card
function createRecipeCard(meal) {

  return `
  
    <div class="col-12 col-md-6 col-lg-4">
    <a
      href="details.html?id=${meal.idMeal}"
      class="text-decoration-none"
    >
    <div class="card rounded-4 h-100 overflow-hidden">

        <img
          src="${meal.strMealThumb}"
          class="card-img-top"
          alt="${meal.strMeal}"
          loading="lazy"
        />

        <div class="card-body d-flex flex-column text-muted">

          <h5 class="card-title mb-3 text-muted">
            ${meal.strMeal}
          </h5>

          <div class="d-flex align-items-center mt-auto">
            <a
              href="details.html?id=${meal.idMeal}"
              class="btn btn-primary rounded-pill"
            >
              View Recipe
            </a>

            <i class="fa-solid fa-arrow-right ms-auto"></i>
          </div>

        </div>
      </div>
      </a>
    </div>
  `;
}

// Display recipes
function displayRecipes(meals) {
  recipesMessage.innerHTML = "";

  recipesContainer.innerHTML = meals
    .map(createRecipeCard)
    .join("");
}

const header = (countryName) => {
  titleCountry.innerText = countryName;
  const code = getCountryCode()
  flag.innerHTML = `<img src="https://flagsapi.com/${code}/shiny/32.png" class="Flag border-none rounded-3 me-3" alt="countryName">`
}
// Main function
async function loadRecipesCountry() {
  const countryName = getCountryName();

  recipesHeading.textContent = `Popular ${countryName} Recipes`;
  header(countryName);
  showLoading();

  try {

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`);

    const { meals } = await response.json();

    if (!meals || meals.length === 0) {
      showMessage(`No recipes found for ${countryName}.`);
      return;
    }

    displayRecipes(meals);
  } catch (error) {

    showMessage(
      "Something went wrong. Please try again later.",
      "danger"
    );
  }
}

export default loadRecipesCountry;