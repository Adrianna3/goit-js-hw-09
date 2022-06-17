import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', createPromises);

function createPromises(e) {
  e.preventDefault();
  let delay = Number(firstDelay.value);
  for (let position = 1; position <= amount.value; position++) {
    createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      
      });
    delay += Number(delayStep.value);
  }
}

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
