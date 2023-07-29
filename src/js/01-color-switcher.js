function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = null;

const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', randomBodyColor);
stopBtnEl.addEventListener('click', stopRandom);

function randomBodyColor() {
    timerId = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000);
    startBtnEl.setAttribute('disabled', '');
    stopBtnEl.removeAttribute('disabled');
}

function stopRandom() {
    clearInterval(timerId);
    startBtnEl.removeAttribute('disabled');
    stopBtnEl.setAttribute('disabled', '');
}