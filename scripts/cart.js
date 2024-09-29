document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.getElementById('cart_button');
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay'); // Overlay для затемнения
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const closeCartButton = document.getElementById('closeCart');
    const cartButtonNum = document.getElementById('cart_button_num');

    // Обновление количества товаров в корзине на кнопке
    function updateCartButtonNum() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartButtonNum.innerText = totalItems;

        // Проверка, есть ли товары в корзине
        if (totalItems > 0) {
            cartButton.style.display = 'inline-block';
            // cartButton.classList.remove('hidden'); // Показываем кнопку
        } else {
            cartButton.style.display = 'none';
            // cartButton.classList.add('hidden'); // Скрываем кнопку
        }
    }

    // Открытие корзины и overlay
    function openCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let totalSum = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <img src="${item.image}" alt="Продукт">
                <div class="item-details">
                <span class="item-name">${item.name}</span>
                <div class="quantity-controls">
                    <button onclick="Cart.updateQuantity(${index}, -1)">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button onclick="Cart.updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="item-price">
                <span>${item.price * item.quantity} руб.</span>
            </div>
            <button class="remove-item" onclick="Cart.removeFromCart(${index})">✕</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalSum += item.price * item.quantity;
        });

        cartTotal.innerText = totalSum;
        cartModal.style.display = 'block';
        cartOverlay.style.display = 'block'; // Показываем затемнение
    }

    // Закрытие корзины и overlay
    function closeCart() {
        cartModal.style.display = 'none';
        cartOverlay.style.display = 'none'; // Скрываем затемнение
    }

    // Закрытие корзины при клике на overlay
    cartOverlay.addEventListener('click', closeCart);

    // Добавление товара в корзину
    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartButtonNum(); // Обновляем количество товаров на кнопке
    }

    // Увеличение или уменьшение количества товара в корзине
    function updateQuantity(index, change) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
        } else {
            cart.splice(index, 1); // Удаляем товар, если количество меньше 1
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        openCart(); // Обновляем корзину после изменения
        updateCartButtonNum(); // Обновляем количество товаров на кнопке
    }

    // Удаление товара из корзины
    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1); // Удаляем товар по индексу

        localStorage.setItem('cart', JSON.stringify(cart));
        openCart(); // Обновляем корзину после удаления
        updateCartButtonNum(); // Обновляем количество товаров на кнопке
    }

    // Экспортируем функции корзины в глобальную область видимости
    window.Cart = {
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        updateCartButtonNum
    };

    // Обработчики для кнопок открытия и закрытия корзины
    cartButton.addEventListener('click', openCart);
    closeCartButton.addEventListener('click', closeCart);

    // Инициализация количества товаров на кнопке при загрузке
    updateCartButtonNum();
});
