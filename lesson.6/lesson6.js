"use strict";

const catalog = {
    catalogBlock: null,
    cart: {},
    list: [
        {
            id_product: 1,
            product_name: 'Ноутбук',
            price: 45600,
        },
        {
            id_product: 2,
            product_name: 'Мышка',
            price: 1000,
        },
        {
            id_product: 3,
            product_name: 'Клавиатура',
            price: 1500,
        }
    ],

    init(catalogBlockClass, cart) {
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.cart = cart;
        this.render();
        this.addEventHandlers();
    },

    render() {
        this.catalogBlock.innerHTML = '';
        this.list.forEach(item => {
            this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },
    renderCatalogItem(item) {
        return `<div class="product">
                    <h3>${item.product_name}</h3>
                    <p>${item.price}</p>
                    <button class="product__add-to-cart" data-id_product="${item.id_product}">В корзину</button>
                </div>`;
    },

    addEventHandlers() {
        this.catalogBlock.addEventListener('click', event => this.addToBasket(event))
    },

    addToBasket(event) {
        if (event.srcElement.className !== 'product__add-to-cart') return
        const id_product = +event.target.dataset.id_product
        const productToAdd = this.list.find(product => product.id_product === id_product)
        this.cart.addToBasket(productToAdd)
    }
}

const cart = {
    cartBlock: null,
    clearCartBlock: null,
    goods: [],

    init(cartBlockClass, clearCartBlockClass) {
        this.cartBlock = document.querySelector(`.${cartBlockClass}`)
        this.clearCartBlock = document.querySelector(`.${clearCartBlockClass}`)

        this.render()
        this.addEventHandlers()
    },

    addEventHandlers() {
        this.clearCartBlock.addEventListener('click', () => this.clearCart())
    },

    clearCart() {
        this.goods = []
        this.render()
    },

    render() {
        if (this.goods.length > 0) {
            this.renderCartList()
        } else this.cartBlock.innerHTML = 'Корзина пуста.'
    },

    renderCartList() {
        this.cartBlock.innerHTML = ''
        this.goods.forEach(good => {
            this.cartBlock.insertAdjacentHTML('beforeend', this.renderCartItem(good))
        });
    },

    renderCartItem(good) {
        return `<div>
                    <h3>${good.product_name}</h3>
                    <p>${good.price}</p>
                    <p>${good.quantity}</p>
                </div>`
    },

    addToBasket(product) {
        const findInBasket = this.goods.find(item => product.id_product === item.id_product)
        if (findInBasket) {
            findInBasket.quantity++
        } else {
            this.goods.push({ ...product, quantity: 1 })
        }
        this.render()
    }
}



catalog.init('catalog', cart)
cart.init('cart', 'clr-cart')