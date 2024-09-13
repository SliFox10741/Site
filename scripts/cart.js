'use strict';

// Модуль корзины
var cart = (function ($) {

    var cartData,
        opts = {};

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
            cart_button: '#cart_button', // изменено на id
            cart_close: '#basket_close' // изменено на id
        };
        opts = _.defaults(options || {}, defaultOptions);
    }

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

    // Навешиваем события
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
        return _.findWhere(cartData, { id: id });
    }

    // Добавление товара в коллекцию
    function add(item) {
        var oldItem;
        updateData();

        oldItem = cart.getById(item.id);

        if (!oldItem) {
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
        cartData = _.reject(cartData, function (item) {
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
        if (item) {
            item.count = item.count + delta;
            if (item.count < 1) {
                cart.remove(id);
            }
            saveData();
        }
        return _.findWhere(cartData, { id: id }) || {};
    }

    // Возвращаем количество товаров (количество видов товаров в корзине)
    function getCount() {
        return _.size(cartData);
    }

    // Возвращаем общее количество товаров 
    function getCountAll() {
        return _.reduce(cartData, function (sum, item) { return sum + item.count; }, 0);
    }

    // Возвращаем общую сумму
    function getSumma() {
        return _.reduce(cartData, function (sum, item) { return sum + item.count * item.price; }, 0);
    }

    // Рендерим корзину
    function renderCart() {
        console.log('Start render');
        var template = _.template($('#cart_template').html());
        var data = {
            goods: cartData // предположительно, здесь хранятся товары
        };
        console.log('Товары в корзине:', data); // Проверка содержимого товаров
        $('#basket_product_list').html(template(data)); // Рендеринг корзины
        renderTotalCartSumma();
    }

    // function renderMenuCart() {
    //     // Общее количество товаров в корзине
    //     var countAll = cart.getCountAll();
    //     if (countAll > 0) {
    //         $('#cart_button_num').html(countAll); 
    //     } else {
    //         $('#cart_button_num').html(0);
    //     }

    //     $(opts.elTotalCartCount).html(countAll !== 0 ? countAll : '');
    // }

    function renderMenuCart() {
        // Количество уникальных товаров в корзине
        var uniqueItemsCount = cart.getCount();
        if (uniqueItemsCount > 0) {
            $('#cart_button_num').html(uniqueItemsCount);
        } else {
            $('#cart_button_num').html(0);
        }
        $(opts.elTotalCartCount).html(uniqueItemsCount !== 0 ? uniqueItemsCount : '');
    }

    // Рендерим общую сумму товаров
    function renderTotalCartSumma() {
        $(opts.elTotalCartSumma).html(cart.getSumma());
    }

    // Поиск продукта в корзине по id
    function findCartElemById(id) {
        return $(opts.elCartItem + '[' + opts.attrId + '="' + id + '"]');
    }

    function _onClickOpenCart() {

        $('#cart_button').on('click', function (e) {
            console.log('Открытие кортины');
            $('#cart').addClass('basket__open');
        });

        $('#basket_close').on('click', function (e) {
            console.log('Закрытие кортины');
            $('#cart').removeClass('basket__open');
        });
        if ($('#cart').hasClass('basket__open')) {
            $(document).on('click', function (e) {
                var $cartElement = $('#cart');
                if (!$cartElement.is(e.target) && $cartElement.has(e.target).length === 0 && !$cartButton.is(e.target)) {
                    $cartElement.removeClass('basket__open');
                }
            });
        }

    }

    // Добавление в корзину
    function _onClickAddBtn() {
        $('body').on('click', opts.elAddToCart, function (e) {
            var $this = $(this);
            cart.add({
                id: +$this.attr(opts.attrId),
                name: $this.attr(opts.attrName),
                price: +$this.attr(opts.attrPrice),
                count: 1
            });

            // Обновляем мини-корзину
            cart.renderMenuCart();

            // Обновляем полную корзину
            cart.renderCart();

            alert('Товар добавлен в корзину');
        });
    }



    // Меняем количество товаров в корзине
    function _onClickChangeCountInCart() {
        $('body').on('click', opts.elChangeCount, function (e) {
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
        $('body').on('click', opts.elRemoveFromCart, function (e) {
            if (!confirm('Удалить товар из корзины?')) return false;
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
        findCartElemById: findCartElemById, // Добавьте этот метод сюда
        renderTotalCartSumma: renderTotalCartSumma,
        renderMenuCart: renderMenuCart, // Экспорт функции для использования в catalog.js
        renderCart: renderCart
    };

})(jQuery);
