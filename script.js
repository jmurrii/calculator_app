const displayScreen = document.getElementById('displayScreen');
const resetCalculator = document.getElementById('resetCalculator');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const addition = document.getElementById('addition');
const equals = document.getElementById('equals');

let operand1 = 0;
let tempTotal = 0;
let theCurrentTotal = 0;
let operatorValue;

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        console.log("the operator value is: ", operatorValue);
        if (!operatorValue) {
            theCurrentTotal = 0;
        }

        let numberValue = number.childNodes[0].nodeValue;
        if (operatorValue == '-') {
            numberValue = 0 - numberValue;
            if (operatorValue == '-' && operand1) {

                operand1 = operand1.toString()
                numberValue = numberValue.toString();
                operand1 = operand1 + Math.abs(numberValue);
                console.log("nested iF", operand1)
            } else {
                operand1 = numberValue;
                console.log("from the else block", operand1);
            }
        } else {
            operand1 += numberValue;
        }
        console.log("Operand1", Number(operand1));
        displayFunc(Number(operand1));
        return operand1;

    })
});

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
        }

    })

});

function additionFunc() {
    tempTotal = Number(operand1);
    operand1 = 0;
    theCurrentTotal += tempTotal;
    displayFunc(theCurrentTotal);
    console.log("additionFunc theCurrentTotalIs: ", theCurrentTotal);
}

function subtractionFunc() {
    tempTotal = Number(operand1);
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