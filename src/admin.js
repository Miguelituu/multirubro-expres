import {
  getCategories,
  getOrders,
  getProducts,
  getSettings,
  resetAllDemoData,
  saveCategories,
  saveOrders,
  saveProducts,
  saveSettings
} from './data/store.js';

const formatARS = (amount) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);

const ORDER_STATUSES = [
  'Pendiente',
  'Confirmado',
  'En Preparación',
  'En Camino',
  'Entregado',
  'Cancelado'
];

const VIEW_TITLES = {
  dashboard: 'Dashboard',
  orders: 'Pedidos',
  categories: 'Categorías',
  products: 'Productos',
  promotions: 'Promociones y Ofertas',
  customers: 'Clientes',
  settings: 'Configuración'
};

const adminState = {
  view: 'dashboard',
  orderFilter: 'Todos',
  productLayout: 'list',
  productSearch: '',
  productCategory: 'all',
  chartRange: 'daily'
};

/* =========================================================
   1. Navigation & Mobile Drawer (<dialog>)
   ========================================================= */
function initAdminMobileDrawer() {
  const drawer = document.getElementById('admin-mobile-drawer');
  const openBtn = document.getElementById('admin-drawer-open');
  const closeBtn = document.getElementById('admin-drawer-close');
  const desktopMenu = document.getElementById('sidebar-menu');
  const mobileMenu = document.getElementById('mobile-sidebar-menu');
  if (!drawer || !openBtn || !closeBtn) return;

  mobileMenu.innerHTML = desktopMenu.innerHTML;

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
  drawer.addEventListener('click', (e) => {
    if (!sheet.contains(e.target)) closeDrawer();
  });
  drawer.addEventListener('cancel', (e) => {
    if (e.cancelable) {
      e.preventDefault();
      closeDrawer();
    }
  });

  mobileMenu.querySelectorAll('[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchView(btn.dataset.view);
      closeDrawer();
    });
  });
}

function switchView(viewName) {
  adminState.view = viewName;
  document.getElementById('topbar-title').textContent = VIEW_TITLES[viewName] || 'Dashboard';

  document.querySelectorAll('.admin-view').forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== viewName;
  });

  document.querySelectorAll('.nav-item[data-view]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.view === viewName);
  });

  renderAll();
}

/* =========================================================
   2. Dashboard View
   ========================================================= */
