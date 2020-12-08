var modernThemeColors = Survey
    .StylesManager
    .ThemeColors["modern"];
modernThemeColors["$main-color"] = "#0072C6";
modernThemeColors["$main-hover-color"] = "#0072C6";
modernThemeColors["$answer-background-color"] = "#ededed";

Survey.StylesManager.applyTheme("modern");

//Add a text property into all questions types
//Survey.Serializer.addProperty("question");

function updateSystemDomain (value){
    pageNumScenarios = 1;
    $('#q1taskn').show();
    $('.q1atasks').show();
    switch (value){
        case "Search":
            $('.q10').hide(500);
            $('.q1a').show(500);
            $('.q1aq2ax').show(500);
            $('.q1aq2bx').show(500);
            $('.q1aq7bx').show(500);

            $('.q1b').hide(500);
            $('.q1bq2ax').hide(500);
            $('.q1bq2bx').hide(500);
            $('.q1bq2cx').hide(500);
            $('.q1bq7bx').hide(500);

            $('.q1c').hide(500);
            $('.q1cq2ax').hide(500);
            $('.q1cq2bx').hide(500);
            $('.q1cq6ax').hide(500);
            $('.q1cq7bx').hide(500);

            $('.q1d').hide(500);
            $('.q1dq2ax').hide(500);
            $('.q1dq4bx').hide(500);
            $('.q1dq5ax').hide(500);
            $('.q1dq6ax').hide(500);
            $('.q1dq7ax').hide(500);
            $('.q1dq7bx').hide(500);

            $('.q1e').hide(500);
            $('.q1eq2ax').hide(500);
            $('.q1eq2cx').hide(500);
            $('.q1eq8ax').hide(500);
            $('.q1eq8bx').hide(500);

            $('.q1f').hide(500);
            break;
        case "Recommendation":
            $('.q10').hide(500);
            $('.q1a').hide(500);
            $('.q1aq2ax').hide(500);
            $('.q1aq2bx').hide(500);
            $('.q1aq7bx').hide(500);

            $('.q1b').show(500);
            $('.q1bq2ax').show(500);
            $('.q1bq2bx').show(500);
            $('.q1bq2cx').show(500);
            $('.q1bq7bx').show(500);

            $('.q1c').hide(500);
            $('.q1cq2ax').hide(500);
            $('.q1cq2bx').hide(500);
            $('.q1cq6ax').hide(500);
            $('.q1cq7bx').hide(500);

            $('.q1d').hide(500);
            $('.q1dq2ax').hide(500);
            $('.q1dq4bx').hide(500);
            $('.q1dq5ax').hide(500);
            $('.q1dq6ax').hide(500);
            $('.q1dq7ax').hide(500);
            $('.q1dq7bx').hide(500);

            $('.q1e').hide(500);
            $('.q1eq2ax').hide(500);
            $('.q1eq2cx').hide(500);
            $('.q1eq8ax').hide(500);
            $('.q1eq8bx').hide(500);

            $('.q1f').hide(500);
            break;
        case "Conversational AI":
            $('.q10').hide(500);
            $('.q1a').hide(500);
            $('.q1aq2ax').hide(500);
            $('.q1aq2bx').hide(500);
            $('.q1aq7bx').hide(500);

            $('.q1b').hide(500);
            $('.q1bq2ax').hide(500);
            $('.q1bq2bx').hide(500);
            $('.q1bq2cx').hide(500);
            $('.q1bq7bx').hide(500);

            $('.q1c').show(500);
            $('.q1cq2ax').show(500);
            $('.q1cq2bx').show(500);
            $('.q1cq6ax').show(500);
            $('.q1cq7bx').show(500);

            $('.q1d').hide(500);
            $('.q1dq2ax').hide(500);
            $('.q1dq4bx').hide(500);
            $('.q1dq5ax').hide(500);
            $('.q1dq6ax').hide(500);
            $('.q1dq7ax').hide(500);
            $('.q1dq7bx').hide(500);

            $('.q1e').hide(500);
            $('.q1eq2ax').hide(500);
            $('.q1eq2cx').hide(500);
            $('.q1eq8ax').hide(500);
            $('.q1eq8bx').hide(500);

            $('.q1f').hide(500);
            break;
        case "Text Prediction and Assistance":
            $('.q10').hide(500);
            $('.q1a').hide(500);
            $('.q1aq2ax').hide(500);
            $('.q1aq2bx').hide(500);
            $('.q1aq7bx').hide(500);

            $('.q1b').hide(500);
            $('.q1bq2ax').hide(500);
            $('.q1bq2bx').hide(500);
            $('.q1bq2cx').hide(500);
            $('.q1bq7bx').hide(500);

            $('.q1c').hide(500);
            $('.q1cq2ax').hide(500);
            $('.q1cq2bx').hide(500);
            $('.q1cq6ax').hide(500);
            $('.q1cq7bx').hide(500);

            $('.q1d').show(500);
            $('.q1dq2ax').show(500);
            $('.q1dq4bx').show(500);
            $('.q1dq5ax').show(500);
            $('.q1dq6ax').show(500);
            $('.q1dq7ax').show(500);
            $('.q1dq7bx').show(500);

            $('.q1e').hide(500);
            $('.q1eq2ax').hide(500);
            $('.q1eq2cx').hide(500);
            $('.q1eq5ax').hide(500);
            $('.q1eq8ax').hide(500);
            $('.q1eq8bx').hide(500);

            $('.q1f').hide(500);
            break;
        case "Classification":
            $('.q10').hide(500);
            $('.q1a').hide(500);
            $('.q1aq2ax').hide(500);
            $('.q1aq2bx').hide(500);
            $('.q1aq7bx').hide(500);

            $('.q1b').hide(500);
            $('.q1bq2ax').hide(500);
            $('.q1bq2bx').hide(500);
            $('.q1bq2cx').hide(500);
            $('.q1bq7bx').hide(500);

            $('.q1c').hide(500);
            $('.q1cq2ax').hide(500);
            $('.q1cq2bx').hide(500);
            $('.q1cq6ax').hide(500);
            $('.q1cq7bx').hide(500);

            $('.q1d').hide(500);
            $('.q1dq2ax').hide(500);
            $('.q1dq4bx').hide(500);
            $('.q1dq5ax').hide(500);
            $('.q1dq6ax').hide(500);
            $('.q1dq7ax').hide(500);
            $('.q1dq7bx').hide(500);

            $('.q1e').show(500);
            $('.q1eq2ax').show(500);
            $('.q1eq2cx').show(500);
            $('.q1eq5ax').show(500);
            $('.q1eq8ax').show(500);
            $('.q1eq8bx').show(500);

            $('.q1f').hide(500);
            break;
        case "other":
            $('.q10').hide(500);
            $('.q1a').hide(500);
            $('.q1aq2ax').show(500);
            $('.q1aq2bx').show(500);
            $('.q1aq7bx').show(500);
            $('.q1aq8ax').show(500);
            $('.q1aq8bx').show(500);

            $('.q1b').hide(500);
            $('.q1bq2ax').show(500);
            $('.q1bq2bx').show(500);
            $('.q1bq2cx').show(500);
            $('.q1bq7bx').show(500);
            $('.q1bq8ax').show(500);

            $('.q1c').hide(500);
            $('.q1cq2ax').show(500);
            $('.q1cq2bx').show(500);
            $('.q1cq6ax').show(500);
            $('.q1cq7bx').show(500);
            $('.q1cq8bx').show(500);

            $('.q1d').hide(500);
            $('.q1dq2ax').show(500);
            $('.q1dq4bx').show(500);
            $('.q1dq5ax').show(500);
            $('.q1dq6ax').show(500);
            $('.q1dq7ax').show(500);
            $('.q1dq7bx').show(500);

            $('.q1e').hide(500);
            $('.q1eq2ax').show(500);
            $('.q1eq2cx').show(500);
            $('.q1eq5ax').show(500);
            $('.q1eq8ax').show(500);
            $('.q1eq8bx').show(500);

            $('.q1f').show(500);
            break;
        default:
    }
}

