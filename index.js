/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"

/* === Firebase Setup === */

const firebaseConfig = {
    apiKey: "AIzaSyD2P2XxCOckAq0-lVzCKLl1PtQbC1ACKZY",
    authDomain: "hotcold-9560f.firebaseapp.com",
    projectId: "hotcold-9560f",
    storageBucket: "hotcold-9560f.firebasestorage.app",
    messagingSenderId: "976156553",
    appId: "1:976156553:web:13d580649bcd48ce4dd358"
};

const app = initializeApp(firebaseConfig);

/* Initialize Firebase Auth after initializing the app */
const auth = getAuth(app);
console.log(auth);

/* === UI === */

/* == UI - Elements == */

const userGreetingEl = document.getElementById("user-greeting")

const userProfilePictureEl = document.getElementById("user-profile-picture")

const signOutButtonEl = document.getElementById("sign-out-btn");

const viewLoggedOut = document.getElementById("logged-out-view");
const viewLoggedIn = document.getElementById("logged-in-view");

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn");

const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");

const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);
signOutButtonEl.addEventListener("click", authSignOut);

signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
    } else {
        showLoggedOutView()
    }
 })
 

console.log(app.options.projectId);

showLoggedOutView();

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            showLoggedInView();
        } else {
            showLoggedOutView();
        }
    });
}

function authSignInWithEmail() {
    console.log("Sign in with email and password");

    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            showLoggedInView();
        })
        .catch((error) => {
            console.error(error.message);
        });
}

function authCreateAccountWithEmail() {
    const email = emailInputEl.value;
    const password = passwordInputEl.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            showLoggedInView();
        })
        .catch((error) => {
            console.error(error.message);
        });
}

function authSignOut() {
    signOut(auth).then(() => {
        showLoggedOutView();
    }).catch((error) => {
        console.error(error);
    });
}

function showProfilePicture(imgElement, user) {
    if (user.photoURL) {
        imgElement.src = user.photoURL;
    } else {
        imgElement.src = "assets/images/default-profile-picture.jpeg";
    }
}

function showUserGreeting(element, user) {
    if (user.displayName) {
        const firstName = user.displayName.split(' ')[0];
        element.textContent = `Hi ${firstName}`;
    } else {
        element.textContent = "Hey friend, how are you?";
    }
}




/* == Functions - UI Functions == */


function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
 }
 
 
 function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
 }
 
 
 function showView(view) {
    view.style.display = "flex"
 }
 
 
 function hideView(view) {
    view.style.display = "none"
 }
 
