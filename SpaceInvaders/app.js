const grid = document.getElementById('grid');
let currentPlayerPosition = 200;
const lineWidth = 15;
let direction = 1;
let invaderInterval;

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll("#grid div"));

let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function drawInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders.length > 0) squares[alienInvaders[i]].classList.add("invader");
    }
}

function removeInvaders() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders.length > 0) squares[alienInvaders[i]].classList.remove("invader");
    }
}

drawInvaders();

squares[currentPlayerPosition].classList.add('ship');

function movePlayer(e) {
    squares[currentPlayerPosition].classList.remove('ship');

    switch (e.key) {
        case e.key = 'ArrowLeft' :
            if (currentPlayerPosition % lineWidth === 0) break;
            currentPlayerPosition--;
            break;
        case e.key = 'ArrowRight' :
            if ((currentPlayerPosition % lineWidth) + 1 >= lineWidth) break;
            currentPlayerPosition++;
            break;
    }

    squares[currentPlayerPosition].classList.add('ship');
}

document.addEventListener('keydown', movePlayer);


function moveInvaders() {
    const leftEdge = alienInvaders[0] % lineWidth === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % lineWidth === lineWidth - 1;
    removeInvaders();

    if (rightEdge) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += lineWidth - 1;
        }
        direction = -1;
    }

    if (leftEdge) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += lineWidth;
        }
        direction = 1;
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    drawInvaders();

    //check player collision with invader
    if (squares[currentPlayerPosition].classList.contains('invader')) {
        alert("GAME OVER !");
        clearInterval(invaderInterval);
        removeListeners();
    }
    //check if the invaders touch the bottom line
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length - lineWidth)) {
            alert("GAME OVER !");
            clearInterval(invaderInterval);
            removeListeners();
            break;
        }
    }

    if (alienInvaders.length === 0) {
        alert('YOU WIN!')
        clearInterval(invaderInterval);
        removeListeners();
    }
}


invaderInterval = setInterval(moveInvaders, 600);

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentPlayerPosition;

    function moveLaser() {
        if (squares[currentLaserIndex].classList.contains('laser')) squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= lineWidth;

        //check if laser goes beyond the grid before moving it
        if (currentLaserIndex < 0) {
            clearInterval(laserId);
            return;
        }

        squares[currentLaserIndex].classList.add('laser')

        //check laser collisions with an invader
        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => {
                squares[currentLaserIndex].classList.remove('boom');
            }, 100)
            clearInterval(laserId);

            //remove invader from its initial array
            const alienToRemoveIndex = alienInvaders.indexOf(currentLaserIndex);
            alienInvaders.splice(alienToRemoveIndex, 1);
        }
    }

    switch (e.code) {
        case 'Space':
            laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keyup', shoot);


function removeListeners() {
    document.removeEventListener('keyup', shoot);
    document.removeEventListener('keydown', movePlayer);
}


let myAudio = new Audio('video/soundtrack.mp3');
if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

window.onfocus = () => {
    myAudio.play();
}
window.onblur = () => {
    myAudio.pause();
}
window.onkeydown = () => {
    myAudio.play();
}

