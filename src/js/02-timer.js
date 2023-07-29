import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};


let intervalId = null;
refs.startBtn.disabled = true;

const options = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0].getTime();
    const currentTime = Date.now();
    if (selectedTime <= currentTime) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.disabled = false;
    }
  },
});

refs.startBtn.addEventListener('click', onStart);

function onStart() {
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const differentTime = options.selectedDates[0].getTime() - currentTime;

    if (differentTime < 0) {
      clearInterval(intervalId);
      refs.startBtn.removeEventListener('click', onStart);
      return Notiflix.Notify.success('Time\'s up, congratulations');
    }
    const { days, hours, minutes, seconds } = convertMs(differentTime);
    changeTime({ days, hours, minutes, seconds });
  }, 1000);
}

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

function changeTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}