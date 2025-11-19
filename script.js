const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function formatTime(time) {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = true;
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
        resetBtn.disabled = false;
        running = false;
    }
});

lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapItem);
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    lapsList.innerHTML = '';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    running = false;
});
