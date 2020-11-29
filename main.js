import Toy from './Toy.js';   

// All images get from pixabay.com under Pixabay license.

let lastCard = null;
let isIteractable = true;
const mapSize = 20;
const toysArray = [
    new Toy('toy1', 'https://pixabay.com/get/54e9d1424d53ab14f6d1867dda3536781539d8e05a507948_1920.png'),
    new Toy('toy2', 'https://pixabay.com/get/54e9dc414f5baf14f6d1867dda3536781539d8e05a53764e_1920.png'),
    new Toy('toy3', 'https://pixabay.com/get/54e9d1424d50a414f6d1867dda3536781539d8e05a52724a_1920.png'),
    new Toy('toy4', 'https://pixabay.com/get/54e9dc414f5aa814f6d1867dda3536781539d8e05a557040_1920.png'),
    new Toy('toy5', 'https://pixabay.com/get/54e9d14b4e5aa514f6d1867dda3536781539d8e05a54714d_1920.png'),
    new Toy('toy6', 'https://pixabay.com/get/54e9d2434254ab14f6d1867dda3536781539d8e05a547548_1920.png'),
    new Toy('toy7', 'https://pixabay.com/get/54e9d3434856ad14f6d1867dda3536781539d8e35350714c_1920.png'),
    new Toy('toy8', 'https://pixabay.com/get/54e9d2434257a414f6d1867dda3536781539d8e05a57724f_1920.png'),
    new Toy('toy9', 'https://pixabay.com/get/54e9d14b4e5aa814f6d1867dda3536781539d8e05a57764d_1920.png'),
    new Toy('toy10', 'https://pixabay.com/get/54e9d3434850a514f6d1867dda3536781539d8e05a567148_1920.png')]

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