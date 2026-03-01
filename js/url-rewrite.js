/**
 * Подменяет ссылки .html на чистые URL при открытии через сервер.
 * Подключить перед другими скриптами.
 */
(function() {
  if (window.location.protocol === 'file:') return;
  var map = {
    'index.html': '/', 'catalog.html': '/catalog', 'equipment.html': '/equipment',
    'equipment-catalog.html': '/equipment/catalog', 'equipment-product.html': '/equipment/product',
    'pool-product.html': '/pool/product', 'product-3x6.html': '/pool/3x6',
    'services.html': '/services', 'about.html': '/about', 'contacts.html': '/contacts'
  };
  function rewriteLink(a) {
    var href = a.getAttribute('href');
    if (!href) return;
    var base = href.split('?')[0];
    var qs = href.indexOf('?') >= 0 ? href.substring(href.indexOf('?')) : '';
    if (map[base]) a.setAttribute('href', map[base] + qs);
  }
  function rewrite() {
    document.querySelectorAll('a[href]').forEach(rewriteLink);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rewrite);
  else rewrite();
  if (window.MutationObserver) {
    var obs = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        if (m.addedNodes.length) [].forEach.call(m.addedNodes, function(n) {
          if (n.nodeType === 1) {
            if (n.tagName === 'A' && n.href) rewriteLink(n);
            if (n.querySelectorAll) n.querySelectorAll('a[href]').forEach(rewriteLink);
          }
        });
      });
    });
    document.addEventListener('DOMContentLoaded', function() {
      obs.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
