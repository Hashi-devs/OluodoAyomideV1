// Shared behaviour for the THEE_YMD / Overflow prototype pages.
(function () {
  var root = document.querySelector('.root');
  if (!root) return;
  var side = root.getAttribute('data-side') || 'personal';

  function isDark() { return root.classList.contains('t-dark'); }
  function syncThemeLabel() {
    document.querySelectorAll('.sky').forEach(function (b) {
      b.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  function show(name, on) {
    document.querySelectorAll('[data-if="' + name + '"]').forEach(function (el) { el.hidden = !on; });
  }
  function bind(name, text) {
    document.querySelectorAll('[data-bind="' + name + '"]').forEach(function (el) { el.textContent = text; });
  }
  syncThemeLabel();

  // ---- Projects filter ----
  function applyFilter(tag) {
    document.querySelectorAll('.pgrid .card').forEach(function (c) {
      c.hidden = !(tag === 'All' || c.getAttribute('data-tag') === tag);
    });
    document.querySelectorAll('.chip').forEach(function (ch) {
      var on = ch.textContent.trim() === tag;
      ch.classList.toggle('on', on);
      ch.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  // ---- Lightbox ----
  var tiles = document.querySelectorAll('[data-act^="lb:"]');
  var lb = -1;
  function setLb(i) {
    lb = i;
    show('lb', i >= 0);
    if (i >= 0) bind('lbLabel', (i + 1) + ' / ' + tiles.length);
  }

  function seg(which) {
    document.querySelectorAll('.seg button').forEach(function (b) {
      var on = b.getAttribute('data-act') === (which === 'twos' ? 'setTwos' : 'setScroll');
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
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

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var raw = el.getAttribute('data-act');
    var k = raw.indexOf(':');
    var name = k < 0 ? raw : raw.slice(0, k);
    if (actions[name]) actions[name](k < 0 ? '' : raw.slice(k + 1), el, e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { show('menu', false); if (lb >= 0) setLb(-1); }
    if (lb >= 0 && e.key === 'ArrowRight') actions.nextLb();
    if (lb >= 0 && e.key === 'ArrowLeft') actions.prevLb();
  });

  // ---- Notify form (Creative Direction) — not wired to a service yet ----
  var nf = document.querySelector('[data-form="notify"]');
  if (nf) nf.addEventListener('submit', function (e) {
    e.preventDefault();
    bind('notifyNote', 'Sign-ups open at launch — this form gets connected (Formspree/Resend) before then.');
  });
})();
