const timeLeftDisplay = document.getElementById('time-left');
const resultDisplay = document.getElementById('result');
const playButton = document.getElementById('play-button');
const grid = document.getElementById('grid');
const squares = grid.querySelectorAll('div');
const logsLeft = grid.querySelectorAll('.log-left');
const logsRight = grid.querySelectorAll('.log-right');
const carsLeft = grid.querySelectorAll('.car-left');
const carsRight = grid.querySelectorAll('.car-right');
let currentIndex = 76;
const gridWidth = 9;
let timerId;
let gameTimer;
let currentTime = 30;

timeLeftDisplay.textContent = currentTime;

//moving the frog will also start the game
document.addEventListener('keyup', moveFrog);

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch (e.key) {
        case e.key = 'ArrowLeft' :
            if (currentIndex % gridWidth === 0) break;
            currentIndex--;
            if (gameTimer === null || gameTimer === undefined) {
                handlePlayButtonClicked()//to start the game
            }
            break;
        case e.key = 'ArrowRight' :
            if ((currentIndex % gridWidth) + 1 >= gridWidth) break;
            currentIndex++;
            if (gameTimer === null || gameTimer === undefined) {
                handlePlayButtonClicked()//to start the game
            }
            break;
        case e.key = 'ArrowUp' :
            if ((currentIndex - gridWidth) < 0) break;
            currentIndex -= gridWidth;
            if (gameTimer === null || gameTimer === undefined) {
                handlePlayButtonClicked()//to start the game
            }
            break;
        case e.key = 'ArrowDown' :
            if ((currentIndex + gridWidth) > gridWidth * gridWidth) break;
            currentIndex += gridWidth;
            if (gameTimer === null || gameTimer === undefined) {
                handlePlayButtonClicked()//to start the game
            }
            break;
    }
    squares[currentIndex].classList.add('frog');

    isGameLost();
}


function autoMoveElements() {
    logsLeft.forEach(log => {
        moveLogLeft(log);
    })

    logsRight.forEach(log => {
        moveLogRight(log);
    })

    carsLeft.forEach(car => {
        moveCarLeft(car);
    })

    carsRight.forEach(car => {
        moveCarRight(car);
    })
}

function moveLogLeft(log) {
    switch (true) {
        case log.classList.contains('l1'):
            log.classList.remove('l1');
            log.classList.add('l2')
            break;
        case log.classList.contains('l2'):
            log.classList.remove('l2');
            log.classList.add('l3')
            break;
        case log.classList.contains('l3'):
            log.classList.remove('l3');
            log.classList.add('l4')
            break;
        case log.classList.contains('l4'):
            log.classList.remove('l4');
            log.classList.add('l5')
            break;
        case log.classList.contains('l5'):
            log.classList.remove('l5');
            log.classList.add('l1')
            break;
    }
}

function moveLogRight(log) {
    switch (true) {
        case log.classList.contains('l1'):
            log.classList.remove('l1');
            log.classList.add('l5')
            break;
        case log.classList.contains('l2'):
            log.classList.remove('l2');
            log.classList.add('l1')
            break;
        case log.classList.contains('l3'):
            log.classList.remove('l3');
            log.classList.add('l2')
            break;
        case log.classList.contains('l4'):
            log.classList.remove('l4');
            log.classList.add('l3')
            break;
        case log.classList.contains('l5'):
            log.classList.remove('l5');
            log.classList.add('l4')
            break;
    }
}


function moveCarLeft(car) {
    switch (true) {
        case car.classList.contains('c1'):
            car.classList.remove('c1');
            car.classList.add('c2')
            break;
        case car.classList.contains('c2'):
            car.classList.remove('c2');
            car.classList.add('c3')
            break;
        case car.classList.contains('c3'):
            car.classList.remove('c3');
            car.classList.add('c1')
            break;
    }
}

function moveCarRight(car) {
    switch (true) {
        case car.classList.contains('c1'):
            car.classList.remove('c1');
            car.classList.add('c3')
            break;
        case car.classList.contains('c2'):
            car.classList.remove('c2');
            car.classList.add('c1')
            break;
        case car.classList.contains('c3'):
            car.classList.remove('c3');
            car.classList.add('c2')
            break;
    }
}


function isGameLost() {
    if (squares[currentIndex].classList.contains('c1')
        || squares[currentIndex].classList.contains('l4')
        || squares[currentIndex].classList.contains('l5')
    ) {
        resultDisplay.textContent = "You lose !";
        clearInterval(timerId);
        clearInterval(gameTimer);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

function isGameWon() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = "You Win !";
        clearInterval(timerId);
        clearInterval(gameTimer);
        document.removeEventListener('keyup', moveFrog);
    }
}

function timer() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
}

playButton.addEventListener('click', handlePlayButtonClicked)

setInterval(isGameLost, 60)
setInterval(isGameWon, 60)

function handlePlayButtonClicked() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        clearInterval(gameTimer);
        gameTimer = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        timerId = setInterval(autoMoveElements, 600);
        document.addEventListener('keyup', moveFrog);
        gameTimer = setInterval(timer, 1000)

    }
}
