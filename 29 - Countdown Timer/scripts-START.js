let countdown;

const displayTimeELem = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(function() {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let secondsLeft = seconds;
    const minutes = Math.floor(secondsLeft / 60);
    secondsLeft = secondsLeft % 60;
    const displayTime = `${minutes}:${adjustNumber(secondsLeft)}`;
    displayTimeELem.textContent = displayTime;    
}

function displayEndTime(timestamp) {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const adjustedHour = hour > 12 ? hour - 12: hour;
    timeEnd.textContent = `Be Back At ${adjustedHour}:${adjustNumber(minutes)}`;
}

function adjustNumber(minutes) {
    return `${minutes < 10 ? 0 : ''}${minutes}`;
}

function startTimer() {
    const time = parseInt(this.dataset.time, 10);
    timer(time);
}

function submitForm(e){
    e.preventDefault();
    const mins = parseInt(this.minutes.value, 10);
    timer(mins * 60);
    this.reset();
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', submitForm);
