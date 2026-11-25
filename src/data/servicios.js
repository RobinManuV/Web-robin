// ============================================================
// Servicios (en el orden en que salen en /servicios/). Cada uno genera /servicios/<slug>/
// salvo los marcados con `custom: true`, que tienen su propia página en src/pages/servicios/.
// `tag` es la etiqueta que llega a Notion cuando alguien pide info desde esa página.
//
// Campos de cada ficha:
//   hero      → titular, entradilla, ilustración del pájaro y chips con datos rápidos
//   paraTi    → "Es para ti si…" y "Mejor otro servicio si…" (con enlace al servicio que encaja)
//   incluye   → tarjetas de "Qué incluye" (`highlight: true` = tarjeta azul destacada)
//   pasos     → "Cómo funciona" (con `img` salen con ilustración; sin ella, con número)
//   card      → tarjeta del listado /servicios/
//   situacion → frase del bloque "¿Cuál es el tuyo?" en /servicios/
// ============================================================

const ILU = '/wp-content/uploads/2026/06/';

export const SERVICIOS = [
  {
    slug: 'asesoramiento-completo',
    tag: 'asesoramiento-completo',
    servicio: 'Asesoramiento Completo',
    name: 'Asesoría completa',
    popular: true,
    seoTitle: 'Asesoramiento para estudiar en Holanda | Project Robin',
    seoDesc:
      'Acompañamiento completo para estudiar en Holanda: elección de universidad, solicitud, alojamiento, trámites y apoyo durante todo el proceso.',
    img: `${ILU}RobinGraduated.webp`,
    hero: {
      eyebrow: 'Asesoría completa',
      title: 'De principio a fin, nos ocupamos de todo',
      lead: 'Elegir carrera, aplicar, encontrar casa y hacer los papeles. Cuatro frentes y un solo equipo que ya pasó por ahí. Te acompañamos desde el primer “¿y si me voy?” hasta tu primera clase.',
      chips: ['Primera consulta gratis', 'Housing garantizado', 'Todas las universidades de Holanda'],
    },
    paraTi: {
      si: [
        'Quieres estudiar en Holanda, pero no sabes por dónde empezar.',
        'Prefieres que alguien que ya lo ha vivido te acompañe en cada paso.',
        'En casa quieren costes, plazos y riesgos claros antes de decir que sí.',
      ],
      no: [
        { text: 'Ya tienes plaza y te faltan casa y papeles.', slug: 'pack-llegada' },
        { text: 'Lo llevas tú y solo necesitas resolver dudas concretas.', slug: 'mentoria' },
      ],
    },
    incluye: {
      title: 'Todo el proceso, un solo equipo',
      lead: 'Nada de ir saltando entre agencias, foros y grupos de WhatsApp. Lo tienes todo en un sitio.',
      items: [
        { icon: 'compass', title: 'Elección de carrera', text: 'Analizamos tus notas, tus intereses y tu presupuesto, y te damos una lista corta de carreras que encajan contigo. Requisitos, costes y salidas encima de la mesa.' },
        { icon: 'doc', title: 'Aplicación sin sustos', text: 'Studielink, carta de motivación, documentos y plazos. Lo preparamos contigo y lo revisamos todo antes de enviarlo.' },
        { icon: 'home', title: 'Housing garantizado', text: 'Buscar casa en Holanda siendo estudiante internacional es un deporte extremo. Por eso, desde el principio tienes como mínimo una opción de alojamiento asegurada.', highlight: true },
        { icon: 'coin', title: 'Papeles y ayudas', text: 'Registro, BSN y las ayudas al estudiante del gobierno holandés: te explicamos qué pedir, cuándo y cómo.' },
      ],
    },
    pasosTitle: 'Cuatro fases, cero sorpresas',
    pasosLead: 'El Método Robin: claro, transparente y probado.',
    pasos: [
      { title: 'Elige', text: 'Elegimos contigo, no por ti: una lista corta de universidades que encajan con tu perfil.', img: `${ILU}RobinTelescopio.webp` },
      { title: 'Aplica', text: 'Carta, documentos y plazos preparados contigo y revisados antes de enviar.', img: `${ILU}Robin-Carpetas.webp` },
      { title: 'Aterriza', text: 'Tu casa, asegurada: mínimo una opción de alojamiento y ayuda con la mudanza para que llegues con todo listo.', img: `${ILU}RobinHouse.webp` },
      { title: 'Despega', text: 'No desaparecemos cuando te admiten: seguimos contigo y con tus dudas cuando llegas.', img: `${ILU}RobinGraduated.webp` },
    ],
    card: {
      bullets: ['Elección de carrera y universidad.', 'Gestión de la aplicación.', 'Mínimo una opción de alojamiento asegurada.'],
      text: 'Para quien quiere estudiar en Holanda y no sabe por dónde empezar. Lo llevamos todo contigo, de la primera duda al primer día de clase.',
    },
    situacion: 'Quiero estudiar fuera, pero no sé qué ni dónde.',
  },
  {
    // Página propia: src/pages/servicios/aeroespaciales-delft.astro
    slug: 'aeroespaciales-delft',
    custom: true,
    tag: 'aeroespaciales-delft',
    servicio: 'Aeroespaciales Delft',
    name: 'Aeroespaciales Delft',
    img: `${ILU}Robin-Carpetas.webp`,
    card: {
      bullets: ['Preparación de los exámenes de acceso.', 'Profesor exalumno de TU Delft.', 'Grupos de máximo 5 alumnos.'],
      text: 'Curso preparatorio para entrar en Aerospace Engineering en TU Delft, con todo el acompañamiento de Robin incluido: aplicación, alojamiento y llegada.',
    },
    situacion: 'Quiero entrar en Aerospace Engineering en TU Delft.',
  },
  {
    slug: 'pack-llegada',
    tag: 'pack-llegada',
    servicio: 'Pack Llegada',
    name: 'Pack Llegada',
    seoTitle: 'Pack Llegada: alojamiento y trámites al llegar a Holanda | Project Robin',
    seoDesc:
      'Aterriza en Holanda con todo resuelto: como mínimo una opción de alojamiento asegurada desde el principio, apoyo con el BSN y los trámites, y consejos para tu nueva ciudad.',
    img: `${ILU}RobinHouse.webp`,
    hero: {
      eyebrow: 'Pack Llegada',
      title: 'Aterriza con todo resuelto',
      lead: 'Ya tienes la admisión. Ahora viene lo que nadie te cuenta: encontrar casa, registrarte en el ayuntamiento y entender cómo funciona tu nueva ciudad. Lo hacemos contigo, para que tu único trabajo sea empezar las clases.',
      chips: ['Housing garantizado', 'BSN y trámites', 'Para quien ya tiene plaza'],
    },
    paraTi: {
      si: [
        'Ya tienes plaza en una universidad de Holanda.',
        'Buscar casa a distancia te agobia (y con razón).',
        'Quieres llegar sabiendo qué papeles hacer y en qué orden.',
      ],
      no: [
        { text: 'Todavía no has aplicado a ninguna universidad.', slug: 'asesoramiento-completo' },
        { text: 'Solo quieres resolver dudas puntuales sobre tu llegada.', slug: 'mentoria' },
      ],
    },
    incluye: {
      title: 'Casa, papeles y ciudad',
      lead: 'Lo que más se complica al llegar, resuelto antes de que hagas la maleta.',
      items: [
        { icon: 'home', title: 'Housing garantizado', text: 'Desde el principio tienes como mínimo una opción de alojamiento asegurada. Te ayudamos a elegir residencia y a esquivar las estafas típicas de los anuncios.', highlight: true },
        { icon: 'doc', title: 'BSN y trámites', text: 'Te guiamos en el registro en el ayuntamiento para conseguir tu BSN (tu número de identificación en Holanda) y, si lo necesitas, en el visado.' },
        { icon: 'compass', title: 'Tu ciudad, desde dentro', text: 'Qué zonas te convienen, cómo moverte en bici y en transporte, y qué asociaciones hay para no llegar sin conocer a nadie.' },
      ],
    },
    pasosTitle: 'Así llegas con todo hecho',
    pasosLead: 'Cuatro pasos entre tu admisión y tu primer día de clase.',
    pasos: [
      { title: 'Consulta gratis', text: 'Nos cuentas dónde has entrado, cuándo empiezas y qué te preocupa.' },
      { title: 'Tu casa', text: 'Te presentamos tu opción de alojamiento asegurada y te ayudamos a elegir.' },
      { title: 'Tus papeles', text: 'Registro en el ayuntamiento, BSN y visado si te hace falta, en el orden correcto.' },
      { title: 'Tus primeros días', text: 'Zonas, bici, transporte y vida social para que no llegues perdido.' },
    ],
    card: {
      bullets: ['Mínimo una opción de alojamiento asegurada.', 'Apoyo con el BSN y los trámites.', 'Consejos de ciudad, transporte y vida social.'],
      text: '¿Ya tienes plaza? Te ayudamos con lo que viene después: casa, papeles y primeros días en tu nueva ciudad.',
    },
    situacion: 'Ya tengo plaza. Me faltan casa y papeles.',
  },
  {
    slug: 'mentoria',
    tag: 'mentoria',
    servicio: 'Mentoría',
    name: 'Mentoría',
    seoTitle: 'Mentoría para estudiar en Holanda | Project Robin',
    seoDesc:
      'Recibe orientación personalizada para elegir estudios, preparar tu solicitud y organizar tu llegada a Holanda con apoyo de Project Robin.',
    img: `${ILU}RobinTelescopio.webp`,
    hero: {
      eyebrow: 'Mentoría',
      title: '90 minutos para resolver tus dudas',
      lead: '¿Tienes claro qué quieres estudiar, pero te atasca algún paso? En una llamada de 90 minutos con un asesor de Robin repasamos tu aplicación, los trámites y tu llegada. Y sales sabiendo qué hacer después.',
      chips: ['Llamada de 90 minutos', '1:1 con un asesor', 'Pregunta lo que quieras'],
    },
    paraTi: {
      si: [
        'Ya sabes qué y dónde quieres estudiar.',
        'Te atasca un paso concreto: la aplicación, los papeles o la llegada.',
        'Prefieres hacerlo tú, pero con alguien que te diga si vas bien.',
      ],
      no: [
        { text: 'No sabes por dónde empezar y quieres que lo llevemos contigo.', slug: 'asesoramiento-completo' },
        { text: 'Ya tienes plaza y quieres llegar con casa asegurada.', slug: 'pack-llegada' },
      ],
    },
    incluye: {
      title: 'Una sesión, respuestas claras',
      lead: 'Preguntas lo que necesites y te contestamos pensando en tu caso, no con respuestas de foro.',
      items: [
        { icon: 'doc', title: 'Aplicación y documentos', text: 'Cómo gestionar aplicaciones, visados y documentos sin errores, para que no pierdas tiempo ni plazos.' },
        { icon: 'cal', title: 'Plan de llegada', text: 'Qué hacer antes y después de aterrizar: registros, papeles y el día a día en Holanda.' },
        { icon: 'chat', title: 'Respuestas a tu caso', text: 'Nada de consejos genéricos. Te contestamos según tu situación, con soluciones prácticas para seguir avanzando.', highlight: true },
      ],
    },
    pasosTitle: 'Así funciona',
    pasosLead: 'De la primera llamada a tener claro tu siguiente paso.',
    pasos: [
      { title: 'Consulta gratis', text: 'Hablamos 30 minutos y vemos si la mentoría es lo que necesitas.' },
      { title: 'Escoge fecha', text: 'Reservas la sesión cuando mejor te venga.' },
      { title: 'Sesión de 90 minutos', text: 'Repasamos tu caso y resolvemos todas tus dudas, una a una.' },
      { title: 'Sigue avanzando', text: 'Sales con los siguientes pasos claros y sin dudas pendientes.' },
    ],
    card: {
      bullets: ['Resuelve tus dudas en 90 minutos.', 'Llamada 1:1 con un asesor.', 'Consejos prácticos para avanzar.'],
      text: '¿Ya tienes claro qué estudiar, pero te atasca algún paso? En una llamada de 90 minutos resolvemos tus dudas para que sigas avanzando.',
    },
    situacion: 'Lo llevo yo, pero me atasca un paso.',
  },
];

export const servicioPorSlug = (slug) => SERVICIOS.find((s) => s.slug === slug);
