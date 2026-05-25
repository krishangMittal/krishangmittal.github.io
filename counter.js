(function () {
  var el = document.querySelector('.visits');
  if (!el) return;
  var slug = location.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
  el.textContent = '···';
  fetch('https://abacus.jasoncameron.dev/hit/krishangmittal.com/' + encodeURIComponent(slug))
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (typeof d.value === 'number') {
        el.textContent = d.value.toLocaleString() + ' views';
      }
    })
    .catch(function () { el.textContent = ''; });
})();
