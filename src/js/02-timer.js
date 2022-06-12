// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const start = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dateTimePicker = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date().getTime();
    const selectedDate = selectedDates[0].getTime();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      start.setAttribute('disabled', 'disabled');
    }
    console.log(selectedDates[0]);
    start.removeAttribute('disabled', 'disabled');
  },
};

// start.addEventListener("click", makeTime);

flatpickr('#datetime-picker', options);

// const currentDate = new Date();
// const selectedDate = selectedDates[0];
// const time = selectedDate - currentDate.getItem()

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const currentDate = new Date();
  const dateTimePickerMs = new Date(
    dateTimePicker.value.replace(/-/g, '/')
  ).getTime();
  ms = dateTimePickerMs - currentDate;

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

  // dataDays.innerHTML = convertMs(ms).days;
  // dataHours.innerHTML = convertMs(ms).hours;
  // dataMinutes.innerHTML = convertMs(ms).minutes;
  // dataSeconds.innerHTML = convertMs(ms).seconds;

  return { days, hours, minutes, seconds };
}

start.addEventListener('click', () => {
  const currentDate = new Date();
  const dateTimePickerMs = new Date(
    dateTimePicker.value.replace(/-/g, '/')
  ).getTime();

  if (dateTimePickerMs <= currentDate) {
    dataDays.innerHTML = '00';
    dataHours.innerHTML = '00';
    dataMinutes.innerHTML = '00';
    dataSeconds.innerHTML = '00';
    start.setAttribute('disabled', 'disabled');
    return;
  }

  timerId = setInterval(() => {
    dataDays.innerHTML = convertMs().days.toString().padStart(2, '0');
    dataHours.innerHTML = convertMs().hours.toString().padStart(2, '0');
    dataMinutes.innerHTML = convertMs().minutes.toString().padStart(2, '0');
    dataSeconds.innerHTML = convertMs().seconds.toString().padStart(2, '0');

    if (dateTimePickerMs <= currentDate) {
      clearInterval(timerId);
    }

    if (dataSeconds.innerHTML === '00') clearInterval(timerId);
  }, 1000);
  start.setAttribute('disabled', 'disabled');
});

// function makeTime() {
//   start.setAttribute('disabled', 'disabled');
//   timerId = setInterval(() => {
//     convertMs(new Date(dateTimePicker.value.replace(/-/g, '/')).getTime() -
//         new Date().getTime()
//     );
//   }, 1000);
// }
