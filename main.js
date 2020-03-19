function getUserAuthStatus() {
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
}

var database = firebase.database();
// var ref = database.ref("user/mazharul_sabbir/info/");

// ref.set({
//     name: "Mazharul Sabbir",
//     email: "admin@app.com"
// });

var ref = database.ref("user/mazharul_sabbir/firm_data/");

var mFirmDataObj;

ref.on('value', function (snapshot) {
    snapshot.forEach(element => {
        mFirmDataObj = element.val();

        var fan = mFirmDataObj.fans.f_name;
        var light = mFirmDataObj.light.l_name;
        var motor = mFirmDataObj.motor.m_name;
        var pump = mFirmDataObj.pump.p_name;

        document.getElementById('my-device-list').innerHTML = deviceItem(fan, mFirmDataObj.fans.f_status, 0);
        document.getElementById('my-device-list').innerHTML += deviceItem(light, mFirmDataObj.light.l_status, 1);
        document.getElementById('my-device-list').innerHTML += deviceItem(motor, mFirmDataObj.motor.m_status, 2);
        document.getElementById('my-device-list').innerHTML += deviceItem(pump, mFirmDataObj.pump.p_status, 3);

        tempAndHumidity(mFirmDataObj.temp.c_temp, 10);

        document.getElementById(fan).addEventListener("click", function () {
            window.alert("Clicked");
        })

        document.getElementById(light).addEventListener("click", function () {
            window.alert("Clicked");
        })

        document.getElementById(motor).addEventListener("click", function () {
            window.alert("Clicked");
        })

        document.getElementById(pump).addEventListener("click", function () {
            window.alert("Clicked");
        })

    });
});

function deviceItem(name, status, icon) {
    var icons = ['<i class="fas fa-fan"></i></i>', '<i class="far fa-lightbulb"></i>', '<i class="fas fa-shower"></i>', '<i class="fas fa-gas-pump"></i>'];

    return "<div class='device-item' style='cursor: pointer;' id=" + name + "><div class='btn'>" + icons[icon] + " &nbsp; " + name + "</div><div class='btn-status'>" + status + "</div>    </div>";
}

function tempAndHumidity(temp, humidity) {
    document.getElementById("current-temp").innerHTML += "<b>" + temp.toFixed(2) + "</b> °C<hr>";

    document.getElementById("current-temp").innerHTML += "Humidity<br>" + humidity + "%";
}

function loadJsChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            datasets: [{
                label: 'Average Temperature',
                data: [29, 27, 30, 31, 30, 28, 29],
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

    // document.getElementById("more-notification").innerHTML = "<a href='#'>and " + 2 + " more</a>";

    var runningDevices = "<i class='far fa-bell'> &nbsp;</i>Living room lamp is opening. <br>Speaker is playing.. <a href='#'>and " + 2 + " more</a>";
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