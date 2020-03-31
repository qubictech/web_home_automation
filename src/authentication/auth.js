function signInWithEmailPassword() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if (email && pass) {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (response) {
                // User is signed in.
                console.log("User is signed in")
                window.location.replace("../pages/dashboard.html")
            })
            .catch(function (error) {
                window.alert(error.message);
            });
    } else {
        window.alert("Email and password are required!");
    }
}

function logout() {
    firebase.auth().signOut()
        .then(function () {
            // Sign-out successful.
            // User is signed in.
            console.log("User is signed out")
            window.location.replace("../pages/login.html")
        }).catch(function (error) {
            // An error happened.
            // User is signed in.
            console.log("User is signed out failed")
        });
}