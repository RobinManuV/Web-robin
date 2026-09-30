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
//   paraTi      "Esta ciudad es para ti si…"  (lista; vacía = sección oculta)
//   noParaTi    "Esta ciudad no es para ti si…"
// ============================================================

export const DESTINOS = [
  {
    slug: 'twente',
    name: 'Twente',
    seoTitle: 'Estudiar en la Universidad de Twente (Enschede): guía 2026',
    seoDesc:
      'Estudiar en Twente: campus propio, grados en inglés en tecnología y negocios, habitación desde ~390 €/mes y coste de vida. Guía de Project Robin.',
    subtitle: 'Campus tecnológico y emprendedor',
    intro:
      'La Universidad de Twente, en Enschede, es de las pocas de Holanda con campus propio: residencias, deporte y facultades en el mismo recinto. Fuerte en ingeniería, tecnología y ciencias sociales.',
    cardImg: '/fotos/ciudades/twente-card.webp',
    heroImg: '/fotos/ciudades/twente-hero.webp',
    video: null,
    paraTi: [
      'Te atrae la tecnología, la ingeniería o crear tu propia startup.',
      'Quieres vivir en un campus con residencias y deporte a dos pasos.',
      'Buscas una de las opciones más asequibles de Holanda.',
      'Prefieres una comunidad cercana a una gran ciudad.',
    ],
    noParaTi: [
      'Necesitas vida de gran ciudad todos los días.',
      'Quieres estar a menos de una hora de Ámsterdam.',
      'Buscas un grado de humanidades o derecho.',
    ],
  },
  {
    slug: 'breda',
    name: 'Breda',
    seoTitle: 'Estudiar en Breda (BUas): universidades, costes y alojamiento 2026',
    seoDesc:
      'Estudiar en Breda: BUas (videojuegos, turismo, eventos) y Avans, habitación ~595 €/mes, coste de vida y alojamiento. Guía honesta de Project Robin.',
    subtitle: 'Ciudad pequeña, carreras creativas',
    intro:
      'Sede de Breda University of Applied Sciences, referente en videojuegos, turismo, hostelería y logística. Ambiente cercano, a unos 25 minutos en tren de Róterdam.',
    cardImg: '/fotos/ciudades/breda-card.webp',
    heroImg: '/fotos/ciudades/breda-hero.webp',
    video: null,
    paraTi: [
      'Te interesan los videojuegos, el turismo, los eventos o la hostelería.',
      'Prefieres un aprendizaje práctico, con proyectos reales y prácticas.',
      'Te gustan las ciudades medianas, manejables y con ambiente.',
      'Quieres tener Róterdam y Amberes a media hora.',
    ],
    noParaTi: [
      'Buscas una universidad de investigación (WO) con grados académicos clásicos.',
      'Quieres una gran capital con vida 24/7.',
      'Te interesa derecho, medicina o ingeniería pura.',
    ],
  },
  {
    slug: 'leiden',
    name: 'Leiden',
    seoTitle: 'Estudiar en Leiden: universidad, costes y alojamiento (guía 2026)',
    seoDesc:
      'Estudiar en Leiden, la universidad más antigua de Holanda: grados en inglés, habitación ~655 €/mes, coste de vida y alojamiento. Guía de Project Robin.',
    subtitle: 'La universidad más antigua de Holanda',
    intro:
      'La Universidad de Leiden (1575) destaca en derecho, humanidades y ciencias. Ciudad histórica y tranquila, entre Ámsterdam y La Haya.',
    cardImg: '/fotos/ciudades/leiden-card.webp',
    heroImg: '/fotos/ciudades/leiden-hero.webp',
    video: null,
    paraTi: [
      'Te interesan el derecho, las humanidades, la arqueología o las ciencias.',
      'Valoras el prestigio académico y la tradición.',
      'Prefieres una ciudad histórica, tranquila y muy estudiantil.',
      'Quieres tener Ámsterdam, La Haya y la playa cerca.',
    ],
    noParaTi: [
      'Buscas una formación muy práctica orientada a la empresa.',
      'Quieres una ciudad grande con mucha vida nocturna.',
      'Tu presupuesto para alojamiento es muy ajustado.',
    ],
  },
  {
    slug: 'groningen',
    name: 'Groningen',
    seoTitle: 'Estudiar en Groningen: universidades, costes y alojamiento 2026',
    seoDesc:
      'Estudiar en Groningen: RUG y Hanze, muchos grados en inglés, habitación ~565 €/mes y coste de vida. Guía para estudiantes españoles de Project Robin.',
    subtitle: 'La ciudad más estudiantil',
    intro:
      'Cerca de una cuarta parte de sus habitantes son estudiantes. La Universidad de Groningen y Hanze, con un coste de vida más bajo que en el oeste del país.',
    cardImg: '/fotos/ciudades/groningen-card.webp',
    heroImg: '/fotos/ciudades/groningen-hero.webp',
    video: 'https://www.youtube.com/watch?v=0h-Z6XOp9Ts',
    paraTi: [
      'Quieres vivir en la ciudad más estudiantil de Holanda.',
      'Buscas muchos grados en inglés y una universidad con buen ranking.',
      'Tu presupuesto no llega a los precios del Randstad.',
      'Te gusta moverte en bici a todas partes.',
    ],
    noParaTi: [
      'Quieres estar cerca de Ámsterdam o del aeropuerto.',
      'Te cuesta el frío y los inviernos largos y oscuros.',
      'Buscas un entorno de grandes empresas y multinacionales.',
    ],
  },
  {
    slug: 'amsterdam',
    name: 'Ámsterdam',
    seoTitle: 'Estudiar en Ámsterdam: universidades, costes y alojamiento 2026',
    seoDesc:
      'Estudiar en Ámsterdam: UvA, VU y HvA, grados en inglés, habitación ~950 €/mes, coste de vida y cómo encontrar alojamiento. Guía de Project Robin.',
    subtitle: 'La capital, con todo y a su precio',
    intro:
      'UvA, VU y HvA: la mayor oferta de grados del país. También es la ciudad donde más cuesta encontrar alojamiento.',
    cardImg: '/fotos/ciudades/amsterdam-card.webp',
    heroImg: '/fotos/ciudades/amsterdam-hero.webp',
    video: 'https://www.youtube.com/watch?v=EB6KYmA9Lzs',
    paraTi: [
      'Buscas la mayor oferta de grados en inglés del país.',
      'Quieres una gran ciudad internacional con cultura y vida todo el año.',
      'Te interesan la comunicación, la economía, la psicología o las ciencias sociales.',
      'Puedes asumir el coste de vida más alto de Holanda.',
    ],
    noParaTi: [
      'Tu presupuesto es ajustado: el alojamiento es el más caro y difícil del país.',
      'Prefieres un ambiente tranquilo y de comunidad.',
      'Te agobian las multitudes y el turismo.',
    ],
  },
  {
    slug: 'la-haya',
    name: 'La Haya',
    seoTitle: 'Estudiar en La Haya: universidades, costes y alojamiento 2026',
    seoDesc:
      'Estudiar en La Haya: relaciones internacionales y derecho en Leiden y THUAS, habitación ~745 €/mes y coste de vida. Guía de Project Robin.',
    subtitle: 'Derecho internacional y playa',
    intro:
      'Sede de la Corte Internacional de Justicia, con un campus de la Universidad de Leiden y The Hague University of Applied Sciences. Con la playa de Scheveningen al lado.',
    cardImg: '/fotos/ciudades/la-haya-card.webp',
    heroImg: '/fotos/ciudades/la-haya-hero.webp',
    video: 'https://www.youtube.com/watch?v=fDNWL8ACoJM',
    paraTi: [
      'Te interesan las relaciones internacionales, el derecho internacional o la diplomacia.',
      'Quieres prácticas en organizaciones internacionales.',
      'Te gusta tener la playa a un trayecto de tranvía.',
      'Buscas un ambiente muy internacional.',
    ],
    noParaTi: [
      'Buscas una ciudad universitaria clásica y compacta.',
      'Tu grado se imparte solo en Leiden o en otra ciudad.',
      'Quieres un alquiler barato.',
    ],
  },
  {
    slug: 'utrecht',
    name: 'Utrecht',
    seoTitle: 'Estudiar en Utrecht: universidades, costes y alojamiento 2026',
    seoDesc:
      'Estudiar en Utrecht: UU, UCU y HU, grados en inglés, habitación ~775 €/mes, coste de vida y alojamiento. Guía para estudiantes españoles.',
    subtitle: 'En el centro de todo',
    intro:
      'La Universidad de Utrecht es una de las mejor valoradas del país. Ciudad universitaria de verdad, a menos de media hora de Ámsterdam.',
    cardImg: '/fotos/ciudades/utrecht-card.webp',
    heroImg: '/fotos/ciudades/utrecht-hero.webp',
    video: 'https://youtu.be/wzutd9s_zBs',
    paraTi: [
      'Quieres una ciudad universitaria de verdad, en el centro del país.',
      'Te interesa University College Utrecht o Economics and Business Economics.',
      'Te gusta moverte en tren a cualquier ciudad en menos de una hora.',
      'Buscas el encanto de Ámsterdam con menos turismo.',
    ],
    noParaTi: [
      'Solo quieres grados en inglés: buena parte de la oferta de la UU es en neerlandés.',
      'Necesitas alojamiento barato y rápido.',
      'Buscas una formación muy técnica o de ingeniería.',
    ],
  },
  {
    slug: 'rotterdam',
    name: 'Róterdam',
    seoTitle: 'Estudiar en Róterdam: Erasmus University, costes y alojamiento 2026',
    seoDesc:
      'Estudiar en Róterdam: Erasmus University (RSM, IBEB) y Hogeschool Rotterdam, habitación ~750 €/mes y coste de vida. Guía de Project Robin.',
    subtitle: 'Economía y negocios',
    intro:
      'Erasmus University Rotterdam, con su escuela de economía y RSM, y el mayor puerto de Europa. Una ciudad moderna y con mucha salida profesional.',
    cardImg: '/fotos/ciudades/rotterdam-card.webp',
    heroImg: '/fotos/ciudades/rotterdam-hero.webp',
    video: 'https://www.youtube.com/watch?v=jV04Lgpm-CU',
    paraTi: [
      'Te interesan la economía, los negocios o el management.',
      'Quieres una ciudad moderna con mucha salida profesional.',
      'Buscas prácticas en multinacionales, logística o finanzas.',
      'Te gusta la arquitectura y la vida urbana.',
    ],
    noParaTi: [
      'Buscas una ciudad histórica de postal.',
      'Prefieres una ciudad pequeña y tranquila.',
      'Tu interés está en las humanidades o el arte clásico.',
    ],
  },
  {
    slug: 'delft',
    name: 'Delft',
    seoTitle: 'Estudiar en TU Delft: grados en inglés, admisión y costes 2026',
    seoDesc:
      'Estudiar en Delft: TU Delft, grados en inglés, numerus fixus (15 de enero), habitación ~600 €/mes y coste de vida. Guía de Project Robin.',
    subtitle: 'Ingeniería de primer nivel',
    intro:
      'TU Delft es la referencia en ingeniería y arquitectura. Muy exigente en la admisión, en una ciudad pequeña entre Róterdam y La Haya.',
    cardImg: '/fotos/ciudades/delft-card.webp',
    heroImg: '/fotos/ciudades/delft-hero.webp',
    video: 'https://youtu.be/p8N9Cr9etoY',
    paraTi: [
      'Quieres estudiar ingeniería, arquitectura o informática al máximo nivel.',
      'Te motiva un entorno académico exigente.',
      'Tienes buena base en matemáticas y física.',
      'Te gusta una ciudad pequeña, con Róterdam y La Haya al lado.',
    ],
    noParaTi: [
      'Buscas un grado de negocios, humanidades o ciencias sociales.',
      'Quieres una carrera con poca carga de estudio.',
      'Llegas tarde a los plazos: los grados con plazas limitadas cierran el 15 de enero.',
    ],
  },
  {
    slug: 'maastricht',
    name: 'Maastricht',
    seoTitle: 'Estudiar en Maastricht: universidad, costes y alojamiento 2026',
    seoDesc:
      'Estudiar en Maastricht: la universidad más internacional de Holanda, Problem-Based Learning, habitación ~550 €/mes y coste de vida. Guía de Project Robin.',
    subtitle: 'La más internacional',
    intro:
      'En la Universidad de Maastricht más de la mitad de los alumnos son internacionales, y se estudia con Problem-Based Learning en grupos pequeños. Aquí estudiamos los fundadores de Robin.',
    cardImg: '/fotos/ciudades/maastricht-card.webp',
    heroImg: '/fotos/ciudades/maastricht-hero.webp',
    video: 'https://www.youtube.com/watch?v=n__UefsZMm4',
    paraTi: [
      'Quieres el ambiente más internacional de Holanda.',
      'Te gusta aprender debatiendo y trabajando en grupo (Problem-Based Learning).',
      'Te interesan el derecho europeo, los negocios internacionales o la psicología.',
      'Te atrae vivir entre Holanda, Bélgica y Alemania.',
    ],
    noParaTi: [
      'Prefieres clases magistrales y estudiar por tu cuenta.',
      'Quieres vivir en una gran ciudad.',
      'Necesitas estar cerca de Ámsterdam o del Randstad.',
    ],
  },
  {
    slug: 'eindhoven',
    name: 'Eindhoven',
    seoTitle: 'Estudiar en Eindhoven: TU/e, costes y alojamiento (guía 2026)',
    seoDesc:
      'Estudiar en Eindhoven: TU/e, Fontys y Design Academy, grados técnicos en inglés, habitación ~540 €/mes y coste de vida. Guía de Project Robin.',
    subtitle: 'Tecnología y diseño',
    intro:
      'TU Eindhoven y Fontys, en el corazón de la región tecnológica de ASML y Philips. Ideal para perfiles técnicos con salida en la industria.',
    cardImg: '/fotos/ciudades/eindhoven-card.webp',
    heroImg: '/fotos/ciudades/eindhoven-hero.webp',
    video: 'https://youtu.be/1JcWR-68Nco',
    paraTi: [
      'Te interesan la ingeniería, la tecnología o el diseño industrial.',
      'Quieres conectar con empresas como ASML o Philips desde la carrera.',
      'Buscas grados técnicos en inglés.',
      'Valoras tener aeropuerto con vuelos directos a España.',
    ],
    noParaTi: [
      'Buscas una ciudad histórica de postal.',
      'Te interesan las humanidades, el derecho o las ciencias sociales.',
      'Quieres una capital con mucha oferta cultural clásica.',
    ],
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
