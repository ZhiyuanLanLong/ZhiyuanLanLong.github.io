import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


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
const db = getFirestore(app);


const loginContainer = document.getElementById('login-container');
const welcomeContainer = document.getElementById('welcome-container');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const welcomeMessageText = document.getElementById('welcome-message');

const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const errorMsg = document.getElementById('error-msg');


onAuthStateChanged(auth, async (user) => {
    if (user) {
        
        loginContainer.classList.add('hidden');
        welcomeContainer.classList.remove('hidden');
        
        
        emailInput.value = ''; 
        passwordInput.value = ''; 
        confirmPasswordInput.value = '';
        errorMsg.textContent = '';

        try {
           
            const docRef = doc(db, "siteContent", "homePage");
            const docSnap = await getDoc(docRef);

          
            if (docSnap.exists()) {
                welcomeMessageText.textContent = docSnap.data().message;
            } else {
                welcomeMessageText.textContent = "Data not found!";
            }
        } catch (error) {
            welcomeMessageText.textContent = "Error loading data.";
            console.error("Erro da base de dados:", error);
        }

    } else {
     
        welcomeContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        welcomeMessageText.textContent = "Loading data...";
    }
});


loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .catch((error) => {
            errorMsg.textContent = error.message;
        });
});


signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    

    if (password !== confirmPassword) {
        errorMsg.textContent = "As passwords não coincidem!";
        return; 
    }
    
    createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            errorMsg.textContent = error.message;
        });
});


logoutBtn.addEventListener('click', () => {
    signOut(auth).catch((error) => {
        errorMsg.textContent = error.message;
    });
});
