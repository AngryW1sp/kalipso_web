/**
 * KALIPSO — главная страница
 * Популярные решения: рендер из POOLS_DATA
 */
(function() {
  var POPULAR_IDS = ['pool-3x7', 'pool-3x6', 'pool-3x5', 'pool-3x15-round'];
  var FOR_MAP = {
    'pool-3x7': 'Для участков с запасом места и активного плавания.',
    'pool-3x6': 'Универсальный формат для семьи и гостей.',
    'pool-3x5': 'Семейный бассейн для компактного участка.',
    'pool-3x15-round': 'Компактные участки, зона SPA, детский бассейн.'
  };
  var fallbackImg = 'assets/pools/IMG_20220714_231241_122.jpg';

  function fmtPrice(n) {
    return (n || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  }
  function escapeHtml(s) {
    if (!s) return '';
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }
  function chipFromSpec(specs, p) {
    if (specs && specs[0]) return specs[0];
    if (p.shape === 'round') return 'Диаметр ' + (p.width || 3) + ' м';
    return (p.width || 3) + '×' + (p.length || 6) + ' м';
  }
  function chipDepth(p) {
    return 'Глубина ' + (p.depth || 1.5) + ' м';
  }

  var grid = document.getElementById('index-popular-pools');
  if (!grid) return;

  var pools = window.POOLS_DATA || [];
  var popular = POPULAR_IDS.map(function(id) {
    return pools.find(function(p) { return p.id === id; });
  }).filter(Boolean);

  if (popular.length === 0) return;

  grid.innerHTML = popular.map(function(p, i) {
    var isHit = p.id === 'pool-3x6';
    var forText = FOR_MAP[p.id] || 'Подберём под ваш участок.';
    var imgSrc = (p.image || fallbackImg).replace(/"/g, '&quot;');
    var chips = [chipFromSpec(p.specs, p), chipDepth(p)];
    var chipsHtml = chips.map(function(c) {
      return '<span class="pool-card__chip">' + escapeHtml(c) + '</span>';
    }).join('');

    return '<article class="pool-card' + (isHit ? ' pool-card--hit' : '') + '">' +
      '<a href="pool-product.html?id=' + encodeURIComponent(p.id) + '" class="pool-card__image">' +
        '<img src="' + imgSrc + '" alt="' + escapeHtml(p.title) + '" loading="lazy" onerror="this.src=\'' + fallbackImg + '\'" />' +
      '</a>' +
      '<div class="pool-card__body">' +
        (isHit ? '<span class="pool-card__badge">Самый популярный</span>' : '') +
        '<h3 class="pool-card__title">' + escapeHtml(p.title) + '</h3>' +
        '<p class="pool-card__specs">Кому подходит: ' + escapeHtml(forText) + '</p>' +
        '<div class="pool-card__chips">' + chipsHtml + '</div>' +
        '<p class="pool-card__price">От ' + fmtPrice(p.priceFrom) + ' за чашу</p>' +
        '<a class="pool-card__link" href="pool-product.html?id=' + encodeURIComponent(p.id) + '">Рассчитать</a>' +
      '</div>' +
    '</article>';
  }).join('');
})();
