const squares = document.querySelectorAll('.square')

const timeLeft = document.getElementById("time-left");
const scoreDisplay = document.getElementById("score");

let score = 0;
let hitSpot;
let currentTime = 60;


let bonk = new Audio('sounds/bonk.mp3');
bonk.playbackRate=3;

function randomSquare() {
    squares.forEach((square) => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add("mole");
    hitSpot = randomSquare.id;
}

function startGame() {
    let timerId = null;
    timerId = setInterval(randomSquare, 680);
    document.getElementById('start').removeEventListener('click', startGame);

    let countDownTimerId = setInterval(countDown, 1000)

    function countDown() {
        currentTime--;
        timeLeft.textContent = currentTime;

        if (currentTime === 0) {
            clearInterval(countDownTimerId)
            clearInterval(timerId)
            alert("Game OVER ! You got " + score + " moles !");
        }
    }
}

document.getElementById('start').addEventListener('click', startGame);


squares.forEach((square) => {
    square.addEventListener('click', () => {
        if (square.id === hitSpot) {
            bonk.currentTime = 0
            bonk.play();
            score++;
            scoreDisplay.textContent = score;
            hitSpot = null;
        }
    })
})


