// Shared behaviour for the THEE_YMD / Overflow prototype pages.
(function () {
  var root = document.querySelector('.root');
  if (!root) return;
  var side = root.getAttribute('data-side') || 'personal';

  function isDark() { return root.classList.contains('t-dark'); }
  function syncThemeLabel() {
    var b = document.querySelector('.sky');
    if (b) b.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
  }
  function show(name, on) {
    document.querySelectorAll('[data-if="' + name + '"]').forEach(function (el) { el.hidden = !on; });
  }
  syncThemeLabel();

  // ---- Projects filter (personal home) ----
  var colA = document.querySelectorAll('.cols .col')[0];
  var colB = document.querySelectorAll('.cols .col')[1];
  var cards = [];
  if (colA && colB) {
    var a = colA.querySelectorAll('.card'), b = colB.querySelectorAll('.card');
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      if (a[i]) cards.push(a[i]);
      if (b[i]) cards.push(b[i]);
    }
    cards.forEach(function (c) {
      c.setAttribute('data-tag', c.querySelector('.tg').textContent.trim());
    });
  }
  function applyFilter(tag) {
    var shA = ['tall', 'wide', 'tall'], shB = ['wide', 'tall', 'wide'];
    var na = 0, nb = 0;
    cards.forEach(function (c) { c.remove(); });
    cards.filter(function (c) { return tag === 'All' || c.getAttribute('data-tag') === tag; })
      .forEach(function (c, i) {
        var box = c.querySelector('.cimg');
        c.style.order = i;
        if (i % 2 === 0) { box.className = 'cimg ' + shA[na++ % 3]; colA.appendChild(c); }
        else { box.className = 'cimg ' + shB[nb++ % 3]; colB.appendChild(c); }
      });
    document.querySelectorAll('.chip').forEach(function (ch) {
      var on = ch.textContent.trim() === tag;
      ch.classList.toggle('on', on);
      ch.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  // ---- Lightbox (gallery) ----
  var tiles = document.querySelectorAll('.tile[data-act^="lb:"]');
  var lb = -1;
  function setLb(i) {
    lb = i;
    show('lb', i >= 0);
    document.querySelectorAll('[data-bind="lbLabel"]').forEach(function (el) {
      el.textContent = 'Photo ' + (i + 1) + ' / ' + tiles.length;
    });
  }

  var actions = {
    toggleTheme: function () {
      var next = isDark() ? 't-light' : 't-dark';
      root.classList.remove('t-dark', 't-light');
      root.classList.add(next);
      try { localStorage.setItem('theme-' + side, next); } catch (e) {}
      syncThemeLabel();
    },
    openMenu: function () { show('menu', true); },
    closeMenu: function () { show('menu', false); },
    filter: function (v) { applyFilter(v); },
    lb: function (v) { setLb(parseInt(v, 10)); },
    closeLb: function () { setLb(-1); },
    nextLb: function () { setLb((lb + 1) % tiles.length); },
    prevLb: function () { setLb((lb - 1 + tiles.length) % tiles.length); },
    setTwos: function () { show('twos', true); show('scroll', false); seg('twos'); },
    setScroll: function () { show('twos', false); show('scroll', true); seg('scroll'); }
  };
  function seg(which) {
    document.querySelectorAll('.seg button').forEach(function (b) {
      var on = b.getAttribute('data-act') === (which === 'twos' ? 'setTwos' : 'setScroll');
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var raw = el.getAttribute('data-act');
    var k = raw.indexOf(':');
    var name = k < 0 ? raw : raw.slice(0, k);
    var val = k < 0 ? '' : raw.slice(k + 1);
    if (actions[name]) actions[name](val, el, e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { show('menu', false); if (lb >= 0) setLb(-1); }
    if (lb >= 0 && e.key === 'ArrowRight') actions.nextLb();
    if (lb >= 0 && e.key === 'ArrowLeft') actions.prevLb();
  });
})();
