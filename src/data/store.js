import { CATEGORIES as DEFAULT_CATEGORIES, PRODUCTS as DEFAULT_PRODUCTS } from './catalog.js';

const KEYS = {
  products: 'mr_expres_products_v1',
  categories: 'mr_expres_categories_v1',
  orders: 'mr_expres_orders_v1',
  settings: 'mr_expres_settings_v1',
  users: 'mr_expres_users_v1',
  session: 'mr_expres_session_v1'
};

const DEFAULT_SETTINGS = {
  storeName: 'Multirubro Expres',
  whatsappNumber: '5491100000000',
  instagramHandle: '@multirubroexpres',
  announcementText: 'Envíos a todo el país · Venta Mayorista y Minorista · Pedidos por WhatsApp',
  wholesaleDefaultMin: 3
};

const DEFAULT_ORDERS = [
  {
    id: 'MR-000105',
    date: '2026-11-13 09:15',
    customer: 'Lucía Fernández',
    phone: '11 5421-8890',
    itemsCount: 6,
    total: 43200,
    paymentMethod: 'Transferencia',
    status: 'Pendiente',
    items: [
      { title: 'Remera Lisa Algodón Peinado 24/1 Unisex', qty: 6, unitPrice: 7200 }
    ]
  },
  {
    id: 'MR-000104',
    date: '2026-11-12 18:40',
    customer: 'Martín Gómez',
    phone: '351 612-3304',
    itemsCount: 3,
    total: 58500,
    paymentMethod: 'Mercado Pago',
    status: 'Confirmado',
    items: [
      { title: 'Buzo Canguro Frisa Invisible Premium', qty: 3, unitPrice: 19500 }
    ]
  },
  {
    id: 'MR-000103',
    date: '2026-11-12 14:20',
    customer: 'Valentina Sosa',
    phone: '11 4980-1122',
    itemsCount: 4,
    total: 42300,
    paymentMethod: 'Efectivo',
    status: 'En Preparación',
    items: [
      { title: 'Pack x6 Tazas Polímero Blancas para Sublimar', qty: 2, unitPrice: 14800 },
      { title: 'Gorra Trucker Lisa Frente Blanco Apta Sublimación', qty: 2, unitPrice: 4900 }
    ]
  },
  {
    id: 'MR-000102',
    date: '2026-11-11 16:05',
    customer: 'Diego Morales',
    phone: '221 554-7781',
    itemsCount: 2,
    total: 49400,
    paymentMethod: 'Transferencia',
    status: 'En Camino',
    items: [
      { title: 'Auriculares Inalámbricos TWS Pro Cancelación de Ruido', qty: 1, unitPrice: 21500 },
      { title: 'Parlante Bluetooth Portátil RGB Resistente al Agua', qty: 1, unitPrice: 27900 }
    ]
  },
  {
    id: 'MR-000101',
    date: '2026-11-10 11:30',
    customer: 'Camila Pereyra',
    phone: '11 6332-9901',
    itemsCount: 3,
    total: 63000,
    paymentMethod: 'Mercado Pago',
    status: 'Entregado',
    items: [
      { title: 'Termo Acero Inoxidable 1L Media Manija + Pico Cebador', qty: 3, unitPrice: 21000 }
    ]
  }
];

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return structuredClone(fallback);
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

export function getCategories() {
  const normalizedDefaults = DEFAULT_CATEGORIES.map((c) => ({ active: true, ...c }));
  return readJSON(KEYS.categories, normalizedDefaults);
}

export function saveCategories(categories) {
  writeJSON(KEYS.categories, categories);
}

export function getProducts() {
  const normalizedDefaults = DEFAULT_PRODUCTS.map((p) => ({
    stock: 25,
    active: true,
    ...p
  }));
  return readJSON(KEYS.products, normalizedDefaults);
}

export function saveProducts(products) {
  writeJSON(KEYS.products, products);
}

export function getOrders() {
  return readJSON(KEYS.orders, DEFAULT_ORDERS);
}

export function saveOrders(orders) {
  writeJSON(KEYS.orders, orders);
}

export function addOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  return orders;
}

export function getSettings() {
  return readJSON(KEYS.settings, DEFAULT_SETTINGS);
}

export function saveSettings(settings) {
  writeJSON(KEYS.settings, settings);
}

export function resetAllDemoData() {
  localStorage.removeItem(KEYS.products);
  localStorage.removeItem(KEYS.categories);
  localStorage.removeItem(KEYS.orders);
  localStorage.removeItem(KEYS.settings);
}

/* =========================================================
   User Accounts & Session
   ========================================================= */
export function getUsers() {
  return readJSON(KEYS.users, []);
}

export function saveUsers(users) {
  writeJSON(KEYS.users, users);
}

export function getCurrentUser() {
  try {
    const email = localStorage.getItem(KEYS.session);
    if (!email) return null;
    return getUsers().find((u) => u.email === email) || null;
  } catch {
    return null;
  }
}

export function registerUser({ name, email, phone, password, address }) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();
  if (users.some((u) => u.email === normalizedEmail)) {
    return { ok: false, error: 'Ya existe una cuenta con ese email.' };
  }
  const newUser = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    password,
    address: {
      street: address?.street?.trim() || '',
      city: address?.city?.trim() || '',
      postalCode: address?.postalCode?.trim() || '',
      notes: address?.notes?.trim() || ''
    },
    wishlist: [],
    createdAt: new Date().toISOString().slice(0, 10)
  };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(KEYS.session, normalizedEmail);
  return { ok: true, user: newUser };
}

export function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === normalizedEmail && u.password === password);
  if (!user) {
    return { ok: false, error: 'Email o contraseña incorrectos.' };
  }
  localStorage.setItem(KEYS.session, normalizedEmail);
  return { ok: true, user };
}

export function logoutUser() {
  localStorage.removeItem(KEYS.session);
}

export function updateUserProfile(email, updates) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx < 0) return null;
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  return users[idx];
}
