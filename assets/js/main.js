/* ============================================================================
   NGUYỄN THỊ NGA — main.js
   Không dùng thư viện ngoài. Tất cả tương tác đều tôn trọng
   prefers-reduced-motion và hoạt động được bằng bàn phím.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ------------------------------------------------- 1. Năm hiện tại ------ */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------- 2. Header + tiến độ -- */
  var header = $('#site-header');
  var progress = $('#scroll-progress');
  var toTop = $('#to-top');

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 24);
    if (toTop) toTop.classList.toggle('is-shown', y > 600);

    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }

    // Ở đầu trang thì không mục nào đang được xem → bỏ hết đánh dấu.
    if (y < 220) clearActiveNav();
  }

  function clearActiveNav() {
    $$('.nav__list a.is-active').forEach(function (a) { a.classList.remove('is-active'); });
  }

  // Hàm này được gán ở mục 4 & 5; khai báo trước để onFrame gọi được.
  var sweepReveal = function () {};
  var sweepCounters = function () {};

  function onFrame() {
    onScroll();
    sweepReveal();
    sweepCounters();
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onFrame(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', function () { onFrame(); }, { passive: true });
  window.addEventListener('load', function () { onFrame(); });

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------- 3. Menu di động ------ */
  var navToggle = $('#nav-toggle');
  var nav = $('#primary-nav');

  function closeNav() {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Mở menu');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navToggle.setAttribute('aria-label', open ? 'Mở menu' : 'Đóng menu');
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });

    $$('a', nav).forEach(function (a) { a.addEventListener('click', closeNav); });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeNav(); closeLightbox(); }
  });

  /* ------------------------------------------------- 4. Hiệu ứng hiện dần - */
  var revealEls = $$('[data-reveal]');
  revealEls.forEach(function (el) {
    var d = el.getAttribute('data-reveal-delay');
    if (d) el.style.setProperty('--d', d);
  });

  /* Cố ý KHÔNG dùng IntersectionObserver ở đây: khi người dùng cuộn thật nhanh
     (vuốt mạnh, phím End, hoặc mở trang bằng link #neo), IO có thể bỏ sót phần tử
     lướt qua trong cùng một khung hình — hậu quả là cả một mục nội dung bị ẩn
     vĩnh viễn. Cách quét theo vị trí dưới đây thì không bao giờ bỏ sót. */
  var pendingReveal = revealEls.slice();

  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
    pendingReveal = [];
  } else {
    sweepReveal = function () {
      if (!pendingReveal.length) return;
      var limit = window.innerHeight * 0.92;
      pendingReveal = pendingReveal.filter(function (el) {
        if (el.getBoundingClientRect().top >= limit) return true;
        el.classList.add('is-in');
        return false;
      });
    };
  }

  /* ------------------------------------------------- 5. Đếm số ----------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var fmt = function (n) { return n.toLocaleString('vi-VN'); };

    if (reduceMotion) { el.textContent = fmt(target); return; }

    var duration = 1600;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var pendingCounters = $$('.count');
  sweepCounters = function () {
    if (!pendingCounters.length) return;
    var limit = window.innerHeight * 0.9;
    pendingCounters = pendingCounters.filter(function (el) {
      if (el.getBoundingClientRect().top >= limit) return true;
      animateCount(el);
      return false;
    });
  };

  // Chạy ngay một lượt cho phần nội dung đang nằm trong màn hình đầu tiên.
  onFrame();

  /* ------------------------------------------------- 6. Scrollspy -------- */
  var navLinks = $$('.nav__list a[href^="#"]');
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------- 7. Slider cảm nhận -- */
  var slider = $('#testimonial-slider');
  if (slider) {
    var track = $('.slider__track', slider);
    var slides = $$('.quote', track);
    var dotsWrap = $('#testimonial-dots');
    var index = 0;

    function perView() {
      if (!slides.length) return 1;
      var trackWidth = slider.clientWidth;
      var slideWidth = slides[0].getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return Math.max(1, Math.round((trackWidth + gap) / (slideWidth + gap)));
    }

    function maxIndex() { return Math.max(0, slides.length - perView()); }

    function render() {
      if (!slides.length) return;
      index = Math.min(Math.max(index, 0), maxIndex());
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      var step = slides[0].getBoundingClientRect().width + gap;
      track.style.transform = 'translateX(' + (-index * step) + 'px)';

      slides.forEach(function (s, i) {
        var visible = i >= index && i < index + perView();
        s.setAttribute('aria-hidden', String(!visible));
      });

      $$('button', dotsWrap).forEach(function (b, i) {
        var active = i === index;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      for (var i = 0; i <= maxIndex(); i++) {
        (function (i) {
          var b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-label', 'Xem cảm nhận ' + (i + 1));
          b.addEventListener('click', function () { index = i; render(); });
          dotsWrap.appendChild(b);
        })(i);
      }
    }

    function go(dir) { index += dir; if (index < 0) index = maxIndex(); if (index > maxIndex()) index = 0; render(); }

    $$('[data-slide]').forEach(function (btn) {
      btn.addEventListener('click', function () { go(btn.getAttribute('data-slide') === 'next' ? 1 : -1); });
    });

    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });

    // Vuốt trên điện thoại
    var startX = null;
    slider.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { buildDots(); render(); }, 180);
    });

    buildDots();
    render();
  }

  /* ------------------------------------------------- 8. Accordion -------- */
  $$('.acc').forEach(function (acc, i) {
    var head = $('.acc__head', acc);
    var panel = $('.acc__panel', acc);
    if (!head || !panel) return;

    // Nối nút với phần trả lời để trình đọc màn hình hiểu đúng.
    var pid = 'acc-panel-' + (i + 1);
    var hid = 'acc-head-' + (i + 1);
    panel.id = pid;
    head.id = hid;
    head.setAttribute('aria-controls', pid);
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', hid);

    head.addEventListener('click', function () {
      var open = acc.classList.contains('is-open');
      // Đóng các mục khác trong cùng nhóm
      var group = acc.closest('.accordion');
      if (group) {
        $$('.acc', group).forEach(function (other) {
          if (other === acc) return;
          other.classList.remove('is-open');
          var h = $('.acc__head', other);
          if (h) h.setAttribute('aria-expanded', 'false');
        });
      }
      acc.classList.toggle('is-open', !open);
      head.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ------------------------------------------------- 9. Lightbox --------- */
  var lightbox = $('#lightbox');
  var lbImg = $('#lightbox-img');
  var lbCap = $('#lightbox-cap');
  var lbClose = $('#lightbox-close');
  var lastFocused = null;

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    lbImg.src = src;
    lbImg.alt = caption || '';
    lbCap.textContent = caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    var done = function () { lightbox.hidden = true; lbImg.src = ''; };
    if (reduceMotion) done(); else setTimeout(done, 320);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  $$('[data-lightbox]').forEach(function (tile) {
    tile.addEventListener('click', function () {
      openLightbox(tile.getAttribute('data-lightbox'), tile.getAttribute('data-caption') || '');
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ------------------------------------------------- 10. Form liên hệ ---- */
  var form = $('#contact-form');
  if (form) {
    var status = $('#form-status');

    var RULES = {
      'ten': function (v) { return v.trim().length >= 2 || 'Bạn cho tôi biết tên gọi nhé.'; },
      'sdt': function (v) {
        var digits = v.replace(/[^\d+]/g, '');
        return /^(\+?84|0)\d{8,10}$/.test(digits) || 'Số điện thoại chưa đúng định dạng.';
      },
      'email': function (v) {
        if (!v.trim()) return true; // không bắt buộc
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Email chưa đúng định dạng.';
      },
      'loi-nhan': function (v) { return v.trim().length >= 10 || 'Viết giúp tôi vài dòng (ít nhất 10 ký tự).'; },
      'dong-y': function (_, el) { return el.checked || 'Bạn cần đồng ý để tôi có thể liên hệ lại.'; }
    };

    function setError(name, message) {
      var el = form.elements[name];
      var box = $('[data-err-for="' + name + '"]', form);
      var field = el && el.closest ? el.closest('.field') : null;
      if (box) {
        box.textContent = message || '';
        box.classList.toggle('is-shown', Boolean(message));
      }
      if (field) field.classList.toggle('has-error', Boolean(message));
      if (el) el.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validateField(name) {
      var el = form.elements[name];
      if (!el) return true;
      var result = RULES[name](el.value || '', el);
      setError(name, result === true ? '' : result);
      return result === true;
    }

    Object.keys(RULES).forEach(function (name) {
      var el = form.elements[name];
      if (!el) return;
      el.addEventListener('blur', function () { validateField(name); });
      el.addEventListener('input', function () {
        var box = $('[data-err-for="' + name + '"]', form);
        if (box && box.classList.contains('is-shown')) validateField(name);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) { status.textContent = ''; status.className = 'form__status'; }

      var ok = true;
      var firstBad = null;
      Object.keys(RULES).forEach(function (name) {
        var valid = validateField(name);
        if (!valid && !firstBad) firstBad = form.elements[name];
        ok = ok && valid;
      });

      if (!ok) {
        if (firstBad && firstBad.focus) firstBad.focus();
        if (status) {
          status.textContent = 'Còn vài ô cần bạn xem lại giúp tôi.';
          status.className = 'form__status is-err';
        }
        return;
      }

      var action = form.getAttribute('action');
      var btn = $('button[type="submit"]', form);

      // Chưa cấu hình endpoint → chỉ báo thành công tại chỗ (chế độ xem thử).
      if (!action || action === '#') {
        if (status) {
          status.textContent = 'Cảm ơn bạn! (Form đang ở chế độ xem thử — xem README.md để nối tới email thật.)';
          status.className = 'form__status is-ok';
        }
        form.reset();
        return;
      }

      if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }
      if (status) { status.textContent = 'Đang gửi...'; status.className = 'form__status'; }

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          if (status) {
            status.textContent = 'Đã gửi! Tôi sẽ trả lời bạn trong vòng 24 giờ.';
            status.className = 'form__status is-ok';
          }
          form.reset();
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Gửi chưa được. Bạn nhắn Zalo 0900 000 000 giúp tôi nhé.';
            status.className = 'form__status is-err';
          }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.style.opacity = ''; }
        });
    });
  }
})();
