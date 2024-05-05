const grid = document.getElementById("grid");
const resultDisplay = document.getElementById("score");
let chosenCards = [];
let score = 0;

let htmlCardStringTemplate =
    "<div class=\"flip-card\">\n" +
    "    <div class=\"flip-card-inner\">\n" +
    "        <div class=\"flip-card-front\">\n" +
    "            <img src=\"./images/back.jpg\" alt=\"card\">\n" +
    "        </div>\n" +
    "        <div class=\"flip-card-back\">\n" +
    "            <img src=\"./images/{name}.jpg\" alt=\"card\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n";

const cardArray = [
    {
        id: "0",
        name: "1",
        img: "./images/1.jpg"
    },
    {
        id: "1",
        name: "2",
        img: "./images/2.jpg"
    },
    {
        id: "2",
        name: "3",
        img: "./images/3.jpg"
    },
    {
        id: "3",
        name: "4",
        img: "./images/4.jpg"
    },
    {
        id: "4",
        name: "5",
        img: "./images/5.jpg"
    },
    {
        id: "5",
        name: "6",
        img: "./images/6.jpg"
    },
    {
        id: "6",
        name: "7",
        img: "./images/7.jpg"
    },
    {
        id: "7",
        name: "1",
        img: "./images/1.jpg"
    },
    {
        id: "8",
        name: "2",
        img: "./images/2.jpg"
    },
    {
        id: "9",
        name: "3",
        img: "./images/3.jpg"
    },
    {
        id: "10",
        name: "4",
        img: "./images/4.jpg"
    },
    {
        id: "11",
        name: "5",
        img: "./images/5.jpg"
    },
    {
        id: "12",
        name: "6",
        img: "./images/6.jpg"
    },
    {
        id: "13",
        name: "7",
        img: "./images/7.jpg"
    },
    {
        id: "14",
        name: "8",
        img: "./images/8.jpg"
    },
    {
        id: "15",
        name: "8",
        img: "./images/8.jpg"
    },
];

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.childNodes;
}

function createBoard() {

    cardArray.toSorted(() => 0.5 - Math.random()).forEach(card => {
        let copiedHtmlCardStringTemplate = htmlCardStringTemplate;
        let cardElement = document.createElement('div');
        cardElement.innerHTML = copiedHtmlCardStringTemplate.replace("{name}", card.name);
        cardElement.dataset.id = card.id;
        cardElement.dataset.name = card.name;
        grid.append(cardElement);

        cardElement.addEventListener('click', handleClick)
    });
}

function checkMatch() {
    return chosenCards[0] === chosenCards[1];

}

function handleClick() {
    if (this.dataset.unclickable === "1" || chosenCards.length === 2) return;

    this.dataset.unclickable = "1";

    //flip card
    flipCard(this);

    chosenCards.push({id: this.dataset.id, name: this.dataset.name});

    if (chosenCards.length === 2) {
        setTimeout(() => {
            if (chosenCards[0].name === chosenCards[1].name) {
                // alert("It's a match !");
                score += 1;
                resultDisplay.innerText = score;
                chosenCards = [];
            } else {
                setTimeout(() => {
                    resetFlippedCards();
                }, 500);
            }
        }, 500)
    }

    const cards = document.querySelectorAll(`#grid img[data-unclickable="1"]`)

    if (cards.length === cardArray.length) {
        setTimeout(() => {
            // alert("Congrats you won !")
        }, 600)
    }

}

function flipCard(card) {
    // this.src = cardArray[this.dataset.id].img;
    card.querySelector('.flip-card').classList.add('flipped');


}

function resetFlippedCards() {
    chosenCards.forEach(card => {
        let cardDom = document.querySelector(`[data-id='${card.id}']`);
        cardDom.querySelector('.flip-card').classList.remove('flipped');
        // cardDom.src = "./images/back.jpg";
        cardDom.dataset.unclickable = "0";
    });
    chosenCards = [];
}


createBoard();