function renderDashboard() {
  const categories = getCategories();
  const products = getProducts();
  const orders = getOrders();

  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelado')
    .reduce((sum, o) => sum + o.total, 0);

  const deliveredRevenue = orders
    .filter((o) => o.status === 'Entregado')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingRevenue = orders
    .filter((o) => o.status === 'Pendiente' || o.status === 'Confirmado')
    .reduce((sum, o) => sum + o.total, 0);

  const avgTicket = orders.length ? Math.round(totalRevenue / orders.length) : 0;

  document.getElementById('kpi-categories').textContent = String(categories.filter((c) => c.active !== false).length);
  document.getElementById('kpi-products').textContent = String(products.length);
  document.getElementById('kpi-orders').textContent = String(orders.length);
  document.getElementById('kpi-revenue').textContent = formatARS(totalRevenue);
  document.getElementById('sidebar-orders-count').textContent = String(orders.filter((o) => o.status === 'Pendiente').length);

  document.getElementById('wallet-total').textContent = formatARS(totalRevenue);
  document.getElementById('wallet-delivered').textContent = formatARS(deliveredRevenue);
  document.getElementById('wallet-pending').textContent = formatARS(pendingRevenue);
  document.getElementById('wallet-avg').textContent = formatARS(avgTicket);

  const statusGrid = document.getElementById('dashboard-order-status-grid');
  statusGrid.innerHTML = '';
  ORDER_STATUSES.forEach((status) => {
    const count = orders.filter((o) => o.status === status).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'status-mini-card';
    btn.innerHTML = `<span>${status}</span><strong>${count}</strong>`;
    btn.addEventListener('click', () => {
      adminState.orderFilter = status;
      switchView('orders');
    });
    statusGrid.appendChild(btn);
  });

  renderSalesChart();

  const latestBody = document.getElementById('dashboard-latest-orders');
  latestBody.innerHTML = '';
  orders.slice(0, 5).forEach((o) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th>${o.id}</th>
      <td data-label="Cliente">${o.customer}</td>
      <td data-label="Cant.">${o.itemsCount} u.</td>
      <td data-label="Fecha">${o.date}</td>
      <td data-label="Total">${formatARS(o.total)}</td>
      <td data-label="Estado"><span class="badge-soft-green">${o.status}</span></td>
    `;
    latestBody.appendChild(tr);
  });
}

function renderSalesChart() {
  const datasets = {
    daily: [
      { label: 'Lun', pct: 45 },
      { label: 'Mar', pct: 68 },
      { label: 'Mié', pct: 54 },
      { label: 'Jue', pct: 82 },
      { label: 'Vie', pct: 95 },
      { label: 'Sáb', pct: 74 },
      { label: 'Dom', pct: 38 }
    ],
    monthly: [
      { label: 'Jun', pct: 50 },
      { label: 'Jul', pct: 62 },
      { label: 'Ago', pct: 70 },
      { label: 'Sep', pct: 65 },
      { label: 'Oct', pct: 88 },
      { label: 'Nov', pct: 96 }
    ],
    yearly: [
      { label: '2022', pct: 40 },
      { label: '2023', pct: 64 },
      { label: '2024', pct: 80 },
      { label: '2025', pct: 90 },
      { label: '2026', pct: 100 }
    ]
  };

  const chartEl = document.getElementById('sales-bar-chart');
  chartEl.innerHTML = '';
  (datasets[adminState.chartRange] || datasets.daily).forEach((bar) => {
    const col = document.createElement('div');
    col.className = 'bar-col';
    col.innerHTML = `
      <div class="bar-fill" style="height: ${bar.pct}%" title="${bar.label}: ${bar.pct}%"></div>
      <span class="bar-label">${bar.label}</span>
    `;
    chartEl.appendChild(col);
  });
}

/* =========================================================
   3. Orders View
   ========================================================= */
function renderOrders() {
  const orders = getOrders();
  const filterWrap = document.getElementById('order-status-filters');
  filterWrap.innerHTML = '';

  ['Todos', ...ORDER_STATUSES].forEach((status) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `status-pill-btn ${adminState.orderFilter === status ? 'is-active' : ''}`;
    btn.textContent = status;
    btn.addEventListener('click', () => {
      adminState.orderFilter = status;
      renderOrders();
    });
    filterWrap.appendChild(btn);
  });

  const filtered =
    adminState.orderFilter === 'Todos'
      ? orders
      : orders.filter((o) => o.status === adminState.orderFilter);

  const tbody = document.getElementById('orders-table-body');
  tbody.innerHTML = '';

  filtered.forEach((order) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th>${order.id}</th>
      <td data-label="Fecha">${order.date}</td>
      <td data-label="Cliente">${order.customer}</td>
      <td data-label="Total"><strong>${formatARS(order.total)}</strong></td>
      <td data-label="Pago">${order.paymentMethod}</td>
      <td data-label="Estado">
        <select class="order-status-select" aria-label="Cambiar estado de ${order.id}">
          ${ORDER_STATUSES.map((s) => `<option value="${s}" ${s === order.status ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </td>
      <td data-label="Acción">
        <button type="button" class="action-sm-btn view-order-btn">Ver detalle</button>
      </td>
    `;

    tr.querySelector('.order-status-select').addEventListener('change', (e) => {
      const all = getOrders();
      const target = all.find((o) => o.id === order.id);
      if (target) target.status = e.target.value;
      saveOrders(all);
      renderDashboard();
    });

    tr.querySelector('.view-order-btn').addEventListener('click', () => openOrderModal(order));
    tbody.appendChild(tr);
  });
}

function openOrderModal(order) {
  const modal = document.getElementById('order-modal');
  const body = document.getElementById('order-modal-body');
  document.getElementById('order-modal-title').textContent = `Pedido ${order.id}`;
  body.innerHTML = `
    <p><strong>Cliente:</strong> ${order.customer} (${order.phone})</p>
    <p><strong>Fecha:</strong> ${order.date} · <strong>Pago:</strong> ${order.paymentMethod}</p>
    <p><strong>Estado:</strong> ${order.status}</p>
    <hr />
    <ul>
      ${order.items.map((i) => `<li>${i.qty}x ${i.title} — ${formatARS(i.unitPrice)} c/u</li>`).join('')}
    </ul>
    <p><strong>Total: ${formatARS(order.total)}</strong></p>
  `;
  modal.showModal();
}

/* =========================================================
   4. Categories View
   ========================================================= */
function renderCategories() {
  const categories = getCategories();
  const tbody = document.getElementById('categories-table-body');
  tbody.innerHTML = '';

  categories.forEach((cat, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th>${idx + 1}</th>
      <td data-label="Nombre"><strong>${cat.name}</strong></td>
      <td data-label="Subcategorías">${(cat.subcategories || []).join(', ')}</td>
      <td data-label="Estado">
        <label class="ios-switch">
          <input type="checkbox" ${cat.active !== false ? 'checked' : ''} aria-label="Activar ${cat.name}" />
          <span class="ios-slider"></span>
        </label>
      </td>
      <td data-label="Acciones">
        <div class="row-actions">
          <button type="button" class="action-sm-btn edit-cat-btn">Editar</button>
          <button type="button" class="action-sm-btn action-sm-btn--danger del-cat-btn">Eliminar</button>
        </div>
      </td>
    `;

    tr.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      const all = getCategories();
      all[idx].active = e.target.checked;
      saveCategories(all);
      renderDashboard();
    });

    tr.querySelector('.edit-cat-btn').addEventListener('click', () => openCategoryModal(cat));
    tr.querySelector('.del-cat-btn').addEventListener('click', () => {
      const next = getCategories().filter((c) => c.id !== cat.id);
      saveCategories(next);
      renderAll();
    });

    tbody.appendChild(tr);
  });
}

