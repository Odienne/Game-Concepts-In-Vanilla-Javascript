const grid = document.getElementById('grid');
const boardWidth = 600;
const boardHeight = 300;
const blockWidth = 100;
const blockHeight = 20;

const playerStart = [230, 6];
const playerWidth = 80;
let currentPlayerPosition = playerStart;

const ballStart = [270, 40];
const ballWidth = 10;
let currentBallPosition = ballStart;

let xDirection = -2;
let yDirection = 2;

let timerId;

let breakSound = new Audio('sounds/break.wav');
breakSound.playbackRate=1.3;
let bounceSound = new Audio('sounds/bounce.wav');
bounceSound.playbackRate=1.3;


//block class
class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + blockWidth, y]
        this.topRight = [x + blockWidth, y + blockHeight]
        this.topLeft = [x, y + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

function createBlock(x, y) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = `${x}px`;
    block.style.bottom = `${y}px`;
    grid.appendChild(block)
}

for (let i = 0; i < blocks.length; i++) {
    createBlock(blocks[i].bottomLeft[0], blocks[i].bottomLeft[1]);
}

//add player
const player = document.createElement('div');
player.classList.add('player');
grid.appendChild(player);
drawPlayer();

function drawPlayer() {
    player.style.left = currentPlayerPosition[0] + 'px';
    player.style.bottom = currentPlayerPosition[1] + 'px';
}


//move player
function movePlayer(e) {
    switch (e.key) {
        case e.key = 'ArrowLeft' :
            if (currentPlayerPosition[0] > 0) {
                currentPlayerPosition[0] -= 10;
                drawPlayer();
            }
            break;
        case e.key = 'ArrowRight' :
            if (currentPlayerPosition[0] < boardWidth - playerWidth) {
                currentPlayerPosition[0] += 10;
                drawPlayer();
            }
            break;
    }
}

document.addEventListener('keydown', movePlayer);


//ball related
function drawBall() {
    ball.style.left = currentBallPosition[0] + 'px';
    ball.style.bottom = currentBallPosition[1] + 'px';
}

//move ball
function moveBall() {
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

timerId = setInterval(moveBall, 20);

//check for ball collision
function checkForCollisions() {
    //check block collisions
    const allBlocks = Array.from(document.querySelectorAll('.block'));
    for (let i = 0; i < blocks.length; i++) {
        if (
            (currentBallPosition[0] > blocks[i].bottomLeft[0] && currentBallPosition[0] < blocks[i].bottomRight[0])
            && ((currentBallPosition[1] + ballWidth) > blocks[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1])
        ) {
            console.log(allBlocks);
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeBallDirection();
            breakSound.currentTime = 0;
            breakSound.play();

            if (blocks.length === 0) {
                alert('You Win !')
                clearInterval(timerId)
                document.removeEventListener('keydown', movePlayer)
            }
        }
    }


    //check for wall collisions
    if (currentBallPosition[0] >= (boardWidth - ballWidth) ||
        (currentBallPosition[1] >= boardHeight - ballWidth) ||
        currentBallPosition[0] <= 0
    ) {
        changeBallDirection();
        bounceSound.currentTime = 0;
        bounceSound.play();
    }

    //check user collisions
    if
    (
        (currentBallPosition[0] > currentPlayerPosition[0] && currentBallPosition[0] < currentPlayerPosition[0] + blockWidth) &&
        (currentBallPosition[1] > currentPlayerPosition[1] && currentBallPosition[1] < currentPlayerPosition[1] + blockHeight)
    ) {
        changeBallDirection()
        bounceSound.currentTime = 0;
        bounceSound.play();
    }

    //check game over
    if (currentBallPosition[1] <= 0) {
        clearInterval(timerId);
        document.removeEventListener('keydown', movePlayer)
        alert('You lost !')
    }
}

function changeBallDirection() {
    if ((xDirection === 2 && yDirection === 2)) {
        yDirection = -2;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
    }
}
