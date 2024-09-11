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
                    <div class="product" data-product-id="${product.id}" >
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Цена: ${product.price} руб.</p>
                        <img src="../images/${product.photo_url }" alt="${product.name}" width="200" />
                    </div>
                `;
                productList.innerHTML += productItem;
            });
            document.querySelectorAll('.product').forEach(product => {
                product.addEventListener('click', function() {
                    const productId = this.dataset.productId; // Берем id товара
                    loadProductDetails(productId); // Загружаем данные товара по id
                });
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

function loadProductDetails(productId) {
    const url = `http://localhost:3000/products/${productId}`; // URL с id товара

    fetch(url)
        .then(response => response.json())
        .then(product => {
            // Удаляем старый pop-up, если он существует
            const oldPopup = document.getElementById('product-popup');
            if (oldPopup) oldPopup.remove();

            // HTML для pop-up с данными о товаре
            const popupContent = `
                <div id="product-popup" class="popup">
                    <div class="popup-content">
                        <span class="popup-close">&times;</span>
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <p>Цена: ${product.price} руб.</p>
                        <img src="../images/${product.photo_url}" alt="${product.name}" width="200" />
                    </div>
                </div>
            `;

            // Вставляем pop-up в DOM
            document.body.insertAdjacentHTML('beforeend', popupContent);

            // Открываем pop-up (меняем стиль display на flex для центрирования)
            const popup = document.getElementById('product-popup');
            popup.style.display = 'flex';

            // Обработка закрытия pop-up при клике на крестик
            const closeBtn = popup.querySelector('.popup-close');
            closeBtn.addEventListener('click', () => {
                popup.remove(); // Удаляем pop-up из DOM при закрытии
            });

            popup.addEventListener('click', (event) => {
                const content = popup.querySelector('.popup-content');
                if (!content.contains(event.target)) { // Если клик вне контента
                    popup.remove(); // Удаляем pop-up
                }
            });
        })
        .catch(error => console.error('Error loading product details:', error));
}

// document.addEventListener('DOMContentLoaded', function() {
//     const filters = document.querySelector('.filters');
//     const toggleFiltersButton = document.createElement('button');
//     toggleFiltersButton.textContent = 'Фильтры';
//     toggleFiltersButton.classList.add('filter-toggle-button');
//     document.body.insertBefore(toggleFiltersButton, filters);

//     toggleFiltersButton.addEventListener('click', function() {
//         filters.classList.toggle('visible');
//     });
// });

// // CSS для кнопки фильтров
// const style = document.createElement('style');
// style.textContent = `
//     .filters {
//         display: none;
//     }

//     .filters.visible {
//         display: block;
//     }

//     .filter-toggle-button {
//         display: none;
//         background-color: #e25d67;
//         color: white;
//         border: none;
//         padding: 10px;
//         cursor: pointer;
//         margin-bottom: 20px;
//         font-size: 16px;
//     }

//     @media (max-width: 768px) {
//         .filters {
//             display: none;
//             position: absolute;
//             top: 100px;
//             left: 0;
//             right: 0;
//             background-color: white;
//             z-index: 1000;
//              box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
//         }

//         .filter-toggle-button {
//             display: block;
//         }
//     }
// `;
// document.head.appendChild(style);
