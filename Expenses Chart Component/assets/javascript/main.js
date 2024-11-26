let chartData = [];

async function fetchData() {
    
    await fetch("assets/data.json")
    .then((response) => response.json())
    .then((fetchedData) => {
        let data = [];
        data = fetchedData;
        chartData.push(...data);
    })
    .catch((error) => {
        console.log(error);
    });
}

async function setData() {
    await fetchData();

    chartDays.forEach((day, index) => {
        day.querySelector(".chart__bar").style.height = chartData[index].amount + "%";
        day.querySelector(".chart__bar-total").textContent = "$" + chartData[index].amount;
    });

}

// get every chart__day elements
const chartDays = document.querySelectorAll(".chart__day");

setData();