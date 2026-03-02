/**
 * Примеры наших бассейнов — заполнение слайдера из COMPLETE_PROJECTS
 */
(function() {
  var projects = window.COMPLETE_PROJECTS || [];
  if (projects.length === 0) return;

  var wrapper = document.getElementById('index-portfolio-slides');
  if (!wrapper) return;

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

  wrapper.innerHTML = projects.map(function(p, i) {
    var loadAttr = i < 2 ? 'loading="lazy"' : 'loading="lazy"';
    return '<div class="swiper-slide">' +
      '<figure class="portfolio-slide">' +
      '<img src="' + assetUrl(p.image) + '" alt="' + escapeHtml(p.title) + '" ' + loadAttr + ' />' +
      '<figcaption class="portfolio-slide__cap">' +
      '<span class="portfolio-slide__line">Объект: ' + escapeHtml(p.location) + '</span>' +
      '<span class="portfolio-slide__line">Размер: ' + escapeHtml(p.size) + '</span>' +
      '<span class="portfolio-slide__line">Срок: ' + p.days + ' дн.</span>' +
      '</figcaption></figure></div>';
  }).join('');
})();
