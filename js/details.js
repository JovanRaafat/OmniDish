import getCode from "./codeCounty/codeCounty.js";

const categoryIcons = {
  Beef: "fa-cow",
  Chicken: "fa-drumstick-bite",
  Dessert: "fa-cake-candles",
  Lamb: "fa-bacon",
  Miscellaneous: "fa-utensils",
  Pasta: "fa-bowl-food",
  Pork: "fa-piggy-bank",
  Seafood: "fa-fish",
  Side: "fa-plate-wheat",
  Starter: "fa-bell-concierge",
  Vegan: "fa-seedling",
  Vegetarian: "fa-leaf",
  Breakfast: "fa-egg",
  Goat: "fa-paw",
};

const bgImg = document.getElementById("bgImg");
const mealName = document.getElementById("mealName");
const mealArea = document.getElementById("mealArea");
const flag = document.getElementById("flag");

const mealCategory = document.getElementById("mealCategory");
const mealTime = document.getElementById("mealTime");
const mealDifficulty = document.getElementById("mealDifficulty");

const ingredientsList1 = document.getElementById("ingredientsList1");
// const ingredientsList2 = document.getElementById("ingredientsList2");
const instructionsList = document.getElementById("instructionsList");
const videoLink = document.getElementById("videoLink");

// ================================
// Get Meal ID From URL
// ================================

const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");

// ================================
// Get Meal Details
// ================================

async function getMealDetails() {
  if (!mealId) {
    console.log("Meal ID is missing from URL");
    return;
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    );

    const data = await response.json();

    if (!data.meals) {
      console.log("Meal not found");
      return;
    }

    const meal = data.meals[0];

    displayMealDetails(meal);
  } catch (error) {
    console.log("Error fetching meal details:", error);
  }
}

// ================================
// Display Meal Details
// ================================

function displayMealDetails(meal) {
  mealName.textContent = meal.strMeal;
  mealArea.textContent = meal.strArea || "Unknown Area";
  bgImg.style.background = `linear-gradient(90deg,
                            rgba(var(--overlay), 0.95) 0%,
                            rgba(var(--overlay), 0.6) 50%,
                            rgba(var(--overlay), 0) 100%),
                            url(${meal.strMealThumb})`;

  flag.innerHTML = `  <img class="flag" src="https://flagsapi.com/${getCode(meal.strCountry)}/shiny/32.png" alt="${meal.strArea}">`;

  // Category
  mealCategory.innerHTML = `
  <i class="fa-solid ${categoryIcons[meal.strCategory]} me-2"></i>
  ${meal.strCategory || "Unknown Category"}
  `;

  // Cooking time (API doesn't provide cooking time)
  mealTime.innerHTML = `
  <i class="fa-solid fa-utensils me-2"></i>
    ${meal.strTags || "No Tags"}
  `;

  // Difficulty (API doesn't provide difficulty)
  mealDifficulty.innerHTML = `
  <i class="fa-solid fa-flag"></i>
    ${meal.strArea || "Unknown"}
  `;

  displayIngredients(meal);
  displayInstructions(meal);
  displayVideo(meal);
}

// ================================
// Display Ingredients
// ================================

function displayIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure || ""} ${ingredient}`);
    }
  }

  // const middle = Math.ceil(ingredients.length / 2);

  const firstColumn = ingredients.slice(0, ingredients.length);
  // const secondColumn = ingredients.slice(middle);

  ingredientsList1.innerHTML = firstColumn
    .map((item) => `<li class="py-1 col-12 col-md-5 ">${item}</li>`)
    .join("");

  // ingredientsList2.innerHTML = secondColumn
    // .map((item) => `<li class="py-1">${item}</li>`)
    // .join("");
}

// ================================
// Display Instructions
// ================================

function displayInstructions(meal) {
  const instructions = meal.strInstructions
    .split(/\r?\n/)
    .filter((step) => step.trim() !== "");

  instructionsList.innerHTML = instructions
    .map(
      (step, index) => `
        <li class="d-flex align-items-center mb-3">
          <span class="number d-flex align-items-center justify-content-center rounded-circle fw-bold me-3 flex-shrink-0">
            ${index + 1}
          </span>
          <span>${step}</span>
        </li>
      `,
    )
    .join("");
}

// ================================
// Display Video
// ================================

function displayVideo(meal) {
  if (!meal.strYoutube) {
    videoLink.innerHTML = "<p class='text-muted'>No video available</p>";
    return;
  }

  videoLink.innerHTML = `

    <div class="w-100">
                  <div class="d-flex flex-column flex-md-row  align-items-center gap-3">
                    <a href="${meal.strYoutube}">
                      <div class="Image rounded-3 overflow-hidden position-relative ">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 h-100 object-fit-cover">
                        <i
                          class="vid fa-solid fa-circle-play position-absolute top-50 start-50 translate-middle fs-1 shadow text-secondary"></i>
                      </div>
                    </a>


                    <div>
                      <h5 class=" mb-1 fs-6 fw-bold">Watch how to make ${meal.strMeal}</h5>
                      <p class=" mb-0 small text-muted">A simple step-by-step video recipe.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <a href="${meal.strYoutube}"
                    class="btn2 btn btn-outline-secondary rounded-3  border-secondary d-flex align-items-center justify-content-center">
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>

  `;
}

// ================================
// Start
// ================================

getMealDetails();
