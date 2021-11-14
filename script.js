const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const dataDelete = document.querySelector("[data-delete]");
let displayScreen = document.querySelector("[data-current-output]");

let currentNumber = "";
let currentOperand = "";
let operands = [];
let numbers = [];

numberButtons.forEach(button => button.addEventListener("click", () => {
    appendNumber(button.innerText);
    storeOperand(currentOperand);
}));

operationButtons.forEach(button => button.addEventListener("click", () => {
    storeNumber(currentNumber);
    currentOperand = button.innerText;
    operate(numbers[0], numbers[1], operands[0]);
    
}));

allClearButton.addEventListener("click", () => {
    numbers = [];
    operands = [];
    currentNumber = "";
    currentOperand = "";
    displayScreen.value = "";
});

equalsButton.addEventListener("click", () => {
    storeNumber(currentNumber);
    operate(numbers[0], numbers[1], operands[0]);
});

dataDelete.addEventListener("click", () => {
    currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    if (currentNumber === "0") {
        currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    } 
    displayScreen.value = currentNumber;
});

document.addEventListener("keydown", (event) => {
    let name = event.key;
    let code = event.code;
    console.log(`Key name: ${name} and code is ${code}`);
    console.log(Number(code.substring(code.length - 1, code.length)));
    if (code.substring(0, code.length - 1) === "Digit") {
        appendNumber(name);
        storeOperand(currentOperand);
}
});

function storeNumber(num) {
    if (numbers.length > 1) {
        numbers.pop();
    }
    if (num) {
        numbers.push(parseFloat(num));
        currentNumber = "";
    }
}

function storeOperand(operand) {
    if (operand !== "") {
        operands.push(operand);
        currentOperand = "";
    }
    if (operands.length > 1) {
        operands.shift();
    }
}

function appendNumber(num) {
    if(num === "." && currentNumber.includes(".")){
        return;
    }
    if (num === "." && currentNumber.length === 0) {
        currentNumber += "0.";
        displayScreen.value = currentNumber;
        return;
    }
    if (num === "0" && currentNumber.length === 0) {
        displayScreen.value = "0";
        return;
    }
    currentNumber += num;
    displayScreen.value = currentNumber;
}

function operate(num1, num2, op) {
    console.log(`Number one: ${num1} operand: ${op} Number two: ${num2}`);
    if (num1 !== undefined && num2 !== undefined) {
        let roundToLength;
        (num1.toString().length >= num2.toString().length) ?
        roundToLength = num1.toString().length : roundToLength = num2.toString().length;
        roundToLength = Math.pow(10, roundToLength);
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
        numbers[0] = Math.round((numbers[0] + Number.EPSILON) * roundToLength) /  roundToLength;
        displayScreen.value = numbers[0];
    }
}