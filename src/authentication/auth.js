function signInWithEmailPassword() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if (isValidEmailPass(email, pass)) {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (response) {
                // User is signed in.
                console.log("User is signed in")
                window.location.replace("../pages/dashboard.html")
            })
            .catch(function (error) {
                window.alert("Login Failed! " + error.message);
                console.log(error.message)
            });
    }
}

function isValidEmailPass(email, pass) {
    let isValid = true;

    atpos = email.indexOf("@");
    dotpos = email.lastIndexOf(".");
    var spaceCount = 0;
    spaceCount = (pass.split(" ").length - 1);

    if (!email && !pass) {
        window.alert("Email and password can't be empty.");
        isValid = false;
    } else if (atpos < 1 || (dotpos - atpos < 2)) {
        window.alert("Please enter a valid email address");
        isValid = false;
    } else if (pass.length < 6 || spaceCount > 0) {
        window.alert("Password should be at least 6+ chars");
        isValid = false;
    }

    return isValid;
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