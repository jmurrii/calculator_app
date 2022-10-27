const displayScreen = document.getElementById('displayScreen');
const resetCalculator = document.getElementById('resetCalculator');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equals = document.getElementById('equals');

let operand1 = 0;
let theCurrentTotal = 0;
let numberValue;
let operatorValue;
let previousOperator;
let isDecimal = false;
let totalDigits = 0;

numbers.forEach((number) => {
    number.addEventListener('click', () => {

        numberValue = number.childNodes[0].nodeValue;

        if (numberValue == '.') {
            isDecimal = true;
        }
        getOperand1Value();
    });
});

function getOperand1Value() {

    if (!operatorValue) {
        theCurrentTotal = 0;
    }

    if (operatorValue == '-') {
        subtractionFunc();
    } else if (numberValue !== '.' && isDecimal) {
        makeDecimal();
    } else {
        operand1 += numberValue;
    }
    operand1 = Number(operand1);
    console.log("Operand1", operand1);
    displayFunc(Number(operand1));
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

function makeDecimal() {
    operand1 += numberValue;
    operand1 = operand1 / 10;
    isDecimal = false;
}

function displayFunc(displayNum) {

    totalDigits = displayScreen.innerText.length;

    if (totalDigits == 9) {
        disableNumbers();
    }

    if (!Number.isInteger(displayNum)) {
        displayScreen.innerText = displayNum.toFixed(3) * 1;
    } else {
        displayScreen.innerText = displayNum;
    }
}

function disableNumbers() {
    numbers.forEach((number) => {
        number.setAttribute('disabled', true);
        totalDigits = 0;

    });
}

function enableNumbers() {

    numbers.forEach((number) => {
        number.removeAttribute('disabled', true);
    });

    displayFunc(theCurrentTotal);
}

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        enableNumbers();
        isDecimal = false;
        operatorValue = operator.innerText;

        if (!previousOperator) {
            addToCurrentTotal()
        } else {
            calculate();
        }
        previousOperator = operatorValue;
    });
});

function addToCurrentTotal() {

    theCurrentTotal += operand1;
    operand1 = 0;
    displayFunc(theCurrentTotal);
}

function calculate() {
    if (previousOperator == '+' || previousOperator == '-') {
        addToCurrentTotal();
    } else if (previousOperator == 'x') {
        multiply();
    } else {
        divide();
    }
}

function multiply() {
    theCurrentTotal *= operand1;
    displayFunc(theCurrentTotal);
    operand1 = 0;
}

function divide() {
    theCurrentTotal /= operand1;
    operand1 = 0;
    displayFunc(theCurrentTotal);
}

equals.addEventListener('click', () => {
    enableNumbers();
    isDecimal = false;
    equalsFunc();
});

function equalsFunc() {
    if (operatorValue == 'x') {
        multiply();
    } else if (operatorValue == '÷') {
        divide();
    } else {
        addToCurrentTotal();
    }
    operatorValue = '';
    previousOperator = '';
}

resetCalculator.addEventListener('click', () => {
    operand1 = 0;
    theCurrentTotal = 0;
    operatorValue = '';
    previousOperator = '';
    displayScreen.innerText = 0;
    enableNumbers();
});