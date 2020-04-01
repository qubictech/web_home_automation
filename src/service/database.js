
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

        var fOnOffTime = mFirmDataObj.fans.on_off_time
        var lOnOffTime = mFirmDataObj.light.on_off_time
        var mOnOffTime = mFirmDataObj.motor.on_off_time
        var pOnOffTime = mFirmDataObj.pump.on_off_time

        if (fanStatus) msg += "Fan, ";
        if (lStatus) msg += "Light, ";
        if (mStatus) msg += "Motor, ";
        if (pStatus) msg += "Pump, ";


        if (fanStatus) {
            setInterval(() => {
                console.log("Running......")
            }, 1000);
        }else{
            clearInterval()
        }

        document.getElementById('my-device-list').innerHTML = deviceItem(fan, fanStatus, fOnOffTime, 0);
        document.getElementById('my-device-list').innerHTML += deviceItem(light, lStatus, lOnOffTime, 1);
        document.getElementById('my-device-list').innerHTML += deviceItem(motor, mStatus, mOnOffTime, 2);
        document.getElementById('my-device-list').innerHTML += deviceItem(pump, pStatus, pOnOffTime, 3);

        tempAndHumidity(mFirmDataObj.temp.c_temp, 10);

        var date = new Date();

        document.getElementById(fan).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/fans/");
            ref.update({
                f_status: !fanStatus,
                on_off_time: date.getTime()
            });

        })

        document.getElementById(light).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/light/");

            ref.update({
                l_status: !lStatus,
                on_off_time: date.getTime()
            });
        })

        document.getElementById(motor).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/motor/");

            ref.update({
                m_status: !mStatus,
                on_off_time: date.getTime()
            });
        })

        document.getElementById(pump).addEventListener("click", function () {
            var ref = database.ref("user/mazharul_sabbir/firm_data/1581694698821/pump/");

            ref.update({
                p_status: !pStatus,
                on_off_time: date.getTime()
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

var DateDiff = {

    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
        return d2.getFullYear() - d1.getFullYear();
    }
}

function deviceItem(name, status, mOnOffTime, icon) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var date = new Date(mOnOffTime)

    var onOffTime =date.getDate() +" "+ months[date.getMonth()] +" at "+ date.getHours() +" : "+date.getMinutes()

    var icons = ['<i class="fas fa-fan"></i></i>', '<i class="far fa-lightbulb"></i>', '<i class="fas fa-shower"></i>', '<i class="fas fa-gas-pump"></i>'];

    var connectivity = "";
    if (status) connectivity = "Enabled"; else connectivity = "Closed";

    // var itemOn = "<div class='device-item' style='cursor: pointer; background-color: #ff8a65;' id='" + name + "'><div class='btn'>" + icons[icon] + " &nbsp; " + name + "</div><div class='btn-status'>" + connectivity + "</div>    </div>";            
    var itemOn = "<div class='device-item' style='cursor: pointer; background-color: #ff8a65;' id='" + name + "'><div class='device-item-div device-name - icon'><div class='icon' style='padding-right: 10px;'>" + icons[icon] + "</div><div class='title'>" + name + "</div></div><div class='running-time'>" + onOffTime + "</div><div class='btn-status'>" + connectivity + "</div></div>";
    var itemOff = "<div class='device-item' style='cursor: pointer;' id='" + name + "'><div class='device-item-div device-name - icon'><div class='icon' style='padding-right: 10px;'>" + icons[icon] + "</div><div class='title'>" + name + "</div></div><div class='running-time'>" + onOffTime + "</div><div class='btn-status'>" + connectivity + "</div></div>";

    if (status) {
        return itemOn;
    }
    else return itemOff;
}

function tempAndHumidity(temp, humidity) {
    document.getElementById("current-temp").innerHTML = "<b>" + temp.toFixed(2) + "</b> °C<hr>";

    document.getElementById("current-temp").innerHTML += "Humidity<br>" + humidity + "%";
}