let shareButton = document.querySelector(".share__button");
let info = document.querySelector(".article__infos");

shareButton.addEventListener("click", function () {
	info.classList.toggle("active");
});
