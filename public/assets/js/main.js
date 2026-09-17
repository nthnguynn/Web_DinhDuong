/* ============================================================================
   TẠ THỊ NGA — main.js
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

  /* ------------------------------------------------- 10. Form (dùng chung) */
  // Cả form Liên hệ và form trong popup đều gửi về /api/lien-he (lưu vào database).
  var PHONE_RE = /^(\+?84|0)\d{8,10}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var ZALO_TEXT = 'Gửi chưa được. Bạn nhắn Zalo 0900 000 000 giúp tôi nhé.';

  var RULE = {
    ten: function (v) { return v.trim().length >= 2 || 'Bạn cho tôi biết tên gọi nhé.'; },
    sdt: function (v) { return PHONE_RE.test(v.replace(/[^\d+]/g, '')) || 'Số điện thoại chưa đúng định dạng.'; },
    emailOptional: function (v) {
      if (!v.trim()) return true;
      return EMAIL_RE.test(v.trim()) || 'Email chưa đúng định dạng.';
    },
    emailRequired: function (v) {
      if (!v.trim()) return 'Bạn điền email giúp tôi nhé.';
      return EMAIL_RE.test(v.trim()) || 'Email chưa đúng định dạng.';
    },
    loiNhan: function (v) { return v.trim().length >= 10 || 'Viết giúp tôi vài dòng (ít nhất 10 ký tự).'; },
    dongY: function (_, el) { return el.checked || 'Bạn cần đồng ý để tôi có thể liên hệ lại.'; }
  };

  function setupForm(form, rules, onSuccess) {
    var status = $('.form__status', form);

    function setStatus(text, kind) {
      if (!status) return;
      status.textContent = text;
      status.className = 'form__status' + (kind ? ' is-' + kind : '');
    }

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
      var result = rules[name](el.value || '', el);
      setError(name, result === true ? '' : result);
      return result === true;
    }

    Object.keys(rules).forEach(function (name) {
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
      setStatus('');

      var ok = true;
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        var valid = validateField(name);
        if (!valid && !firstBad) firstBad = form.elements[name];
        ok = ok && valid;
      });

      if (!ok) {
        if (firstBad && firstBad.focus) firstBad.focus();
        setStatus('Còn vài ô cần bạn xem lại giúp tôi.', 'err');
        return;
      }

      var btn = $('button[type="submit"]', form);
      if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; }
      setStatus('Đang gửi...');

      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            if (res.ok && data.ok) {
              form.reset();
              setStatus('Đã gửi! Tôi sẽ trả lời bạn trong vòng 24 giờ.', 'ok');
              if (onSuccess) onSuccess(data);
              return;
            }
            // Server báo lỗi từng ô → hiện đúng chỗ
            if (data.errors) Object.keys(data.errors).forEach(function (name) { setError(name, data.errors[name]); });
            setStatus(data.message || ZALO_TEXT, 'err');
          });
        })
        .catch(function () { setStatus(ZALO_TEXT, 'err'); })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.style.opacity = ''; }
        });
    });
  }

  // Gửi thành công → chuyển khách vào nhóm Zalo (link ZALO_GROUP_URL trong .env).
  // Mở ngay trong tab hiện tại: trên điện thoại link zalo.me/g/... sẽ bật app Zalo.
  var ZALO_REDIRECT_MS = 1800;
  function goToZalo(url) {
    if (!url) return false;
    setTimeout(function () { window.location.href = url; }, ZALO_REDIRECT_MS);
    return true;
  }

  var contactForm = $('#contact-form');
  if (contactForm) {
    setupForm(contactForm, {
      'ten': RULE.ten,
      'sdt': RULE.sdt,
      'email': RULE.emailOptional,
      'loi-nhan': RULE.loiNhan,
      'dong-y': RULE.dongY
    }, function (data) {
      markLeadSent();
      if (goToZalo(data.redirect)) {
        var st = $('.form__status', contactForm);
        if (st) st.textContent = 'Đã gửi! Đang chuyển bạn vào nhóm Zalo...';
      }
    });
  }

  /* ------------------------------------------------- 11. Popup giữ chỗ ---- */
  // Mở khi khách bấm nút có data-open-lead, và TỰ HIỆN định kỳ theo cài đặt trong
  // /quan-tri/cai-dat (lấy qua /api/cau-hinh):
  //   popupBatSau — hiện lần đầu sau N giây (0 = không hiện theo thời gian)
  //   popupCuon   — hoặc hiện khi khách cuộn tới N% trang (0 = tắt); cái nào tới trước thì hiện
  //   popupLapLai — khách đóng thì N giây sau hiện lại (0 = không hiện lại)
  //   popupToiDa  — tự hiện tối đa N lần mỗi lượt truy cập (0 = không giới hạn)
  // Khách đã gửi form (popup hoặc Liên hệ) thì không tự hiện nữa.
  var leadModal = $('#lead-modal');
  var leadSent = false;

  function markLeadSent() {
    leadSent = true;
    writeStore('localStorage', 'lead-sent', '1');
  }

  // sessionStorage/localStorage có thể bị chặn (ẩn danh) → không được làm hỏng popup.
  function readStore(kind, key) {
    try { return window[kind].getItem(key); } catch (err) { return null; }
  }
  function writeStore(kind, key, value) {
    try { window[kind].setItem(key, value); } catch (err) { /* bỏ qua */ }
  }

  if (leadModal) {
    var leadBody = $('#lead-body');
    var leadDone = $('#lead-done');
    var leadForm = $('#lead-form');
    var leadLastFocus = null;
    var AUTO = { popupBatSau: 0, popupLapLai: 0, popupToiDa: 0, popupCuon: 0 };
    var autoTimer = null;
    var autoCount = Number(readStore('sessionStorage', 'lead-auto-count')) || 0;
    var autoShownThisPage = false;
    leadSent = leadSent || readStore('localStorage', 'lead-sent') === '1';

    var autoAllowed = function () {
      if (leadSent || !(AUTO.popupBatSau > 0 || AUTO.popupCuon > 0)) return false;
      return !AUTO.popupToiDa || autoCount < AUTO.popupToiDa;
    };

    // Tự mở nếu được phép. Trả về false khi khách đang bận (để thử lại sau).
    var tryAutoOpen = function () {
      if (!leadModal.hidden || !autoAllowed()) return true;
      // Không chen ngang khi khách đang xem ảnh, mở menu hoặc đang gõ form Liên hệ
      var busy = (lightbox && !lightbox.hidden) ||
        document.body.classList.contains('nav-open') ||
        (contactForm && contactForm.contains(document.activeElement));
      if (busy) return false;
      autoCount++;
      autoShownThisPage = true;
      writeStore('sessionStorage', 'lead-auto-count', String(autoCount));
      openLead();
      return true;
    };

    var scheduleAuto = function (seconds) {
      clearTimeout(autoTimer);
      if (!seconds || !autoAllowed()) return;
      autoTimer = setTimeout(function () {
        if (!tryAutoOpen()) scheduleAuto(10);
      }, seconds * 1000);
    };

    // Lần hiện đầu tiên theo độ cuộn trang (các lần sau do popupLapLai quyết định)
    var onScrollLead = function () {
      if (autoShownThisPage || !AUTO.popupCuon) return;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var percent = max > 0 ? ((window.scrollY || doc.scrollTop) / max) * 100 : 0;
      if (percent >= AUTO.popupCuon && tryAutoOpen()) {
        window.removeEventListener('scroll', onScrollLead);
      }
    };

    var openLead = function () {
      if (!leadModal.hidden) return;
      closeNav();
      leadLastFocus = document.activeElement;
      leadModal.hidden = false;
      document.body.style.overflow = 'hidden';
      clearTimeout(autoTimer);
      window.requestAnimationFrame(function () { leadModal.classList.add('is-open'); });
      var first = $('input:not([type="hidden"]):not([tabindex="-1"])', leadBody || leadModal);
      if (first) first.focus({ preventScroll: true });
    };

    var closeLead = function () {
      if (leadModal.hidden) return;
      leadModal.classList.remove('is-open');
      document.body.style.overflow = '';
      var done = function () {
        leadModal.hidden = true;
        // Lần mở sau lại thấy form (khách có thể đăng ký thêm cho người thân)
        if (leadBody && leadDone && !leadDone.hidden) { leadDone.hidden = true; leadBody.hidden = false; }
      };
      if (reduceMotion) done(); else setTimeout(done, 320);
      if (leadLastFocus && leadLastFocus.focus) leadLastFocus.focus();
      scheduleAuto(AUTO.popupLapLai);
    };

    $$('[data-open-lead]').forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.preventDefault(); openLead(); });
    });
    $$('[data-lead-close]', leadModal).forEach(function (btn) { btn.addEventListener('click', closeLead); });
    leadModal.addEventListener('click', function (e) { if (e.target === leadModal) closeLead(); });

    document.addEventListener('keydown', function (e) {
      if (leadModal.hidden) return;
      if (e.key === 'Escape') { closeLead(); return; }
      if (e.key !== 'Tab') return;
      // Giữ phím Tab chạy vòng bên trong popup
      var focusables = $$('a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), select, textarea', leadModal)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!focusables.length) return;
      var firstEl = focusables[0];
      var lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    });

    if (leadForm) {
      setupForm(leadForm, { ten: RULE.ten, sdt: RULE.sdt, email: RULE.emailRequired }, function (data) {
        markLeadSent();
        if (leadBody && leadDone) {
          leadBody.hidden = true;
          leadDone.hidden = false;
          var zalo = $('#lead-zalo');
          var doneText = $('#lead-done-text');
          if (data.redirect) {
            // Nút dự phòng nếu trình duyệt (vd. trong app Facebook) chặn chuyển trang
            if (zalo) {
              zalo.href = data.redirect;
              zalo.removeAttribute('target');
              zalo.textContent = 'Vào nhóm Zalo ngay';
            }
            if (doneText) doneText.textContent = 'Đang chuyển bạn vào nhóm Zalo của cô Nga... Nếu chưa tự chuyển, bấm nút bên dưới nhé.';
            goToZalo(data.redirect);
          }
          if (zalo) zalo.focus();
        }
      });
    }

    if (!leadSent && window.fetch) {
      fetch('/api/cau-hinh', { headers: { Accept: 'application/json' } })
        .then(function (res) { return res.json(); })
        .then(function (cfg) {
          AUTO = cfg;
          scheduleAuto(AUTO.popupBatSau);
          if (AUTO.popupCuon > 0) {
            window.addEventListener('scroll', onScrollLead, { passive: true });
            onScrollLead(); // mở bằng link #neo có thể đã ở giữa trang
          }
        })
        .catch(function () { /* không đọc được cài đặt → chỉ mở khi bấm nút */ });
    }
  }
})();
