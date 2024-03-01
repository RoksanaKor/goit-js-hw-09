import Notiflix from 'notiflix';

const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const createBtn = document.querySelector('[type="submit"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(resolved => {
      Notiflix.Notify.success(resolved);
    })
    .catch(rejected => {
      Notiflix.Notify.failure(rejected);
    });
}
function onClick(promiseAmount, promiseDelay, promiseStep) {
  let currentPosition = 1;
  let currentDelay = promiseDelay;
  for (let i = 0; i < promiseAmount; i++) {
    createPromise(currentPosition, currentDelay);
    currentPosition += 1;
    currentDelay += promiseStep;
  }
}

createBtn.addEventListener('click', event => {
  event.preventDefault();
  onClick(parseInt(amount.value), parseInt(delay.value), parseInt(step.value));
});
