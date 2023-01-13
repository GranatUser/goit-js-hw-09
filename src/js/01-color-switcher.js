function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.body;
const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");

btnStop.disabled = true;

let timerId = null;
btnStart.addEventListener("click", () => {
    timerId = setInterval(() => {
        btnStart.disabled = true;
        btnStop.disabled = false;
        body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000)
});
btnStop.addEventListener("click", () => {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
});


