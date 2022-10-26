const displayScreen = document.getElementById('displayScreen');
const resetCalculator = document.getElementById('resetCalculator');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equals = document.getElementById('equals');

let operand1 = 0;
let tempTotal = 0;
let theCurrentTotal = 0;
let numberValue;
let operatorValue;

numbers.forEach((number) => {
    number.addEventListener('click', () => {

        numberValue = number.childNodes[0].nodeValue;
        checkOperatorValue();
    })
});

function checkOperatorValue() {
    console.log("the operator value is: ", operatorValue);
    if (!operatorValue) {
        theCurrentTotal = 0;
    }

    if (operatorValue == '-') {
        subtractionFunc();
    } else {
        operand1 += numberValue;
    }
    operand1 = Number(operand1);
    console.log("Operand1", operand1);
    displayFunc(operand1);
    return operand1;
}

function displayFunc(displayNum) {

    if (!Number.isInteger(displayNum)) {
        displayScreen.innerText = displayNum.toFixed(3) * 1;
    } else {
        displayScreen.innerText = displayNum;
    }
}

function subtractionFunc() {
    numberValue = 0 - numberValue;

    if (operatorValue == '-' && operand1) {
        operand1 = operand1.toString()
        numberValue = numberValue.toString();
        operand1 = operand1 + Math.abs(numberValue);
    } else {
        operand1 = numberValue;
    }
}
function multiplicationTotal() {
    theCurrentTotal *= operand1;
    displayFunc(theCurrentTotal);
    operand1 = 0
}

operators.forEach((operator) => {
    operator.addEventListener('click', () => {

        operatorValue = operator.innerText;

        if (operatorValue == 'x' && theCurrentTotal && operand1) {
            multiplicationTotal();

        } else if (operatorValue == '÷') {
            theCurrentTotal = operand1;
            operand1 = 0;
            console.log("operatorValue from op:", operatorValue);
            console.log("operand1", operand1);
            console.log("theCurrentTotal", theCurrentTotal);
        } else {
            updateTotal();
        }
    });
});

function updateTotal() {
    console.log("operatorValue in updateTotal:".operatorValue)

    tempTotal = operand1;
    operand1 = 0;
    theCurrentTotal += tempTotal;
    displayFunc(theCurrentTotal);
    console.log("updateTotal theCurrentTotalIs: ", theCurrentTotal);
}



equals.addEventListener('click', () => {

    if (operatorValue == 'x') {
        multiplicationTotal();
    } else if (operatorValue == '÷') {
        theCurrentTotal /= operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
        console.log("theCurrentDivisionTotal", theCurrentTotal);
    } else {
        updateTotal();
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