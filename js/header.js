/**
 * Общий хедер для всех страниц KALIPSO.
 * Использует чистые URL (/, /catalog...) при открытии через сервер.
 */
(function() {
  var headerEl = document.querySelector('.header');
  if (!headerEl) return;

  var u = window.location.protocol === 'file:' ? {
    home: 'index.html', catalog: 'catalog.html', equipment: 'equipment.html',
    services: 'services.html', about: 'about.html', contacts: 'contacts.html'
  } : { home: '/', catalog: '/catalog', equipment: '/equipment',
    services: '/services', about: '/about', contacts: '/contacts' };

  var html = '<div class="container"><div class="header__inner">' +
    '<a class="brand" href="' + u.home + '" aria-label="KALIPSO">' +
    '<img src="assets/images/logo.png" alt="KALIPSO — проектирование и строительство бассейнов" class="brand__logo" />' +
    '<span class="brand__text">KALIPSO</span></a>' +
    '<input type="checkbox" id="nav-toggle" class="nav-toggle" hidden aria-hidden="true" />' +
    '<label for="nav-toggle" class="header__burger" aria-label="Меню"><span></span><span></span><span></span></label>' +
    '<nav class="nav">' +
    '<a class="nav__link" href="' + u.services + '">Услуги</a>' +
    '<a class="nav__link" href="' + u.catalog + '">Каталог бассейнов</a>' +
    '<a class="nav__link" href="' + u.equipment + '">Оборудование</a>' +
    '<a class="nav__link" href="' + u.about + '">О компании</a>' +
    '<a class="nav__link" href="' + u.contacts + '">Контакты</a>' +
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
    var path = (window.location.pathname || '/').replace(/^\//, '') || '';
    path = path.split('?')[0];
    var nav = header.querySelector('.nav');
    if (!nav) return;
    var pathMap = { '': 'home', 'index.html': 'home', 'catalog': 'catalog', 'catalog.html': 'catalog',
      'equipment': 'equipment', 'equipment.html': 'equipment', 'services': 'services', 'services.html': 'services',
      'about': 'about', 'about.html': 'about', 'contacts': 'contacts', 'contacts.html': 'contacts' };
    var current = pathMap[path] || path;
    nav.querySelectorAll('.nav__link').forEach(function(a) {
      var href = (a.getAttribute('href') || '').split('?')[0];
      var linkPath = href.replace(/^\//, '').split('/')[0] || 'index.html';
      var linkKey = pathMap[linkPath] || linkPath.replace('.html', '');
      var isActive = (current === linkKey) ||
        ((path.indexOf('pool') >= 0 || path === 'pool-product.html') && linkKey === 'catalog') ||
        ((path.indexOf('equipment/product') >= 0 || path === 'equipment-product.html') && linkKey === 'equipment');
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
