(function () {
  var P = window.PROFILE || {};
  /* fill name, roll numbers etc. from profile.js */
  document.querySelectorAll('[data-profile]').forEach(function (el) {
    var v = P[el.getAttribute('data-profile')];
    if (v) { el.textContent = v; }
    else { var r = el.closest('[data-row]'); if (r) r.hidden = true; }
  });

  /* search box on a topic page */
  var box = document.getElementById('finder');
  if (box) {
    var rows = Array.prototype.slice.call(document.querySelectorAll('.qlist .row'));
    var none = document.getElementById('none');
    box.addEventListener('input', function () {
      var q = box.value.trim().toLowerCase(), shown = 0;
      rows.forEach(function (r) {
        var hit = !q || r.getAttribute('data-text').indexOf(q) > -1;
        r.hidden = !hit; if (hit) shown++;
      });
      none.hidden = shown !== 0;
    });
  }

  /* left / right arrow keys move between questions */
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || /input|textarea/i.test((e.target.tagName || ''))) return;
    var sel = e.key === 'ArrowRight' ? '.pager .next' : e.key === 'ArrowLeft' ? '.pager .prev' : null;
    var a = sel && document.querySelector(sel);
    if (a) window.location.href = a.href;
  });
})();
