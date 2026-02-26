/**
 * KALIPSO — слайдер «Примеры наших бассейнов»
 */
(function() {
  var el = document.querySelector('.portfolio-swiper');
  if (!el || typeof Swiper === 'undefined') return;

  new Swiper('.portfolio-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    loop: false,
    grabCursor: true,
    navigation: {
      nextEl: '.portfolio-slider__next',
      prevEl: '.portfolio-slider__prev'
    },
    pagination: {
      el: '.portfolio-pagination',
      clickable: true
    },
    breakpoints: {
      375: { slidesPerView: 1.15, spaceBetween: 12 },
      640: { slidesPerView: 1.5, spaceBetween: 16 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 2.5, spaceBetween: 24 },
      1280: { slidesPerView: 3, spaceBetween: 24 }
    }
  });
})();
