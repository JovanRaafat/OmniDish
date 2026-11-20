const categoriesContainer = document.getElementById("categoriesContainer");
let categories = [];
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

async function getCategories() {
  categoriesContainer.innerHTML = `
    <div class="text-center text-muted py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>`;

  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    categories = data.categories;
    displayCategories(data.categories);
  } catch (error) {
    console.error(error);
    categoriesContainer.innerHTML = `
      <div class="alert alert-danger mx-auto" style="max-width: 600px;">
        Could not load categories. Please try again.
      </div>`;
  }
}

function displayCategories(categories) {
  categoriesContainer.innerHTML = categories
    .map((category) => {
      const name = category.strCategory;
      const icon = categoryIcons[name] || "fa-utensils";

      return `
        <div class="card rounded-5 col-10 col-sm-5 col-md-3 mt-4 text-center text-muted">
          <a class="text-decoration-none text-muted"
              href="./recipes.html?category=${encodeURIComponent(name)}">
            <img src="${category.strCategoryThumb}" class="card-img-top rounded-5"
                  alt="${name} img" loading="lazy">
            <div class="card-body">
              <i class="fa-solid ${icon} fs-4 text-muted text-opacity-75 mb-2"></i>
              <h5 class="card-title">${name}</h5>
            </div>
          </a>
        </div>`;
    })
    .join("");
}

console.log(categories);

getCategories();

  const categoriesInput = document.getElementById("categoriesSearch");
  categoriesInput.addEventListener("input", function (e) {
    search_items(e.target.value.trim().toLowerCase());
  });
  function search_items(searchValue) {
    const filtered = [];
    for (const i of categories) {
      let categories_names = i.strCategory.toLowerCase().includes(searchValue);
      if (categories_names) {
        filtered.push(i);
      }
    }
    displayCategories(filtered);
  }
  categoriesInput.closest("form").addEventListener("submit", function (e) {
    e.preventDefault();
  });