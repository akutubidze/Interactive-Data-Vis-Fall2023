console.log('hello world');

const mainTitle = document.querySelector('#title')
let curValue = 0;
const btnIncrease = document.querySelector('#Increase')
const btnReset = document.querySelector('#Reset')
const btnDecrease = document.querySelector('#Decrease')

btnIncrease.addEventListener('click', () => {
    curValue++;
    mainTitle.textContent = curValue
});

btnDecrease.addEventListener('click', () => {
    curValue--;
    mainTitle.textContent = curValue
});

btnReset.addEventListener('click', () => {
    curValue = 0;
    mainTitle.textContent = curValue
});
