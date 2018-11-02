$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAlzaTBiMxUbl5r-GfPRg85uMaEmlyLT-s",
        authDomain: "train-schedule-6bc57.firebaseapp.com",
        databaseURL: "https://train-schedule-6bc57.firebaseio.com",
        projectId: "train-schedule-6bc57",
        storageBucket: "train-schedule-6bc57.appspot.com",
        messagingSenderId: "461940784039"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var destenation = "";
    var leavingTime = "";
    var arrivalTime = "";
    var price = 0;

//Shows Real Time
    function showTime() {
        var date = new Date();
        var h = date.getHours(); //0-23
        var m = date.getMinutes(); //0-59
        var s = date.getSeconds(); //0-59
       

        if(h == 0){
            h = 12
        }
        if(h > 12){
            h = h - 12;
        }
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s: s;

        var time = h + ":" + m + ":" + s ;
        $("#realTime").html(time)
        $("#realTime").text(time)

        setTimeout(showTime, 1000);
    }
    showTime()

    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        destenation = $("#destenationInput").val().trim()
        leavingTime = $("#leavingInput").val().trim()
        arrivalTime = $("#arrivalInput").val().trim()
        price = $("#priceInput").val().trim()

        database.ref().push({
            direction: destenation,
            lTime: leavingTime,
            aTime: arrivalTime,
            Ticketprice: price,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
        //clears input values
        $("#destenationInput").val("")
        $("#leavingInput").val("")
        $("#arrivalInput").val("")
        $("#priceInput").val("")

    })

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
        var sv = snapshot.val()
        var emptyTR = $("<tr>")

        var leavingTimeConverted = moment(sv.lTime).format("MM Do YYYY h:mm a");
        var arrivingTimeConverted = moment(sv.aTime).format("MM Do YYYY h:mm a");
        var leaving =  moment().diff(sv.lTime, 'minutes')
        console.log( "Leaving in:" + leaving + " " + "minutes")

        var destenationTD = $("<td>").text(sv.direction);
        var leavingTimeTD = $("<td>").text(leavingTimeConverted);
        var arrivalTimeTD = $("<td>").text(arrivingTimeConverted);
        var priceTD = $("<td>").text("$" + sv.Ticketprice);
        var wifiTD = $("<td>").text(" Yes");
        var snacksTD = $("<td>").text("Yes")

        emptyTR.append(destenationTD )
        emptyTR.append(leavingTimeTD )
        emptyTR.append(arrivalTimeTD )
        emptyTR.append(priceTD )
        emptyTR.append(wifiTD)
        emptyTR.append(snacksTD )
        $("tbody").append(emptyTR)
    })

})








