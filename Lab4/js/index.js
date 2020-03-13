// Variables
var logs = [];

var currentOperation = "";
var leftOperand = null;
var rightOperand = null;
var operation = null;

// Delete input box when select button.
var resetButtons = document.getElementsByClassName("resetButton")[0].addEventListener("click", resetValues);
var equalButtons = document.getElementsByClassName("equalButton")[0].addEventListener("click", function() { selectOperation("="); performOperation();} );

document.getElementById("addButton").addEventListener("click", function(){ selectOperation("+");});
document.getElementById("substractButton").addEventListener("click", function(){ selectOperation("-"); });
document.getElementById("multiplicationButton").addEventListener("click", function(){ selectOperation("*"); });
document.getElementById("divisionButton").addEventListener("click", function(){ selectOperation("/");});


//Inputs become current operation.
function selectOperation(operator) {
    var inputText = document.getElementsByClassName("inputNumber")[0];

    if (self.operation != null) {
        performOperation();
        self.operation = operator;
    } else {
        self.operation = operator;
        self.leftOperand = inputText.value;
    }
    inputText.value = "";
    return;
}

// Function that performs operation and adds it to logs.
function performOperation() {
    //Gets input from text.
    var inputText = document.getElementsByClassName("inputNumber")[0];
    self.rightOperand = inputText.value;
    inputText.value = null;

    if(self.leftOperand != null && self.rightOperand != null && self.operation != null) {
        // Depending on each operator
        var result = null;

        if(self.operation == "*") {
            updateOperationLog();
            result = parseFloat(self.leftOperand) * parseFloat(self.rightOperand);
        }
        else if(self.operation == "/") {
            updateOperationLog();
            result = parseFloat(self.leftOperand) / parseFloat(self.rightOperand);
        }
        else if(self.operation == "+") {
            updateOperationLog();
            result = parseFloat(self.leftOperand) + parseFloat(self.rightOperand);
        }
        else if(self.operation == "-") {
            updateOperationLog();
            result = parseFloat(self.leftOperand) - parseFloat(self.rightOperand);
        }else if(self.operation == "=") {
            self.logs.push((currentOperation + " = " + self.leftOperand));

            result = self.leftOperand;
            updateLogs();

            currentOperation = "";
            self.operation = null;
        }

        self.leftOperand = result;
        self.rightOperand = 1;

        document.getElementById("resultValue").value = (result);
    }
}

//Function that updates current operation log
function updateOperationLog(){
    if(self.currentOperation == "") {
        currentOperation = self.leftOperand + " " + self.operation + " " + self.rightOperand;
    } else {
        currentOperation = currentOperation + " " + self.operation + " " + self.rightOperand;
    }
}

//Function that updates logs
function updateLogs() {
    var logsText = document.getElementById('logInformation');

    logsText.value = logsText.value + "\n" + self.logs[self.logs.length  - 1 ];
}

//Reset 
function resetValues() {
    currentOperation = "";
    leftOperand = null;
    rightOperand = null;
    operation = null;


    document.getElementById("resultValue").value = "";
    document.getElementsByClassName("inputNumber")[0].value = "";
}