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
const broken_countries = [
  "Åland Islands",
  "American Samoa",
  "Anguilla",
  "Antarctica",
  "Bahrain",
  "Belarus",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational state of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Bouvet Island",
  "British Indian Ocean Territory",
  "United States Minor Outlying Islands",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Brunei Darussalam",
  "Burkina Faso",
  "Burundi",
  "Cameroon",
  "Cabo Verde",
  "Central African Republic",
  "Chad",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Comoros",
  "Congo",
  "Congo (Democratic Republic of the)",
  "Cook Islands",
  "Curaçao",
  "Cyprus",
  "Czech Republic",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "French Polynesia",
  "French Guiana",
  "Finland",
  "Georgia",
  "Gambia",
  "Gabon",
  "French Southern Territories",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Hear Island and McDonald Islands",
  "Vatican City",
  "Iceland",
  "Hong Kong",
  "Hungary",
  "Honduras",
  "Iran (Islamic Republic of)",
  "Ivory Coast",
  "Israel",
  "Isle of Man",
  "Iraq",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "North Macedonia",
  "Madagascar",
  "Malawi",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Micronesia (Federated States of)",
  "Moldova (Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Korea (Democratic People's Republic of)",
  "Northern Mariana Islands",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Pitcairn",
  "Puerto Rico",
  "Qatar",
  "Republic of Kosovo",
  "Réunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Singapore",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Sint Maarten (Dutch part)",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Korea (Republic of)",
  "Sri Lanka",
  "Sudan",
  "South Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States of America",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Bolivia (Plurinational State of)",
  "Heard Island and McDonald Islands",
  "Indonesia",
];

function displayCountries(countries) {
  countriesMessage.innerHTML = "";

  countriesContainer.innerHTML = countries
    .map((country) => {
      const countryName = country.name;
      const countryCode = country.alpha2Code.toLowerCase();
      const region = country.region || "Unknown region";
      const capital = country.capital || "No capital";
      const flagImage = `https://flagcdn.com/${countryCode}.svg`;
      if (broken_countries.includes(countryName)) {
        return "";
      }
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
  if (filtered.length === 0) {
    countriesMessage.innerHTML = `
      <div class="alert alert-danger mx-auto" style="max-width: 600px;">
        <i class="fa-solid fa-circle-exclamation me-2"></i>
        No countries found or No recipes for this country
      </div>
    `;
  }
}
searchInput.closest("form").addEventListener("submit", function (e) {
  e.preventDefault();
});
