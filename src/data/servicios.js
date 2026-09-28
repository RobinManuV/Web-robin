// ============================================================
// Servicios (en el orden en que salen en /servicios/). Cada uno genera /servicios/<slug>/
// salvo los marcados con `custom: true`, que tienen su propia página en src/pages/servicios/.
// `tag` es la etiqueta que llega a Notion cuando alguien pide info desde esa página.
// ============================================================

export const COMO_FUNCIONA = [
  { title: 'Primera consulta ¡GRATIS!', text: 'Resolvemos tus dudas iniciales y trazamos un plan para ti.' },
  { title: 'Escoge una fecha', text: 'Nos adaptamos a tu ritmo y tiempos, siempre priorizando tu comodidad.' },
  { title: 'Te asesoramos', text: 'Paso a paso, nos aseguramos de que todo esté en orden para que nada te detenga.' },
];

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
    // Página propia: src/pages/servicios/aeroespaciales-delft.astro
    slug: 'aeroespaciales-delft',
    custom: true,
    tag: 'aeroespaciales-delft',
    servicio: 'Aeroespaciales Delft',
    name: 'Aeroespaciales Delft',
    card: {
      bullets: ['Preparación de los exámenes de acceso.', 'Profesor exalumno de TU Delft.', 'Grupos de máximo 5 alumnos.'],
      text: 'Curso preparatorio para entrar en Aerospace Engineering en TU Delft, con todo el acompañamiento de Robin incluido: aplicación, alojamiento y llegada.',
    },
  },
  {
    slug: 'pack-llegada',
    tag: 'pack-llegada',
    servicio: 'Pack Llegada',
    name: 'Pack Llegada',
    seoTitle: 'Pack Llegada: alojamiento y trámites al llegar a Holanda | Project Robin',
    seoDesc:
      'Aterriza en Holanda con todo resuelto: como mínimo una opción de alojamiento asegurada desde el principio, apoyo con el BSN y los trámites, y consejos para tu nueva ciudad.',
    heading: 'Pack Llegada: aterriza con todo resuelto',
    intro: [
      'Ya tienes la admisión. Ahora empieza lo que nadie te cuenta: encontrar casa, registrarte en el ayuntamiento y entender cómo funciona tu nueva ciudad. <strong>Con el Pack Llegada lo hacemos contigo.</strong>',
      'Desde el principio tienes <strong>como mínimo una opción de alojamiento asegurada</strong>, y te acompañamos en los trámites para que tu único trabajo sea empezar las clases.',
    ],
    features: [
      { icon: 'home', title: 'Housing garantizado', text: 'Desde el principio te ofrecemos como mínimo una opción de alojamiento asegurada. Te ayudamos a elegir residencia y a evitar las estafas típicas de los anuncios.' },
      { icon: 'doc', title: 'BSN y trámites de llegada', text: 'Te guiamos en el registro en el ayuntamiento para conseguir tu BSN (tu número de identificación en Holanda) y, si lo necesitas, en el visado.' },
      { icon: 'compass', title: 'Tu ciudad, desde dentro', text: 'Consejos de zona, bici y transporte, e información sobre asociaciones y vida social para que no llegues perdido.' },
    ],
    card: {
      bullets: ['Mínimo una opción de alojamiento asegurada.', 'Apoyo con el BSN y los trámites.', 'Consejos de ciudad, transporte y vida social.'],
      text: '¿Ya tienes plaza? Te ayudamos con lo que viene después: casa, papeles y primeros días en tu nueva ciudad.',
    },
  },
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
];
