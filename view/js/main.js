/**
 * This script will add the main behavior of the tabs.
 * The idea is that every time a tab is clicked, we identify the one that was clicked,
 * call show to this one, and hide to the others.
 */
$(document).ready(function(){
    function changeDivComponents(tab_element_clicked){
        $(".tabcontent").each(function(index){
            let this_id = $(this).attr('id');
            if (this_id.includes(tab_element_clicked.toLowerCase())){
                $(this).show();
            }else{
                $(this).hide();
            }                    
        });
    }
    $(".tablinks").click(function(){
        changeDivComponents($(this).text());
    });
});