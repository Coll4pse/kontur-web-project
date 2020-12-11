import Toy from './Toy.js';   

// All images get from pixabay.com under Pixabay license.

let lastCard = null;
let isIteractable = true;
const mapSize = 20;
const toysArray = [
    new Toy('toy1', '/static/images/Cards/Toy1.png'),
    new Toy('toy2', '/static/images/Cards/Toy2.png'),
    new Toy('toy3', '/static/images/Cards/Toy3.png'),
    new Toy('toy4', '/static/images/Cards/Toy4.png'),
    new Toy('toy5', '/static/images/Cards/Toy5.png'),
    new Toy('toy6', '/static/images/Cards/Toy6.png'),
    new Toy('toy7', '/static/images/Cards/Toy7.png'),
    new Toy('toy8', '/static/images/Cards/Toy8.png'),
    new Toy('toy9', '/static/images/Cards/Toy9.png'),
    new Toy('toy10', '/static/images/Cards/Toy10.png')]

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateMap() {
    const generatedToys = []
    let tempToys = toysArray.slice();

    for (let i = 0; i < mapSize / 2; i++) {
        if (tempToys.length > 0) {
            let indexOfToy = getRandomInt(tempToys.length);
            let generatedToy = tempToys[indexOfToy];
            generatedToys.push(generatedToy);
            createCell(generatedToy);;
            tempToys.splice(indexOfToy, 1);
        } else {
            tempToys = toysArray.slice();
        }
    }

    for (let i = 0; i < mapSize / 2; i++) {
        let indexOfToy = getRandomInt(generatedToys.length);
        createCell(generatedToys[indexOfToy]);
        generatedToys.splice(indexOfToy, 1);
    }
}

function openCard(cellClasses) {
    cellClasses.value = cellClasses.value.substring(0, cellClasses.value.indexOf('closed'));
    cellClasses.add(`opened`)
}

function closeCard(cellClasses) {
    cellClasses.value = cellClasses.value.substring(0, cellClasses.value.indexOf('opened'));
    cellClasses.add(`closed`)
}

function interactCell(cellContainer) {
    let cellClasses = cellContainer.currentTarget.classList;
    if (cellClasses.value.includes('opened'))
        return;
    if (isIteractable) {
        if (lastCard === null) {
            openCard(cellClasses);
            lastCard = cellClasses;
        } else {
            openCard(cellClasses);
            if (cellClasses[0] !== lastCard[0]) {
                isIteractable = false;
                setTimeout(() => {
                    closeCard(cellClasses)
                    closeCard(lastCard)
                    lastCard = null
                    isIteractable = true;
                }, 700)
            } else {
                lastCard = null
            }
        }
    }
}

function createCell(toy) {
    var root = document.getElementsByClassName('container')[0];
    let div = toy.createCard();
    div.onclick = interactCell;
    root.appendChild(div)
}


generateMap();

let cycleId;

function checkGameStatus() {
    let opened = document.querySelectorAll('.opened');
    if (opened.length === 20) {
        clearInterval(cycleId);
        alert('Вы победили!');
    }
}

cycleId = setInterval(checkGameStatus, 1000);