$(document).ready(function () {
    clicknumbers();
    clickOperation();
    enter();
    clear();
});

var lastInput = "";
var beforeLastInput = "";
var numberOne = "";
var numberTwo = "";
var numberTracker = 0;
var operation = "";
var equalsString = " = <br />-----------------------<br />";

function clicknumbers() {
    $('.number').click(function () {
        if (numberTracker == 0) {
            numberOne += $(this).val();
            $('#calculations').append($(this).val());
            if (lastInput == "-") {
                numberOne = parseFloat(numberOne);
                numberOne = numberOne * -1;
            }
            beforeLastInput = lastInput;
            lastInput = "number";
        }
        else {//after numbtracker=1, numberOne is no longer defined in this function
            numberTwo += $(this).val();
            if (operation == "/" && numberTwo == 0) {
                alert("Division by 0 is not defined in mathematics");
                numberTwo = "";
            }
            else {
                $('#calculations').append($(this).val());
                if (lastInput == "-" && beforeLastInput != "number") {
                    numberTwo = parseFloat(numberTwo);
                    numberTwo = numberTwo * -1;
                }
                beforeLastInput = lastInput;
                lastInput = "number";
            }
        }
    });
}//end clicknumbers
function clickOperation() {
    $('.operation').click(function () {
        if (lastInput == "number") {
            numberTracker++;
        }   //prevent duplicat operations//allows negative numbers, but not duplicat negatives//allows subtraction of negative numbers
        if (lastInput == "number" || ($(this).val() == "-" && lastInput != "-") || ($(this).val() == "-" && beforeLastInput == "number")) {
            if (numberTracker != 0 && numberTracker != 1) {
                numberOne = parseFloat(numberOne);
                if (numberTwo != "") {
                    numberTwo = parseFloat(numberTwo);
                    if (operation == "x") {
                        numberOne = numberOne * numberTwo;
                    }
                    else if (operation == "+") {
                        numberOne = numberOne + numberTwo;
                    }
                    else if (operation == "-") {
                        numberOne = numberOne - numberTwo;
                    }
                    else {
                        numberOne = numberOne / numberTwo;
                    }
                    numberTwo = "";
                }
            }// end if
            if (!($(this).val() == "-" && lastInput != "number")) {//if this input is not a minus sign
                operation = $(this).val();
                beforeLastInput = lastInput;
                lastInput = $(this).val();
                $('#calculations').append(" " + $(this).val() + "<br />");
            }
            else {
                beforeLastInput = lastInput;
                lastInput = $(this).val();
                $('#calculations').append(" " + $(this).val());
            }
        }
    });
}

function enter() {
    $('#enter').click(function () {
        if ((numberOne != "" && numberTwo != "" && operation != "") || (numberOne != "" && numberTwo == "" && (operation == "" || operation == "-"))) {
            numberOne = parseFloat(numberOne);
            if (numberTwo != "") {
                numberTwo = parseFloat(numberTwo);
            }
            if (operation == "x") {
                $('#calculations').append(equalsString + numberOne * numberTwo);
            }
            else if (operation == "+") {
                $('#calculations').append(equalsString + (numberOne + numberTwo));
            }
            else if (operation == "-") {
                if (numberTwo == "") {
                    $('#calculations').append(equalsString + numberOne);
                }
                else {
                    $('#calculations').append(equalsString + (numberOne - numberTwo));
                }
            }
            else if (operation == "/") {
                $('#calculations').append(equalsString + numberOne / numberTwo);
            }
            else {
                $('#calculations').append(equalsString + numberOne);
            }
            //reset all values
            numberOne = "";
            numberTwo = "";
            numberTracker = 0;
            operation = "";
            lastInput = "";
            beforeLastInput = "";
            $('#calculations').append("<br /></br />");
        }
    });
}

function clear() {
    $('#clear').click(function () {
        $('#calculations').empty();
    });
}
