
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

    // var itemOn = "<div class='device-item' style='cursor: pointer; background-color: #ff8a65;' id='" + name + "'><div class='btn'>" + icons[icon] + " &nbsp; " + name + "</div><div class='btn-status'>" + connectivity + "</div>    </div>";            
    var itemOn = "<div class='device-item' style='cursor: pointer; background-color: #ff8a65;' id='" + name + "'><div class='device-item-div device-name - icon'><div class='icon' style='padding-right: 10px;'>" + icons[icon] + "</div><div class='title'>" + name + "</div></div><div class='btn-status'>" + connectivity + "</div></div>";
    var itemOff = "<div class='device-item' style='cursor: pointer;' id='" + name + "'><div class='device-item-div device-name - icon'><div class='icon' style='padding-right: 10px;'>" + icons[icon] + "</div><div class='title'>" + name + "</div></div><div class='btn-status'>" + connectivity + "</div></div>";

    if (status) {
        return itemOn;
    }
    else return itemOff;
}

function tempAndHumidity(temp, humidity) {
    document.getElementById("current-temp").innerHTML = "<b>" + temp.toFixed(2) + "</b> °C<hr>";

    document.getElementById("current-temp").innerHTML += "Humidity<br>" + humidity + "%";
}