(function () {
  var list = document.querySelector('ul.films');
  if (!list) return;

  fetch('/watching/films.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(function (films) {
      films.sort(function (a, b) { return b.watched.localeCompare(a.watched); });
      list.innerHTML = '';
      films.forEach(function (f) {
        var li = document.createElement('li');

        var img = document.createElement('img');
        img.src = f.poster;
        img.alt = f.title + ' poster';
        img.loading = 'lazy';
        img.width = 64;
        img.height = 96;

        var info = document.createElement('div');
        info.className = 'info';

        var title = document.createElement('span');
        title.className = 'title';
        title.textContent = f.title;

        var meta = document.createElement('span');
        meta.className = 'meta';
        var rating = document.createElement('span');
        rating.className = 'rating';
        rating.textContent = f.rating + '/10';
        meta.append(
          document.createTextNode(f.year + ' · '),
          rating,
          document.createTextNode(' · watched ' + f.watched.replace(/-/g, '.'))
        );

        info.append(title, meta);
        li.append(img, info);
        list.append(li);
      });
    })
    .catch(function () {
      list.innerHTML = '<li style="color:var(--muted);font-family:var(--mono);font-size:0.8rem">could not load films</li>';
    });
})();
