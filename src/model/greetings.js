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
