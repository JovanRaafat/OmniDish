function sign_up() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let password_con = document.getElementById("passwordcon");
  let full_name = document.getElementById("full_name");

  let password_rgx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let email_rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let fullname_rgx = /^[\p{L}'-]{2,}(?:\s+[\p{L}'-]{2,})+$/u;

  let valid_email = false;
  let valid_password = false;
  let valid_password_con = false;
  let valid_full_name = false;

  if (fullname_rgx.test(full_name.value.trim())) {
    full_name.classList.add("valid_input");
    full_name.classList.remove("invalid_input");
    document.getElementById("valid_full_name").innerHTML = "";
    valid_full_name = true;
  } else {
    full_name.classList.add("invalid_input");
    full_name.classList.remove("valid_input");
    document.getElementById("valid_full_name").innerHTML =
      "Please enter a valid full name.";
    valid_full_name = false;
  }
  if (email_rgx.test(email.value)) {
    email.classList.add("valid_input");
    email.classList.remove("invalid_input");
    document.getElementById("valid_email").innerHTML = "";
    valid_email = true;
  } else {
    email.classList.add("invalid_input");
    email.classList.remove("valid_input");
    document.getElementById("valid_email").innerHTML =
      "Please enter a valid email address (for example, name@example.com).";
    valid_email = false;
  }
  if (password_rgx.test(password.value)) {
    password.classList.add("valid_input");
    password.classList.remove("invalid_input");
    document.getElementById("valid_password").innerHTML = "";
    valid_password = true;
  } else {
    password.classList.add("invalid_input");
    password.classList.remove("valid_input");
    document.getElementById("valid_password").innerHTML =
      "Use 8+ characters with an uppercase letter, lowercase letter, number, and symbol (@$!%*?&).";
    valid_password = false;
  }
  if (
    password_con.value === password.value &&
    password_con.value != "" &&
    valid_password == true
  ) {
    password_con.classList.add("valid_input");
    password_con.classList.remove("invalid_input");
    document.getElementById("valid_passwordcon").innerHTML = "";
    valid_password_con = true;
  } else {
    password_con.classList.add("invalid_input");
    password_con.classList.remove("valid_input");
    document.getElementById("valid_passwordcon").innerHTML =
      "Passwords Must Be Equal";
    valid_password_con = false;
  }
}
function TogglePassword(inputId, button) {
  let input = document.getElementById(inputId);
  let icon = button.querySelector(".eye-icon");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
