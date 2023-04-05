$(document).ready(function(){
    /**
     * This function binds an event to the get deaths button.
     */
    $("#btn-get-deaths").click(function(event) {
        event.preventDefault();
        const startDate = $("#start-date").val();
        const endDate = $("#end-date").val();

        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        if (startDate && endDate) {
            const fromAndTo = startDate + '_' + endDate;
            $.ajax({
                url: '/covidDates/' + fromAndTo,
                type: 'GET',
                success: function(response) {
                    let resultText = "Total deaths between " + startDate + " and " + endDate + ": " + response.totalDeaths + "\n\n";
                    resultText += "Deaths by date:\n";
                
                    response.records.forEach(record => {
                        resultText += "Date: " + record.date + " - Deaths: " + record.deaths + "\n";
                    });
                
                    $("#result").text(resultText);
                },                
                error: function(xhr, status, error) {
                    const errorMessage = xhr.status + ': ' + xhr.statusText;
                    alert('Error - ' + errorMessage);
                }
            });
        } else {
            alert("Please enter both start and end dates.");
        }
    });
});
