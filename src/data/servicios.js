// ============================================================
// Servicios. Cada uno genera /servicios/<slug>/
// `tag` es la etiqueta que llega a Notion cuando alguien pide info desde esa página.
// ============================================================

export const COMO_FUNCIONA = [
  { title: 'Primera consulta ¡GRATIS!', text: 'Resolvemos tus dudas iniciales y trazamos un plan para ti.' },
  { title: 'Escoge una fecha', text: 'Nos adaptamos a tu ritmo y tiempos, siempre priorizando tu comodidad.' },
  { title: 'Te asesoramos', text: 'Paso a paso, nos aseguramos de que todo esté en orden para que nada te detenga.' },
];

export const SERVICIOS = [
  {
    slug: 'mentoria',
    tag: 'mentoria',
    servicio: 'Mentoría',
    name: 'Mentoría',
    seoTitle: 'Mentoría para estudiar en Holanda | Project Robin',
    seoDesc:
      'Recibe orientación personalizada para elegir estudios, preparar tu solicitud y organizar tu llegada a Holanda con apoyo de Project Robin.',
    heading: 'Mentoría personalizada: paso a paso',
    intro: [
      '¿Tienes preguntas sobre cómo estudiar en los Países Bajos? Con nuestra mentoría personalizada, aclaramos todos los pasos del proceso en una llamada de 90 minutos con un asesor experto.',
      'Te ayudamos con la preparación de tus aplicaciones, los trámites de visado, y la planificación de tu llegada. Estamos aquí para guiarte y asegurarnos de que todo sea más sencillo. ¡Resuelve tus inquietudes en una sola sesión y avanza con confianza hacia tu meta!',
    ],
    features: [
      { icon: 'doc', title: 'Resuelve trámites y documentos', text: 'Te explicamos cómo gestionar tus aplicaciones, visados y demás documentos de forma clara y eficiente. Evita errores y ahorra tiempo con nuestra ayuda.' },
      { icon: 'cal', title: 'Planificación de tu llegada', text: 'Conoce qué pasos tomar antes y después de llegar. Te orientamos sobre todo lo necesario, desde registros legales hasta el día a día en Holanda.' },
      { icon: 'chat', title: 'Respuestas 100% personalizadas', text: 'Nuestro servicio está adaptado a tus necesidades específicas. Pregunta lo que quieras y obtén soluciones prácticas para avanzar con seguridad.' },
    ],
    card: {
      bullets: ['Resuelve dudas en 90 minutos', 'Apoyo personalizado en el proceso', 'Consejos prácticos para avanzar'],
      text: '¿Ya tienes claro qué estudiar, pero necesitas ayuda con algún paso? Con una llamada de 90 minutos, te ayudamos a resolver todas tus dudas para que sigas avanzando con confianza.',
    },
  },
  {
    slug: 'asesoramiento-completo',
    tag: 'asesoramiento-completo',
    servicio: 'Asesoramiento Completo',
    name: 'Asesoría completa',
    popular: true,
    seoTitle: 'Asesoramiento para estudiar en Holanda | Project Robin',
    seoDesc:
      'Acompañamiento completo para estudiar en Holanda: elección de universidad, solicitud, alojamiento, trámites y apoyo durante todo el proceso.',
    heading: 'De principio a fin: nos ocupamos de todo',
    intro: [
      'Tu aventura en Holanda no empieza cuando llegas al aeropuerto. <strong>Empieza aquí, con nosotros.</strong>',
      'Desde encontrar tu universidad ideal hasta conseguir alojamiento y completar los trámites legales, hacemos que todo sea <strong>sencillo</strong> y rápido. Porque tu <strong>único trabajo es soñar</strong> en <strong>grande</strong>.',
    ],
    features: [
      { icon: 'doc', title: 'Selección de estudios según tus intereses', text: 'Conocemos el sistema educativo neerlandés a fondo. Analizamos tus intereses y objetivos para guiarte hacia la universidad y programa que se ajusten a tu perfil. ¡Tú sueñas, nosotros te llevamos allí!' },
      { icon: 'cal', title: 'Gestión completa del proceso de aplicación', text: 'Nos encargamos de todo el proceso de aplicación: inscripciones, documentos, y cualquier requisito que las universidades exijan. Nuestro objetivo es que tu admisión sea un éxito, sin complicaciones.' },
      { icon: 'home', title: 'Gestión y ayuda para encontrar alojamiento', text: 'Encontrar alojamiento en Holanda es complicado, pero no estás solo. Te ayudamos a encontrar una vivienda segura y cómoda para que te sientas en casa desde el primer día.' },
    ],
    card: {
      bullets: ['Selección de estudios según tus intereses.', 'Gestión del proceso de aplicación.', 'Ayuda para encontrar alojamiento.'],
      text: '¿Te gustaría estudiar en los Países Bajos pero no sabes por dónde empezar? Nos encargamos de todo el proceso: desde elegir el programa perfecto para ti hasta garantizar tu admisión y encontrar tu nuevo hogar.',
    },
  },
  {
    slug: 'erasmus',
    tag: 'erasmus',
    servicio: 'Erasmus',
    name: 'Erasmus',
    seoTitle: 'Asesoramiento para estudiantes Erasmus | Project Robin',
    seoDesc:
      'Prepara tu experiencia Erasmus con apoyo en alojamiento, trámites, planificación y adaptación al destino antes y durante tu estancia.',
    heading: 'Lo que necesitas para tu aventura Erasmus',
    intro: [
      'Preparar tu experiencia ERASMUS en los Países Bajos no tiene que ser complicado. Con nuestra llamada especializada, resolvemos todas tus dudas en un solo lugar, de forma clara y personalizada.',
      'Desde recomendaciones para encontrar alojamiento hasta orientación sobre cómo adaptarte al sistema educativo y cultural neerlandés, nos aseguramos de que empieces tu aventura con confianza.',
    ],
    features: [
      { icon: 'doc', title: 'Preparación para tu ERASMUS', text: 'Descubre todo lo que necesitas saber para comenzar tu experiencia ERASMUS con éxito. Desde trámites básicos hasta consejos esenciales, te guiamos paso a paso para que te sientas listo/a desde el primer día.' },
      { icon: 'home', title: 'Recomendaciones de alojamiento', text: 'Encontrar un lugar donde vivir en los Países Bajos puede ser un desafío, pero no tienes que hacerlo solo/a. Te ofrecemos opciones seguras, accesibles y adaptadas a tus necesidades como estudiante ERASMUS.' },
      { icon: 'chat', title: 'Consejos para integrarte rápidamente', text: 'Te ayudamos a adaptarte al sistema educativo, la cultura local y la vida cotidiana en Holanda. Aprovecha al máximo tu experiencia ERASMUS con nuestros tips personalizados.' },
    ],
    card: {
      bullets: ['Orientación para estudiantes Erasmus.', 'Responde tus dudas en 60 minutos.', 'Precio adaptado para estudiantes.'],
      text: '¿Te vas de Erasmus a Holanda? Te ayudamos a prepararte con una sesión de 60 minutos para resolver todas tus preguntas, adaptándonos a tus necesidades y presupuesto.',
    },
  },
];
