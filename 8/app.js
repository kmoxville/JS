'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});


// begin lesson 8
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const totalEl = document.querySelector('.basketTotalValue');
const cartPositionsCounterEl = document.querySelector('.cartPositionsCounter');
document.querySelector('.cartIconWrap')
    .addEventListener('click', () => basketEl.classList.toggle('hidden'));

let itemId = 0;
document.querySelectorAll('.featuredItem')
    .forEach((element) => {
        element.dataset.id = itemId++
        element.addEventListener('click', (event) => {
            if (event.target.tagName !== 'BUTTON')
                return;

            addToBasket(event.currentTarget.dataset.id,
                event.currentTarget.querySelector('.featuredName').innerText,
                event.currentTarget.querySelector('.featuredPrice').innerText);
        });
    });

let cartItems = [];
function addToBasket(id, name, price) {
    const cartItem = cartItems.find((element) => element.id === id);
    if (cartItem === undefined) {
        cartItems.push(new CartItem(id, name, price));
        cartPositionsCounterEl.innerText = cartItems.length;
    } else {
        cartItem.setCount(cartItem.getCount() + 1);
    }

    updateBasket();
}

function updateBasket() {
    basketEl.querySelectorAll('.cartItem')
        .forEach((element) => element.remove());

    let totals = 0;
    cartItems.forEach((element) => {
        basketTotalEl.insertAdjacentHTML('beforebegin', element.toHTML());
        totals += element.getSum();
    });

    totalEl.innerText = totals;
}

class CartItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = Number.parseInt(price.substring(1));
        this.count = 1;
    }

    getCount() {
        return this.count;
    }

    setCount(newCount) {
        this.count = newCount;
    }

    getPrice() {
        return this.price;
    }

    getSum() {
        return this.price * this.count;
    }

    toHTML() {
        return `<div class="basketRow cartItem" data-id=${this.id}>
                <div>${this.name}</div>
                <div>${this.count} pcs.</div>
                <div>$${this.price}</div>
                <div>$${this.price * this.count}</div>
            </div>`;
    }
}