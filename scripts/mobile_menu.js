document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropdowns = document.querySelectorAll('.mobile-menu .dropdown');

    // Проверяем, что элементы существуют перед добавлением обработчиков событий
    if (hamburgerBtn && mobileMenu) {
        // Добавляем обработчик для кнопки гамбургера
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('mobile-menu-active');
        });

        // Закрыть мобильное меню при клике вне его области
        document.addEventListener('click', (event) => {
            if (!mobileMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
                mobileMenu.classList.remove('mobile-menu-active');
            }
        });

        // Управление dropdown в мобильном меню
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', () => {
                dropdown.classList.toggle('active');
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                }
            });
        });
    } else {
        console.error('Не удалось найти элементы для обработки событий.');
    }
});
