/**
 * Отправка заявок «Перезвонить мне» в Telegram
 * Подключается на страницах с формой .callback__form
 */
(function() {
  'use strict';

  function getApiUrl() {
    if (window.LEAD_API_BASE) return window.LEAD_API_BASE + '/api/send-lead';
    var origin = window.location.origin;
    if (origin && origin !== 'null' && origin.startsWith('http')) return origin + '/api/send-lead';
    return 'http://127.0.0.1:8000/api/send-lead';
  }

  var PAGE_NAMES = {
    'index.html': 'Главная', '': 'Главная', 'home': 'Главная',
    'catalog.html': 'Каталог бассейнов', 'catalog': 'Каталог бассейнов',
    'equipment.html': 'Оборудование', 'equipment': 'Оборудование',
    'equipment-catalog.html': 'Каталог оборудования', 'equipment/catalog': 'Каталог оборудования',
    'equipment-product.html': null, 'equipment/product': null,
    'pool-product.html': null, 'pool/product': null,
    'product-3x6.html': 'Бассейн 3×6 м', 'pool/3x6': 'Бассейн 3×6 м',
    'about.html': 'О компании', 'about': 'О компании',
    'services.html': 'Услуги', 'services': 'Услуги',
    'contacts.html': 'Контакты', 'contacts': 'Контакты',
    'admin-equipment.html': 'Админ: оборудование'
  };

  function getSource() {
    var path = (window.location.pathname || '').replace(/^\//, '') || '';
    var base = path.split('?')[0] || '';
    var name = PAGE_NAMES[base];

    if (base === 'equipment-product.html' || base === 'equipment/product') {
      var el = document.getElementById('product-title');
      if (el && el.textContent) return 'Товар: ' + el.textContent.trim();
      return 'Карточка оборудования';
    }
    if (base === 'pool-product.html' || base === 'pool/product') {
      var el = document.getElementById('pool-title');
      if (el && el.textContent) return 'Бассейн: ' + el.textContent.trim();
      return 'Карточка бассейна';
    }

    return name || (base || 'Главная');
  }

  function init() {
    document.querySelectorAll('.callback__form').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var row = form.querySelector('.callback__form-row');
        var btn = form.querySelector('button[type="submit"]');
        var phoneInput = form.querySelector('input[name="phone"]');
        var nameInput = form.querySelector('input[name="name"]');
        var msgInput = form.querySelector('textarea[name="message"]');

        if (!phoneInput) return;

        var data = {
          phone: phoneInput.value.trim(),
          name: nameInput ? nameInput.value.trim() : '',
          message: msgInput ? msgInput.value.trim() : '',
          source: getSource()
        };

        if (!data.phone) {
          phoneInput.focus();
          return;
        }

        var origText = btn ? btn.textContent : '';
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Отправка…';
        }

        var apiUrl = getApiUrl();
        fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(function(r) {
          return r.text().then(function(t) {
            try {
              return { ok: r.ok, status: r.status, data: JSON.parse(t || '{}') };
            } catch (_) {
              return { ok: false, status: r.status, data: { error: t || 'Ошибка сервера' } };
            }
          });
        })
        .then(function(result) {
          var res = result.data;
          if (result.ok && res.ok) {
            if (btn) btn.textContent = 'Отправлено!';
            if (phoneInput) phoneInput.value = '';
            if (nameInput) nameInput.value = '';
            if (msgInput) msgInput.value = '';
            setTimeout(function() {
              if (btn) {
                btn.textContent = origText;
                btn.disabled = false;
              }
            }, 2000);
          } else {
            throw new Error(res.error || ('HTTP ' + result.status));
          }
        })
        .catch(function(err) {
          var msg = (err && err.message) || 'Ошибка, попробуйте снова';
          if (msg.indexOf('Failed to fetch') >= 0 || msg.indexOf('NetworkError') >= 0) {
            msg = 'Проверьте: 1) страница открыта через http://127.0.0.1:8000 2) сервер запущен';
          }
          if (btn) {
            btn.textContent = msg.length > 40 ? 'Ошибка отправки' : msg;
            btn.disabled = false;
            setTimeout(function() { btn.textContent = origText; }, 4000);
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
