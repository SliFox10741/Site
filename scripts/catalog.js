// Функция для загрузки товаров
function loadProducts(limit, offset, category = '') {
    let url = `http://localhost:3000/products?limit=${limit}&offset=${offset}`;
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
                    <div class="product-item" data-product-id="${product.id}">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Цена: ${product.price} руб.</p>
                        <img src="../images/${product.photo_url}" alt="${product.name}" width="200" />
                    </div>
                `;
                productList.innerHTML += productItem;
            });

            // Добавляем обработчики событий на каждый товар
            document.querySelectorAll('.product-item').forEach(product => {
                product.addEventListener('click', function() {
                    const productId = this.dataset.productId;
                    loadProductDetails(productId); // Загружаем данные товара по id
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
    const url = `http://localhost:3000/products/${productId}`; 


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
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Цена: ${product.price} руб.</p>
                        <img src="../images/${product.photo_url}" alt="${product.name}" width="200" />
                        <button id="save-product-btn" data-product-id="${product.id}">Сохранить в корзину</button>
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
                const productPrice = parseFloat(popup.querySelector('p:nth-of-type(2)').textContent.replace('Цена: ', '').replace(' руб.', ''));

                Cart.addToCart({
                    id: parseInt(productId),
                    name: productName,
                    price: productPrice,
                    count: 1
                });
                        alert('Товар добавлен в корзину');
                    popup.remove();
            });
        })
        
        .catch(error => {
            console.error('Error loading product details:', error);
        });
}
