// Base URL for TheMealDB API
const BASE = "https://www.themealdb.com/api/json/v1/1";

const params = new URLSearchParams(window.location.search);
const countryParam = params.get("country");

// DOM elements
const countryFlag = document.getElementById("countryFlag");
const countryName = document.getElementById("countryName");
const countryInfo = document.getElementById("countryInfo");
const recipesHeading = document.getElementById("recipesHeading");
const recipesMessage = document.getElementById("recipesMessage");
const recipesContainer = document.getElementById("recipesContainer");

async function getNationality(country) {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${country}`
  );

  const data = await res.json();

  return data[0].demonyms.eng.m;
}

function showMessage(text, type = "danger") {
  recipesMessage.innerHTML = `
    <div class="alert alert-${type} mx-auto" style="max-width: 600px;">
      ${text}
    </div>`;
}

function showLoading() {
  recipesMessage.innerHTML = "";

  recipesContainer.innerHTML = `
    <div class="text-center text-muted py-5 w-100">
      <div class="spinner-border text-primary" role="status"></div>
    </div>`;
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}


async function loadCountry() {
  countryName.textContent = countryParam;
  document.title = `OmniDish | ${countryParam}`;
  try {
    const countries = await fetchJson("https://countries.dev/countries?fields=name,alpha2Code,capital,region,flag");

    const country = countries.find(
      (c) => c.name.toLowerCase() === countryParam.toLowerCase()
    );

    if (!country) return;

    // Display country flag
    countryFlag.src = `https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`;
    countryFlag.alt = `${country.name} flag`;

    // Display country information
    countryInfo.textContent =
      `${country.capital || "No capital"} • ${country.region || "Unknown region"}`;

  } catch (error) {
    console.error(error);
  }
}

/**
 * Load recipes related to the selected country
 */
async function loadRecipes() {
  showLoading();

  // Get nationality from predefined object
  const demonym = demonyms[countryParam];

  if (!demonym) {
    recipesContainer.innerHTML = "";
    showMessage(
      `No recipes available for ${countryParam} yet.`,
      "warning"
    );
    return;
  }

  try {
    // Fetch meals by nationality
    const data = await fetchJson(
      `${BASE}/filter.php?a=${encodeURIComponent(demonym)}`
    );

    if (!data.meals) {
      recipesContainer.innerHTML = "";
      showMessage(
        `No recipes found for ${countryParam}.`,
        "warning"
      );
      return;
    }

    recipesHeading.textContent =
      `Popular ${demonym} Recipes`;

    displayRecipes(data.meals);

  } catch (error) {
    console.error(error);

    recipesContainer.innerHTML = "";

    showMessage(
      "Could not load recipes. Please try again."
    );
  }
}

/**
 * Render recipe cards
 */
function displayRecipes(meals) {
  recipesMessage.innerHTML = "";

  recipesContainer.innerHTML = meals
    .map(
      (meal) => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card rounded-4 h-100">

          <!-- Recipe image -->
          <img
            src="${meal.strMealThumb}/medium"
            class="card-img-top"
            alt="${meal.strMeal}"
            loading="lazy"
          >

          <div class="card-body text-muted">

            <!-- Recipe title -->
            <h5 class="card-title mb-3">
              ${meal.strMeal}
            </h5>

            <!-- Recipe details button -->
            <div class="d-flex align-items-center">
              <a
                href="details.html?id=${meal.idMeal}"
                class="btn btn-primary rounded-5"
              >
                View Recipe
              </a>

              <i class="fa-solid fa-arrow-right ms-auto"></i>
            </div>

          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Check if a country exists in the URL
if (!countryParam) {
  showMessage("No country selected.", "warning");
} else {
  // Load country details and recipes
  loadCountry();
  loadRecipes();
}