function updateInputModality (value){
    switch (value){
        case "text":
            $('.q20').hide(500);
            $('.q2a').show(500);
            $('.q2aq3ax').show(500);
            $('.q2aq4ax').show(500);
            $('.q2aq4bx').show(500);
            $('.q2aq5ax').show(500);
            $('.q2aq5bx').show(500);
            $('.q2aq6ax').show(500);
            
            $('.q2b').hide(500);
            $('.q2bq3ax').hide(500);
            $('.q2bq3bx').hide(500);
            $('.q2bq4bx').hide(500);
            $('.q2bq5bx').hide(500);

            $('.q2c').hide(500);
            $('.q2cq3ax').hide(500);
            $('.q2cq3bx').hide(500);
            $('.q2cq4ax').hide(500);
            $('.q2cq6ax').show(500);

            $('.q2atasks').show();
            $('.q2btasks').hide();
            $('.q2ctasks').hide();
            $('#q2ataskn').show();
            $('#q2btaskn').hide();
            $('#q2ctaskn').hide();
            pageNumScenarios = 2;
            break;
        case "speech":
            $('.q20').hide(500);
            $('.q2a').hide(500);
            $('.q2aq3ax').hide(500);
            $('.q2aq4ax').hide(500);
            $('.q2aq4bx').hide(500);
            $('.q2aq5ax').hide(500);
            $('.q2aq5bx').hide(500);
            $('.q2aq6ax').show(500);

            $('.q2b').show(500);
            $('.q2bq3ax').show(500);
            $('.q2bq3bx').show(500);
            $('.q2bq4bx').show(500);
            $('.q2bq5bx').show(500);

            $('.q2c').hide(500);
            $('.q2cq3ax').hide(500);
            $('.q2cq3bx').hide(500);
            $('.q2cq4ax').hide(500);
            $('.q2cq6ax').hide(500);

            $('.q2atasks').hide();
            $('.q2btasks').show();
            $('.q2ctasks').hide();
            $('#q2ataskn').hide();
            $('#q2btaskn').show();
            $('#q2ctaskn').hide();
            pageNumScenarios = 4;
            break;
        case "action_sequence":
            $('.q20').hide(500);
            $('.q2a').hide(500);
            $('.q2aq3ax').hide(500);
            $('.q2aq4ax').hide(500);
            $('.q2aq4bx').hide(500);
            $('.q2aq5ax').hide(500);
            $('.q2aq6ax').hide(500);
            
            $('.q2b').hide(500);
            $('.q2bq3ax').hide(500);
            $('.q2bq3bx').hide(500);
            $('.q2bq4bx').hide(500);

            $('.q2c').show(500);
            $('.q2cq3ax').show(500);
            $('.q2cq3bx').show(500);
            $('.q2cq4ax').show(500);
            $('.q2cq6ax').hide(500);

            $('.q2atasks').hide();
            $('.q2btasks').hide();
            $('.q2ctasks').show();
            $('#q2ataskn').hide();
            $('#q2btaskn').hide();
            $('#q2ctaskn').show();
            pageNumScenarios = 3;
            break;
        default:
    }
}

