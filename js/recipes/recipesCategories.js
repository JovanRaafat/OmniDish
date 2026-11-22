
const recipesHeading = document.getElementById("recipesHeading");
const recipesMessage = document.getElementById("recipesMessage");
const recipesContainer = document.getElementById("recipesContainer");

function getCountryIcon() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("icon");

  return code;
}

// Show Loading
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

// Show Message
function showMessage(message, type = "warning") {
  recipesMessage.innerHTML = `
    <div class="alert alert-${type} text-center mx-auto">
      ${message}
    </div>
  `;

  recipesContainer.innerHTML = "";
}

// Create Recipe Card
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

// Display Recipes
function displayRecipes(meals) {
  recipesMessage.innerHTML = "";

  recipesContainer.innerHTML = meals
    .map(createRecipeCard)
    .join("");
}

const header = (categoryName) => {
  const titleCountry = document.getElementById("title");
  const flag = document.querySelector("#icon");
  const link = document.querySelector("#backLink");
  const text = document.querySelector("#back");


  titleCountry.innerText = categoryName;
  const icon = getCountryIcon()
  flag.innerHTML = `<i class="fa-solid ${icon} fs-4 text-muted text-opacity-75 mb-2"></i>`
  text.innerHTML = "Back to Categories";
  link.href = "categories.html";
}
// Main Function
async function loadCategoryRecipes(categoryName) {

  if (!categoryName) {
    showMessage("Category not found.");
    return;
  }
  header(categoryName)

  recipesHeading.textContent = `Popular ${categoryName} Recipes`;

  showLoading();

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    const meals = data.meals;

    if (!meals || meals.length === 0) {
      showMessage(`No recipes found for ${categoryName}.`);
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

// Start
export default loadCategoryRecipes;
