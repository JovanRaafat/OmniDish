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


//email
const emailInput =document.getElementById("emailInput");
const emailerror =document.getElementById("emailerror")

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

emailInput.addEventListener("input", function () {
    const email = emailInput.value;
    const isValid = validateEmail(email);
    if (email.trim() === "") {
        emailInput.classList.add("is-invalid");
        emailerror.textContent = "Email is required";
    } 
    else if (!isValid) {
        emailInput.classList.add("is-invalid");
        emailerror.textContent = "Please enter a valid email address.";
    } 
    else {
        emailInput.classList.remove("is-invalid");
        emailerror.textContent = "";
    }
});

//password
const password =document.getElementById("floatingPassword")
const passworderror =document.getElementById("passworderror")

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

password.addEventListener("input", function () {
    const passwordValue = password.value;
    const isValid = validatePassword(passwordValue);
    if(passwordValue.trim()===""){
        password.classList.add("is-invalid");
        password.classList.remove("is-valid");
        passworderror.textContent = "password is required";

    }
    else if (isValid) {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
        passworderror.textContent = "";
    } else {
        password.classList.remove("is-valid");
        password.classList.add("is-invalid");
        passworderror.textContent =
            "Use 8+ chars: A–Z, a–z, 0–9, and @$!%*?&.";
    }
});

//eyepass
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


//login
const loginform =document.getElementById("loginform")
loginform.addEventListener("submit",function(e){
  e.preventDefault();
  console.log("hello");
  
    const email = emailInput.value;
    const passwordValue = password.value;

    const isemailvalid = validateEmail(email);
    const ispasswordvalid = validatePassword(passwordValue)

if (!isemailvalid) {
    emailInput.classList.add("is-invalid");
    emailerror.textContent = "Please enter a valid email address.";
}

if (!ispasswordvalid) {
    password.classList.add("is-invalid");
    password.classList.remove("is-valid");
    passworderror.textContent = "Please enter a valid password.";
}

    if(!isemailvalid || !ispasswordvalid ){
      return;
    }

    window.location.href ="index.html"
})


