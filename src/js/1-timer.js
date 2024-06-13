import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imageUrl from '../img/icon.svg'
const refs = {
    inputElem: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    daysElem: document.querySelector('[data-days]'),
    hoursElem: document.querySelector('[data-hours]'),
    minutesElem: document.querySelector('[data-minutes]'),
    secondsElem: document.querySelector('[data-seconds]'),
};
let intervalId;
let userSelectedDate;
let currentTime;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < new Date()) {
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
                theme: 'dark',
                messageColor: 'white',
                iconUrl: imageUrl,
                backgroundColor: '#ef4040',
            });
        refs.startBtn.disabled = true;
        } else {
        userSelectedDate = selectedDate;
        refs.startBtn.disabled  = false;
        }
      },
};

flatpickr("#datetime-picker", options);

refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    refs.inputElem.disabled = true;
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const diff = userSelectedDate - currentTime;
        if (diff <= 0) {
            clearInterval(intervalId);
            updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0});
            refs.inputElem.disabled = false;
            return;
        }
        const time = convertMs(diff);
        updateTimerUI(time);
        }, 1000);
});

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
};
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};
function updateTimerUI({ days, hours, minutes, seconds }) {
    refs.daysElem.textContent = addLeadingZero(days);
    refs.hoursElem.textContent = addLeadingZero(hours);
    refs.minutesElem.textContent = addLeadingZero(minutes);
    refs.secondsElem.textContent = addLeadingZero(seconds);
}