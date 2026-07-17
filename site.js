/* Hira — site interactions */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Theme toggle ─────────────────────────────────────── */
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('hira-theme', next); } catch (e) {}
    });
  }

  /* ── Nav shadow on scroll ─────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reveal on scroll ─────────────────────────────────── */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Wird streak grid animation ───────────────────────── */
  var wird = document.getElementById('wirdGrid');
  if (wird) {
    var cells = wird.querySelectorAll('i');
    cells.forEach(function (c, i) { c.style.setProperty('--i', String(i * 70)); });
    if ('IntersectionObserver' in window && !reduceMotion) {
      var wio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            wird.classList.add('play');
            wio.disconnect();
          }
        });
      }, { threshold: 0.5 });
      wio.observe(wird);
    } else {
      wird.classList.add('play');
    }
  }

  /* ── 3D tilt on hero phone ────────────────────────────── */
  var tilt = document.getElementById('tilt');
  if (tilt && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    var stage = tilt.parentElement;
    var rx = 0, ry = 0, tx = 0, ty = 0, raf = null;
    var loop = function () {
      rx += (tx - rx) * 0.09;
      ry += (ty - ry) * 0.09;
      tilt.style.transform = 'rotateX(' + rx.toFixed(3) + 'deg) rotateY(' + ry.toFixed(3) + 'deg)';
      if (Math.abs(tx - rx) > 0.01 || Math.abs(ty - ry) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else { raf = null; }
    };
    var kick = function () { if (!raf) raf = requestAnimationFrame(loop); };
    stage.addEventListener('pointermove', function (e) {
      var r = stage.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      tx = py * -9;
      ty = px * 11;
      kick();
    });
    stage.addEventListener('pointerleave', function () { tx = 0; ty = 0; kick(); });
  }

  /* ── Gallery arrows ───────────────────────────────────── */
  var gal = document.getElementById('gallery');
  if (gal) {
    var step = function () {
      var fig = gal.querySelector('figure');
      return fig ? fig.getBoundingClientRect().width + 22 : 320;
    };
    var prev = document.getElementById('galPrev');
    var next = document.getElementById('galNext');
    if (prev) prev.addEventListener('click', function () { gal.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { gal.scrollBy({ left: step(), behavior: 'smooth' }); });
  }

  /* ── Netlify forms (AJAX with graceful fallback) ──────── */
  var encode = function (data) {
    return Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  };

  var WHATSAPP_NUMBER = '94760448858';

  var wireForm = function (formId, successId, fineId) {
    var form = document.getElementById(formId);
    var success = document.getElementById(successId);
    var fine = document.getElementById(fineId);
    if (!form || !success) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = String(v); });
      var btn = form.querySelector('button[type="submit"]');
      var btnText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data)
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.hidden = true;
        success.hidden = false;
        var wa = success.querySelector('.wa-btn');
        if (wa && data.email) {
          var msg = "Hi! I signed up to test Ma'thurat Global. My email is: " + data.email;
          wa.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
          wa.hidden = false;
        }
        success.setAttribute('tabindex', '-1');
        success.focus({ preventScroll: false });
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = btnText; }
        if (fine) {
          fine.classList.add('err');
          fine.textContent = 'Something went wrong — please email circlehira@gmail.com instead.';
        }
      });
    });
  };

  wireForm('notifyForm', 'notifySuccess', 'notifyFine');
  wireForm('testersForm', 'testersSuccess', 'testersFine');

  /* ── Footer year ──────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
