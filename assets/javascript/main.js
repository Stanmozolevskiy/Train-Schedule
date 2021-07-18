
$(document).ready(function () {
    //Display schedule
    DataAccess.getData();
    showTime();

    $("#submitButton").on("click", function (event) {
        const trainData =
        {
            trainName: $("#trainNameInput").val().trim(),
            destenation : $("#destenationInput").val().trim(),
            firstTime : $("#firstTimelInput").val().trim(),
            frequency : $("#frequencyInput").val().trim()
        }
        event.preventDefault();
        DataAccess.postData(trainData);

        //clears input values
        $(".form-control").val("")
    })
    
})






