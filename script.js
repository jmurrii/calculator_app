const display = document.getElementById('display');

const numbers = document.querySelectorAll('.numbers');
const addition = document.getElementById('addition');
const equals = document.getElementById('equals');

let operand1 = 0;
let tempTotal = 0;
let total = 0;


numbers.forEach((item) => {
    item.addEventListener('click', () => {

        const itemValue = item.childNodes[0].nodeValue;
        operand1 += itemValue;
        console.log(Number(operand1));
        // displayFunc();
        return operand1;

    })
});

// function displayFunc() {
//     if (operand1 > total) {
//         display.innerHTML = operand1;
//     } else {
//         display.innerHTML = tempTotal;
//     }
// }


addition.addEventListener('click', () => {

    tempTotal = Number(operand1);
    operand1 = 0;
    additionFunc(tempTotal);
});

function additionFunc(x) {
    console.log("tempTotal from inside additionFunc", tempTotal);
    total += x;
    console.log("total", total);
    return total
};

// equals.addEventListener('click', () => {
//     const equalsVal = additionFunc(tempTotal);
//     console.log("do we have an equals", equalsVal);

// });
