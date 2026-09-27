// ============================================================
// Ciudades de Holanda. Cada ciudad genera su página /destinos/<slug>/
// Para cambiar un texto de una ciudad, edita solo este archivo.
//
// Campos:
//   name        Nombre visible
//   seoTitle    <title> de la página (lo que sale en Google)
//   seoDesc     Meta description
//   subtitle    Subtítulo de la tarjeta y del hero
//   intro       Texto de la tarjeta y del hero
//   cardImg     Foto de la tarjeta (listado /destinos/)
//   heroImg     Foto grande (Open Graph / redes)
//   video       Vídeo de YouTube de la ciudad (opcional)
//   paraTi      "Esta universidad es para ti si…"  (lista; vacía = sección oculta)
//   noParaTi    "Esta universidad no es para ti si…"
// ============================================================

export const DESTINOS = [
  {
    slug: 'twente',
    name: 'Twente',
    seoTitle: 'Estudiar en Twente: universidades y vida estudiantil',
    seoDesc:
      'Estudia en Twente: universidad tecnológica, enfoque práctico y emprendedor. Alojamiento, coste de vida y claves para preparar tu experiencia.',
    subtitle: 'Campus tecnológico y emprendedor',
    intro:
      'La Universidad de Twente, en Enschede, es de las pocas de Holanda con campus propio: residencias, deporte y facultades en el mismo recinto. Fuerte en ingeniería, tecnología y ciencias sociales.',
    cardImg: '/wp-content/uploads/2026/04/images.jpeg',
    heroImg: '/wp-content/uploads/2026/04/images.jpeg',
    video: null,
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'breda',
    name: 'Breda',
    seoTitle: 'Estudiar en Breda: universidades y vida estudiantil',
    seoDesc:
      'Estudia en Breda: Breda University of Applied Sciences, negocios, turismo y medios. Alojamiento, coste de vida y claves para preparar tu llegada.',
    subtitle: 'Ciudad pequeña, carreras creativas',
    intro:
      'Sede de Breda University of Applied Sciences, referente en videojuegos, turismo, hostelería y logística. Ambiente cercano, a unos 25 minutos en tren de Róterdam.',
    cardImg: '/wp-content/uploads/2026/04/images-1.jpeg',
    heroImg: '/wp-content/uploads/2026/04/images-1.jpeg',
    video: null,
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'leiden',
    name: 'Leiden',
    seoTitle: 'Estudiar en Leiden: universidades y vida estudiantil',
    seoDesc:
      'Estudia en Leiden, una de las ciudades universitarias más emblemáticas de Países Bajos. Universidades, alojamiento, coste de vida y ambiente académico.',
    subtitle: 'La universidad más antigua de Holanda',
    intro:
      'La Universidad de Leiden (1575) destaca en derecho, humanidades y ciencias. Ciudad histórica y tranquila, entre Ámsterdam y La Haya.',
    cardImg: '/wp-content/uploads/2026/04/Torre_Drienerlo.jpg',
    heroImg: '/wp-content/uploads/2026/04/Torre_Drienerlo.jpg',
    video: null,
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'groningen',
    name: 'Groningen',
    seoTitle: 'Estudiar en Groningen: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en Groningen: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'La ciudad más estudiantil',
    intro:
      'Cerca de una cuarta parte de sus habitantes son estudiantes. La Universidad de Groningen y Hanze, con un coste de vida más bajo que en el oeste del país.',
    cardImg: '/wp-content/uploads/2024/12/Untitled-design-12-1024x576.jpg',
    heroImg: '/wp-content/uploads/2024/12/Untitled-design-12.jpg',
    video: 'https://www.youtube.com/watch?v=0h-Z6XOp9Ts',
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'amsterdam',
    name: 'Ámsterdam',
    seoTitle: 'Estudiar en Ámsterdam: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en Ámsterdam: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'La capital, con todo y a su precio',
    intro:
      'UvA, VU y HvA: la mayor oferta de grados del país. También es la ciudad donde más cuesta encontrar alojamiento.',
    cardImg: '/wp-content/uploads/2026/05/b45b3c027f2f7b146d546b7c9d8fc598-1024x542.webp',
    heroImg: '/wp-content/uploads/2026/05/b45b3c027f2f7b146d546b7c9d8fc598.webp',
    video: 'https://www.youtube.com/watch?v=EB6KYmA9Lzs',
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'la-haya',
    name: 'La Haya',
    seoTitle: 'Estudiar en La Haya: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en La Haya: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'Derecho internacional y playa',
    intro:
      'Sede de la Corte Internacional de Justicia, con un campus de la Universidad de Leiden y The Hague University of Applied Sciences. Con la playa de Scheveningen al lado.',
    cardImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-La-Haya-1024x576.jpg',
    heroImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-La-Haya.jpg',
    video: 'https://www.youtube.com/watch?v=fDNWL8ACoJM',
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'utrecht',
    name: 'Utrecht',
    seoTitle: 'Estudiar en Utrecht: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en Utrecht: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'En el centro de todo',
    intro:
      'La Universidad de Utrecht es una de las mejor valoradas del país. Ciudad universitaria de verdad, a menos de media hora de Ámsterdam.',
    cardImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Utrecht-1024x576.jpg',
    heroImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Utrecht.jpg',
    video: 'https://youtu.be/wzutd9s_zBs',
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'rotterdam',
    name: 'Róterdam',
    seoTitle: 'Estudiar en Róterdam: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en Róterdam: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'Economía y negocios',
    intro:
      'Erasmus University Rotterdam, con su escuela de economía y RSM, y el mayor puerto de Europa. Una ciudad moderna y con mucha salida profesional.',
    cardImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Paises-Bajos-Rotterdam-1024x576.jpg',
    heroImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Paises-Bajos-Rotterdam.jpg',
    video: 'https://www.youtube.com/watch?v=jV04Lgpm-CU',
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'delft',
    name: 'Delft',
    seoTitle: 'Estudiar en Delft: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en Delft: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'Ingeniería de primer nivel',
    intro:
      'TU Delft es la referencia en ingeniería y arquitectura. Muy exigente en la admisión, en una ciudad pequeña entre Róterdam y La Haya.',
    cardImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Delft-1024x576.jpg',
    heroImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Delft.jpg',
    video: 'https://youtu.be/p8N9Cr9etoY',
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'maastricht',
    name: 'Maastricht',
    seoTitle: 'Estudiar en Maastricht: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en Maastricht: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'La más internacional',
    intro:
      'En la Universidad de Maastricht más de la mitad de los alumnos son internacionales, y se estudia con Problem-Based Learning en grupos pequeños. Aquí estudiamos los fundadores de Robin.',
    cardImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Maastricht-1024x576.jpg',
    heroImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Maastricht.jpg',
    video: 'https://www.youtube.com/watch?v=n__UefsZMm4',
    paraTi: [],
    noParaTi: [],
  },
  {
    slug: 'eindhoven',
    name: 'Eindhoven',
    seoTitle: 'Estudiar en Eindhoven: universidades y vida estudiantil',
    seoDesc:
      'Descubre cómo es estudiar en Eindhoven: universidades, alojamiento, coste de vida y claves para preparar tu experiencia en los Países Bajos.',
    subtitle: 'Tecnología y diseño',
    intro:
      'TU Eindhoven y Fontys, en el corazón de la región tecnológica de ASML y Philips. Ideal para perfiles técnicos con salida en la industria.',
    cardImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Eindhoven-1024x576.jpg',
    heroImg: '/wp-content/uploads/2024/12/Universidad-para-Estudiar-en-Holanda-Eindhoven.jpg',
    video: 'https://youtu.be/1JcWR-68Nco',
    paraTi: [],
    noParaTi: [],
  },
];

