const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClicked() {
  document.body.style.backgroundColor = getRandomHexColor();
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function onUnclicked() {
  clearInterval(timer);
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', onClicked);
stopButton.addEventListener('click', onUnclicked);
