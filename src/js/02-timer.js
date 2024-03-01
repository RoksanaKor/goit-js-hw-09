import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const timerElements = document.getElementsByClassName('field');
const timerNumbers = document.getElementsByClassName('value');
const timerLabels = document.getElementsByClassName('label');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

const flatpicker = flatpickr(input, options);

timer.style.display = 'flex';
timer.style.gap = '1.5vw';
timer.style.marginTop = '2vw';
[...timerElements].forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'center';
});

[...timerNumbers].forEach(element => {
  element.style.fontSize = '4vw';
  element.style.lineHeight = '0.9';
});

[...timerLabels].forEach(element => {
  element.style.textTransform = 'uppercase';
  element.style.fontSize = '1.5vw';
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  value.days = value.days.toString().padStart(2, '0');
  value.hours = value.hours.toString().padStart(2, '0');
  value.minutes = value.minutes.toString().padStart(2, '0');
  value.seconds = value.seconds.toString().padStart(2, '0');
  return value;
}

function onClick() {
  const countdown = setInterval(onStart, 1000);

  function onStart() {
    const selectedTimeDifference =
      flatpicker.selectedDates[0].getTime() - new Date().getTime();
    const selectedDateDifference = convertMs(selectedTimeDifference);
    addLeadingZero(selectedDateDifference);

    days.innerHTML = selectedDateDifference.days;
    hours.innerHTML = selectedDateDifference.hours;
    minutes.innerHTML = selectedDateDifference.minutes;
    seconds.innerHTML = selectedDateDifference.seconds;
    if (selectedTimeDifference <= 0) {
      days.innerHTML = '00';
      hours.innerHTML = '00';
      minutes.innerHTML = '00';
      seconds.innerHTML = '00';
      clearInterval(countdown);
      Notiflix.Notify.info('Countdown is over');
    }
  }
  onStart();
  input.disabled = 'true';
  startButton.disabled = 'true';
}

startButton.addEventListener('click', onClick);
