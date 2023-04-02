/* Theme selector functions */

var themeSlider = document.querySelector(".calc__slider");

if (localStorage.theme) {
	themeSlider.value = localStorage.getItem("theme"); // Set the slider to the right position
}

themeSlider.addEventListener(
	"change",
	function () {
		document.documentElement.dataset.theme = themeSlider.value;

		// Put the active theme in local storage
		localStorage.setItem("theme", themeSlider.value);
	},
	false
);

/* Calculator */
var keys = document.querySelectorAll(".calc__key");
var screen = document.querySelector(".calc__result");
var smlScreen = document.querySelector(".calc__prevResult");

var previousOperand = 0;
var currentOperand = 0;
var operator = "";

var keysActive = true;

keys.forEach((key) => {
	key.addEventListener("click", function () {
		if (key.dataset.type == "number") {
			addNumber(key.dataset.value);
			updateScreen();
		}
		if (key.dataset.type == "modifier") {
			if (previousOperand != "") {
				operate();
			}

			previousOperand = currentOperand;
			currentOperand = "0";
			operator = key.dataset.value;

			activateKeys();
			updateScreen();
		} else if (key.dataset.value == "reset") reset();
		else if (key.dataset.value == "delete") deleteOperand();
		else if (key.dataset.value == "=") operate();
		else return;
	});
});

function deactivateKeys() {
	keys.forEach((key) => {
		if (key.dataset.type == "number" || key.dataset.value == "delete")
			key.disabled = true;
	});
}

function activateKeys() {
	keys.forEach((key) => {
		if (key.dataset.type == "number" || key.dataset.value == "delete")
			key.disabled = false;
	});
}

function operate() {
	// appuis sur Equal
	var previous = parseFloat(previousOperand);
	var current = parseFloat(currentOperand);
	var result = 0;

	if (isNaN(previous) || isNaN(current)) return;

	switch (operator) {
		case "+":
			result = previous + current;
			break;
		case "-":
			result = previous - current;
			break;
		case "*":
			result = previous * current;
			break;
		case "/":
			result = previous / current;
			break;
		default:
			return;
	}

	currentOperand = result.toFixed(2);
	previousOperand = "";
	operator = "";
	deactivateKeys();
	updateScreen();
}

function deleteOperand() {
	if (currentOperand.length > 1) currentOperand = currentOperand.slice(0, -1);
	else currentOperand = "0";

	updateScreen();
}

function reset() {
	previousOperand = "";
	currentOperand = "0";
	operator = "";

	activateKeys();
	updateScreen();
}

function addNumber(num) {
	if (num === "." && currentOperand.includes(".")) return;
	else {
		if (currentOperand == "0") currentOperand = num;
		else currentOperand += num;
	}
}

function updateScreen() {
	screen.textContent = parseFloat(currentOperand).toLocaleString();
	if (previousOperand == "") previousOperand = "0";

	smlScreen.textContent =
		parseFloat(previousOperand).toLocaleString() + operator;
}
