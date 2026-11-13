export const CATEGORIES = [
  {
    id: 'indumentaria',
    name: 'Indumentaria y Básicos',
    icon: 'shirt',
    subcategories: [
      'Remeras Lisas Algodón',
      'Buzos y Canguros',
      'Joggings y Pantalones',
      'Camperas y Abrigos'
    ],
    featuredTag: 'Mayorista y Minorista'
  },
  {
    id: 'sublimacion',
    name: 'Sublimación e Insumos',
    icon: 'printer',
    subcategories: [
      'Tazas y Jarros Térmicos',
      'Gorras Trucker Lisas',
      'Papel y Tintas Sublimación',
      'Bolsas y Llaveros'
    ],
    featuredTag: 'Para Emprendedores'
  },
  {
    id: 'electronica',
    name: 'Electrónica y Accesorios',
    icon: 'headphones',
    subcategories: [
      'Auriculares Inalámbricos',
      'Parlantes Bluetooth',
      'Cargadores y Cables',
      'Smartwatches'
    ],
    featuredTag: 'Novedades Tech'
  },
  {
    id: 'hogar',
    name: 'Hogar y Bazar',
    icon: 'home',
    subcategories: [
      'Mates, Termos y Bombillas',
      'Organizadores y Cocina',
      'Iluminación LED',
      'Textil Hogar'
    ],
    featuredTag: 'Más Vendidos'
  },
  {
    id: 'belleza',
    name: 'Belleza y Cuidado Personal',
    icon: 'sparkles',
    subcategories: [
      'Skincare y Limpieza Facial',
      'Maquillaje y Brochas',
      'Secadores y Planchitas',
      'Perfumería'
    ],
    featuredTag: 'Hasta 30% OFF'
  },
  {
    id: 'jugueteria',
    name: 'Juguetería y Regalería',
    icon: 'gift',
    subcategories: [
      'Juegos de Mesa',
      'Peluches y Didácticos',
      'Librería y Escolar',
      'Sets de Regalo'
    ],
    featuredTag: 'Temporada'
  },
  {
    id: 'deportes',
    name: 'Deportes y Aire Libre',
    icon: 'dumbbell',
    subcategories: [
      'Botellas Térmicas',
      'Mochilas y Bolsos',
      'Accesorios Fitness',
      'Camping y Tiempo Libre'
    ],
    featuredTag: 'Nuevo Ingreso'
  },
  {
    id: 'marroquineria',
    name: 'Marroquinería y Accesorios',
    icon: 'bag',
    subcategories: [
      'Billeteras y Tarjeteros',
      'Carteras y Riñoneras',
      'Relojes',
      'Anteojos de Sol'
    ],
    featuredTag: 'Exclusivo'
  }
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Remera Lisa Algodón Peinado 24/1 Unisex',
    category: 'indumentaria',
    subcategory: 'Remeras Lisas Algodón',
    price: 9500,
    wholesalePrice: 7200,
    wholesaleMin: 3,
    originalPrice: 12000,
    discount: 21,
    badge: 'Más Vendido',
    variants: ['Negro', 'Blanco', 'Rojo', 'Gris Melange'],
    accent: '#1E293B',
    emoji: '👕'
  },
  {
    id: 'prod-2',
    title: 'Buzo Canguro Frisa Invisible Premium',
    category: 'indumentaria',
    subcategory: 'Buzos y Canguros',
    price: 24900,
    wholesalePrice: 19500,
    wholesaleMin: 3,
    originalPrice: 29900,
    discount: 17,
    badge: 'Mayorista',
    variants: ['Negro', 'Crudo', 'Bordo', 'Azul Marino'],
    accent: '#991B1B',
    emoji: '🧥'
  },
  {
    id: 'prod-3',
    title: 'Pack x6 Tazas Polímero Blancas para Sublimar',
    category: 'sublimacion',
    subcategory: 'Tazas y Jarros Térmicos',
    price: 14800,
    wholesalePrice: 12200,
    wholesaleMin: 3,
    originalPrice: 18500,
    discount: 20,
    badge: 'Pack Emprendedor',
    variants: ['Blanco Brillante'],
    accent: '#0F766E',
    emoji: '☕'
  },
  {
    id: 'prod-4',
    title: 'Gorra Trucker Lisa Frente Blanco Apta Sublimación',
    category: 'sublimacion',
    subcategory: 'Gorras Trucker Lisas',
    price: 4900,
    wholesalePrice: 3600,
    wholesaleMin: 6,
    originalPrice: 6200,
    discount: 21,
    badge: '6+ u. Mayorista',
    variants: ['Negro/Blanco', 'Rojo/Blanco', 'Azul/Blanco'],
    accent: '#B91C1C',
    emoji: '🧢'
  },
  {
    id: 'prod-5',
    title: 'Auriculares Inalámbricos TWS Pro Cancelación de Ruido',
    category: 'electronica',
    subcategory: 'Auriculares Inalámbricos',
    price: 21500,
    wholesalePrice: 16900,
    wholesaleMin: 3,
    originalPrice: 28000,
    discount: 23,
    badge: 'Oferta Flash',
    variants: ['Negro Mate', 'Blanco'],
    accent: '#1D4ED8',
    emoji: '🎧'
  },
  {
    id: 'prod-6',
    title: 'Parlante Bluetooth Portátil RGB Resistente al Agua',
    category: 'electronica',
    subcategory: 'Parlantes Bluetooth',
    price: 27900,
    wholesalePrice: 22400,
    wholesaleMin: 3,
    originalPrice: 34900,
    discount: 20,
    badge: 'Nuevo',
    variants: ['Negro', 'Rojo', 'Camuflado'],
    accent: '#4338CA',
    emoji: '🔊'
  },
  {
    id: 'prod-7',
    title: 'Termo Acero Inoxidable 1L Media Manija + Pico Cebador',
    category: 'hogar',
    subcategory: 'Mates, Termos y Bombillas',
    price: 26500,
    wholesalePrice: 21000,
    wholesaleMin: 3,
    originalPrice: 33000,
    discount: 20,
    badge: 'Top Ventas',
    variants: ['Negro', 'Verde Militar', 'Rojo'],
    accent: '#065F46',
    emoji: '🧉'
  },
  {
    id: 'prod-8',
    title: 'Set Organizador de Cocina x4 Herméticos Apilables',
    category: 'hogar',
    subcategory: 'Organizadores y Cocina',
    price: 16200,
    wholesalePrice: 13100,
    wholesaleMin: 3,
    originalPrice: 19900,
    discount: 19,
    badge: 'Hogar',
    variants: ['Transparente / Negro'],
    accent: '#334155',
    emoji: '🫙'
  },
  {
    id: 'prod-9',
    title: 'Kit Skincare Limpieza Facial Cepillo + Sérum Vitamina C',
    category: 'belleza',
    subcategory: 'Skincare y Limpieza Facial',
    price: 15900,
    wholesalePrice: 12400,
    wholesaleMin: 3,
    originalPrice: 22000,
    discount: 28,
    badge: '-28% OFF',
    variants: ['Único'],
    accent: '#BE185D',
    emoji: '✨'
  },
  {
    id: 'prod-10',
    title: 'Juego de Mesa Familiar Estrategia Clásico',
    category: 'jugueteria',
    subcategory: 'Juegos de Mesa',
    price: 18400,
    wholesalePrice: 14800,
    wholesaleMin: 3,
    originalPrice: 23000,
    discount: 20,
    badge: 'Regalería',
    variants: ['Edición Clásica'],
    accent: '#D97706',
    emoji: '🎲'
  },
  {
    id: 'prod-11',
    title: 'Mochila Urbana Porta Notebook 15.6" Impermeable USB',
    category: 'deportes',
    subcategory: 'Mochilas y Bolsos',
    price: 31900,
    wholesalePrice: 25500,
    wholesaleMin: 3,
    originalPrice: 39900,
    discount: 20,
    badge: 'Envío Gratis',
    variants: ['Negro', 'Gris Grafito'],
    accent: '#1E293B',
    emoji: '🎒'
  },
  {
    id: 'prod-12',
    title: 'Riñonera Urbana Eco-Cuero Doble Cierre Reforzado',
    category: 'marroquineria',
    subcategory: 'Carteras y Riñoneras',
    price: 13500,
    wholesalePrice: 10200,
    wholesaleMin: 3,
    originalPrice: 17500,
    discount: 23,
    badge: 'Tendencia',
    variants: ['Negro', 'Suela'],
    accent: '#78350F',
    emoji: '👜'
  }
];
