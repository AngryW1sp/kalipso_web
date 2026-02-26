/**
 * FAQ accordion — без библиотек, плавная анимация
 */
(function() {
  var list = document.querySelector('.faq-list');
  if (!list) return;

  function closeItem(item) {
    var trigger = item.querySelector('.faq-trigger');
    var content = item.querySelector('.faq-content');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (content) content.style.maxHeight = null;
    item.classList.remove('is-open');
  }

  function openItem(item) {
    var trigger = item.querySelector('.faq-trigger');
    var content = item.querySelector('.faq-content');
    if (!content) return;
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
    item.classList.add('is-open');
  }

  list.addEventListener('click', function(e) {
    var trigger = e.target.closest('.faq-trigger');
    if (!trigger) return;
    var item = trigger.closest('.faq-item');
    if (!item) return;

    var content = item.querySelector('.faq-content');
    if (!content) return;

    var isOpen = item.classList.contains('is-open');

    list.querySelectorAll('.faq-item').forEach(function(other) {
      if (other !== item) closeItem(other);
    });

    if (isOpen) {
      closeItem(item);
    } else {
      openItem(item);
    }
  });
})();
