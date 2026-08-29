(function () {
  'use strict';

  var pageName = location.pathname.split('/').pop() || 'index.html';
  pageName = pageName.replace('.html', '') || 'index';
  document.body.classList.add('redesign', 'page-' + pageName);

  var frame = document.body.firstElementChild;
  if (!frame || frame.tagName !== 'DIV') return;
  frame.classList.add('site-frame');

  var logo = document.querySelector('.site-logo');
  var header = logo ? logo.closest('div[style*="position:sticky"]') : null;
  if (header) {
    header.classList.add('site-header');
    header.setAttribute('role', 'banner');
    if (header.firstElementChild) header.firstElementChild.classList.add('site-header__inner');
  }

  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  var navButton = document.querySelector('.nav-burger');
  if (navToggle && siteNav) {
    siteNav.id = 'site-navigation';
    siteNav.setAttribute('role', 'navigation');
    siteNav.setAttribute('aria-label', '主要ナビゲーション');
    navToggle.setAttribute('aria-controls', siteNav.id);
    navToggle.setAttribute('aria-expanded', String(navToggle.checked));
    navToggle.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('tabindex', '-1');
    if (navButton) {
      navButton.setAttribute('role', 'button');
      navButton.setAttribute('tabindex', '0');
      navButton.setAttribute('aria-label', 'メニューを開閉');
      navButton.setAttribute('aria-controls', siteNav.id);
      navButton.setAttribute('aria-expanded', String(navToggle.checked));
      navButton.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        navToggle.checked = !navToggle.checked;
        navToggle.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
    navToggle.addEventListener('change', function () {
      navToggle.setAttribute('aria-expanded', String(navToggle.checked));
      if (navButton) navButton.setAttribute('aria-expanded', String(navToggle.checked));
    });
  }

  var footer = frame.lastElementChild;
  if (footer && footer !== header) {
    footer.classList.add('site-footer');
    footer.setAttribute('role', 'contentinfo');
    if (footer.firstElementChild) footer.firstElementChild.classList.add('site-footer__inner');
  }

  var currentFile = pageName === 'index' ? 'index.html' : pageName + '.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('#')[0];
    if (href === currentFile || (pageName === 'index' && href === '/')) {
      link.classList.add('is-current');
      link.setAttribute('aria-current', 'page');
    }
  });

  var directBlocks = Array.prototype.slice.call(frame.children);
  directBlocks.forEach(function (block) {
    if (block === header || block === footer) return;
    block.classList.add('content-block');
    var inline = block.getAttribute('style') || '';
    if (inline.indexOf('background-image') !== -1 && block.children.length === 0) {
      block.classList.add('photo-break');
    }

    var copy = (block.textContent || '').replace(/\s+/g, ' ').trim();
    if (copy.indexOf('目次') !== -1) block.classList.add('toc-section');
    if (copy.indexOf('TRAJECTORY in NUMBERS') !== -1) block.classList.add('metrics-section');
    if (copy.indexOf('PEOPLE') !== -1 && copy.indexOf('この場を、つくっている人たち。') !== -1) {
      block.classList.add('people-section');
    }
    if (copy.indexOf('PROJECTS') !== -1 && copy.indexOf('やっていること') !== -1) {
      block.classList.add('projects-section');
    }
    if (copy.indexOf('LOCAL PROS') !== -1) block.classList.add('local-pros-section');
    if (copy.indexOf('PARTNERS ── 全国の仲間') !== -1) block.classList.add('partners-directory-section');
    if (copy.indexOf('TERMS ── 契約と条件') !== -1) block.classList.add('terms-section');
    if (copy.indexOf('BENEFITS ── 契約特典') !== -1) block.classList.add('benefits-section');
    if (copy.indexOf('SMALL SUPPORT ── 小口支援・寄付') !== -1) block.classList.add('small-support-section');
    if (copy.indexOf('WHAT YOU FINANCE FOR') !== -1) block.classList.add('finance-uses-section');
    if (copy.indexOf('WORLDVIEW ── SHINDOに至る歴史観') !== -1) block.classList.add('worldview-section');
    if (copy.indexOf('ORGANIZATION ── 体制') !== -1) block.classList.add('organization-section');
    if (block.id === 'r-migrate' || block.id === 'r-commute') block.classList.add('role-section');
    if (copy.indexOf('住んで支える') !== -1 && copy.indexOf('応募フォームへ') !== -1) {
      block.classList.add('resident-entry-section');
    }
  });

  var shells = Array.prototype.slice.call(
    document.querySelectorAll('div[style*="max-width:1180px"]')
  ).filter(function (shell) {
    return !shell.closest('.site-header') && !shell.closest('.site-footer');
  });
  shells.forEach(function (shell) {
    shell.classList.add('site-shell');
    if (shell.querySelector('.project-tabs')) shell.classList.add('is-controls-shell');
    if (shell.closest('[role="tabpanel"]')) shell.classList.add('is-panel-shell');
  });
  if (shells[0]) shells[0].classList.add('is-page-hero');
  shells.slice(1).forEach(function (shell) {
    if (!shell.classList.contains('is-controls-shell') && !shell.classList.contains('is-panel-shell')) {
      shell.classList.add('is-section-shell');
    }
  });

  document.querySelectorAll('[style*="height:460px"], [style*="height:420px"], [style*="height:380px"], [style*="height:340px"], [style*="height:300px"]').forEach(function (photo) {
    if ((photo.getAttribute('style') || '').indexOf('background-image') !== -1) {
      photo.classList.add('photo-break');
    }
  });

  document.querySelectorAll('[style*="display:grid"], [style*="display: grid"]').forEach(function (grid) {
    grid.classList.add('field-grid');
    var gridStyle = grid.getAttribute('style') || '';
    var children = Array.prototype.slice.call(grid.children);
    var copy = (grid.textContent || '').replace(/\s+/g, ' ').trim();

    if (gridStyle.indexOf('170px') !== -1 && children.length >= 4) {
      grid.classList.add(copy.indexOf('PERIOD / SITE') === 0 ? 'project-head' : 'project-row');
      if (copy.indexOf('PERIOD / SITE') !== 0) {
        children[children.length - 1].classList.add('project-status');
        var stamp = children[children.length - 1].querySelector('span');
        if (stamp) stamp.classList.add('status-stamp');
      }
    }

    if (gridStyle.indexOf('repeat(3,1fr)') !== -1 || gridStyle.indexOf('repeat(3, 1fr)') !== -1) {
      grid.classList.add('field-grid--three');
    }
    if (gridStyle.indexOf('repeat(4,1fr)') !== -1 || gridStyle.indexOf('repeat(4, 1fr)') !== -1) {
      grid.classList.add('field-grid--four');
    }

    var compactGridStyle = gridStyle.replace(/\s+/g, '');
    if (
      /grid-template-columns:(120|180|200|280)px1fr/.test(compactGridStyle) &&
      children.length >= 4 && children.length % 2 === 0
    ) {
      grid.classList.add('editorial-list');
      if (grid.closest('.role-section')) grid.classList.add('job-spec-list');
    }
    if (grid.closest('.partners-directory-section') && children.length === 6) {
      grid.classList.add('people-directory');
    }
    if (grid.closest('.benefits-section') && children.length === 6) {
      grid.classList.add('benefits-grid');
    }
  });

  document.querySelectorAll('[style*="background-image"]').forEach(function (photo) {
    photo.classList.add('field-photo');
    if (photo.tagName === 'DIV') photo.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll('img').forEach(function (photo) {
    photo.classList.add('field-photo');
  });

  document.querySelectorAll('.field-photo').forEach(function (photo) {
    var source = ((photo.getAttribute('style') || '') + ' ' + (photo.getAttribute('src') || '')).toLowerCase();
    if (/people-(uno-hiroyasu-v2|oshima-takeo|ueno-takuya)/.test(source)) {
      photo.classList.add('portrait-photo');
      photo.removeAttribute('aria-hidden');
      photo.setAttribute('role', 'img');
      var portraitCard = photo.closest('.field-grid > div, .people-item');
      var portraitName = portraitCard ? portraitCard.querySelector('h2, h3') : null;
      if (portraitName) photo.setAttribute('aria-label', portraitName.textContent.trim() + 'の写真');
    }
    if (/recruit-(family|live|suiro|cfb|yurie-marche)/.test(source)) {
      photo.classList.add('life-photo');
    }
    if (/(muno-group|partners-nomadics|village-onogawa)/.test(source)) {
      photo.classList.add('community-photo');
    }
  });

  document.querySelectorAll('div, span').forEach(function (node) {
    var style = node.getAttribute('style') || '';
    var text = (node.textContent || '').replace(/\s+/g, ' ').trim();
    if (node.classList.contains('status-stamp') || node.closest('.project-head')) return;
    if (!text || text.length > 72 || node.children.length > 2) return;
    if (
      style.indexOf('letter-spacing:.3em') !== -1 ||
      style.indexOf('letter-spacing: .3em') !== -1 ||
      (style.indexOf('JetBrains Mono') !== -1 && text.length < 48)
    ) {
      node.classList.add('field-label');
    }
  });

  /* Map legacy inline type values to the shared 12/14px UI roles. */
  document.querySelectorAll('.content-block [style*="font-size"]').forEach(function (node) {
    if (/^(P|LI|H1|H2|H3)$/.test(node.tagName)) return;
    var sizeMatch = (node.getAttribute('style') || '').match(/font-size:\s*([\d.]+)px/i);
    if (!sizeMatch) return;
    var inlineSize = Number(sizeMatch[1]);
    if (inlineSize <= 12) node.classList.add('type-meta');
    else if (inlineSize < 16) node.classList.add('type-ui');
    else if (inlineSize < 20) node.classList.add('type-supporting');
    else if (inlineSize < 24) node.classList.add('type-card-title');
    else if (inlineSize < 30) node.classList.add('type-stat');
  });

  document.querySelectorAll('.field-grid > a, .field-grid > div').forEach(function (card) {
    if (card.closest('.site-header') || card.closest('.site-footer')) return;
    if (card.closest('.editorial-list, .people-directory, .benefits-grid')) return;
    var style = card.getAttribute('style') || '';
    if (
      style.indexOf('background') !== -1 ||
      style.indexOf('border') !== -1 ||
      card.querySelector('.field-photo')
    ) {
      card.classList.add('field-card');
    }
  });

  document.querySelectorAll('.portrait-photo').forEach(function (photo) {
    var card = photo.closest('.field-card');
    if (card) card.classList.add('portrait-card');
  });

  document.querySelectorAll('.page-people .field-grid--three > .portrait-card').forEach(function (card) {
    card.classList.add('founder-card');
  });

  document.querySelectorAll('.page-projects [role="tabpanel"] .field-card').forEach(function (card) {
    var cardMarkup = card.getAttribute('style') || '';
    var innerMarkup = Array.prototype.map.call(card.children, function (child) {
      return child.getAttribute('style') || '';
    }).join(' ');
    if (innerMarkup.indexOf('#EFD97A') !== -1) card.classList.add('is-field-partner');
    if (innerMarkup.indexOf('#E8CFC6') !== -1) card.classList.add('is-funding-partner');
    if (cardMarkup.indexOf('#93293C') !== -1) card.classList.add('is-complete-card');
  });

  document.querySelectorAll(
    '[style*="background:#4A1520"], [style*="background: #4A1520"], ' +
    '[style*="background:#3C1019"], [style*="background: #3C1019"], ' +
    '[style*="background:#42101A"], [style*="background: #42101A"], ' +
    '[style*="background:#4B1520"], [style*="background: #4B1520"]'
  ).forEach(function (block) {
    block.classList.add('on-dark');
  });

  document.querySelectorAll('.content-block.on-dark').forEach(function (block) {
    if (block.querySelector('a') && block.querySelectorAll('a').length <= 2) {
      block.classList.add('cta-band');
    }
  });

  document.querySelectorAll('.site-shell, .field-card, .project-row, figure').forEach(function (item, index) {
    item.classList.add('reveal');
    item.style.setProperty('--reveal-delay', String(Math.min(index % 6, 4) * 55) + 'ms');
  });

  var rail = document.createElement('div');
  rail.className = 'wayline';
  rail.setAttribute('aria-hidden', 'true');
  rail.innerHTML =
    '<svg viewBox="0 0 64 1000" preserveAspectRatio="none">' +
      '<path class="wayline__base" d="M42 0 C8 120 58 220 25 340 C4 430 55 535 30 650 C12 755 60 860 22 1000" pathLength="1"></path>' +
      '<path class="wayline__progress" d="M42 0 C8 120 58 220 25 340 C4 430 55 535 30 650 C12 755 60 860 22 1000" pathLength="1"></path>' +
    '</svg>';
  frame.insertBefore(rail, header ? header.nextSibling : frame.firstChild);

  var progressPath = rail.querySelector('.wayline__progress');
  function updateWayline() {
    var max = document.documentElement.scrollHeight - innerHeight;
    var progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    progressPath.style.strokeDashoffset = String(1 - progress);
    document.documentElement.style.setProperty('--page-progress', String(progress));
  }
  updateWayline();
  addEventListener('scroll', updateWayline, { passive: true });
  addEventListener('resize', updateWayline, { passive: true });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (item) {
      observer.observe(item);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  var main = document.createElement('main');
  main.id = 'main-content';
  var mainChildren = Array.prototype.slice.call(frame.children).filter(function (child) {
    return child !== header && child !== footer;
  });
  if (footer) frame.insertBefore(main, footer);
  else frame.appendChild(main);
  mainChildren.forEach(function (child) { main.appendChild(child); });

  var skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = '本文へ移動';
  frame.insertBefore(skipLink, header || frame.firstChild);

  document.querySelectorAll('.site-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      var toggle = document.querySelector('.nav-toggle');
      if (toggle) {
        toggle.checked = false;
        toggle.setAttribute('aria-expanded', 'false');
        if (navButton) navButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || !navToggle || !navToggle.checked) return;
    navToggle.checked = false;
    navToggle.setAttribute('aria-expanded', 'false');
    if (navButton) {
      navButton.setAttribute('aria-expanded', 'false');
      navButton.focus();
    }
  });
}());
