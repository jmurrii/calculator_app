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

let multiplyNextValue = false;


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
        numbers.forEach((number) => {
            number.setAttribute('disabled', true);
            totalDigits = 0;
            console.log("disable numbers called");
        });

    }

    if (!Number.isInteger(displayNum)) {
        displayScreen.innerText = displayNum.toFixed(3) * 1;
    } else {
        displayScreen.innerText = displayNum;
    }
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

        if (previousOperator == '+' && operatorValue == 'x' && theCurrentTotal && operand1) {

            theCurrentTotal += operand1;
            operand1 = 0;
            displayFunc(theCurrentTotal);
            multiplyNextValue = true;

        } else if (previousOperator == 'x' && operatorValue == '-' && theCurrentTotal && operand1) {
            theCurrentTotal *= operand1;
            operand1 = 0;
            displayFunc(theCurrentTotal);
        } else if (previousOperator == '-' && operatorValue == '÷' && theCurrentTotal && operand1) {
            theCurrentTotal += operand1;
            operand1 = 0;
            displayFunc(theCurrentTotal);
        }
        else if (operatorValue == 'x' && theCurrentTotal && operand1) {
            multiplicationTotal();
        } else if (operatorValue == '÷' && theCurrentTotal && operand1) {
            divisionTotal();
        } else {
            updateTotal();
        }
        previousOperator = operatorValue;

    });
});

function updateTotal() {

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
    if (operatorValue == 'x') {
        multiplicationTotal();
    } else if (operatorValue == '÷') {
        divisionTotal();
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
    previousOperator = '';
    displayScreen.innerText = 0;

    enableNumbers();

});

function enableNumbers() {

    numbers.forEach((number) => {
        number.removeAttribute('disabled', true);
        console.log("enableNumbers called");
    });

    displayFunc(theCurrentTotal);
}