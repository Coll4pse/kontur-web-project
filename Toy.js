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

    static #cardShirt = "/static/images/Cards/shirt.png"
}