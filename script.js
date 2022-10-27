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
let previousOperator;
let totalDigits = 0;



numbers.forEach((number) => {
    number.addEventListener('click', () => {
        numberValue = number.childNodes[0].nodeValue;
        previousOperator;
        operand1;
        getOperand1Value();
    })
});

function getOperand1Value() {

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

function multiplicationTotal() {
    theCurrentTotal *= operand1;
    displayFunc(theCurrentTotal);
    operand1 = 0;
}

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        enableNumbers();
        console.log("previousOperator", previousOperator);
        operatorValue = operator.innerText;
        console.log("operatorValue", operatorValue);

        if (!previousOperator) {
            checkOperatorValue();
        } else {
            calculate();
        }

        previousOperator = operatorValue;

    });
});

function checkOperatorValue() {
    if (operatorValue == '+') {
        theCurrentTotal += operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    } else if (operatorValue == '-') {
        theCurrentTotal += operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    } else if (operatorValue == 'x') {
        theCurrentTotal += operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    } else {
        theCurrentTotal += operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    }


}

function calculate() {
    if (previousOperator == '+') {
        theCurrentTotal += operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    } else if (previousOperator == '-') {
        theCurrentTotal += operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    } else if (previousOperator == 'x') {
        theCurrentTotal *= operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    } else {
        theCurrentTotal /= operand1;
        operand1 = 0;
        displayFunc(theCurrentTotal);
    }
}

function updateTotal() {

    // theCurrentTotal += operand1;
    // operand1 = 0;
    // displayFunc(theCurrentTotal);

    tempTotal = operand1;
    operand1 = 0;
    theCurrentTotal += tempTotal;
    displayFunc(theCurrentTotal);
    console.log("updateTotal theCurrentTotalIs: ", theCurrentTotal);
}

function divisionTotal() {
    theCurrentTotal /= operand1;
    operand1 = 0;
    displayFunc(theCurrentTotal);
}


equals.addEventListener('click', () => {
    enableNumbers();
    equalsFunc();

});

function equalsFunc() {
    if (operatorValue == 'x') {
        multiplicationTotal();
    } else if (operatorValue == '÷') {
        divisionTotal();
    } else {
        updateTotal();
    }
    operatorValue = '';
    previousOperator = '';
}

resetCalculator.addEventListener('click', () => {
    operand1 = 0;
    tempTotal = 0;
    theCurrentTotal = 0;
    operatorValue = '';
    previousOperator = '';
    displayScreen.innerText = 0;

    enableNumbers();

});

