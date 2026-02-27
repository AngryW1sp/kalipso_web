/**
 * FAQ accordion для страницы «Услуги»
 * open-single=true, клик по всей строке, aria-expanded, клавиатурная навигация
 */
(function() {
  var faqList = document.querySelector('.faq-list');
  if (!faqList) return;

  var items = faqList.querySelectorAll('.faq-item');

  function closeAll() {
    items.forEach(function(item) {
      var trigger = item.querySelector('.faq-item__trigger');
      var content = item.querySelector('.faq-item__content');
      item.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (content) content.style.maxHeight = null;
    });
  }

  function openItem(item) {
    var trigger = item.querySelector('.faq-item__trigger');
    var content = item.querySelector('.faq-item__content');
    if (!trigger || !content) return;
    closeAll();
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
  }

  function toggleItem(item) {
    if (item.classList.contains('is-open')) {
      closeAll();
    } else {
      openItem(item);
    }
  }

  faqList.addEventListener('click', function(e) {
    var trigger = e.target.closest('.faq-item__trigger');
    if (!trigger) return;
    var item = trigger.closest('.faq-item');
    if (!item) return;
    toggleItem(item);
  });

  faqList.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var trigger = e.target.closest('.faq-item__trigger');
    if (!trigger) return;
    e.preventDefault();
    var item = trigger.closest('.faq-item');
    if (!item) return;
    toggleItem(item);
  });

  faqList.addEventListener('keydown', function(e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Home' && e.key !== 'End') return;
    var trigger = e.target.closest('.faq-item__trigger');
    if (!trigger) return;
    var triggers = Array.from(faqList.querySelectorAll('.faq-item__trigger'));
    var idx = triggers.indexOf(trigger);
    if (idx === -1) return;
    e.preventDefault();
    if (e.key === 'ArrowDown' && idx < triggers.length - 1) triggers[idx + 1].focus();
    if (e.key === 'ArrowUp' && idx > 0) triggers[idx - 1].focus();
    if (e.key === 'Home') triggers[0].focus();
    if (e.key === 'End') triggers[triggers.length - 1].focus();
  });
})();
