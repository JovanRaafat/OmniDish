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