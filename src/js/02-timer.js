import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const timerElements = document.getElementsByClassName('field');
const timerNumbers = document.getElementsByClassName('value');
const timerLabels = document.getElementsByClassName('label');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

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
