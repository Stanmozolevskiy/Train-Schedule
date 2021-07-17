$(document).ready(function () {

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAlzaTBiMxUbl5r-GfPRg85uMaEmlyLT-s",
        authDomain: "train-schedule-6bc57.firebaseapp.com",
        databaseURL: "https://train-schedule-6bc57.firebaseio.com",
        projectId: "train-schedule-6bc57",
        storageBucket: "train-schedule-6bc57.appspot.com",
        messagingSenderId: "461940784039",
        appId: "1:461940784039:web:58999a0f0355aaa95bd482"
    };

    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    var trainName = $("#trainNameInput").val().trim()
    var destenation = $("#destenationInput").val().trim()
    var firstTime = $("#firstTimelInput").val().trim()
    var frequency = $("#frequencyInput").val().trim()

    //Shows Real Time
    function showTime() {
        var date = new Date();
        var h = date.getHours(); //0-23
        var m = date.getMinutes(); //0-59
        var s = date.getSeconds(); //0-59

        if (h == 0) {
            h = 12
        }
        if (h > 12) {
            h = h - 12;
        }
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        var time = h + ":" + m + ":" + s;
        $("#realTime").html(time)
        $("#realTime").text(time)

        setTimeout(showTime, 1000);
    }
    showTime()

    $("#submitButton").on("click", function (event) {
        event.preventDefault()
        console.log(trainName)
            database.ref().push({
                TrainName: trainName,
                Destenation: destenation,
                FirstTime: firstTime,
                Frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            })
        //clears input values
        $(".form-control").val("")
    })

    database.ref().orderByChild("dateAdded").limitToLast(20).on("child_added", function (snapshot) {
        var sv = snapshot.val()
        var emptyTR = $("<tr>")

        var firstTime = snapshot.val().FirstTime;
        var frequency = snapshot.val().Frequency;
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(firstTimeConverted, "minutes");
        var tRemainder = diffTime % frequency;
        // minutes until train
        var minutesAway = frequency - tRemainder;
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");

        var trainNameTD = $("<td>").text(sv.TrainName);
        var destenationTD = $("<td>").text(sv.Destenation);
        var firstTimeTD = $("<td>").text(sv.Frequency + " " + "min");
        var frequencyTD = $("<td>").text(nextArrival);
        var minAway = $("<td>").text(minutesAway + " " + "min");

        emptyTR.append(trainNameTD)
        emptyTR.append(destenationTD)
        emptyTR.append(firstTimeTD)
        emptyTR.append(frequencyTD)
        emptyTR.append(minAway)
        $("tbody").append(emptyTR)

    })
})






