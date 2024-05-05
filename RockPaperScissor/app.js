const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');

const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;


function createRock() {
    const rock = document.createElement('img');
    rock.src = './images/rock.png';
    return rock;
}

function createPaper() {
    const paper = document.createElement('img');
    paper.src = './images/paper.png';
    return paper;
}

function createScissors() {
    const scissors = document.createElement('img');
    scissors.src = './images/scissors.png';
    return scissors;
}



const choiceMapping = {
    "rock": createRock,
    "paper": createPaper,
    "scissors": createScissors,
};


possibleChoices.forEach(possibleChoice => {
    possibleChoice.addEventListener('click', handleClick);
})

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;

    if (randomNumber === 1) computerChoice = 'rock';
    else if (randomNumber === 2) computerChoice = 'paper';
    else computerChoice = 'scissors';

    computerChoiceDisplay.innerHTML = '';
    computerChoiceDisplay.append(choiceMapping[computerChoice]());
}

function getResult() {
    let result;
    if ((computerChoice === 'rock' && userChoice === 'scissors') || (computerChoice === 'paper' && userChoice === 'rock') || (computerChoice === 'scissors' && userChoice === 'paper')) {
        result = "You lose !"
    } else if ((computerChoice === 'rock' && userChoice === 'paper') || (computerChoice === 'paper' && userChoice === 'scissors') || (computerChoice === 'scissors' && userChoice === 'rock')) {
        result = "You win !"
    } else {
        result = "It's a draw !"
    }
    return result;
}

function handleClick(e) {
    userChoice = e.target.parentElement.id;
    userChoiceDisplay.innerHTML = '';
    userChoiceDisplay.append(choiceMapping[userChoice]());

    generateComputerChoice();

    resultDisplay.innerHTML = getResult();
}
