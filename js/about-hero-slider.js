/**
 * Hero slider — «Наши объекты» на странице «О компании»
 */
(function() {
  var el = document.querySelector('.about-hero-slider');
  if (!el || typeof Swiper === 'undefined') return;

  new Swiper('.about-hero-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    grabCursor: true,
    keyboard: { enabled: true },
    autoplay: { delay: 4500, disableOnInteraction: false },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд'
    },
    pagination: {
      el: '.about-hero-slider__pagination',
      clickable: true
    }
  });
})();
