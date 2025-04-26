// Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// FirebaseUI for Google Login
const ui = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '#',
};

ui.start('#firebaseui-auth-container', uiConfig);

// Redirect to workout.html after 10 minutes
setTimeout(function() {
    window.location.href = 'workout.html';
}, 600000);

// Like post
function likePost() {
    // Handle liking a post by incrementing a like counter in Firestore
    alert("Liked the post!");
}

// Firebase Authentication - onLogin event handler
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in: ', user.displayName);
        document.getElementById('feed').innerText = `${user.displayName}'s Feed`;
    }
});
