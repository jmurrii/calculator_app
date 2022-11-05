const displayScreen = document.getElementById('displayScreen');
const resetCalculator = document.getElementById('resetCalculator');
const numberButtons = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operators');
const equals = document.getElementById('equals');

let firstNumber = '';
let secondNumber = '';
let storedOperator = '';
let currentOperator = '';

equals.addEventListener('click', () => {
    if (firstNumber && currentOperator != '' && secondNumber) {
        calculate();
    }
});

resetCalculator.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    storedOperator = '';
    currentOperator = '';
    displayScreen.innerText = 0;
});

// When i get the code review version working then go back and use a forEach to do this
for (i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', (e) => {
        currentOperator = e.target.value;
        if (firstNumber && secondNumber) {
            calculate();
        }
    });
}


// also forEach here when it's all working
for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', (e) => {
        let number = e.target.value;
        displayUserInput(number);
    });
}

function displayUserInput(number) {
    storedOperator = currentOperator;

    if (!currentOperator) {
        firstNumber = firstNumber.concat(number);
        displayScreen.innerText = firstNumber;
        return;
    }

    if (currentOperator || secondNumber) {
        if (!secondNumber) {
            secondNumber = firstNumber;
            firstNumber = '';
        }

        firstNumber = firstNumber.concat(number);
        displayScreen.innerText = firstNumber;
        return;
    }
}

function calculate() {
    let numOne = parseFloat(firstNumber);
    let numTwo = parseFloat(secondNumber);

    switch (storedOperator) {
        case "+":
            secondNumber = numOne + numTwo;
            displayCalculation();
            break;
        case "x":
            secondNumber = numOne * numTwo;
            displayCalculation();
            break;
        case "-":
            secondNumber = numTwo - numOne;
            displayCalculation();
            break;
        case "/":
            secondNumber = numTwo / numOne;
            displayCalculation();
            break;
    }
}

function displayCalculation() {
    displayScreen.innerText = secondNumber;
    firstNumber = '';
}