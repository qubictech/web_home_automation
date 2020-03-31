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

var ref = database.ref("user/mazharul_sabbir/firm_data/");

var mFirmDataObj;

ref.on('value', function (snapshot) {
    snapshot.forEach(element => {
        mFirmDataObj = element.val();
        var msg = "";

        var fan = mFirmDataObj.fans.f_name;
        var light = mFirmDataObj.light.l_name;
        var motor = mFirmDataObj.motor.m_name;
        var pump = mFirmDataObj.pump.p_name;

        var fanStatus = mFirmDataObj.fans.f_status;
        var lStatus = mFirmDataObj.light.l_status;
        var mStatus = mFirmDataObj.motor.m_status;
        var pStatus = mFirmDataObj.pump.p_status;

        if (fanStatus) msg += "Fan, ";
        if (lStatus) msg += "Light, ";
        if (mStatus) msg += "Motor, ";
        if (pStatus) msg += "Pump, ";


        document.getElementById('my-device-list').innerHTML = deviceItem(fan, fanStatus, 0);
        document.getElementById('my-device-list').innerHTML += deviceItem(light, lStatus, 1);
        document.getElementById('my-device-list').innerHTML += deviceItem(motor, mStatus, 2);
        document.getElementById('my-device-list').innerHTML += deviceItem(pump, pStatus, 3);

        tempAndHumidity(mFirmDataObj.temp.c_temp, 10);

        document.getElementById(fan).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/fans/");

            ref.update({
                f_status: !fanStatus
            });
        })

        document.getElementById(light).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/light/");

            ref.update({
                l_status: !lStatus
            });
        })

        document.getElementById(motor).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/motor/");

            ref.update({
                m_status: !mStatus
            });
        })

        document.getElementById(pump).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/pump/");

            ref.update({
                p_status: !pStatus
            });
        })

        if (msg)
            notification('<i class="fas fa-bullhorn"></i> &nbsp;&nbsp;<b>' + msg + "</b> is running..!<br>");
        else
            notification('<i class="fas fa-bullhorn"></i> &nbsp;&nbsp;<b>Nothing</b> is running..!<br>');

    });
});

function notification(msg) {
    document.getElementById("running-device").innerHTML = msg;
}

function deviceItem(name, status, icon) {
    var icons = ['<i class="fas fa-fan"></i></i>', '<i class="far fa-lightbulb"></i>', '<i class="fas fa-shower"></i>', '<i class="fas fa-gas-pump"></i>'];

    var connectivity = "";
    if (status) connectivity = "Enabled"; else connectivity = "Closed";

    var itemOn = "<div class='device-item' style='cursor: pointer; background-color: #ff8a65;' id='" + name + "'><div class='btn'>" + icons[icon] + " &nbsp; " + name + "</div><div class='btn-status'>" + connectivity + "</div>    </div>";
    var itemOff = "<div class='device-item' style='cursor: pointer;' id='" + name + "'><div class='btn'>" + icons[icon] + " &nbsp; " + name + "</div><div class='btn-status'>" + connectivity + "</div>    </div>";

    if (status) {
        return itemOn;
    }
    else return itemOff;
}

function tempAndHumidity(temp, humidity) {
    document.getElementById("current-temp").innerHTML = "<b>" + temp.toFixed(2) + "</b> °C<hr>";

    document.getElementById("current-temp").innerHTML += "Humidity<br>" + humidity + "%";
}

function loadJsChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            datasets: [{
                label: 'Temp',
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
            }, {
                label: 'Humidity',
                data: [7, 11, 5, 8, 3, 7],
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