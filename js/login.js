import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

const googleBtn = document.getElementById("googlebtn");
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithRedirect(auth, provider);
  });
}


// //eyepass
const eyepass =document.getElementById("eyepass")
eyepass.addEventListener("click", function () {
  if(password.type === "password"){
    password.type ="text"
eyepass.classList.remove("fa-eye-slash");
eyepass.classList.add("fa-eye");
  }else{
    password.type ="password"
eyepass.classList.remove("fa-eye");
eyepass.classList.add("fa-eye-slash");
  }
})

window.validate_email = validate_email;
window.validate_password = validate_password;
window.login =login;
window.TogglePassword = TogglePassword;



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


function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let password_rgx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  let email_rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let valid_email = false;
  let valid_password = false;

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

  if (valid_email && valid_password) {
    document.getElementById("login_form").submit();
  }
}
