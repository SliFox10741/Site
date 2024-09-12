'use strict';

// Модуль корзины
var cart = (function($) {

    var cartData,
        opts = {};

    // Инициализация модуля
    function init(options) {
        _initOptions(options);
        updateData();
        if (opts.renderCartOnInit) {
            renderCart();
        }
        if (opts.renderMenuCartOnInit) {
            renderMenuCart();
        }
        console.log('DOMContentLoaded'); // Проверка загрузки DOM
        _bindHandlers();
    }

    // Инициализируем настройки
    function _initOptions(options) {
        var defaultOptions = {
            renderCartOnInit: true,
            renderMenuCartOnInit: true,
            elAddToCart: '.js-add-to-cart',
            attrId: 'data-id',
            attrName: 'data-name',
            attrPrice: 'data-price',
            attrDelta: 'data-delta',
            elCart: '#cart',
            elTotalCartCount: '#total-cart-count',
            elTotalCartSumma: '#total-cart-summa',
            elCartItem: '.js-cart-item',
            elCartCount: '.js-count',
            elCartSumma: '.js-summa',
            elChangeCount: '.js-change-count',
            elRemoveFromCart: '.js-remove-from-cart',
            cart_button: 'cart_button',
            cart_close: 'basket_close'

        };
        _.defaults(options || {}, defaultOptions);
        opts = _.clone(options);
    }

    // Навешивам события
    function _bindHandlers() {
        _onClickAddBtn();
        _onClickChangeCountInCart();
        _onClickRemoveFromCart();
        _onClickOpenCart();
    }

    // Получаем данные
    function updateData() {
        try {
            cartData = JSON.parse(localStorage.getItem('cart')) || [];
            console.log('Обновленные данные корзины:', cartData); // Проверка данных
            if (!Array.isArray(cartData)) {
                cartData = [];
            }
        } catch (e) {
            cartData = [];
            console.error('Ошибка при парсинге данных корзины:', e); // Логирование ошибок
        }
        return cartData;
    }
    
    

    // Возвращаем данные
    function getData() {
        return cartData;
    }

    // Сохраняем данные в localStorage
    function saveData() {
        localStorage.setItem('cart', JSON.stringify(cartData));
        return cartData;
    }

    // Очищаем данные
    function clearData() {
        cartData = [];
        saveData();
        return cartData;
    }

    // Поиск объекта в коллекции cartData по id
    function getById(id) {
        return _.findWhere(cartData, {id: id});
    }

    // Добавление товара в коллекцию
    function add(item) {
        var oldItem;
        updateData();
        
        // Теперь функция вызывается через пространство имён cart
        oldItem = cart.getById(item.id);
        
        if(!oldItem) {
            cartData.push(item);
        } else {
            oldItem.count = oldItem.count + item.count;
        }
        
        saveData();
        return item;
    }

    // Удаление товара из коллекции
    function remove(id) {
        updateData();
        cartData = _.reject(cartData, function(item) {
            return item.id === id;
        });
        saveData();
        return cartData;
    }

    // Изменение количества товара в коллекции
    function changeCount(id, delta) {
        var item;
        updateData();
        item = cart.getById(id);
        if(item) {
            item.count = item.count + delta;
            if (item.count < 1) {
                cart.remove(id);
            }
            saveData();
        }
        return _.findWhere(cartData, {id: id}) || {};
    }

    // Возвращаем количество товаров (количество видов товаров в корзине)
    function getCount() {
        return _.size(cartData);
    }

    // Возвращаем общее количество товаров 
    function getCountAll() {
        return _.reduce(cartData, function(sum, item) {return sum + item.count}, 0);
    }

    // Возвращаем общую сумму
    function getSumma() {
        return _.reduce(cartData, function(sum, item) {return sum + item.count * item.price}, 0);
    }

    // Рендерим корзину
    function renderCart() {
        var template = _.template($('#cart-template').html());
        var data = {
            goods: cartData // предположительно, здесь хранятся товары
        };
        console.log('Товары в корзине:', data); // Проверка содержимого товаров
        $('#basket_product_list').html(template(data)); // Рендеринг корзины
    }
    
    

    // Рендерим количество товаров в меню
    function renderMenuCart() {
        var countAll = cart.getCountAll();
        $(opts.elTotalCartCount).html(countAll !== 0 ? countAll : '');
    }

    // Рендерим общую сумму товаров
    function renderTotalCartSumma() {
        $(opts.elTotalCartSumma).html(cart.getSumma());            
    }

    // Поиск продукта в корзине по id
    function findCartElemById(id) {
        return $(opts.elCartItem + '[' + opts.attrId + '="'+id+'"]');
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Находим элементы на странице
        const cartButton = document.getElementById('cart_button');
        const closeCartButton = document.getElementById('basket_close');
        const cartElement = document.getElementById('cart');
    
        // Открытие корзины при нажатии на кнопку
        cartButton.addEventListener('click', function() {
            console.log("Кнопка корзины нажата");  // Для отладки
            cartElement.classList.add('basket--open');  // Добавляем класс для открытия
        });
    
        // Закрытие корзины при нажатии на крестик
        closeCartButton.addEventListener('click', function() {
            console.log("Кнопка закрытия нажата");  // Для отладки
            cartElement.classList.remove('basket--open');  // Убираем класс для закрытия
        });
    
        // Закрытие корзины при клике вне контейнера корзины
        cartElement.addEventListener('click', function(event) {
            if (event.target === cartElement) {
                console.log("Клик вне контейнера корзины");  // Для отладки
                cartElement.classList.remove('basket--open');  // Закрытие корзины
            }
        });
    });
    
    

    // Добавление в корзину
    function _onClickAddBtn() {
        $('body').on('click', opts.elAddToCart, function(e) {
            var $this = $(this);
            cart.add({
                id: +$this.attr(opts.attrId),
                name: $this.attr(opts.attrName),
                price: +$this.attr(opts.attrPrice),
                count: 1
            });    
            cart.renderMenuCart();
            alert('Товар добавлен в корзину');
        });
    }

    // Меняем количество товаров в корзине
    function _onClickChangeCountInCart() {
        $('body').on('click', opts.elChangeCount, function(e) {
            var $this = $(this),
                id = +$this.attr(opts.attrId),
                delta = +$this.attr(opts.attrDelta),
                $cartElem = cart.findCartElemById(id),
                cartItem = cart.changeCount(id, delta);
            if (cartItem.count) {
                $cartElem.find(opts.elCartCount).html(cartItem.count);
                $cartElem.find(opts.elCartSumma).html(cartItem.count * cartItem.price);
            } else {
                $cartElem.remove();
            }
            cart.renderMenuCart();
            cart.renderTotalCartSumma();
        });
    }

    // Удаляем товар из корзины
    function _onClickRemoveFromCart() {
        $('body').on('click', opts.elRemoveFromCart, function(e) {
            if(!confirm('Удалить товар из корзины?')) return false;
            var $this = $(this),
                id = +$this.attr(opts.attrId),
                $cartElem = cart.findCartElemById(id);
            cart.remove(id);
            $cartElem.remove();
            cart.renderMenuCart();
            cart.renderTotalCartSumma();
        });
    }

    // Экспортируем наружу
    return {
        init: init,
        update: updateData,
        getData: getData,
        save: saveData,
        clearData: clearData,
        getById: getById,
        add: add,
        remove: remove,
        changeCount: changeCount,
        getCount: getCount,
        getCountAll: getCountAll,
        getSumma: getSumma,
        renderMenuCart: renderMenuCart // Экспорт функции для использования в catalog.js
    };
    

})(jQuery);
