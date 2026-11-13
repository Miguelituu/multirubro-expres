import { CATEGORIES, PRODUCTS } from './data/catalog.js';

const formatARS = (amount) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);

const ICONS = {
  shirt: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>',
  printer: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>',
  headphones: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>',
  home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
  sparkles: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"></path></svg>',
  gift: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>',
  dumbbell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 6.5l11 11"></path><path d="M21 21l-1-1"></path><path d="M3 3l1 1"></path><path d="M18 22l4-4"></path><path d="M2 6l4-4"></path><path d="M3 10l7-7"></path><path d="M14 21l7-7"></path></svg>',
  bag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
  chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>'
};

const state = {
  category: 'all',
  subcategory: null,
  search: '',
  sort: 'featured',
  wholesaleView: false,
  onlyOffers: false,
  onlyWishlist: false,
  wishlist: new Set(),
  cart: []
};

/* =========================================================
   1. Navigation Drawer (<dialog> + scroll-snap)
   ========================================================= */
function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const openBtn = document.getElementById('drawer-open');
  const closeBtn = document.getElementById('drawer-close');
  if (!drawer || !openBtn || !closeBtn) return;

  const scroller = drawer.querySelector('.Drawer-scroller');
  const sheet = drawer.querySelector('.Drawer-sheet');

  async function openDrawer() {
    drawer.showModal();
    if (!CSS.supports('scroll-initial-target', 'nearest')) {
      scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'instant' });
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
    scroller.scrollTo({ left: 0, behavior: 'auto' });
  }

  function closeDrawer() {
    scroller.scrollTo({ left: scroller.offsetWidth, behavior: 'auto' });
  }

  const visibleThreshold = 1 / Math.max(window.innerWidth, 1);
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      if (entry.intersectionRatio < visibleThreshold && drawer.open) {
        drawer.close();
        openBtn.setAttribute('aria-expanded', 'false');
      }
      if (entry.intersectionRatio === 1) {
        openBtn.setAttribute('aria-expanded', 'true');
      }
    },
    { root: drawer, threshold: [visibleThreshold, 1] }
  );
  observer.observe(sheet);

  if (!CSS.supports('animation-timeline: scroll()')) {
    scroller.addEventListener('scroll', () => {
      const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / Math.max(sheet.offsetWidth, 1)));
      drawer.style.setProperty('--drawer-backdrop', String(ratio));
    });
  }

  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (event) => {
    if (!sheet.contains(event.target)) closeDrawer();
  });

  drawer.addEventListener('cancel', (event) => {
    if (event.cancelable) {
      event.preventDefault();
      closeDrawer();
    }
  });

  drawer.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', () => closeDrawer());
  });

  return { closeDrawer };
}

/* =========================================================
   2. Hero Carousel (CSS Scroll-Snap + Accessible Controls)
   ========================================================= */
function initCarousel() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.querySelectorAll('[role="group"][aria-roledescription="slide"]'));
  const prevBtn = carousel.querySelector('[data-direction="previous"]');
  const nextBtn = carousel.querySelector('[data-direction="next"]');
  const markersNav = carousel.querySelector('.carousel-markers');
  const statusEl = carousel.querySelector('[role="status"]');

  let settledIndex = 0;
  let pendingIndex = null;
  let rafId = null;
  let scrollFallbackTimer = null;

  const markers = slides.map((slide, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', slide.dataset.markerName || `Ir a diapositiva ${index + 1}`);
    if (index === 0) btn.setAttribute('aria-current', 'true');
    btn.addEventListener('click', () => scrollToSlide(index));
    markersNav.appendChild(btn);
    return btn;
  });

  function getNearestIndex() {
    const center = track.scrollLeft + track.clientWidth / 2;
    let bestIndex = 0;
    let bestDist = Infinity;
    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = idx;
      }
    });
    return bestIndex;
  }

  function updateMarkers(activeIndex) {
    markers.forEach((btn, idx) => {
      if (idx === activeIndex) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
  }

  function updateControls(activeIndex) {
    prevBtn.disabled = activeIndex <= 0;
    nextBtn.disabled = activeIndex >= slides.length - 1;
  }

  function scrollToSlide(index) {
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    pendingIndex = clamped;
    updateMarkers(clamped);
    const targetSlide = slides[clamped];
    const delta = targetSlide.offsetLeft - track.scrollLeft;
    track.scrollBy({ left: delta, behavior: 'auto' });
  }

  function onScrollSettled() {
    const current = getNearestIndex();
    if (pendingIndex !== null && current !== pendingIndex) return;
    pendingIndex = null;
    updateMarkers(current);
    updateControls(current);
    if (current !== settledIndex) {
      settledIndex = current;
      statusEl.textContent = `Diapositiva ${current + 1} de ${slides.length}`;
    }
  }

  prevBtn.addEventListener('click', () => {
    const base = pendingIndex !== null ? pendingIndex : getNearestIndex();
    scrollToSlide(base - 1);
  });

  nextBtn.addEventListener('click', () => {
    const base = pendingIndex !== null ? pendingIndex : getNearestIndex();
    scrollToSlide(base + 1);
  });

  track.addEventListener('scroll', () => {
    if (pendingIndex === null && rafId === null) {
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateMarkers(getNearestIndex());
      });
    }
    if (!('onscrollend' in window)) {
      clearTimeout(scrollFallbackTimer);
      scrollFallbackTimer = setTimeout(onScrollSettled, 140);
    }
  });

  if ('onscrollend' in window) {
    track.addEventListener('scrollend', onScrollSettled);
  }

  updateControls(0);
}

