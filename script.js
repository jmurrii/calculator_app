const displayScreen = document.getElementById('displayScreen');
const resetCalculator = document.getElementById('resetCalculator');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const addition = document.getElementById('addition');
const equals = document.getElementById('equals');

let operand1 = 0;
let tempTotal = 0;
let theCurrentTotal = 0;
let numberValue;
let operatorValue;

numbers.forEach((number) => {
    number.addEventListener('click', () => {

        numberValue = number.childNodes[0].nodeValue;
        getOperand();
    })
});

function getOperand() {
    console.log("the operator value is: ", operatorValue);
    if (!operatorValue) {
        theCurrentTotal = 0;
    }

    if (operatorValue == '-') {
        numberValue = 0 - numberValue;

        if (operatorValue == '-' && operand1) {
            operand1 = operand1.toString()
            numberValue = numberValue.toString();
            operand1 = operand1 + Math.abs(numberValue);
            console.log("nested if", operand1)
        } else {
            operand1 = numberValue;
            console.log("from the else block", operand1);
        }
    } else {
        operand1 += numberValue;
    }

    console.log("Operand1", Number(operand1));
    operand1 = Number(operand1);
    displayFunc(operand1);
    return operand1;
}

function displayFunc(displayNum) {
    displayScreen.innerText = displayNum;
}

operators.forEach((operator) => {
    operator.addEventListener('click', () => {

        operatorValue = operator.innerText;
        if (operatorValue == '+') {
            additionFunc();
            return operatorValue = '+';
        } else if (operatorValue == '-') {
            subtractionFunc();
            return operatorValue = '-';
        } else if (operatorValue == 'x') {
            multiplyFunc();
            return operatorValue = 'x';
        }
    });
});


function multiplyFunc() {

    theCurrentTotal *= operand1;
    console.log("theCurrentTotal is XXX", theCurrentTotal);
    tempTotal = operand1;
    operand1 = 0;
    theCurrentTotal += tempTotal;
    displayFunc(theCurrentTotal);
    console.log("MultiplyFunc theCurrentTotalIs: ", theCurrentTotal);
}


function additionFunc() {
    tempTotal = operand1;
    operand1 = 0;
    theCurrentTotal += tempTotal;
    displayFunc(theCurrentTotal);
    console.log("additionFunc theCurrentTotalIs: ", theCurrentTotal);
}

function subtractionFunc() {
    tempTotal = operand1;
    operand1 = 0;
    theCurrentTotal += tempTotal;
    displayFunc(theCurrentTotal);
    console.log("subtractionFunc theCurrentTotalIs: ", theCurrentTotal);
}

equals.addEventListener('click', () => {
    console.log("equals operatorValue: ", operatorValue);
    if (operatorValue == '+') {
        additionFunc();
    } else if (operatorValue == '-') {
        subtractionFunc();
    } else if (operatorValue = 'x') {
        multiplyFunc();
    }
    operatorValue = '';
});



resetCalculator.addEventListener('click', () => {
    operand1 = 0;
    tempTotal = 0;
    theCurrentTotal = 0;
    operatorValue = '';
    displayScreen.innerText = 0;
});