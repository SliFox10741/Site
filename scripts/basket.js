document.addEventListener('DOMContentLoaded', () => {
    class Product {
        constructor(card) {
            this.id = card.dataset.productId; // Предполагается, что у карточки есть data-атрибут с идентификатором
            this.imageSrc = card.querySelector(".card__image img").src;
            this.name = card.querySelector(".card__title").innerText;
            this.price = card.querySelector(".card__price--common").innerText;
            this.priceDiscount = card.querySelector(".card__price--discount").innerText;
            this.description = card.querySelector(".card__description").innerText; // Предполагается, что описание есть в карточке
            this.photo_url = card.querySelector(".card__image img").src.split('/').pop(); // Получаем имя файла фото
        }
    }

    function toNum(str) {
        return Number(str.replace(/ /g, ""));
    }

    function toCurrency(num) {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
        }).format(num);
    }

    const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
    const cartNum = document.querySelector("#cart_num");
    const cart = document.querySelector("#cart");

    const basket = document.querySelector(".basket");
    const basketClose = document.querySelector("#basket_close");
    const body = document.body;
    const basketProductList = document.querySelector("#basket_product_list");
    const basketCost = document.querySelector("#basket_cost");
    const basketDiscount = document.querySelector("#basket_discount");
    const basketCostDiscount = document.querySelector("#basket_cost_discount");

    const productPopup = document.querySelector("#product-popup");
    const popupClose = document.querySelector(".popup-close");
    const popupProductName = document.querySelector("#popup-product-name");
    const popupProductDescription = document.querySelector("#popup-product-description");
    const popupProductPrice = document.querySelector("#popup-product-price");
    const popupProductImage = document.querySelector("#popup-product-image");
    const saveProductBtn = document.querySelector("#save-product-btn");

    class Cart {
        constructor() {
            this.products = this.loadCart() || [];
        }

        get count() {
            return this.products.length;
        }

        get cost() {
            return this.products.reduce((acc, product) => acc + toNum(product.price), 0);
        }

        get costDiscount() {
            return this.products.reduce((acc, product) => acc + toNum(product.priceDiscount), 0);
        }

        get discount() {
            return this.cost - this.costDiscount;
        }

        addProduct(product) {
            // Проверяем, есть ли товар уже в корзине
            const existingProductIndex = this.products.findIndex(p => p.id === product.id);
            if (existingProductIndex === -1) {
                this.products.push(product);
                this.saveCart();
            }
        }

        removeProduct(index) {
            this.products.splice(index, 1);
            this.saveCart();
        }

        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.products));
        }

        loadCart() {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        }

        updateDisplay() {
            basketProductList.innerHTML = ''; // Очистить текущие товары в корзине

            this.products.forEach((product, index) => {
                const productItem = document.createElement("div");
                productItem.classList.add("basket__product");

                const productWrap1 = document.createElement("div");
                productWrap1.classList.add("basket__product-wrap");
                const productWrap2 = document.createElement("div");
                productWrap2.classList.add("basket__product-wrap");

                const productImage = document.createElement("img");
                productImage.classList.add("basket__product-image");
                productImage.setAttribute("src", product.imageSrc);

                const productTitle = document.createElement("h2");
                productTitle.classList.add("basket__product-title");
                productTitle.innerText = product.name;

                const productPrice = document.createElement("div");
                productPrice.classList.add("basket__product-price");
                productPrice.innerText = toCurrency(toNum(product.priceDiscount));

                const productDelete = document.createElement("button");
                productDelete.classList.add("basket__product-delete");
                productDelete.innerHTML = "✖";

                productDelete.addEventListener("click", () => {
                    this.removeProduct(index);
                    this.updateDisplay();
                });

                productWrap1.appendChild(productImage);
                productWrap1.appendChild(productTitle);
                productWrap2.appendChild(productPrice);
                productWrap2.appendChild(productDelete);
                productItem.appendChild(productWrap1);
                productItem.appendChild(productWrap2);

                basketProductList.appendChild(productItem);
            });

            basketCost.value = toCurrency(this.cost);
            basketDiscount.value = toCurrency(this.discount);
            basketCostDiscount.value = toCurrency(this.costDiscount);
        }
    }

    const myCart = new Cart();

    cart.addEventListener("click", (e) => {
        e.preventDefault();
        basket.classList.add("basket--open");
        body.classList.add("lock");
        myCart.updateDisplay(); // Обновляем корзину при открытии
    });

    basketClose.addEventListener("click", (e) => {
        e.preventDefault();
        basket.classList.remove("basket--open");
        body.classList.remove("lock");
    });

    popupClose.addEventListener("click", () => {
        productPopup.classList.remove("popup--open");
    });

    cardAddArr.forEach((cardAdd) => {
        cardAdd.addEventListener("click", (e) => {
            e.preventDefault();
            const card = e.target.closest(".card");
            const product = new Product(card);

            // Заполняем popup данными товара
            popupProductName.textContent = product.name;
            popupProductDescription.textContent = product.description;
            popupProductPrice.textContent = `Цена: ${product.price}`;
            popupProductImage.src = product.imageSrc;

            // Сохраняем товар в data-атрибут кнопки
            saveProductBtn.dataset.productId = product.id;

            // Открываем popup
            productPopup.classList.add("popup--open");
        });
    });

    saveProductBtn.addEventListener("click", () => {
        const productId = saveProductBtn.dataset.productId;
        const card = document.querySelector(`.card[data-product-id="${productId}"]`);
        if (card) {
            const product = new Product(card);
            myCart.addProduct(product);
            cartNum.textContent = myCart.count;
            myCart.updateDisplay();
            productPopup.classList.remove("popup--open");
        }
    });
});