function openCategoryModal(cat = null) {
  const modal = document.getElementById('category-modal');
  document.getElementById('category-modal-title').textContent = cat ? 'Editar Categoría' : 'Nueva Categoría';
  document.getElementById('cat-id').value = cat ? cat.id : '';
  document.getElementById('cat-name').value = cat ? cat.name : '';
  document.getElementById('cat-tag').value = cat ? cat.featuredTag || '' : '';
  document.getElementById('cat-subs').value = cat ? (cat.subcategories || []).join(', ') : '';
  modal.showModal();
}

/* =========================================================
   5. Products View (List & Grid)
   ========================================================= */
function renderProducts() {
  const categories = getCategories();
  const products = getProducts();

  const catFilterSelect = document.getElementById('admin-product-category-filter');
  const currentVal = catFilterSelect.value;
  catFilterSelect.innerHTML = '<option value="all">Todas las categorías</option>';
  categories.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    catFilterSelect.appendChild(opt);
  });
  catFilterSelect.value = currentVal || 'all';

  const filtered = products.filter((p) => {
    const matchesCat = adminState.productCategory === 'all' || p.category === adminState.productCategory;
    const q = adminState.productSearch.trim().toLowerCase();
    const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const listWrap = document.getElementById('admin-products-list-wrap');
  const gridWrap = document.getElementById('admin-products-grid-wrap');
  listWrap.hidden = adminState.productLayout !== 'list';
  gridWrap.hidden = adminState.productLayout !== 'grid';

  const tbody = document.getElementById('products-table-body');
  tbody.innerHTML = '';
  gridWrap.innerHTML = '';

  filtered.forEach((prod, idx) => {
    const catName = categories.find((c) => c.id === prod.category)?.name || prod.category;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th>${idx + 1}</th>
      <td data-label="Producto">${prod.emoji || '📦'} <strong>${prod.title}</strong></td>
      <td data-label="Categoría">${catName}</td>
      <td data-label="Minorista">${formatARS(prod.price)}</td>
      <td data-label="Mayorista">${formatARS(prod.wholesalePrice)} (${prod.wholesaleMin}+)</td>
      <td data-label="Stock">${prod.stock ?? 25}</td>
      <td data-label="Estado">
        <label class="ios-switch">
          <input type="checkbox" ${prod.active !== false ? 'checked' : ''} aria-label="Activar ${prod.title}" />
          <span class="ios-slider"></span>
        </label>
      </td>
      <td data-label="Acciones">
        <div class="row-actions">
          <button type="button" class="action-sm-btn edit-prod-btn">Editar</button>
          <button type="button" class="action-sm-btn action-sm-btn--danger del-prod-btn">Eliminar</button>
        </div>
      </td>
    `;

    tr.querySelector('input[type="checkbox"]').addEventListener('change', (e) => {
      const all = getProducts();
      const target = all.find((p) => p.id === prod.id);
      if (target) target.active = e.target.checked;
      saveProducts(all);
    });

    tr.querySelector('.edit-prod-btn').addEventListener('click', () => openProductModal(prod));
    tr.querySelector('.del-prod-btn').addEventListener('click', () => {
      saveProducts(getProducts().filter((p) => p.id !== prod.id));
      renderAll();
    });
    tbody.appendChild(tr);

    // Grid Card
    const card = document.createElement('article');
    card.className = 'admin-prod-card';
    card.innerHTML = `
      <div class="admin-prod-top">
        <span class="admin-prod-emoji" aria-hidden="true">${prod.emoji || '📦'}</span>
        <span class="badge-soft-green">-${prod.discount}%</span>
      </div>
      <strong>${prod.title}</strong>
      <span class="kpi-label">${catName}</span>
      <div>Minorista: <strong>${formatARS(prod.price)}</strong> · Mayorista: <strong>${formatARS(prod.wholesalePrice)}</strong></div>
      <div class="row-actions">
        <button type="button" class="action-sm-btn edit-grid-btn">Editar</button>
        <button type="button" class="action-sm-btn action-sm-btn--danger del-grid-btn">Eliminar</button>
      </div>
    `;
    card.querySelector('.edit-grid-btn').addEventListener('click', () => openProductModal(prod));
    card.querySelector('.del-grid-btn').addEventListener('click', () => {
      saveProducts(getProducts().filter((p) => p.id !== prod.id));
      renderAll();
    });
    gridWrap.appendChild(card);
  });
}

function openProductModal(prod = null) {
  const modal = document.getElementById('product-modal');
  const catSelect = document.getElementById('prod-category');
  catSelect.innerHTML = '';
  getCategories().forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    catSelect.appendChild(opt);
  });

  document.getElementById('product-modal-title').textContent = prod ? 'Editar Producto' : 'Nuevo Producto';
  document.getElementById('prod-id').value = prod ? prod.id : '';
  document.getElementById('prod-title').value = prod ? prod.title : '';
  document.getElementById('prod-category').value = prod ? prod.category : getCategories()[0]?.id || 'indumentaria';
  document.getElementById('prod-subcategory').value = prod ? prod.subcategory : '';
  document.getElementById('prod-price').value = prod ? prod.price : '';
  document.getElementById('prod-wholesale').value = prod ? prod.wholesalePrice : '';
  document.getElementById('prod-wholesale-min').value = prod ? prod.wholesaleMin : 3;
  document.getElementById('prod-stock').value = prod ? prod.stock ?? 25 : 25;
  document.getElementById('prod-discount').value = prod ? prod.discount : 20;
  document.getElementById('prod-emoji').value = prod ? prod.emoji || '📦' : '📦';
  document.getElementById('prod-variants').value = prod ? (prod.variants || []).join(', ') : 'Negro, Blanco';
  modal.showModal();
}

/* =========================================================
   6. Promotions, Customers & Settings
   ========================================================= */
function renderPromotionsAndCustomers() {
  const promoGrid = document.getElementById('promo-products-grid');
  promoGrid.innerHTML = '';
  getProducts()
    .filter((p) => p.discount >= 20)
    .forEach((p) => {
      const card = document.createElement('article');
      card.className = 'admin-prod-card';
      card.innerHTML = `
        <div class="admin-prod-top">
          <span class="admin-prod-emoji">${p.emoji || '📦'}</span>
          <span class="badge-soft-green">-${p.discount}% OFF</span>
        </div>
        <strong>${p.title}</strong>
        <span>${formatARS(p.price)} · Mayorista ${formatARS(p.wholesalePrice)}</span>
      `;
      promoGrid.appendChild(card);
    });

  const orders = getOrders();
  const byCustomer = new Map();
  orders.forEach((o) => {
    const prev = byCustomer.get(o.customer) || { customer: o.customer, phone: o.phone, count: 0, total: 0 };
    prev.count += 1;
    prev.total += o.total;
    byCustomer.set(o.customer, prev);
  });

  const custBody = document.getElementById('customers-table-body');
  custBody.innerHTML = '';
  byCustomer.forEach((c) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th>${c.customer}</th>
      <td data-label="Teléfono">${c.phone}</td>
      <td data-label="Pedidos">${c.count}</td>
      <td data-label="Total Comprado"><strong>${formatARS(c.total)}</strong></td>
    `;
    custBody.appendChild(tr);
  });
}

function loadSettingsForm() {
  const s = getSettings();
  document.getElementById('setting-store-name').value = s.storeName || '';
  document.getElementById('setting-whatsapp').value = s.whatsappNumber || '';
  document.getElementById('setting-instagram').value = s.instagramHandle || '';
  document.getElementById('setting-wholesale-min').value = s.wholesaleDefaultMin || 3;
  document.getElementById('setting-announcement').value = s.announcementText || '';
}

function renderAll() {
  renderDashboard();
  renderOrders();
  renderCategories();
  renderProducts();
  renderPromotionsAndCustomers();
  loadSettingsForm();
}

/* =========================================================
   7. Bootstrap
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initAdminMobileDrawer();
  renderAll();

  document.querySelectorAll('#sidebar-menu .nav-item[data-view]').forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  document.querySelectorAll('[data-jump-view]').forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.jumpView));
  });

  document.getElementById('sidebar-menu-search')?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('#sidebar-menu li').forEach((li) => {
      const txt = li.textContent.toLowerCase();
      li.hidden = Boolean(q) && !txt.includes(q);
    });
  });

  document.getElementById('sidebar-collapse-btn')?.addEventListener('click', () => {
    document.getElementById('admin-shell').classList.toggle('sidebar-collapsed');
  });

  document.getElementById('theme-toggle-btn')?.addEventListener('click', (e) => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    e.currentTarget.textContent = isDark ? '🌙' : '☀️';
  });

  document.querySelectorAll('.chart-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      adminState.chartRange = tab.dataset.chartRange;
      document.querySelectorAll('.chart-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
      renderSalesChart();
    });
  });

  document.querySelectorAll('[data-product-layout]').forEach((btn) => {
    btn.addEventListener('click', () => {
      adminState.productLayout = btn.dataset.productLayout;
      document.querySelectorAll('[data-product-layout]').forEach((b) => b.classList.toggle('is-active', b === btn));
      renderProducts();
    });
  });

  document.getElementById('admin-product-search')?.addEventListener('input', (e) => {
    adminState.productSearch = e.target.value;
    renderProducts();
  });

  document.getElementById('admin-product-category-filter')?.addEventListener('change', (e) => {
    adminState.productCategory = e.target.value;
    renderProducts();
  });

  // Modals
  document.getElementById('quick-add-product-btn')?.addEventListener('click', () => openProductModal());
  document.getElementById('add-product-btn')?.addEventListener('click', () => openProductModal());
  document.getElementById('add-category-btn')?.addEventListener('click', () => openCategoryModal());

  const prodModal = document.getElementById('product-modal');
  document.getElementById('product-modal-close')?.addEventListener('click', () => prodModal.close());
  document.getElementById('product-modal-cancel')?.addEventListener('click', () => prodModal.close());

  document.getElementById('product-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('prod-id').value;
    const price = Number(document.getElementById('prod-price').value);
    const discount = Number(document.getElementById('prod-discount').value) || 0;
    const payload = {
      id: id || `prod-${Date.now()}`,
      title: document.getElementById('prod-title').value.trim(),
      category: document.getElementById('prod-category').value,
      subcategory: document.getElementById('prod-subcategory').value.trim(),
      price,
      wholesalePrice: Number(document.getElementById('prod-wholesale').value),
      wholesaleMin: Number(document.getElementById('prod-wholesale-min').value) || 3,
      stock: Number(document.getElementById('prod-stock').value) || 0,
      discount,
      originalPrice: discount > 0 ? Math.round(price / (1 - discount / 100)) : price,
      badge: discount >= 20 ? `-${discount}% OFF` : 'Nuevo',
      emoji: document.getElementById('prod-emoji').value.trim() || '📦',
      variants: document
        .getElementById('prod-variants')
        .value.split(',')
        .map((v) => v.trim())
        .filter(Boolean),
      active: true
    };

    const all = getProducts();
    const idx = all.findIndex((p) => p.id === payload.id);
    if (idx >= 0) all[idx] = { ...all[idx], ...payload };
    else all.unshift(payload);
    saveProducts(all);
    prodModal.close();
    renderAll();
  });

  const catModal = document.getElementById('category-modal');
  document.getElementById('category-modal-close')?.addEventListener('click', () => catModal.close());
  document.getElementById('category-modal-cancel')?.addEventListener('click', () => catModal.close());

  document.getElementById('category-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('cat-id').value;
    const name = document.getElementById('cat-name').value.trim();
    const payload = {
      id: id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      icon: 'bag',
      featuredTag: document.getElementById('cat-tag').value.trim() || 'Multirubro',
      subcategories: document
        .getElementById('cat-subs')
        .value.split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      active: true
    };

    const all = getCategories();
    const idx = all.findIndex((c) => c.id === payload.id);
    if (idx >= 0) all[idx] = { ...all[idx], ...payload };
    else all.push(payload);
    saveCategories(all);
    catModal.close();
    renderAll();
  });

  document.getElementById('order-modal-close')?.addEventListener('click', () => {
    document.getElementById('order-modal').close();
  });

  document.getElementById('settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveSettings({
      storeName: document.getElementById('setting-store-name').value.trim(),
      whatsappNumber: document.getElementById('setting-whatsapp').value.trim(),
      instagramHandle: document.getElementById('setting-instagram').value.trim(),
      wholesaleDefaultMin: Number(document.getElementById('setting-wholesale-min').value) || 3,
      announcementText: document.getElementById('setting-announcement').value.trim()
    });
    document.getElementById('settings-feedback').textContent = '✓ Configuración guardada y aplicada a la tienda.';
  });

  document.getElementById('reset-demo-data-btn')?.addEventListener('click', () => {
    resetAllDemoData();
    renderAll();
    document.getElementById('settings-feedback').textContent = '✓ Datos demo restablecidos.';
  });
});
