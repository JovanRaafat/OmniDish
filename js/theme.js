const themeIcon = document.querySelector("#theme-toggle");

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);

  localStorage.setItem("theme", newTheme);

  themeIcon.classList.toggle("fa-sun", newTheme === "dark");
  themeIcon.classList.toggle("fa-moon", newTheme === "light");
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
const currentTheme = document.documentElement.getAttribute("data-theme");
themeIcon.classList.toggle("fa-sun", currentTheme === "dark");
themeIcon.classList.toggle("fa-moon", currentTheme === "light");



themeIcon.addEventListener("click", toggleTheme);