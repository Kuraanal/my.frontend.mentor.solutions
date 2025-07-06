let slip;

async function fetchData() {
    await fetch("https://api.adviceslip.com/advice",  { cache: "no-cache" })
    .then((response) => response.json())
    .then((data) => {
        slip = data;
    })
    .catch((error) => {
        console.log(error);
    });
}
// query selector
const adviceText = document.querySelector(".card__advice-text");
const adviceNumber = document.querySelector(".card__advice-number");
const dice = document.querySelector(".card__dice");

// generateAdvice function
async function generateAdvice() {
    await fetchData();
    adviceText.textContent = "\"" + slip.slip.advice + "\"";
    adviceNumber.textContent = "ADVICE # " + slip.slip.id;

    // console.log(advice);
}

// event listener
dice.addEventListener("click", generateAdvice);


//Generate initial advice
document.addEventListener("DOMContentLoaded", () => {
    generateAdvice();
});