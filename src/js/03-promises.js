import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}

const form = document.querySelector(".form");

form.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    let delay = Number((form.querySelector("input[name='delay']")).value);
    const step = Number((form.querySelector("input[name='step']")).value);
    const amount = Number((form.querySelector("input[name='amount']")).value);

    for (let k = 1; k <= amount; k++, delay = delay + step) {
      createPromise(k, delay).then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }

  }
})