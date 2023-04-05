$(document).ready(function(){
    /**
     * This method will be reused everytime a new event happens in this tab.
     * If there's data to be showed, it will fill the form values,
     * otherwise it will clean it. 
     * It will mainly clean if the user searches for a user that does not 
     * exists
     * @param {*} data 
     */
    function fillFindContainer(data){
        if (data){
            $("#find_id").val(data._id);
            $("#find-iso_code").val(data.iso_code);
            $("#find-continent").val(data.continent);
            $("#find-location").val(data.location);
            $("#find-date").val(data.date);
            $("#find-total_cases").val(data.total_cases);
            $("#find-new_cases").val(data.new_cases);
            $("#find-total_deaths").val(data.total_deaths); 
            $("#find-new_deaths").val(data.new_deaths);                                    
        }else{
            $("#find_id").val("");
            $("#find-iso_code").val("");
            $("#find-continent").val("");
            $("#find-location").val("");
            $("#find-date").val("");
            $("#find-total_cases").val("");
            $("#find-new_cases").val("");
            $("#find-total_deaths").val(""); 
            $("#find-new_deaths").val("");   
        }      
    }
    /**
     * This is an aux function to assemble the object contact.
     * It will be used mainly to the update function
     */
    function assembleContact(){
        let c = {};

        c._id = $("#find_id").val();
        c.iso_code = $("#find-iso_code").val();
        c.continent = $("#find-continent").val();
        c.location = $("#find-location").val();
        c.date = $("#find-date").val();
        c.total_cases = $("#find-total_cases").val();
        c.new_cases = $("#find-new_cases").val();
        c.total_deaths = $("#find-total_deaths").val();
        c.new_deaths = $("#find-new_deaths").val();


        return c;
    }
    /**
     * This function binds an event to the find contact button.
     */
    $("#btn-find-date").click(function(event){
        event.preventDefault();
        let date_to_match = $("#find-date-search").val();
        $.ajax({
            url: '/covid/'+ date_to_match ,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#find-out").text(response.msg);
                fillFindContainer(response.data);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
            
        });
    });
    /**
     * This function will bind an event to the update button.
     */
    $("#btn-update-contact").click(function(event){
        event.preventDefault();
        let date_to_match = $("#find-date-search").val();
        let contact = assembleContact();
        $.ajax({
            url: '/covid/'+date_to_match,
            type: 'PUT',
            data: JSON.stringify(contact),
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                $("#update-delete-out").text(response.msg);                
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    /**
     * This function will bind an event to the delete button
     */
    $("#btn-delete-contact").click(function(event){
        event.preventDefault();
        let date_to_match = $("#find-date-search").val();
        $.ajax({
            url: '/covid/'+date_to_match,
            type: 'DELETE',
            contentType: 'application/json',                        
            success: function(response){
                console.log('Response:', response); // Log the response object
                
                // Check if the response has a 'msg' property, otherwise use the entire response as a fallback
                let message = response.msg || JSON.stringify(response);
                console.log('Message:', message);
                
                $("#update-delete-out").text(message);
                // We clear the fields after the data is deleted
                fillFindContainer(null);              
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    
});