
function SurveyF() {
    var Survey = Parse.Object.extend("Survey");
    var survey = new Survey();
    var String = document.getElementById('RESULT_RadioButton-2');

    String = String.options[String.selectedIndex].text;
    survey.set("Location", String);

    if (document.getElementById('RESULT_RadioButton-4_0').checked == true) {
        console.log(document.getElementById('RESULT_RadioButton-4_0').value);
        survey.set("FirstVisit", true);
    }
    else {
        console.log(document.getElementById('RESULT_RadioButton-4_1').value);
        survey.set("FirstVisit", false);
    }

    String = document.getElementById('RESULT_TextField-3').value;
    survey.set("Visited", String);

    for (var x = 0; x < 16; x++) {
        String = document.getElementsByName('RESULT_RadioButton-5-' + x);
        for (var i = 0, l = String.length; i < 5; i++) {
            if (String[i].checked) {
                console.log("SurveyAns" + x + i);
                survey.set("SurveyAns" + x, i);
            }
        }
    }

    String = document.getElementById('RESULT_TextArea-8').value;
    survey.set("Comments", String);

    survey.set("Name", document.getElementById('RESULT_TextField-10').value + " " + document.getElementById('RESULT_TextField-11').value);

    String = document.getElementById('RESULT_TextField-12').value;
    survey.set("PhoneNum", String);

    String = document.getElementById('RESULT_TextField-13').value;
    survey.set("Email", String);

    survey.save(null, {
        success: function (survey) {
            alert("Thank you! Your request has been sent!");
        },
        error: function (survey, error) {
            //  alert("Failed to create!");
        }
    });
}
