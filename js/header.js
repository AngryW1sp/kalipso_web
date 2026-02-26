/**
 * Общий хедер для всех страниц KALIPSO.
 * HTML встроен в скрипт — работает без сервера (file://).
 */
(function() {
  var headerEl = document.querySelector('.header');
  if (!headerEl) return;

  var html = '<div class="container"><div class="header__inner">' +
    '<a class="brand" href="index.html" aria-label="KALIPSO">' +
    '<img src="assets/images/logo.png" alt="KALIPSO — проектирование и строительство бассейнов" class="brand__logo" />' +
    '<span class="brand__text">KALIPSO</span></a>' +
    '<input type="checkbox" id="nav-toggle" class="nav-toggle" hidden aria-hidden="true" />' +
    '<label for="nav-toggle" class="header__burger" aria-label="Меню"><span></span><span></span><span></span></label>' +
    '<nav class="nav">' +
    '<a class="nav__link" href="services.html">Услуги</a>' +
    '<a class="nav__link" href="catalog.html">Каталог бассейнов</a>' +
    '<a class="nav__link" href="equipment.html">Оборудование</a>' +
    '<a class="nav__link" href="about.html">О компании</a>' +
    '<a class="nav__link" href="contacts.html">Контакты</a>' +
    '</nav>' +
    '<div class="header__right">' +
    '<span class="header__cities">Москва · МО</span>' +
    '<div class="header__contact">' +
    '<a class="header__phone" href="tel:+74951234567">+7 (495) 123-45-67</a>' +
    '<span class="header__note">Перезвоним за 15 мин</span></div></div></div></div>';

  headerEl.innerHTML = html;
  setActiveNav(headerEl);
  initScrollShadow(headerEl);

  function setActiveNav(header) {
    var path = (window.location.pathname || window.location.href || '').split('/').pop() || '';
    if (!path || path === '') path = 'index.html';
    path = path.split('?')[0];
    var nav = header.querySelector('.nav');
    if (!nav) return;
    nav.querySelectorAll('.nav__link').forEach(function(a) {
      var href = (a.getAttribute('href') || '').split('?')[0];
      var linkPath = href.split('/').pop() || '';
      var isActive = (path === linkPath) ||
        (path === 'pool-product.html' && linkPath === 'catalog.html') ||
        (path === 'equipment-product.html' && linkPath === 'equipment.html');
      a.classList.toggle('nav__link--active', isActive);
    });
  }

  function initScrollShadow(header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
})();
