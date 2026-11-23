import getCode from './codeCounty/codeCounty.js';
const BASE = "https://www.themealdb.com/api/json/v1/1";
let allMeals = [];
const searchInput = document.getElementById("searchInput");
const recipes = document.getElementById("cards");
function getResults(categories) {
  return Promise.all(
    categories.map(async ({ strCategory }) => {
      try {

        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(strCategory)}`);

        const data = await res.json();
        return await (data.meals || []).map((meal) => ({ ...meal, strCategory, code: getCode(meal.strCountry) }));
      }
      catch (e) {
        console.log(e);
      }
    })
  );
}

async function getAllMeals() {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);

    const { categories } = await res.json();

    const results = await getResults(categories);

    return results.flat();

  }
  catch (e) {
    console.log(e);
  }
}


function displayallMeals(meals) {
  recipes.innerHTML = '';
  recipes.innerHTML = meals
    .map(createRecipeCard)
    .join("");
  function createRecipeCard(meal, index) {
    if (index > 11) {
      return
    }
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

            <div class="d-flex align-items-center justify-content-between mt-auto">
              <button
                href="details.html?id=${meal.idMeal}"
                class="btn btn-primary rounded-pill"
              >
                View Recipe
              </button>

                  <img      
                    src="https://flagsapi.com/${meal.code}/shiny/32.png"
                    alt="${meal.strMeal} flag"
                  />
            </div>

          </div>
        </div>
        </a>
      </div>

  `;
  }
}




async function main() {
  allMeals = await getAllMeals();
  searchInput.addEventListener("input", function (e) {
    const value = e.target.value.trim().toLowerCase();
    if (!value) {
      recipes.innerHTML = '';
      return;
    }
    search_items(value);
  });

  function search_items(searchValue) {
    let filtered = [];

    filtered = allMeals.filter((meal) => meal.strMeal.toLowerCase().includes(searchValue))
    if (filtered.length === 0) {
      recipes.innerHTML = `
      <div>
      <div class="alert alert-danger mx-auto" style="max-width: 600px;">
        <i class="fa-solid fa-circle-exclamation me-2"></i>
        No countries found or No recipes for this country
      </div>
      </div>
    `;
      return;
    }
    displayallMeals(filtered);
  }
}
main()