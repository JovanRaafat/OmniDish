const countriesSlider = document.getElementById("popularCountries");
const prevCountry = document.getElementById("prevCountry");
const nextCountry = document.getElementById("nextCountry");
const countriesData = [
  {
    name: "Egyptian",
    code: "EG",
    image: "eygpt.jpeg",
  },
  {
    name: "Italian",
    code: "IT",
    image: "italy.jpeg",
  },
  {
    name: "Indian",
    code: "IN",
    image: "india.jpeg",
  },
  {
    name: "Mexican",
    code: "MX",
    image: "mexico.jpeg",
  },
  {
    name: "Japanese",
    code: "JP",
    image: "japan.jpeg",
  },
  {
    name: "American",
    code: "US",
    image: "usa.jpeg",
  },
];



// Slider buttons
function scrollCountries(direction) {
  const card = countriesSlider.querySelector(".country-card");

  if (!card) return;

  const gap = +getComputedStyle(countriesSlider).gap || 0;
  const distance = card.getBoundingClientRect().width + gap;

  countriesSlider.scrollBy({
    left: direction * distance,
    behavior: "smooth",
  });
}




countriesSlider.innerHTML = countriesData
  .map(({ code, image, name }) => {

    return `
          <div class="card country-card p-0">
            <a
              class="text-decoration-none text-muted"
              href="./recipes.html?area=${name}"
            >
              <img
                src="./images/${image}"
                class="card-img-top"
                alt="${name}"
              />

              <div class="card-body">
                <h6>
                  <img
                    src="https://flagsapi.com/${code}/shiny/32.png"
                    alt="${name} flag"
                  />
                  ${name}
                </h6>
              </div>
            </a>
          </div>
        `;
  })
  .join("");
nextCountry.addEventListener("click", () => scrollCountries(1));
prevCountry.addEventListener("click", () => scrollCountries(-1));
