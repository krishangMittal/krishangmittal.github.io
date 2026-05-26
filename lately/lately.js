(function () {
  function emptyMsg(text) {
    var p = document.createElement('p');
    p.className = 'empty';
    p.textContent = text;
    return p;
  }

  function renderFilms(films, list) {
    if (!films.length) {
      list.replaceWith(emptyMsg('Nothing recent.'));
      return;
    }
    films.sort(function (a, b) { return b.watched.localeCompare(a.watched); });
    films.forEach(function (f) {
      var li = document.createElement('li');

      var img = document.createElement('img');
      img.src = f.poster;
      img.alt = f.title + ' poster';
      img.loading = 'lazy';

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
        document.createTextNode(' · ' + f.watched.replace(/-/g, '.'))
      );

      info.append(title, meta);
      li.append(img, info);
      list.append(li);
    });
  }

  function renderBooks(books, list) {
    if (!books.length) {
      list.replaceWith(emptyMsg('Currently between books.'));
      return;
    }
    books.sort(function (a, b) {
      return (b.started || '').localeCompare(a.started || '');
    });
    books.forEach(function (b) {
      var li = document.createElement('li');

      var img = document.createElement('img');
      img.src = b.cover;
      img.alt = b.title + ' cover';
      img.loading = 'lazy';

      var info = document.createElement('div');
      info.className = 'info';

      var title = document.createElement('span');
      title.className = 'title';
      title.textContent = b.title;

      var meta = document.createElement('span');
      meta.className = 'meta';
      var parts = [b.author];
      if (b.started) parts.push('since ' + b.started.replace(/-/g, '.'));
      meta.textContent = parts.join(' · ');

      info.append(title, meta);
      li.append(img, info);
      list.append(li);
    });
  }

  function load(url, list, render) {
    if (!list) return;
    fetch(url, { cache: 'no-cache' })
      .then(function (r) { return r.json(); })
      .then(function (data) { render(data, list); })
      .catch(function () {
        list.innerHTML = '<li style="color:var(--muted);font-family:var(--mono);font-size:0.8rem;list-style:none">could not load</li>';
      });
  }

  load('/lately/books.json', document.querySelector('ul.books'), renderBooks);
  load('/lately/films.json', document.querySelector('ul.films'), renderFilms);
})();
