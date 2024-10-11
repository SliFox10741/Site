// Функция для загрузки товаров
function loadProducts(limit, offset, category = '') {
    let url = `http://172.30.48.1:3000/products?limit=${limit}&offset=${offset}`;
    if (category) {
        url += `&category=${category}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            products.forEach(product => {
                const productItem = `
                    <div class="product-item">
                        <div class="product-item-description"  data-product-id="${product.id}">
                            <img src="../images/${product.photo_url}" alt="${product.name}" width="200" />
                            <h2>${product.name}</h2>

                            <p>${product.description}</p>
                            <p>Цена: ${product.price} руб.</p>
                        </div>
                        <button class="btn-details">Подробнее</button>
                        <button class="btn-add" data-product-id="${product.id}">В корзину</button>
                    </div>
                `;
                productList.innerHTML += productItem;
            });

            // Добавляем обработчики событий на каждый товар
            document.querySelectorAll('.product-item-description').forEach(product => {
                product.addEventListener('click', function() {
                    const productId = this.dataset.productId;
                    loadProductDetails(productId); // Загружаем данные товара по id
                });
            });
            document.querySelectorAll('.btn-details').forEach(product => {
                product.addEventListener('click', function() {
                    const productId = this.dataset.productId;
                    loadProductDetails(productId); // Загружаем данные товара по id
                });
            });
            document.querySelectorAll('.btn-add').forEach(product => {
                product.addEventListener('click', function() {
                    //добавление товара в корзину
                });
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

// Функция для загрузки деталей товара и отображения popup
function loadProductDetails(productId) {
    if (!productId || isNaN(productId)) {
        console.error('Invalid product ID:', productId);
        return;
    }
    const url = `http://172.30.48.1:3000/products/${productId}`; 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            // Отрисовка popup с деталями продукта
            const oldPopup = document.getElementById('product-popup');
            if (oldPopup) oldPopup.remove();

            const popupContent = `
                <div id="product-popup" class="popup">
                    <div class="popup-content">
                        <span class="popup-close">&times;</span>
                        <div class="product-details">
                            <div class="space-for-popup-products"></div>
                        
                            <img src="../images/${product.photo_url}" alt="${product.name}" class="product-image" />
                            
                            <div class="product-info">
                                <h2>${product.name}</h2>
                                <p>Артикул: ${product.article}</p>
                                <p>Тэги: ${product.tegs}</p>
                                <p>Просто какое-то невероятно интересное описание, прочитав которое, пользователь безумно захочет выкупить весь склад :))) </p>
                                <p class="product-price">${product.price} руб.</p>
                                <button id="save-product-btn" class="add-to-cart-btn" data-product-id="${product.id}">
                                    В корзину
                                </button>
                                <p>Состав: ${product.material}</p>
                                <p>Вес: ${product.weight} г</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', popupContent);

            const popup = document.getElementById('product-popup');
            const closeBtn = popup.querySelector('.popup-close');
            const saveBtn = popup.querySelector('#save-product-btn');

            closeBtn.addEventListener('click', () => popup.remove());

            saveBtn.addEventListener('click', () => {
                const productId = saveBtn.dataset.productId;
                const productName = popup.querySelector('h2').textContent;
                
                // Найдите элемент с ценой по классу product-price
                const productPriceText = popup.querySelector('.product-price').textContent;
                
                // Извлечение цены с помощью регулярного выражения
                const productPrice = parseFloat(productPriceText.replace(/[^\d.-]+/g, '')); 
            
                // Получаем путь до изображения
                const productImage = popup.querySelector('.product-image').src; 
            
                // Создаём объект продукта
                const productData = {
                    id: parseInt(productId),
                    name: productName,
                    price: productPrice,
                    count: 1,
                    image: productImage // Добавляем путь до картинки
                };
            
                // Добавляем продукт в корзину
                Cart.addToCart(productData);
            
                alert('Товар добавлен в корзину');
                popup.remove();
            });
        })
        .catch(error => {
            console.error('Error loading product details:', error);
        });
}
