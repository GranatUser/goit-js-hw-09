import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
const btnStart = document.querySelector("button[data-start]");
btnStart.disabled = true;


const dataSec = document.querySelector("span[data-seconds]");
const dataMin = document.querySelector("span[data-minutes]");
const dataHours = document.querySelector("span[data-hours]");
const dataDays = document.querySelector("span[data-days]");

let timerId = null;
let updatedDate = 0;

let selectDate = 0;

const instance = flatpickr("input#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates, dateStr, instance) {
        if (selectedDates[0].getTime() <= instance.config.defaultDate.getTime())
            Notiflix.Report.failure('', 'Please choose a date in the future', 'OK', {
                svgSize: '60px', width: '240px'
            });
        else {
            selectDate = selectedDates[0].getTime();
            btnStart.disabled = false;
            const endDate = selectedDates[0].getTime();
            const startDate = instance.config.defaultDate.getTime();
            updatedDate = endDate - startDate;
        }

    },


});


btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    timerId = setInterval(counter, 1000);
});
function counter() {
    updatedDate = updatedDate - 1000;
    let convertDate = convertMs(updatedDate);

    dataSec.textContent = addLeadingZero(convertDate.seconds);
    dataMin.textContent = addLeadingZero(convertDate.minutes);
    dataHours.textContent = addLeadingZero(convertDate.hours);
    dataDays.textContent = addLeadingZero(convertDate.days);

    console.log(updatedDate);
    console.log(convertMs(updatedDate));
    if (updatedDate < 1000) clearInterval(timerId);
}


function addLeadingZero(value) {
    let str = value.toString();
    if (str.length > 2) return str;
    else {
        return str.padStart(2, "0");
    }

}