/* =========================================================
   3. Category Sidebar, Flyout, Search & Filter Controls
   ========================================================= */
function selectCategory(categoryId, subcategory = null) {
  state.category = categoryId;
  state.subcategory = subcategory;
  state.onlyOffers = false;
  state.onlyWishlist = false;
  renderCategoryPills();
  renderProducts();
  document.getElementById('search-category').value = categoryId;
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initCategories(mobileDrawerApi) {
  const desktopList = document.getElementById('desktop-category-list');
  const mobileList = document.getElementById('mobile-category-list');
  const searchSelect = document.getElementById('search-category');
  const footerLinks = document.getElementById('footer-category-links');
  const sidebar = document.getElementById('desktop-category-sidebar');
  const flyout = document.getElementById('category-flyout');
  const flyoutTitle = document.getElementById('flyout-title');
  const flyoutTag = document.getElementById('flyout-tag');
  const flyoutSublist = document.getElementById('flyout-sublist');

  CATEGORIES.forEach((cat) => {
    // Search select option
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    searchSelect.appendChild(opt);

    // Desktop sidebar item
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'category-item-btn';
    btn.innerHTML = `
      <span class="cat-icon">${ICONS[cat.icon] || ''}</span>
      <span class="cat-label">${cat.name}</span>
      ${ICONS.chevronRight}
    `;
    btn.addEventListener('click', () => {
      flyout.hidden = true;
      selectCategory(cat.id);
    });
    btn.addEventListener('mouseenter', () => showFlyout(cat));
    btn.addEventListener('focus', () => showFlyout(cat));
    li.appendChild(btn);
    desktopList.appendChild(li);

    // Mobile drawer item
    const mLi = document.createElement('li');
    const mBtn = document.createElement('button');
    mBtn.type = 'button';
    mBtn.className = 'drawer-cat-btn';
    mBtn.innerHTML = `<span>${cat.name}</span>${ICONS.chevronRight}`;
    mBtn.addEventListener('click', () => {
      mobileDrawerApi?.closeDrawer();
      selectCategory(cat.id);
    });
    mLi.appendChild(mBtn);
    mobileList.appendChild(mLi);

    // Footer link (first 5)
    if (footerLinks.children.length < 5) {
      const fLi = document.createElement('li');
      const fBtn = document.createElement('button');
      fBtn.type = 'button';
      fBtn.textContent = cat.name;
      fBtn.addEventListener('click', () => selectCategory(cat.id));
      fLi.appendChild(fBtn);
      footerLinks.appendChild(fLi);
    }
  });

  function showFlyout(cat) {
    flyoutTitle.textContent = cat.name;
    flyoutTag.textContent = cat.featuredTag;
    flyoutSublist.innerHTML = '';
    cat.subcategories.forEach((sub) => {
      const subLi = document.createElement('li');
      const subBtn = document.createElement('button');
      subBtn.type = 'button';
      subBtn.textContent = sub;
      subBtn.addEventListener('click', () => {
        flyout.hidden = true;
        selectCategory(cat.id, sub);
      });
      subLi.appendChild(subBtn);
      flyoutSublist.appendChild(subLi);
    });
    flyout.hidden = false;
  }

  sidebar.addEventListener('mouseleave', () => {
    flyout.hidden = true;
  });

  // Toggle desktop sidebar
  const toggleBtn = document.getElementById('toggle-categories-btn');
  const heroGrid = document.querySelector('.hero-grid');
  toggleBtn?.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('is-collapsed');
    heroGrid.classList.toggle('sidebar-collapsed', collapsed);
    toggleBtn.setAttribute('aria-expanded', String(!collapsed));
  });

  document.getElementById('view-all-categories-btn')?.addEventListener('click', () => {
    selectCategory('all');
  });
}