function updateTrigger (value){
    switch (value){
        case "yes":
            $('.q30').hide(500);
            $('.q3a').show(500);
            $('.q3b').hide(500);
            $('.q3atasks').show();
            $('.q3btasks').hide();
            $('#q3btaskn').hide();
            pageNumScenarios = 1;
            break;
        case "no":
            $('.q30').hide(500);
            $('.q3a').hide(500);
            $('.q3b').show(500);
            $('.q3atasks').hide();
            $('.q3btasks').show();
            $('#q3btaskn').show();
            pageNumScenarios = 3;
            break;
        default:
    }
}

function updateDelimiter (value){
    switch (value){
        case "yes":
        $('.q40').hide(500);
        $('.q4a').show(500);
        $('.q4b').hide(500);
        $('.q4atasks').show();
        $('.q4btasks').hide();
        $('#q4btaskn').hide();
        pageNumScenarios = 1;
        break;
      case "no":
        $('.q40').hide(500);
        $('.q4a').hide(500);
        $('.q4b').show(500);
        $('.q4atasks').hide();
        $('.q4btasks').show();
        $('#q4btaskn').show();
        pageNumScenarios = 5;
        break;
      default:
    }
}

function updateInterpretation (value){
    $('.q600').hide(500);
    switch (value){
        case "yes":
            $('.q50').hide(500);
            $('.q5a').show(500);
            $('.q5b').hide(500);
            $('.q5atasks').show();
            $('.q5btasks').hide();
            $('#q5ataskn').show();
            $('#q5btaskn').hide();
            pageNumScenarios = 5;
            break;
        case "no":
            $('.q50').hide(500);
            $('.q5a').hide(500);
            $('.q5b').show(500);
            $('.q5atasks').hide();
            $('.q5btasks').show();
            $('#q5ataskn').hide();
            $('#q5btaskn').show();
            pageNumScenarios = 3;
            break;
        default:
    }
}

