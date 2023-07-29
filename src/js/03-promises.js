import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onPromiseCreated);

function onPromiseCreated(event) {
  event.preventDefault();
  // if(event.target.tagName !== 'BUTTON') return  перепутав події накинув на форму клік 
  // console.log(event.target.tagName);             і воно завжди відправляло форму
  const {delay, step, amount,} = event.currentTarget.elements;
  let firstDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    createPromise(i, firstDelay)
    .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
    firstDelay += inputStep;

    event.currentTarget.reset()
  }
}