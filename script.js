const numberButtons = document.querySelectorAll(".numbers-section .btn");
const display = document.querySelector(".display");

numberButtons.forEach((button) => button.addEventListener("click", function() {
    console.log(button.id);
    display.textContent = "HHH";
}));