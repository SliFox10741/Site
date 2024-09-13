
document.getElementById('searchBtn').addEventListener('click', function () {
    const searchPopup = document.getElementById('searchPopup');
    if (searchPopup.style.display === 'block') {
        searchPopup.style.display = 'none';
    } else {
        searchPopup.style.display = 'block';
    }
});

document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const url = new URL(href, window.location.href);
        const targetId = url.hash.substring(1);

        if (window.location.pathname === url.pathname) {
            if (targetId) {
                e.preventDefault();
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    console.warn('Целевая секция не найдена:', targetId);
                }
            }
        }
    });
});
