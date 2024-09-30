let currentSlide = 0;

function showSlides(n) {
  let slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.style.display = 'none'; // Скрыть все слайды
  });
  slides[n].style.display = 'block'; // Показать текущий слайд
}

function plusSlides(n) {
  let slides = document.querySelectorAll('.slide');
  currentSlide = (currentSlide + n + slides.length) % slides.length;
  showSlides(currentSlide);
}

// Инициализация первого слайда
showSlides(currentSlide);

// Обработка тач-событий (свайпа)
let startX = 0;
let endX = 0;

document.getElementById('slideshow').addEventListener('touchstart', function(event) {
  startX = event.changedTouches[0].screenX;
});

document.getElementById('slideshow').addEventListener('touchend', function(event) {
  endX = event.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  if (startX - endX > 50) {
    // Свайп влево
    plusSlides(1);
  } else if (endX - startX > 50) {
    // Свайп вправо
    plusSlides(-1);
  }
}
