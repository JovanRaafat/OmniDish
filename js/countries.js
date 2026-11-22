const countriesContainer = document.getElementById("countriesContainer");
const countriesLoading = document.getElementById("countriesLoading");
const countriesMessage = document.getElementById("countriesMessage");
const searchInput = document.getElementById("countriesSearch");
let countries = [];

async function getCountries() {
  showLoading();

  try {
    const response = await fetch(
      "https://countries.dev/countries?fields=name,alpha2Code,capital,region,flag",
    );
    countries = await response.json();

    console.log(countries);
    displayCountries(countries);
  } catch (error) {
    countriesMessage.innerHTML = `
      <div class="alert alert-danger mx-auto" style="max-width: 600px;">
        <i class="fa-solid fa-circle-exclamation me-2"></i>
        Could not load countries. Please try again.
      </div>
    `;

    console.error(error);
  } finally {
    hideLoading();
  }
}

function displayCountries(countries) {
  countriesMessage.innerHTML = "";

  countriesContainer.innerHTML = countries
    .map((country) => {
      const countryName = country.name;
      const countryCode = country.alpha2Code.toLowerCase();
      const region = country.region || "Unknown region";
      const capital = country.capital || "No capital";
      const flagImage = `https://flagcdn.com/${countryCode}.svg`;
      return `
        <div class="col-10 col-sm-5 col-md-4 col-lg-3">
          <a
            class="text-decoration-none"
            href="./recipes.html?country=${encodeURIComponent(countryName)}&code=${country.alpha2Code}"
          >
            <div class="card country h-100 overflow-hidden">

              <div class="country-image-container h-50">
                <img
                  src="${flagImage}"
                  class="card-img-top country-image h-100 "
                  alt="${country.flags || `${countryName} flag`}"
                  loading="lazy"
                >
              </div>

              <div class="card-body">
                <h5 class="card-title text-muted mb-2">
                  ${countryName}
                </h5>

                <p class="text-muted small mb-1">
                  <i class="fa-solid fa-earth-americas me-1"></i>
                  ${region}
                </p>

                <p class="text-muted small mb-0">
                  <i class="fa-solid fa-location-dot me-1"></i>
                  ${capital}
                </p>
              </div>

            </div>
          </a>
        </div>
      `;
    })
    .join("");
}

function showLoading() {
  countriesLoading.classList.remove("d-none");
  countriesMessage.innerHTML = "";
  countriesContainer.innerHTML = "";
}

function hideLoading() {
  countriesLoading.classList.add("d-none");
}

getCountries();
searchInput.addEventListener("input", function (e) {
  search_items(e.target.value.trim().toLowerCase());
});
function search_items(searchValue) {
  const filtered = [];
  for (const c of countries) {
    let country_names = c.name.toLowerCase().includes(searchValue);
    let country_region = c.region.toLowerCase().includes(searchValue);
    if (country_names || country_region) {
      filtered.push(c);
    }
  }
  displayCountries(filtered);
}
searchInput.closest("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
