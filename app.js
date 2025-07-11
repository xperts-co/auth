// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCO-Il5j3zkXwmb4l40KTKbmucOS0EDmo8",
    authDomain: "otp4dph.firebaseapp.com",
    projectId: "otp4dph",
    storageBucket: "otp4dph.appspot.com", // Corrected domain
    messagingSenderId: "454455003784",
    appId: "1:454455003784:web:cc021623e011059bde2d3d",
    measurementId: "G-FTRK4E97SQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Helper Functions ---

// Function to check auth state and redirect
function checkAuthState() {
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            // Check their role and redirect to the appropriate dashboard
            db.collection('users').doc(user.uid).get().then(doc => {
                if (doc.exists) {
                    const userRole = doc.data().role;
                    const currentPage = window.location.pathname.split("/").pop();

                    if (userRole === 'student' && currentPage !== '3.html') {
                        window.location.replace('3.html');
                    } else if (userRole === 'admin' && currentPage !== '4.html') {
                        window.location.replace('4.html');
                    } else if (userRole === 'parent' && currentPage !== '5.html') {
                         window.location.replace('5.html');
                    }
                } else {
                    console.error("No user data found in Firestore!");
                }
            });
        } else {
            // No user is signed in. Redirect to login page if not already there.
            const nonAuthPages = ['1.html', '2.html'];
            const currentPage = window.location.pathname.split("/").pop();
            if (!nonAuthPages.includes(currentPage)) {
                 window.location.replace('1.html');
            }
        }
    });
}

function logout() {
    auth.signOut().then(() => {
        window.location.replace('1.html');
    }).catch(error => {
        console.error("Sign out error", error);
    });
}
