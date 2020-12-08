//accordion
$(document).ready(function(){
    //tooltip
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    })

    $("#startPlaybook").click(function(){
        $("#startPlaybook").hide();
        $("#introduction").hide();
        $("#contentWrapper").show();
        $("#collapseOne").addClass("show");
    });
    //on clicking view report, expand all accordion divs
    $("#viewReport").click(function(){
        $("#viewReport").hide();
        $("#revisitPlaybook").show();
        $("#downloadReport").show();
        $("#surveyWrapper").hide();
        $("#helpWrapper").hide();
        $(".accordionBtn").addClass("active");
        $("#collapseOne").addClass("show");
        $("#collapseTwo").addClass("show");
        $("#collapseThree").addClass("show");
        $("#collapseFour").addClass("show");
        $("#collapseFive").addClass("show");
        $("#accordionFrame").removeClass("scrollList");
        $(".card-body").removeClass("scroll");
    });

    $("#revisitPlaybook").click(function(){
        $(".scenarioContent").hide();
        $("#revisitPlaybook").hide();
        $("#downloadReport").hide();
        $("#viewReport").show();
        $("#surveyWrapper").show();
        $("#helpWrapper").show();
        $(".accordionBtn").removeClass("active");
        $("#expandOne").addClass("active");
        $("#accordionFrame").addClass("scrollList");
        $(".card-body").addClass("scroll");
        $('#accordionFrame').animate({
          scrollTop: 0
        }, 1000);
    });

    $(".scenarioHeader").click(function(e){
        var header  = $(e.target).closest(".scenarioHeader");
        console.log(header);
        var content = $(header).siblings(".scenarioContent");
        content.toggle();
    });

    // change arrows in accordion buttons
    var acc = document.getElementsByClassName("accordionBtn");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function(event) {
            event.target.classList.toggle("active");
        });
    }
});