function updateResponseType (value){
  switch (value){
        case "single_response":
            $('.q60').hide(500);
            $('.q600').hide(500);
            $('.q6a').show(500);
            $('.q6b').hide(500);
            $('.q6c').hide(500);
            $('.q6atasks').show();
            $('.q6ctasks').hide();
            $('#q6ataskn').show();
            $('#q6ctaskn').hide();
            pageNumScenarios = 6;
            break;
        case "ranked_list":
            $('.q60').hide(500);
            $('.q600').show(500);
            $('.q6a').hide(500);
            $('.q6b').show(500);
            $('.q6c').hide(500);
            $('.q6atasks').hide();
            $('.q6ctasks').hide();
            $('#q6ataskn').hide();
            $('#q6ctaskn').hide();
            break;
        case "action_execution":
            $('.q60').hide(500);
            $('.q600').hide(500);
            $('.q6a').hide(500);
            $('.q6b').hide(500);
            $('.q6c').show(500);
            $('.q6atasks').hide();
            $('.q6ctasks').show();
            $('#q6ataskn').hide();
            $('#q6ctaskn').show();
            pageNumScenarios = 3;
            break;
        default:
    }
}

function updateResponseMechanism (value){
    $('.q600').hide(500);
    switch (value){
        case "generated":
            $('.q70').hide(500);
            $('.q7a').show(500);
            $('.q7b').hide(500);
            $('.q7atasks').show();
            $('.q7btasks').hide();
            $('#q7ataskn').show();
            $('#q7btaskn').hide();
            pageNumScenarios = 5;
            break;
        case "selected":
            $('.q70').hide(500);
            $('.q7a').hide(500);
            $('.q7b').show(500);
            $('.q7atasks').hide();
            $('.q7btasks').show();
            $('#q7ataskn').hide();
            $('#q7btaskn').show();
            pageNumScenarios = 5;
            break;
        default:
    }
}

function updateResponseClassification (value){
    switch (value){
        case "binary":
            $('.q80').hide(500);
            $('.q8a').show(500);
            $('.q8b').hide(500);
            $('.q8atasks').show();
            $('.q8btasks').hide();
            $('#q8ataskn').show();
            $('#q8btaskn').hide();
            pageNumScenarios = 2;
            break;
        case "multiple":
            $('.q80').hide(500);
            $('.q8a').hide(500);
            $('.q8b').show(500);
            $('.q8atasks').hide();
            $('.q8btasks').show();
            $('#q8ataskn').hide();
            $('#q8btaskn').show();
            pageNumScenarios = 2;
            break;
        default:
    }
}

