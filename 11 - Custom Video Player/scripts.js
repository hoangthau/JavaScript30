//get elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[type=range]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

//build function
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function changePlayButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    const skip = this.dataset.skip;
    video.currentTime += parseFloat(skip);
}

function rangeChange() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressFilled.style.flexBasis = `${percent}%`;
}

function jump(e) {
    var distance = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = distance;
}

//hook up the event
video.addEventListener('click', togglePlay);
video.addEventListener('play', changePlayButton);
video.addEventListener('pause', changePlayButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', rangeChange));
ranges.forEach(range => range.addEventListener('mousemove', rangeChange));

let mousedown = false;
progress.addEventListener('click', jump);
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mousemove', e => mousedown && jump(e));
progress.addEventListener('mouseup', () => (mousedown = false));
