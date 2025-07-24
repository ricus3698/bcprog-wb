// common.js
function includeHTML(callback) {
  const elements = document.querySelectorAll('[data-include]');
  let loaded = 0;
  elements.forEach((el) => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
        loaded++;
        if (loaded === elements.length && typeof callback === 'function') {
          callback();
        }
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
});

$(document).ready(function() {
    $('.ft-site-btn').on('click', function(e) {
        e.preventDefault();
        $(this).next('.ft-site-list').slideToggle();
        $(this).toggleClass('active');
    });
});