// Logos de universidades (banda "Estudia en Holanda")
export const LOGOS_HOLANDA = [
  { src: '/wp-content/uploads/2024/12/Universidad-de-Maastricht.-Estudiar-en-Holanda.png', alt: 'Maastricht University' },
  { src: '/wp-content/uploads/2026/07/Universidad-de-Twente.-Estudiar-en-Holanda.png', alt: 'University of Twente' },
  { src: '/wp-content/uploads/2024/12/Universidad-de-Utretch.-Estudiar-en-Holanda.png', alt: 'Utrecht University' },
  { src: '/wp-content/uploads/2024/12/Universidad-de-Amsterdam.-Estudiar-en-Holanda.png', alt: 'Universiteit van Amsterdam' },
  { src: '/wp-content/uploads/2026/07/Universidad-de-Leiden.-Estudiar-en-Holanda.png', alt: 'Universiteit Leiden' },
  { src: '/wp-content/uploads/2026/07/Universidad-de-Breda-BUas.-Estudiar-en-Holanda.png', alt: 'Breda University of Applied Sciences' },
  { src: '/wp-content/uploads/2024/12/Universidad-de-rotterdam.-Estudiar-en-Holanda.png', alt: 'Erasmus University Rotterdam' },
  { src: '/wp-content/uploads/2026/07/Universidad-de-Groningen.-Estudiar-en-Holanda.png', alt: 'University of Groningen' },
  { src: '/wp-content/uploads/2024/12/Universidad-de-Delft.-Estudiar-en-Holanda.png', alt: 'TU Delft' },
  { src: '/wp-content/uploads/2024/12/Universidad-de-Eindhoven.-Estudiar-en-Holanda.png', alt: 'TU Eindhoven' },
  { src: '/wp-content/uploads/2024/12/Universidad-de-La-Haya.-Estudiar-en-Holanda.png', alt: 'The Hague University of Applied Sciences' },
];
