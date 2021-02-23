'use strict';

const productImageSectionTag = document.getElementById('allProducts');
const leftProductImage = document.getElementById('left-product-img');
const centerProductImage = document.getElementById('center-product-img');
const rightProductImage = document.getElementById('right-product-img');
const leftProductHeaderTag = document.getElementById('left-product-h2');
const centerProductHeaderTag = document.getElementById('center-product-h2');
const rightProductHeaderTag = document.getElementById('right-product-h2');

const maxClicks = 25;
let totalClicks = 0;

let leftProductOnThePage = null;
let centerProductOnThePage = null;
let rightProductOnThePage = null;

function Product (title, url) {
    this.title = title;
    this.clicks = 0;
    this.timesShown = 0;
    this.url = url;

    Product.all.push(this);
};

Product.all = [];

new Product('Bag', './images/bag.jpg');
new Product('Banana', './images/banana.jpg');
new Product('Bathroom', './images/bathroom.jpg');
new Product('Boots', './images/boots.jpg');
new Product('Breakfast', './images/breakfast.jpg');
new Product('Bubblegum', './images/bubblegum.jpg');
new Product('Chair', './images/chair.jpg');
new Product('Cthulhu', './images/cthulhu.jpg');
new Product('Dog-duck', './images/dog-duck.jpg');
new Product('Dragon', './images/dragon.jpg');
new Product('Pen', './images/pen.jpg');
new Product('Pet-sweep', './images/pet-sweep.jpg');
new Product('Scissors', './images/scissors.jpg');
new Product('Shark', './images/shark.jpg');
new Product('Sweep', './images/sweep.png');
new Product('Tauntaun', './images/tauntaun.jpg');
new Product('Unicorn', './images/unicorn.jpg');
new Product('USB', './images/usb.gif');
new Product('Water-can', './images/water-can.jpg');
new Product('Wine-glass', './images/wine-glass.jpg');

function shuffle(array) {
    for (let i = array.length -1; i >= 0; i--) {
        const j = Math.floor(Math.random() + 1)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function pickNewProduct() {
    shuffle(Product.all);
    console.log(Product.all);
    leftProductOnThePage = Product.all[0];
    centerProductOnThePage = Product.all[1];
    rightProductOnThePage = Product.all[2];

    leftProductOnThePage.displayctr += 1
    centerProductOnThePage.displayctr += 1
    rightProductOnThePage.displayctr += 1

    renderNewProduct();
}

function renderNewProduct() {
   
    leftProductImage.src = leftProductOnThePage.url;
    leftProductImage.alt = leftProductOnThePage.title;
    leftProductHeaderTag.textContent = leftProductOnThePage.title;
    centerProductImage.src = centerProductOnThePage.url;
    centerProductImage.alt = centerProductOnThePage.title;
    centerProductHeaderTag.textContent = centerProductOnThePage.title;
    rightProductImage.src = rightProductOnThePage.url;
    rightProductImage.alt = rightProductOnThePage.title;
    rightProductHeaderTag.textContent = rightProductOnThePage.title;
}

function handleClickProduct(event) {
    if (totalClicks <= maxClicks) {
        const productClicked = event.target;
        const id = productClicked.id;

        if (id === 'left-product-img') {
            leftProductOnThePage.clicks += 1;
        } else if (id === 'center-product-img') {
            centerProductOnThePage.clicks += 1;
        } else if (id === 'right-product-img') {
            rightProductOnThePage.clicks += 1;
        } 

        leftProductOnThePage.timesShown += 1;
        centerProductOnThePage.timesShown += 1;
        rightProductOnThePage.timesShown += 1;

        pickNewProduct();
    }
}

totalClicks += 1;

if (totalClicks === maxClicks) {
    productImageSectionTag.removeEventListener('click', handleClickProduct);

    alert('That will do');

    renderLikes();
}

function renderLikes() {
    const likesListElem = document.getElementById('product-clicks');
    likesListElem.innerHTML = '';
    for (let i = 0; i < Product.all.length; i++) {
        const productPicture = Product.all[i];
        const productItemElem = document.createElement('li');
        likesListElem.appendChild(productItemElem);
        productItemElem.textContent = productPicture.title + ' : ' + productPicture.clicks;
    }
}

productImageSectionTag.addEventListener('click', handleClickProduct);

pickNewProduct();

renderLikes();