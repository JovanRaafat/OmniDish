const contactForm = document.getElementById("contactForm");
const formAlert = document.getElementById("formAlert");

const nameInput = document.getElementById("inputName");
const emailInput = document.getElementById("inputEmail");
const subjectInput = document.getElementById("inputSubject");
const messageInput = document.getElementById("inputMessage");

const inputs = [nameInput, emailInput, subjectInput, messageInput];

// Validation Functions
function validateName(name) {
  return name.trim().length >= 3;
}

function validateEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

function validateSubject(subject) {
  return subject.trim().length >= 3;
}

function validateMessage(message) {
  return message.trim().length >= 10;
}

// Check Input Validation
function validateInput(input) {
  const value = input.value;
  let isValid = false;

  switch (input.id) {
    case "inputName":
      isValid = validateName(value);
      break;

    case "inputEmail":
      isValid = validateEmail(value);
      break;

    case "inputSubject":
      isValid = validateSubject(value);
      break;

    case "inputMessage":
      isValid = validateMessage(value);
      break;
  }

  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid);

  return isValid;
}

// Validate While Typing
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (
      input.classList.contains("is-invalid") ||
      input.classList.contains("is-valid")
    ) {
      validateInput(input);
    }
  });

  input.addEventListener("blur", () => {
    validateInput(input);
  });
});

// Show Alert
function showAlert(message, type) {
  formAlert.className = `alert alert-${type}`;
  formAlert.textContent = message;
}

// Submit Form
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  inputs.forEach((input) => validateInput(input));
  const isFormValid = inputs.every((input) => validateInput(input));

  if (!isFormValid) {
    showAlert("Please check your inputs and try again.", "danger");
    return;
  }

  showAlert("Your message has been sent successfully!", "success");

  contactForm.reset();

  inputs.forEach((input) => {
    input.classList.remove("is-invalid", "is-valid");
  });
});
