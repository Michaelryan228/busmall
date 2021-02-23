'use strict';

const productImageSectionTag = document.getElementById('allProducts');
const leftProductImage = document.getElementById('left-product-img');
const centerProductImage = document.getElementById('center-product-img');
const rightProductImage = document.getElementById('right-product-img');
const leftProductHeaderTag = document.getElementById('left-product-h2');
const centerProductHeaderTag = document.getElementById('center-product-h2');
const rightProductHeaderTag = document.getElementById('right-product-h2');
const productNames = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon', 'Pen', 'Pet-sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water-can', 'Wine-glass'];

const maxClicks = 25;
let totalClicks = 0;

const maxRounds = 5;
let roundCtr = 1;

let leftProductOnThePage = null;
let centerProductOnThePage = null;
let rightProductOnThePage = null;

function Product (title, url) {
    this.title = title;
    this.clicks = 0;
    this.timesShown = 0;
    this.url = url;
    this.tally = 0;
    this.views = 0;

    Product.all.push(this);
};

Product.all = [];

function shuffle(array) {
    for (let i = array.length -1; i >= 0; i--) {
        const j = Math.floor(Math.random() + 1)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function createProducts() {
    for (let index = 0; index < productNames.length; index++) {
        const productName = productNames [index];
        new Product(productName, './images/' + productName + '.jpg');
    }
}

function pickNewProduct() {
    shuffle(Product.all);
    const safeProducts = [];
    for (let index = 0; index < Product.all.length; index++) {
        const product = Product.all[index];
        if (product !== leftProductOnThePage && product !== rightProductOnThePage && product !== centerProductOnThePage) {
            safeProducts.push(product);
            if (safeProducts.length === 3) {
                break;
            }
        }
    }

    leftProductOnThePage = safeProducts[0];
    centerProductOnThePage = safeProducts[1];
    rightProductOnThePage = safeProducts[2];

    leftProductOnThePage.timesShown += 1
    centerProductOnThePage.timesShown += 1
    rightProductOnThePage.timesShown += 1

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
    totalClicks += 1;

    if (totalClicks === maxClicks) {
        productImageSectionTag.removeEventListener('click', handleClickProduct);
    
        alert('That will do');
    
        renderLikes();
    }
    
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

function productClickHandler(event) {
    const productId = event.target.id;

    switch (productId) {
        case leftProductImage.id:
            leftProductOnThePage.tally += 1;
            pickNewProduct();
            renderNewProduct();
            roundCtr += 1;
            break;

        case centerProductImage.id:
            centerProductOnThePage.tally += 1;
            pickNewProduct();
            renderNewProduct();
            roundCtr += 1;

        case rightProductImage.id:
            rightProductOnThePage.tally += 1;
            pickNewProduct();
            renderNewProduct();
            roundCtr += 1;

        default:
            alert('Mind the gap!');
    }

    if (roundCtr === maxRounds) {
        productImageSectionTag.removeEventListener('click', productClickHandler);
    }
}

function renderChart() {

    const ctx = document.getElementById('canvas').getContext('2d');
    const chart = new chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 2, 20, 30, 45, 0, 10, 5, 2, 20, 30]
            }]
        }
        // options:{}
    })
}

createProducts();

pickNewProduct();