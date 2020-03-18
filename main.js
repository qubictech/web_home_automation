firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("User is signed in.");
        window.location.replace("main.html");
    } else {
        // User is signed out.        
        console.log("User is signed out.");
        window.location.replace("index.html");
    }
});

function loadJsChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
                datasets: [{
                    label: 'Average Temperature',
                    data: [12, 19, 3, 5, 2, 3,10],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
}


function greetings() {
    var day = new Date();
    var hr = day.getHours();

    if (hr >= 0 && hr < 12) {
        document.getElementById("greetings").innerHTML = "<h4>Good Morning,<br>Sabbir!</h4>";
    } else if (hr == 12) {
        document.getElementById("greetings").innerHTML = "<h4>Good Noon,<br>Sabbir!</h4>";
    } else if (hr >= 12 && hr <= 17) {
        document.getElementById("greetings").innerHTML = "<h4>Good Afternoon,<br>Sabbir!</h4>";
    } else {
        document.getElementById("greetings").innerHTML = "<h4>Good Night,<br>Sabbir!</h4>";
    }

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    document.getElementById("current-date").innerHTML = "<i class='fas fa-sun'></i>&nbsp;&nbsp;<b>" + months[day.getMonth()] + " " + day.getDate() + "th,</b> <br>" + days[day.getDay()];

    document.getElementById("more-notification").innerHTML = "<a href='#'>and " + 2 + " more</a>";
    var temp = 29;
    document.getElementById("current-temp").innerHTML += "<b>" + temp + "</b> °C<hr>";

    var humidity = 10;
    document.getElementById("current-temp").innerHTML += "Humidity<br>" + humidity + "%";

    var runningDevices = "Living room lamp is opening. <br>Speaker is playing..";
    document.getElementById("running-device").innerHTML = runningDevices;

    loadJsChart();
}

function login() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if (email && pass) {
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (response) {

            })
            .catch(function (error) {
                window.alert(error.message);
            });
    } else {
        window.alert("Email and password are required!");
    }
}