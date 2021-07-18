
$(document).ready(function () {
    //Display schedule
    DataAccess.getData();
    showTime();

    const trainData =
    {
        trainName: $("#trainNameInput").val().trim(),
        destenation : $("#destenationInput").val().trim(),
        firstTime : $("#firstTimelInput").val().trim(),
        frequency : $("#frequencyInput").val().trim()
    }
    

    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        console.log()
        DataAccess.postData(trainData);

        //clears input values
        $(".form-control").val("")
    })
    
})






