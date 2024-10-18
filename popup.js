let timer;
let defaultTime = 25 * 60; // Default 25 minutes
let timeLeft = defaultTime;
let isRunning = false;
let isPaused = false;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause'); // New Pause Button
const stopButton = document.getElementById('stop');
const editButton = document.getElementById('edit');
const alarm = document.getElementById('alarm');

console.log('Pomodoro Timer initialized');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    console.log(`Display updated: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
}

function startTimer() {
    if (!isRunning && !isPaused) {
        console.log('Starting timer');
        timeLeft = defaultTime; // Reset to default or last set duration
    }
    if (!isRunning) {
        isRunning = true;
        isPaused = false;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                alarm.play();
                console.log('Timer finished, alarm played');
                isRunning = false;
            }
        }, 1000);
    } else {
        console.log('Timer is already running');
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        isPaused = true;
        console.log('Timer paused');
    }
}

function stopTimer() {
    clearInterval(timer);
    alarm.pause();
    alarm.currentTime = 0; // Reset the sound to the beginning
    timeLeft = defaultTime; // Reset time to default or edited duration
    updateDisplay();
    isRunning = false;
    isPaused = false;
    console.log('Timer stopped and reset');
}

function editTimer() {
    const newTime = prompt("Enter new time in minutes:", "25");
    if (newTime !== null) {
        defaultTime = parseInt(newTime) * 60;
        timeLeft = defaultTime; // Update timeLeft to the new default
        updateDisplay();
        console.log(`Timer edited: ${newTime} minutes`);
    } else {
        console.log('Edit cancelled');
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer); // Add event listener for pause
stopButton.addEventListener('click', stopTimer);
editButton.addEventListener('click', editTimer);

updateDisplay();
