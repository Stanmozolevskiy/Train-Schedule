
 const DataAccess = {
    firebaseConfig: {
      apiKey: "AIzaSyAlzaTBiMxUbl5r-GfPRg85uMaEmlyLT-s",
      authDomain: "train-schedule-6bc57.firebaseapp.com",
      databaseURL: "https://train-schedule-6bc57.firebaseio.com",
      projectId: "train-schedule-6bc57",
      storageBucket: "train-schedule-6bc57.appspot.com",
      messagingSenderId: "461940784039",
      appId: "1:461940784039:web:58999a0f0355aaa95bd482",
    },
    postData: function (trainData) {
        database.ref().push({
        TrainName: trainData.trainName,
        Destenation: trainData.destenation,
        FirstTime: trainData.firstTime,
        Frequency: trainData.frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
      });
    },
    getData: function () {
        database.ref().orderByChild("dateAdded").limitToLast(20).on("child_added", function (snapshot) {
            const snapshotData = snapshot.val();
            const minutesUntilTrain = DataAccess.trainReminder(snapshot);
            const nextArrival = moment().add(minutesUntilTrain, "minutes").format("hh:mm A");
            
            //display data
            const emptyTR = $("<tr>")
            emptyTR.append($("<td>").text(snapshotData.TrainName))
            emptyTR.append($("<td>").text(snapshotData.Destenation))
            emptyTR.append($("<td>").text(snapshotData.Frequency + " " + "min"))
            emptyTR.append($("<td>").text(nextArrival))
            emptyTR.append($("<td>").text(minutesUntilTrain + " " + "min"))
            $("tbody").append(emptyTR)
        })
    },
    trainReminder: function(data){
        const firstTime = data.val().FirstTime
        const frequency = data.val().Frequency;
        const firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        const diffTime = moment().diff(firstTimeConverted, "minutes");
        const tRemainder = diffTime % frequency;
        return frequency - tRemainder;
    }
};
  
  firebase.initializeApp(DataAccess.firebaseConfig);
  const database = firebase.database();