function renderCategoryPills() {
  const container = document.getElementById('category-pills');
  container.innerHTML = '';

  const allPill = document.createElement('button');
  allPill.type = 'button';
  allPill.className = 'cat-pill';
  allPill.setAttribute('role', 'tab');
  allPill.setAttribute('aria-selected', String(state.category === 'all' && !state.onlyOffers && !state.onlyWishlist));
  allPill.textContent = 'Todos';
  allPill.addEventListener('click', () => selectCategory('all'));
  container.appendChild(allPill);

  CATEGORIES.forEach((cat) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'cat-pill';
    pill.setAttribute('role', 'tab');
    pill.setAttribute('aria-selected', String(state.category === cat.id));
    pill.textContent = cat.name;
    pill.addEventListener('click', () => selectCategory(cat.id));
    container.appendChild(pill);
  });
}

/* =========================================================
   4. Product Grid Rendering
   ========================================================= */
function getFilteredProducts() {
  let list = PRODUCTS.slice();

  if (state.category !== 'all') {
    list = list.filter((p) => p.category === state.category);
  }
  if (state.subcategory) {
    list = list.filter((p) => p.subcategory === state.subcategory);
  }
  if (state.onlyOffers) {
    list = list.filter((p) => p.discount >= 20);
  }
  if (state.onlyWishlist) {
    list = list.filter((p) => state.wishlist.has(p.id));
  }
  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  switch (state.sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      list.sort((a, b) => b.discount - a.discount);
      break;
    default:
      break;
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');
  const titleEl = document.getElementById('catalog-title');

  const items = getFilteredProducts();

  if (state.onlyWishlist) titleEl.textContent = 'Tus Favoritos';
  else if (state.onlyOffers) titleEl.textContent = 'Ofertas Flash (20%+ OFF)';
  else if (state.subcategory) titleEl.textContent = state.subcategory;
  else if (state.category !== 'all') {
    const cat = CATEGORIES.find((c) => c.id === state.category);
    titleEl.textContent = cat ? cat.name : 'Productos';
  } else {
    titleEl.textContent = 'Productos Destacados';
  }

  grid.innerHTML = '';

  if (items.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  const fragment = document.createDocumentFragment();
  items.forEach((product) => {
    const catName = CATEGORIES.find((c) => c.id === product.category)?.name || product.category;
    const isFav = state.wishlist.has(product.id);
    const activePrice = state.wholesaleView ? product.wholesalePrice : product.price;

    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-media">
        <span class="product-emoji" role="img" aria-label="${product.title}">${product.emoji}</span>
        <div class="product-badges">
          <span class="badge-discount">-${product.discount}%</span>
          <span class="badge-tag">${product.badge}</span>
        </div>
        <button
          type="button"
          class="wishlist-btn"
          aria-label="Guardar ${product.title} en favoritos"
          aria-pressed="${isFav}"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="product-body">
        <span class="product-category">${catName}</span>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-variants">
          ${product.variants.map((v) => `<span class="variant-chip">${v}</span>`).join('')}
        </div>
        <div class="product-pricing">
          <div class="price-row">
            <span class="price-current">${formatARS(activePrice)}</span>
            <span class="price-old">${formatARS(product.originalPrice)}</span>
          </div>
          <p class="price-wholesale">Mayorista (${product.wholesaleMin}+ u.): ${formatARS(product.wholesalePrice)}</p>
          <button type="button" class="add-to-cart-btn">Agregar al carrito</button>
        </div>
      </div>
    `;

    card.querySelector('.wishlist-btn').addEventListener('click', () => {
      if (state.wishlist.has(product.id)) state.wishlist.delete(product.id);
      else state.wishlist.add(product.id);
      document.getElementById('wishlist-count').textContent = String(state.wishlist.size);
      renderProducts();
    });

    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      addToCart(product);
    });

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

/* =========================================================
   5. Shopping Cart Drawer (<dialog>) & WhatsApp Checkout
   ========================================================= */
function addToCart(product) {
  const existing = state.cart.find((item) => item.product.id === product.id);
  if (existing) existing.qty += 1;
  else state.cart.push({ product, qty: 1 });
  updateCartUI();
  openCartDrawer();
}

function updateCartUI() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = String(totalQty);
  document.getElementById('cart-drawer-count').textContent = String(totalQty);

  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const noteEl = document.getElementById('cart-wholesale-note');
  const whatsappBtn = document.getElementById('cart-whatsapp-btn');

  container.innerHTML = '';

  if (state.cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Tu carrito está vacío. Agregá productos del catálogo para armar tu pedido.</p>';
    subtotalEl.textContent = formatARS(0);
    noteEl.textContent = '';
    whatsappBtn.setAttribute('href', '#');
    return;
  }

  let subtotal = 0;
  let wholesaleApplied = false;
  const lines = ['Hola Multirubro Expres! Quiero hacer el siguiente pedido:'];

  state.cart.forEach(({ product, qty }) => {
    const isWholesale = qty >= product.wholesaleMin;
    if (isWholesale) wholesaleApplied = true;
    const unitPrice = isWholesale ? product.wholesalePrice : product.price;
    const lineTotal = unitPrice * qty;
    subtotal += lineTotal;

    lines.push(`- ${qty}x ${product.title} (${formatARS(unitPrice)} c/u = ${formatARS(lineTotal)})`);

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-thumb" aria-hidden="true">${product.emoji}</div>
      <div class="cart-item-info">
        <h4>${product.title}</h4>
        <div class="cart-item-price">
          ${formatARS(unitPrice)} c/u ${isWholesale ? '<strong>(Mayorista)</strong>' : ''}
        </div>
      </div>
      <div class="cart-item-controls">
        <button type="button" class="qty-btn" data-action="dec" aria-label="Restar unidad">-</button>
        <span>${qty}</span>
        <button type="button" class="qty-btn" data-action="inc" aria-label="Sumar unidad">+</button>
        <button type="button" class="cart-item-remove" aria-label="Quitar producto">✕</button>
      </div>
    `;

    row.querySelector('[data-action="dec"]').addEventListener('click', () => {
      if (qty > 1) {
        state.cart.find((i) => i.product.id === product.id).qty -= 1;
      } else {
        state.cart = state.cart.filter((i) => i.product.id !== product.id);
      }
      updateCartUI();
    });

    row.querySelector('[data-action="inc"]').addEventListener('click', () => {
      state.cart.find((i) => i.product.id === product.id).qty += 1;
      updateCartUI();
    });

    row.querySelector('.cart-item-remove').addEventListener('click', () => {
      state.cart = state.cart.filter((i) => i.product.id !== product.id);
      updateCartUI();
    });

    container.appendChild(row);
  });

  subtotalEl.textContent = formatARS(subtotal);
  noteEl.textContent = wholesaleApplied
    ? '✓ Se aplicaron precios mayoristas en productos con cantidad mínima.'
    : 'Tip: Llevando 3+ unidades de un mismo producto accedés al precio mayorista.';

  lines.push(`Total estimado: ${formatARS(subtotal)}`);
  whatsappBtn.setAttribute('href', `https://wa.me/5491100000000?text=${encodeURIComponent(lines.join('\n'))}`);
}

function openCartDrawer() {
  const dialog = document.getElementById('cart-drawer');
  const openBtn = document.getElementById('cart-open-btn');
  if (!dialog.open) {
    dialog.showModal();
    openBtn?.setAttribute('aria-expanded', 'true');
  }
}

function initCartDrawer() {
  const dialog = document.getElementById('cart-drawer');
  const openBtn = document.getElementById('cart-open-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const clearBtn = document.getElementById('cart-clear-btn');

  openBtn?.addEventListener('click', openCartDrawer);
  closeBtn?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('close', () => openBtn?.setAttribute('aria-expanded', 'false'));
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  clearBtn?.addEventListener('click', () => {
    state.cart = [];
    updateCartUI();
  });
}

/* =========================================================
   6. Bootstrap App
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current-year').textContent = String(new Date().getFullYear());

  const mobileDrawerApi = initMobileDrawer();
  initCarousel();
  initCategories(mobileDrawerApi);
  initCartDrawer();
  renderCategoryPills();
  renderProducts();
  updateCartUI();

  // Search form
  document.getElementById('search-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.search = document.getElementById('search-input').value;
    state.category = document.getElementById('search-category').value;
    state.subcategory = null;
    state.onlyOffers = false;
    state.onlyWishlist = false;
    renderCategoryPills();
    renderProducts();
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('search-input')?.addEventListener('input', (e) => {
    state.search = e.target.value;
    renderProducts();
  });

  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderProducts();
  });

  document.getElementById('wholesale-mode-toggle')?.addEventListener('change', (e) => {
    state.wholesaleView = e.target.checked;
    renderProducts();
  });

  document.getElementById('wishlist-filter-btn')?.addEventListener('click', () => {
    state.onlyWishlist = !state.onlyWishlist;
    state.onlyOffers = false;
    renderCategoryPills();
    renderProducts();
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
    state.category = 'all';
    state.subcategory = null;
    state.search = '';
    state.onlyOffers = false;
    state.onlyWishlist = false;
    document.getElementById('search-input').value = '';
    document.getElementById('search-category').value = 'all';
    renderCategoryPills();
    renderProducts();
  });

  document.querySelectorAll('[data-jump-category]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      selectCategory(el.dataset.jumpCategory);
    });
  });

  document.querySelectorAll('[data-filter-offer="true"]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      state.category = 'all';
      state.subcategory = null;
      state.onlyOffers = true;
      state.onlyWishlist = false;
      renderCategoryPills();
      renderProducts();
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
