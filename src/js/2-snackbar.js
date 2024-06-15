import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imgOK from '../img/ok.png';
import imgError from '../img/error.png';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', (event) => {
    event.preventDefault();
    const delay = Number(formElem.delay.value);
    const state = formElem.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay)
    })
    promise.then(delay => {
        iziToast.success({
            position: 'topRight',
            theme: 'dark',
            messageColor: 'white',
            backgroundColor: '#59A10D',
            message: `Fulfilled promise in ${delay}ms`,
            iconUrl: imgOK,
        });
    })
    .catch(delay => {
        iziToast.error({
            position: "topRight",
            theme: 'dark',
            messageColor: 'white',
            backgroundColor: '#EF4040',
            message: `Rejected promise in ${delay}ms`,
            iconUrl: imgError,
        });
    })
    formElem.reset();
})