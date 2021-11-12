const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
let displayScreen = document.querySelector("[data-current-output]");
const regex = /[1-9]+/g;
let currentNumber = "";
let operand = [];
let numbers = [];

numberButtons.forEach(button => button.addEventListener("click", () => {
    appendNumber(button.innerText);
    displayScreen.value = currentNumber;
}));

operationButtons.forEach(button => button.addEventListener("click", () => {
    storeNumber(currentNumber);
    console.log(button.innerText);
    operate(numbers[0], numbers[1], button.innerText);
    displayScreen.value = numbers[0];
}));

function storeNumber(num) {
    if (numbers.length > 1) {
        numbers.pop();
    }
    if (num) {
        numbers.push(parseFloat(num));
        currentNumber = "";
    }
}

function appendNumber(num) {
    if(num === "." && currentNumber.includes(".")){
        return;
    }
    if (currentNumber[0] === "0" && currentNumber.includes()) {
        return;
    }
    currentNumber += num;
    console.log(currentNumber.match(regex));
}

function operate(num1, num2, op) {
    console.log("NUM1:" + num1 + ", NUM2:" + num2);
    if (num1 !== undefined && num2 !== undefined) {
        switch(op) {
        case "+":
            numbers[0] += numbers[1];
            break;
        case "-":
            numbers[0] -= numbers[1];
            break;
        case "÷":
            if(num2 === 0) {
                alert("You can't divide by zero.");
                numbers[0] = 0;
                return;
            }
            numbers[0] /= numbers[1];
            break;
        case "*":
            numbers[0] *= numbers[1];
            break;  
        default:
            alert("Something is wrong!");
        }
    }
}
/* 
const previousOutput = document.querySelector("[data-previous-output]");
const currentOutput = document.querySelector("[data-current-output]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]"); */
