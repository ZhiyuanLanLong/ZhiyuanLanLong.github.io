import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCW-VwjHgzKPGe0JF4LdtJKxXL2zcfJSvw",
  authDomain: "my-website-auth-a8a25.firebaseapp.com",
  projectId: "my-website-auth-a8a25",
  storageBucket: "my-website-auth-a8a25.firebasestorage.app",
  messagingSenderId: "366503006855",
  appId: "1:366503006855:web:1278e17edd607909d75e22",
  measurementId: "G-4TB63G3BSV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginContainer = document.getElementById('login-container');
const welcomeContainer = document.getElementById('welcome-container');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const errorMsg = document.getElementById('error-msg');

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginContainer.classList.add('hidden');
        welcomeContainer.classList.remove('hidden');
        emailInput.value = ''; passwordInput.value = ''; errorMsg.textContent = '';
    } else {
        welcomeContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    }
});

loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .catch((error) => errorMsg.textContent = error.message);
});

signupBtn.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .catch((error) => errorMsg.textContent = error.message);
});

logoutBtn.addEventListener('click', () => {
    signOut(auth).catch((error) => errorMsg.textContent = error.message);
});
