(function () {
  'use strict';

  // Интерактивная схема — hover по списку или по схеме
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
