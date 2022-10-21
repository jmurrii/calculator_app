const display = document.getElementById('display-text');
const clearCalculator = document.getElementById('clear');
const numbers = document.querySelectorAll('.numbers');
const addition = document.getElementById('addition');
const equals = document.getElementById('equals');

let operand1 = 0;
let tempTotal = 0;
let total = 0;

numbers.forEach((number) => {
    number.addEventListener('click', () => {

        const numberValue = number.childNodes[0].nodeValue;
        operand1 += numberValue;
        console.log("Operand1 to be added", Number(operand1));
        displayFunc(Number(operand1));
        return operand1;

    })
});

function displayFunc(displayNum) {
    display.innerText = displayNum;
}


addition.addEventListener('click', () => {
    additionFunc();
});

function additionFunc() {
    tempTotal = Number(operand1);
    operand1 = 0;
    total += tempTotal;
    displayFunc(total);
    console.log("addition evListener: ", total);
}

equals.addEventListener('click', () => {
    accumulatorFunc();
});

function accumulatorFunc() {
    tempTotal = Number(operand1);
    operand1 = 0;
    total += tempTotal;
    displayFunc(total);
    console.log("Equals: ", total);
}

clearCalculator.addEventListener('click', () => {
    operand1 = 0;
    tempTotal = 0;
    total = 0;

    display.innerText = 0;
});
