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


// Change value of isSuccess variable to call resolve or reject
const isSuccess = true;

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (isSuccess) {
            resolve("Success! Value passed to resolve function");
        } else {
            reject("Error! Error passed to reject function");
        }
    }, 2000);
});

// Will run first
console.log("Before promise.then()");

// Registering promise callbacks
promise.then(
    // onResolve will run third or not at all
    value => {
        console.log("onResolve call inside promise.then()");
        console.log(value); // "Success! Value passed to resolve function"
    },
    // onReject will run third or not at all
    error => {
        console.log("onReject call inside promise.then()");
        console.log(error); // "Error! Error passed to reject function"
    }
);

// Will run second
console.log("After promise.then()");