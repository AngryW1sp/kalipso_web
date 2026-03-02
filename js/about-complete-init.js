/**
 * Готовые проекты — заполнение hero-слайдера и сетки на странице «О компании»
 */
(function() {
  var projects = window.COMPLETE_PROJECTS || [];
  if (projects.length === 0) return;

  function assetUrl(path) {
    if (!path) return '';
    return (path.startsWith('/') || path.startsWith('http')) ? path : '/' + path.replace(/^\/?/, '');
  }
  function escapeHtml(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  var heroWrapper = document.getElementById('about-hero-slides');
  if (heroWrapper) {
    var heroItems = projects.slice(0, 4);
    heroWrapper.innerHTML = heroItems.map(function(p, i) {
      var cap = 'Объект: ' + escapeHtml(p.location) + ' · Размер: ' + escapeHtml(p.size) + ' · Срок: ' + p.days + ' дн.';
      var loadAttr = i === 0 ? 'loading="eager"' : 'loading="lazy"';
      return '<div class="swiper-slide">' +
        '<figure class="about-hero-slide">' +
        '<img src="' + assetUrl(p.image) + '" alt="' + escapeHtml(p.title) + '" ' + loadAttr + ' />' +
        '<figcaption class="about-hero-slide__cap">' + cap + '</figcaption>' +
        '</figure></div>';
    }).join('');
  }

  var grid = document.getElementById('complete-projects-grid');
  if (grid) {
    grid.innerHTML = projects.map(function(p) {
      var meta = escapeHtml(p.location) + ' · ' + escapeHtml(p.size) + ' · ' + p.days + ' дн.';
      return '<article class="about-complete-card">' +
        '<div class="about-complete-card__img">' +
        '<img src="' + assetUrl(p.image) + '" alt="' + escapeHtml(p.title) + '" loading="lazy" />' +
        '</div>' +
        '<div class="about-complete-card__body">' +
        '<h3 class="about-complete-card__title">' + escapeHtml(p.title) + '</h3>' +
        '<p class="about-complete-card__meta">' + meta + '</p>' +
        '<p class="about-complete-card__desc">' + escapeHtml(p.description) + '</p>' +
        '</div></article>';
    }).join('');
  }
})();
