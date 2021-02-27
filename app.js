'use strict';

const productImageSectionTag = document.getElementById('allProducts');
const leftProductImage = document.getElementById('left-product-img');
const centerProductImage = document.getElementById('center-product-img');
const rightProductImage = document.getElementById('right-product-img');
const leftProductHeaderTag = document.getElementById('left-product-h2');
const centerProductHeaderTag = document.getElementById('center-product-h2');
const rightProductHeaderTag = document.getElementById('right-product-h2');
const resultsButton = document.getElementById('button');
const productNames = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon', 'Pen', 'Pet-sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water-can', 'Wine-glass'];

const maxClicks = 25;
let totalClicks = 0;

const maxRounds = 25;
let roundCtr = 1;

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

function createProductsFromStorage(storageGet) {
    const javaScriptPics = JSON.parse(storageGet);

    for (let i = 0; i < javaScriptPics.length; i++) {
        const rawData = javaScriptPics[i];
        const newPictureInstance = new Product(rawData.title, rawData.url);
        newPictureInstance.clicks = rawData.clicks;
        newPictureInstance.timesShown = rawData.timesShown;
    }
}

function createPictureInstances() {
    const storageGet = JSON.parse(localStorage.getItem("imageStorage"));
    console.log("storageGet", storageGet)
    if (storageGet === null) {
        createProducts();
    } else {
        Product.all = storageGet;
        // createProducts(storageGet);
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
        const JSONImages = JSON.stringify(Product.all);
       localStorage.setItem('imageStorage', JSONImages);
       console.log(Product.all)
    }
    
}


function renderLikes() {
    const likesListElem = document.getElementById('timesShown');
    likesListElem.innerHTML = '';
    for (let i = 0; i < Product.all.length; i++) {
        const productPicture = Product.all[i];
        const productItemElem = document.createElement('li');
        likesListElem.appendChild(productItemElem);
        productItemElem.textContent = productPicture.title + ' : ' + productPicture.clicks;
    }
}

function resultsClickHandler(event) {
    renderLikes();
    renderChart();
}

productImageSectionTag.addEventListener('click', handleClickProduct);
resultsButton.addEventListener('click', resultsClickHandler);

function productClickHandler(event) {
    const productId = event.target.id;

    switch (productId) {
        case leftProductImage.id:
            leftProductOnThePage.clicks += 1;
            pickNewProduct();
            renderNewProduct();
            roundCtr += 1;
            break;

        case centerProductImage.id:
            centerProductOnThePage.clicks += 1;
            pickNewProduct();
            renderNewProduct();
            roundCtr += 1;

        case rightProductImage.id:
            rightProductOnThePage.clicks += 1;
            pickNewProduct();
            renderNewProduct();
            roundCtr += 1;

        default:
            alert('Mind the gap!');
    }

    if (roundCtr === maxRounds) {
        productImageSectionTag.removeEventListener('click', productClickHandler);
        displayResultsButton();
        const resultButton = document.getElementById('result-button');
        resultButton.addEventListener('click', renderResults);
        renderChart();
    }
}

function displayResultsButton() {
    const results = document.getElementById('results');
    const button = document.createElement('button');
    button.setAttribute('id', 'result-button');
    results.appendChild(button);
    button.textContent = 'View Results';
}

function renderResults() {
    const resultButton = document.getElementById('result-button');
    resultButton.remove();
    const results = document.getElementById('results');
    const resultHeader = document.createElement('h2');
    resultsHeader.textContent = 'Results';
    results.appendChild(resultHeader);
    const resultsListElem = document.createElement('ul');
    results.appendChild(resultsList);
    for (let i = 0; i < Product.all.length; i++) {
        const resultsListItem = document.createElement('li');
        resultsListItem.textContent = Product.all[i].name + 'had' + Product.all[i].clicks + ' votes, and was seen ' + Product.all[i].timesShown + ' times ';
        resultsListElem.appendChild(resultsListItem)
    }
}


function renderChart() {


    const votes = [];
    const chartCount = [];
    for (let i = 0; i < Product.all.length; i++) {
        const voteCount = Product.all[i].clicks;
        const timesVoted = Product.all[i].timesShown;
        votes.push(voteCount);
        chartCount.push(timesVoted);
    }

    const ctx = document.getElementById('canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: votes
            },
            {
                label: 'Times Shown',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: chartCount
            }]
        },
        options: {}
    });
}

createProducts();

pickNewProduct();

createPictureInstances();

renderNewProduct();