loadJSON(function(json) {
  window.survey = new Survey.Model(json);
  //change html when value is changed
  survey
    .onCurrentPageChanged
    .add(function (sender, options) {
        var currentPageNo = sender.currentPageNo;
        var questionName = options.newCurrentPage.questions[0].name;
        //$(".accordionBtn").removeClass("active");
        console.log($(".callout-task:visible").length);
        switch (questionName){
            case "systemDomain":
                var collapsed = $("#expandOne").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandOne").click();
                  $('#accordionFrame').animate({
                  scrollTop: 0
                  }, 1000);
                }
                $('.q1').show(500);
                $('.q2').hide(500);
                $('.q3').hide(500);
                $('.q4').hide(500);
                $('.q5').hide(500);
                $('.q6').hide(500);
                $('.q7').hide(500);
                $('.q8').hide(500);
                break;
            case "inputModality":
                var collapsed = $("#expandTwo").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandTwo").click();
                }
                $("#accordionFrame").scrollTo("#expandTwo", 500, {offset:-174});
                $('.q1').hide(500);
                $('.q2').show(500);
                $('.q3').hide(500);
                $('.q4').hide(500);
                $('.q5').hide(500);
                $('.q6').hide(500);
                $('.q7').hide(500);
                $('.q8').hide(500);
                break;
            case "trigger":
                var collapsed = $("#expandThree").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandThree").click();
                }
                $("#accordionFrame").scrollTo("#expandThree", 500, {offset:-174});
                $('.q1').hide(500);
                $('.q2').hide(500);
                $('.q3').show(500);
                $('.q4').hide(500);
                $('.q5').hide(500);
                $('.q6').hide(500);
                $('.q7').hide(500);
                $('.q8').hide(500);
                break;  
            case "delimiter":
                var collapsed = $("#expandFour").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandFour").click();
                }
                $("#accordionFrame").scrollTo("#expandFour", 500, {offset:-174});
                console.log();
                $('.q1').hide(500);
                $('.q2').hide(500);
                $('.q3').hide(500);
                $('.q4').show(500);
                $('.q5').hide(500);
                $('.q6').hide(500);
                $('.q7').hide(500);
                $('.q8').hide(500);
                break;
            case "interpretation":
                var collapsed = $("#expandFive").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandFive").click();
                }
                $("#accordionFrame").scrollTo("#expandFive", 500, {offset:-174});
                $('.q1').hide(500);
                $('.q2').hide(500);
                $('.q3').hide(500);
                $('.q4').hide(500);
                $('.q5').show(500);
                $('.q6').hide(500);
                $('.q7').hide(500);
                $('.q8').hide(500);
                break;
            case "responseType":
                var collapsed = $("#expandFive").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandFive").click();
                }
                $("#accordionFrame").scrollTo("#expandFive", 500, {offset:-174});
                $('.q1').hide(500);
                $('.q2').hide(500);
                $('.q3').hide(500);
                $('.q4').hide(500);
                $('.q5').hide(500);
                $('.q6').show(500);
                $('.q7').hide(500);
                $('.q8').hide(500);
                break;
            case "responseMechanism":
                var collapsed = $("#expandFive").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandFive").click();
                }
                $("#accordionFrame").scrollTo("#expandFive", 500, {offset:-174});
                $('.q1').hide(500);
                $('.q2').hide(500);
                $('.q3').hide(500);
                $('.q4').hide(500);
                $('.q5').hide(500);
                $('.q6').hide(500);
                $('.q7').show(500);
                $('.q8').hide(500);
                break;
            case "responseClassification":
                var collapsed = $("#expandFive").hasClass('collapsed');
                if (collapsed == true) {
                  document.getElementById("expandFive").click();
                }
                $("#accordionFrame").scrollTo("#expandFive", 500, {offset:-174});
                $('.q1').hide(500);
                $('.q2').hide(500);
                $('.q3').hide(500);
                $('.q4').hide(500);
                $('.q5').hide(500);
                $('.q6').hide(500);
                $('.q7').hide(500);
                $('.q8').show(500);
                break;
            default:
        }
        //if previous page is shown, subtract pageNumScenarios from totalNumscenarios.
        if (lastPage == questionName) {
          totalNumScenarios = totalNumScenarios - lastNumScenarios;
          lastNumScenarios = 0;
        } else {
          //if next page is shown, update totalNumScenarios by adding pageNumScenarios.
          totalNumScenarios = totalNumScenarios + pageNumScenarios;
        }
        lastNumScenarios = pageNumScenarios;
        lastPage = currentPage;
        currentPage = questionName;
        pageNumScenarios = 0;
  });
  //onValueChanged, update function by questionName
  survey
    .onValueChanged
    .add(function (sender, options) {
        var mySurvey = sender;
        var questionName = options.name;
        var newValue = options.value;
        switch (questionName){
            case "systemDomain":
                updateSystemDomain(newValue);
                break;
            case "inputModality":
                updateInputModality(newValue);
                break;
            case "trigger":
                updateTrigger(newValue);
                break;
            case "delimiter":
                updateDelimiter(newValue);
                break;
            case "interpretation":
                updateInterpretation(newValue);
                break;
            case "responseType":
                updateResponseType(newValue);
                break;
            case "responseMechanism":
                updateResponseMechanism(newValue);
                break;
            case "responseClassification":
                updateResponseClassification(newValue);
                break;
          default:
        }
        //update number of scenarios shown on header
        $("#numTasks").html(totalNumScenarios+pageNumScenarios);
    });

  //onComplete, hide survey div and show completion text
  survey.onComplete.add(function (s) {
    //public clear(clearData: boolean = true, gotoFirstPage: boolean = true);
    //keep the data, go to the first page.
    survey.clear(false);
    $("#surveyCompleted").show();
    document.getElementById("viewReport").click();
    $(".scenarioContent").show();
  });
  $("#surveyElement").Survey({model: survey});
});


//read json file
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', './js/data.json', true); // Replace './js/data.json' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }