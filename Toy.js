export default class Toy {
    constructor(name, img){
        this.name = name;
        this.img = img;
    }

    createCard() {
        let div = document.createElement('div');
        div.classList.add(this.name);
        div.classList.add('closed');
        div.innerHTML = `<img class="back" src="${Toy.#cardShirt}">\n<img class="front" src="${this.img}">`;
        return div;
    }

    static #cardShirt = "https://pixabay.com/get/55e1d5434d53b108f5d08460da29317e1339d8e4505175_1280.png"
}