$(document).ready(function () {
    clickNumber();
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
var equalsString = " = <br />--------------------------<br />";

function clickNumber() {
    $('.number').click(function () {
        if (lastInput == "=") {
            resetValues();
            $('#calculations').append("<br /></br />");
        }
        if (numberTracker == 0) {
            numberOne += $(this).val();
            $('#calculations').append($(this).val());
            if (lastInput == "-") {
                numberOne = changeSign(numberOne);
            }
            beforeLastInput = lastInput;
            lastInput = "number";
        }
        else {//after numbtracker=1, numberOne is no longer defined in this function
            if (lastInput != "number") {
                numberTwo = "";
            }
            numberTwo += $(this).val();
            if (operation == "/" && numberTwo == 0) {
                alert("Division by 0 is not defined in mathematics");
                numberTwo = "";
            }
            else {
                $('#calculations').append($(this).val());
                if (lastInput == "-" && (beforeLastInput != "number" && beforeLastInput != "=")) {
                    numberTwo = changeSign(numberTwo);
                    debugInfo();
                }
                beforeLastInput = lastInput;
                lastInput = "number";
            }
        }
        debugInfo();
    });
}//end clicknumbers
function clickOperation() {
    $('.operation').click(function () {
        if (lastInput == "number") {
            numberTracker++;
        }   //prevent duplicat operations//allows negative numbers, but not duplicat negatives//allows subtraction of negative numbers
        if (lastInput == "number" || ($(this).val() == "-" && lastInput != "-") || ($(this).val() == "-" && beforeLastInput == "number") || (lastInput == "=" && numberOne != "")) {
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
            } // end if
            if (!($(this).val() == "-" && (lastInput != "number" && lastInput != "="))) {//if this input is not a minus sign
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
        debugInfo();
    });
}

function enter() {
    $('#enter').click(function () {
        if ((numberOne != "" && numberTwo != "" && operation != "") || (numberOne != "" && numberTwo == "" && (operation == "" || operation == "-"))) {
            if (lastInput == "=") {
                $('#calculations').append(" " + operation + "<br />" + numberTwo);
            }
            numberOne = parseFloat(numberOne);
            if (numberTwo != "") {
                numberTwo = parseFloat(numberTwo);
            }
            if (operation == "x") {
                $('#calculations').append(equalsString + multiply(numberOne, numberTwo));
                numberOne = numberOne * numberTwo;
            }
            else if (operation == "+") {
                $('#calculations').append(equalsString + add(numberOne, numberTwo));
                numberOne = numberOne + numberTwo;
            }
            else if (operation == "-") {
                if (numberTwo == "") {
                    printNumber(numberOne);
                }
                else {
                    $('#calculations').append(equalsString + subtract(numberOne, numberTwo));
                    numberOne = numberOne - numberTwo;
                }
            }
            else if (operation == "/") {
                $('#calculations').append(equalsString + divide(numberOne, numberTwo));
                numberOne = numberOne / numberTwo;
            }
            else {
                printNumber(numberOne);
            }
            lastInput = "=";
        }
        debugInfo();
    });
}

function clear() {
    $('#clear').click(function () {
        $('#calculations').empty();
        resetValues();
        debugInfo();
    });
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function changeSign(num) {
    num = parseFloat(num);
    return num * -1;
}

function printNumber(num) {
    $('#calculations').append(equalsString + numberOne);
}

function resetValues() {
    numberOne = "";
    numberTwo = "";
    numberTracker = 0;
    operation = "";
    lastInput = "";
    beforeLastInput = "";
}

function debugInfo() {
    console.log("operation: " + operation + "\n" +
            "lastInput: " + lastInput + "\n" +
            "beforeLastInput: " + beforeLastInput + "\n" +
            "numberOne: " + numberOne + "\n" +
            "numberTwo: " + numberTwo + "\n" +
            "numberTracker: " + numberTracker + "\n");
}