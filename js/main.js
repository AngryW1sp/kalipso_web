(function () {
  'use strict';

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var header = document.getElementById('header');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav--open');
      burger.setAttribute('aria-expanded', isOpen);
      burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    // Закрыть меню при клике по ссылке (мобильный)
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Открыть меню');
      });
    });
  }

  // Hero-форма: при отправке скроллим к форме контактов и подставляем данные в комментарий
  var heroForm = document.querySelector('.hero__form');
  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var poolType = (heroForm.querySelector('input[name="pool_type"]:checked') || {}).value;
      var len = (document.getElementById('hero-length') || {}).value;
      var w = (document.getElementById('hero-width') || {}).value;
      var dMin = (document.getElementById('hero-depth-min') || {}).value;
      var dMax = (document.getElementById('hero-depth-max') || {}).value;
      var parts = [];
      if (poolType) parts.push(poolType === 'overflow' ? 'переливной' : 'скиммерный');
      if (len || w) parts.push((len || '?') + '×' + (w || '?') + ' м');
      if (dMin || dMax) parts.push('глубина ' + (dMin || '?') + '–' + (dMax || '?') + ' м');
      var comment = document.getElementById('form-comment');
      if (comment && parts.length) {
        comment.value = (comment.value ? comment.value + '\n\n' : '') + 'Заявка с hero: ' + parts.join(', ');
      }
      var contact = document.getElementById('contact');
      if (contact) {
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Форма: базовая валидация и сохранение в sessionStorage для thanks
  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      var name = document.getElementById('form-name');
      var phone = document.getElementById('form-phone');
      var valid = true;

      if (!name || !name.value.trim()) {
        valid = false;
        name && name.classList.add('invalid');
      } else {
        name && name.classList.remove('invalid');
      }
      if (!phone || !phone.value.replace(/\D/g, '').length) {
        valid = false;
        phone && phone.classList.add('invalid');
      } else {
        phone && phone.classList.remove('invalid');
      }

      if (!valid) {
        e.preventDefault();
        (name || form).focus();
      } else {
        try {
          sessionStorage.setItem('lead_name', name.value.trim());
        } catch (err) {}
      }
    });
  }

  // Интерактивная схема — логика как на референсе (pool.kit-sv.ru): hover по списку или по схеме
  function initSchemaShow() {
    var ol = document.querySelector('#schema .schema-info .schema-list');
    var schema = document.querySelector('#schema .schema-info .schema-img');
    if (!ol || !schema) return;

    ol.addEventListener('mouseover', function (event) {
      var span = event.target.closest('li span');
      if (!span || span.classList.contains('active')) return;
      var id = span.getAttribute('data-element-id');
      if (!id) return;
      toggleEvent(span, span, id);
    });

    schema.addEventListener('mouseover', function (event) {
      var p = event.target.closest('p[data-element-id]');
      var img = event.target.closest('img[data-element-id]');
      var el = p || img;
      if (!el) return;
      var id = el.getAttribute('data-element-id');
      if (!id) return;
      var span = document.querySelector('#item-schema-' + id);
      if (!span || span.classList.contains('active')) return;
      toggleEvent(span, el, id);
    });

    function toggleEvent(span, el, id) {
      span.classList.add('active');
      var numEl = document.querySelector('#schema #num-schema-' + id);
      var imgEl = document.querySelector('#schema #img-schema-' + id);
      if (numEl) numEl.style.opacity = '1';
      if (imgEl) imgEl.style.opacity = '1';

      function initHidden() {
        if (numEl) numEl.style.opacity = '0';
        if (imgEl) imgEl.style.opacity = '0';
        span.classList.remove('active');
        el.removeEventListener('mouseout', initHidden);
      }
      el.addEventListener('mouseout', initHidden);
    }
  }
  initSchemaShow();

})();
