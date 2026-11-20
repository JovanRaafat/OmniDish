import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
window.validate_full_name = validate_full_name;
window.validate_email = validate_email;
window.validate_password = validate_password;
window.validate_password_con = validate_password_con;
window.sign_up = sign_up;
window.TogglePassword = TogglePassword;
function validate_full_name() {
  let full_name = document.getElementById("full_name");
  let fullname_rgx = /^[\p{L}'-]{2,}(?:\s+[\p{L}'-]{2,})+$/u;
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
}

function validate_email() {
  let email = document.getElementById("email");
  let email_rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let valid_email = false;

  if (email_rgx.test(email.value)) {
    email.classList.add("valid_input");
    email.classList.remove("invalid_input");
    document.getElementById("valid_email").innerHTML = "";
    valid_email = true;
  } else {
    email.classList.add("invalid_input");
    email.classList.remove("valid_input");
    document.getElementById("valid_email").innerHTML =
      "Please enter a valid email address.";
    valid_email = false;
  }
}

function validate_password() {
  let password = document.getElementById("password");
  let password_rgx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let valid_password = false;

  if (password_rgx.test(password.value)) {
    password.classList.add("valid_input");
    password.classList.remove("invalid_input");
    document.getElementById("valid_password").innerHTML = "";
    valid_password = true;
  } else {
    password.classList.add("invalid_input");
    password.classList.remove("valid_input");
    document.getElementById("valid_password").innerHTML =
      "Use 8+ chars: A–Z, a–z, 0–9, and @$!%*?&.";
    valid_password = false;
  }
}

function validate_password_con() {
  let password = document.getElementById("password");
  let password_con = document.getElementById("passwordcon");
  let password_rgx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let valid_password = password_rgx.test(password.value);
  let valid_password_con = false;

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
      "Passwords must match";
    valid_password_con = false;
  }
}

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
      "Please enter a valid email address.";
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
      "Use 8+ chars: A–Z, a–z, 0–9, and @$!%*?&.";
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
      "Passwords must match";
    valid_password_con = false;
  }
  if (valid_email && valid_password && valid_password_con && valid_full_name) {
    document.getElementById("signup_form").submit();
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
const firebaseConfig = {
  apiKey: "AIzaSyBBH3H8sjNJEfyTppOeHhydOXffPuxmoqc",
  authDomain: "omnidish-8605a.firebaseapp.com",
  projectId: "omnidish-8605a",
  storageBucket: "omnidish-8605a.firebasestorage.app",
  messagingSenderId: "41956723520",
  appId: "1:41956723520:web:4280a187b905cfa1bf88a5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

getRedirectResult(auth)
  .then((result) => {
    if (result) {
      console.log("Logged in successfully:", result.user);
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    console.error("Redirect error:", error.message);
  });

const google_Btn_signup = document.getElementById("google_btn_signup");
if (google_Btn_signup) {
  google_Btn_signup.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithRedirect(auth, provider);
  });
}
