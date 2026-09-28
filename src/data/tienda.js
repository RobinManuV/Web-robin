// ============================================================
// Tienda Robin. Cada producto genera /tienda/<slug>/
// Precios: los de la web. `comingSoon: true` = página visible pero sin pedido.
// Pedido: de momento es una solicitud (formulario → Notion con etiqueta
// "tienda-<slug>"); Robin contacta para el pago y el envío.
// ============================================================

export const TALLAS = ['XS', 'S', 'M', 'L', 'XL'];

// Guía de tallas: PENDIENTE de las medidas reales del proveedor (en cm).
// Rellena ancho y largo y la tabla se mostrará con los números.
export const GUIA_TALLAS = [
  { talla: 'XS', ancho: null, largo: null },
  { talla: 'S', ancho: null, largo: null },
  { talla: 'M', ancho: null, largo: null },
  { talla: 'L', ancho: null, largo: null },
  { talla: 'XL', ancho: null, largo: null },
];

export const PRODUCTOS = [
  {
    slug: 'camiseta-robin',
    name: 'Camiseta Robin',
    price: '23 €',
    priceNum: 23,
    short: 'Algodón orgánico 100%, logo en el pecho y print grande en la espalda.',
    description: [
      'La camiseta de la comunidad Robin. Blanca, de algodón orgánico 100%, con el logo de Robin en el pecho y "From Madrid to the world" al lado.',
      'En la espalda, el print grande: ROBIN y "The real world is infinitely smaller than the one in our minds". Para el día a día en la uni, los partidos y cada vez que te pregunten de dónde eres.',
    ],
    img: '/fotos/camiseta-robin.webp',
    gallery: [
      { src: '/fotos/camiseta-robin-diseno.webp', alt: 'Diseño de la camiseta Robin: espalda y delantero' },
      { src: '/fotos/camiseta-robin-2.webp', alt: 'Robins con la camiseta, vista de espalda' },
      { src: '/fotos/camiseta-robin-3.webp', alt: 'Partido de fútbol con la camiseta Robin' },
      { src: '/fotos/camiseta-robin.webp', alt: 'Robins jugando al baloncesto con la camiseta' },
    ],
    tallas: true,
  },
  {
    slug: 'sudadera-robin',
    name: 'Sudadera Robin',
    price: '45 €',
    priceNum: 45,
    short: 'Heavy hoodie 400 gsm, bordado grande detrás. Para sobrevivir al invierno holandés.',
    description: ['Heavy hoodie de 400 gsm con el bordado grande de Robin en la espalda. Pensada para sobrevivir al invierno holandés.'],
    img: '/fotos/sudadera-robin.webp',
    gallery: [{ src: '/fotos/sudadera-robin.webp', alt: 'Sudadera Robin gris con el logo en la espalda' }],
    comingSoon: true,
  },
  {
    slug: 'pack-del-estudiante',
    name: 'Pack del Estudiante',
    price: '79 €',
    priceNum: 79,
    short: 'Camiseta + sudadera + tote bag + sticker pack + botella. Todo lo que necesitas para empezar.',
    description: ['Camiseta, sudadera, tote bag, sticker pack y botella. Todo lo que necesitas para empezar tu vida de Robin.'],
    img: null,
    gallery: [],
    comingSoon: true,
  },
];
