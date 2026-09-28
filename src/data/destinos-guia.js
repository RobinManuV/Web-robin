// ============================================================
// Guía ampliada de cada ciudad de Holanda (/destinos/<slug>/).
// Son las secciones que van debajo del hero y de "¿Es X tu ciudad?":
// resumen, datos clave, universidades, coste de vida, alojamiento,
// vida en la ciudad y preguntas frecuentes (con schema FAQPage).
//
// Datos revisados en septiembre de 2026. Fuentes principales:
//   - Alquiler de habitación: Kamernet Verhuurrapportage (mediana; Q2 2026
//     salvo que se indique otro trimestre).
//   - Matrícula: Rijksoverheid, wettelijk collegegeld 2026-2027 = 2.694 €.
//   - Becas DUO 2026: basisbeurs uitwonend 324,52 €/mes, aanvullende beurs
//     hasta 491,08 €/mes (requisito para estudiantes UE: trabajar 32 h/mes).
// Si cambias una cifra, cambia también MATRICULA / ACTUALIZADO si toca.
// ============================================================

export const ACTUALIZADO = { iso: '2026-09-28', texto: 'septiembre de 2026' };
export const MATRICULA = '2.694 €';

// Gastos fijos aproximados que se suman al alquiler (€/mes)
export const GASTOS_BASE = [
  { label: 'Comida y supermercado', min: 250, max: 350 },
  { label: 'Transporte (bici y algún tren)', min: 15, max: 40 },
  { label: 'Móvil e internet', min: 10, max: 20 },
  { label: 'Ocio, material y otros', min: 100, max: 200 },
];

// Datos del pack de Aeroespaciales Delft (se usan en /destinos/delft/ y en
// /servicios/aeroespaciales-delft/). General: 440 plazas / ~3.000 candidatos (TU Delft, 2026-27).
export const DELFT_AERO = {
  general: '15%',
  robin: '50%',
  nota: '8 de los 16 alumnos que preparamos fueron admitidos',
};

export const GUIA = {
  amsterdam: {
    alquiler: 950,
    resumen:
      'Ámsterdam es la ciudad con más oferta universitaria de Holanda (UvA, VU y HvA) y la más internacional, pero también la más cara: una habitación ronda los 950 € al mes. Merece la pena si buscas un grado muy concreto o una ciudad grande con vida 24/7; si tu prioridad es el presupuesto, hay alternativas igual de buenas.',
    datos: [
      { label: 'Habitación (mediana)', value: '≈ 950 €/mes' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'UvA · VU · HvA' },
      { label: 'Habitantes', value: '≈ 930.000' },
      { label: 'A Schiphol', value: '15-20 min en tren' },
    ],
    universidades: [
      {
        name: 'Universiteit van Amsterdam (UvA)',
        type: 'Universidad de investigación (WO)',
        text: 'La universidad más grande del país, fuerte en ciencias sociales, comunicación, economía y psicología. Campus repartidos por el centro de la ciudad.',
        ingles: 'Por ejemplo, Communication Science, Psychology, Economics and Business Economics o PPLE.',
        url: 'https://www.uva.nl/en',
      },
      {
        name: 'Vrije Universiteit Amsterdam (VU)',
        type: 'Universidad de investigación (WO)',
        text: 'Campus compacto en Zuidas, el distrito financiero. Buena conexión con empresas y un ambiente algo más de campus que la UvA.',
        ingles: 'Por ejemplo, International Business Administration o Econometrics and Operations Research.',
        url: 'https://vu.nl/en',
      },
      {
        name: 'Hogeschool van Amsterdam (HvA)',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Enfoque práctico y prácticas en empresa desde los primeros años. Una opción muy sólida si prefieres aprender haciendo.',
        ingles: 'Por ejemplo, International Business.',
        url: 'https://www.amsterdamuas.com',
      },
    ],
    alojamiento: {
      text: 'Es el mercado más difícil de Holanda: mucha demanda, poca oferta y precios altos. Muchos estudiantes acaban viviendo en ciudades cercanas como Haarlem, Amstelveen o Diemen y se mueven en tren o bici. Empieza a buscar en cuanto tengas la admisión, y desconfía de cualquier anuncio que pida dinero antes de ver el piso o firmar contrato.',
      tips: [
        'Apúntate cuanto antes a DUWO y a las residencias que ofrezcan UvA y VU a alumnos internacionales.',
        'Valora Haarlem, Amstelveen o Diemen: a 15-25 minutos y algo más baratas.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Más allá de los canales y los clichés, Ámsterdam es una ciudad de barrios: De Pijp con su mercado Albert Cuyp, los parques Vondelpark y Westerpark o la zona norte (Noord), a la que se llega en ferri gratis desde la estación central.',
      highlights: [
        { title: 'Koningsdag', text: 'El 27 de abril la ciudad entera se viste de naranja: mercadillos en la calle, música y barcos por los canales.' },
        { title: 'Cultura a mano', text: 'Rijksmuseum, Van Gogh Museum y decenas de salas de conciertos, muchas con descuentos para estudiantes.' },
        { title: 'Todo en bici', text: 'Es la forma más rápida y barata de moverte. Una bici de segunda mano es tu primera compra.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en Ámsterdam como estudiante?', a: 'Calcula entre 1.325 y 1.560 € al mes: una habitación ronda los 950 € (mediana de Kamernet, 2026) y el resto se va en comida, transporte y ocio. Es la ciudad más cara de Holanda para estudiar.' },
      { q: '¿Qué universidades hay en Ámsterdam?', a: 'Las dos universidades de investigación son la Universiteit van Amsterdam (UvA) y la Vrije Universiteit (VU). La Hogeschool van Amsterdam (HvA) es la principal universidad de ciencias aplicadas, con un enfoque más práctico.' },
      { q: '¿Es difícil encontrar alojamiento en Ámsterdam?', a: 'Sí, es la ciudad más complicada del país. Hay que empezar a buscar en cuanto tengas la admisión, apuntarte a las residencias de estudiantes y considerar ciudades cercanas como Haarlem o Amstelveen.' },
      { q: '¿Se puede estudiar en inglés en Ámsterdam?', a: 'Sí. UvA, VU y HvA ofrecen grados completos en inglés, sobre todo en economía, negocios, comunicación, psicología y ciencias sociales.' },
    ],
  },

  utrecht: {
    alquiler: 775,
    resumen:
      'Utrecht es la ciudad universitaria por excelencia de Holanda: céntrica, con mucho ambiente estudiantil y a menos de media hora de Ámsterdam. La Universiteit Utrecht es de las mejor valoradas del país, aunque buena parte de sus grados se imparte en neerlandés. Una habitación ronda los 775 € al mes.',
    datos: [
      { label: 'Habitación (mediana)', value: '≈ 775 €/mes' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'UU · HU · UCU' },
      { label: 'Habitantes', value: '≈ 370.000' },
      { label: 'A Ámsterdam', value: '≈ 27 min en tren' },
    ],
    universidades: [
      {
        name: 'Universiteit Utrecht (UU)',
        type: 'Universidad de investigación (WO)',
        text: 'Fundada en 1636, es una de las universidades más grandes y mejor valoradas de Holanda. Tiene sedes en el centro histórico y en el campus Utrecht Science Park (De Uithof).',
        ingles: 'En inglés destacan Economics and Business Economics y University College Utrecht; muchos otros grados son en neerlandés.',
        url: 'https://www.uu.nl/en',
      },
      {
        name: 'University College Utrecht (UCU)',
        type: 'Liberal arts (parte de la UU)',
        text: 'Grado interdisciplinar en inglés, con campus residencial propio y grupos pequeños. Diseñas tu propio itinerario entre ciencias, humanidades y ciencias sociales.',
        ingles: 'Todo el programa es en inglés.',
        url: 'https://www.uu.nl/en/bachelors/university-college-utrecht',
      },
      {
        name: 'Hogeschool Utrecht (HU)',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Una de las universidades de ciencias aplicadas más grandes del país, con enfoque práctico en negocios, comunicación, tecnología y salud.',
        ingles: 'Oferta en inglés más reducida: revisa cada programa antes de decidir.',
        url: 'https://www.internationalhu.com',
      },
    ],
    alojamiento: {
      text: 'Utrecht tiene mucha demanda y listas de espera largas en las residencias. Como el tren a Ámsterdam o a otras ciudades es rápido, algunos estudiantes buscan en poblaciones cercanas. Si vas a UCU, el alojamiento en el campus forma parte del programa.',
      tips: [
        'Inscríbete en SSH, la principal organización de alojamiento estudiantil de la ciudad, en cuanto te admitan.',
        'Mira también ROOM.nl y Kamernet, y avisa a conocidos: muchas habitaciones se pasan de estudiante a estudiante.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Utrecht tiene el encanto de Ámsterdam sin tanto turismo. Los canales tienen terrazas a nivel del agua (las werven), la vida estudiantil gira alrededor de las asociaciones y todo queda a 15 minutos en bici.',
      highlights: [
        { title: 'La Domtoren', text: 'La torre de iglesia más alta de Holanda y el punto de referencia de toda la ciudad.' },
        { title: 'Centro de la red de trenes', text: 'Utrecht Centraal conecta con casi cualquier ciudad del país en menos de una hora.' },
        { title: 'Aparcamiento de bicis gigante', text: 'Junto a la estación está uno de los aparcamientos de bicis más grandes del mundo, con sitio para unas 12.500 bicis.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en Utrecht como estudiante?', a: 'Entre 1.150 y 1.385 € al mes aproximadamente: una habitación ronda los 775 € (mediana de Kamernet, 2026) y el resto se reparte entre comida, transporte y ocio.' },
      { q: '¿La Universidad de Utrecht tiene grados en inglés?', a: 'Algunos, como Economics and Business Economics y University College Utrecht (liberal arts). Buena parte de los grados se imparte en neerlandés; los másters, en cambio, suelen ser en inglés.' },
      { q: '¿Es buena ciudad para estudiantes internacionales?', a: 'Sí: es muy estudiantil, segura y céntrica. La principal dificultad es el alojamiento, porque hay mucha demanda.' },
    ],
  },

  rotterdam: {
    alquiler: 750,
    resumen:
      'Róterdam es la ciudad de la economía y los negocios: aquí está la Erasmus University Rotterdam, con Rotterdam School of Management (RSM) y la Erasmus School of Economics, y el puerto más grande de Europa. Es moderna, con mucha salida profesional y algo más barata que Ámsterdam: una habitación ronda los 750 € al mes.',
    datos: [
      { label: 'Habitación (media)', value: '≈ 750 €/mes*' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'EUR · Hogeschool Rotterdam' },
      { label: 'Habitantes', value: '≈ 670.000' },
      { label: 'A Ámsterdam', value: '≈ 40 min en tren' },
    ],
    datosNota: '*Media de Kamernet del 4.º trimestre de 2025.',
    universidades: [
      {
        name: 'Erasmus University Rotterdam (EUR)',
        type: 'Universidad de investigación (WO)',
        text: 'Referencia internacional en economía, negocios y management. Campus Woudestein con todo en un mismo recinto.',
        ingles: 'Por ejemplo, International Business Administration (RSM), International Bachelor Economics and Business Economics (IBEB), Econometrics, Communication and Media (IBCoM) o Psychology.',
        url: 'https://www.eur.nl/en',
      },
      {
        name: 'Hogeschool Rotterdam',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Formación práctica en negocios, logística, ingeniería y tecnología. A través de su Rotterdam Business School ofrece programas internacionales.',
        ingles: 'Programas en inglés en el área de negocios (Rotterdam Business School).',
        url: 'https://www.rotterdamuas.com',
      },
    ],
    alojamiento: {
      text: 'Hay más oferta que en Ámsterdam o Utrecht, pero los precios han subido rápido en los últimos años. Los barrios cercanos al campus Woudestein (Kralingen) son los más buscados por los estudiantes.',
      tips: [
        'Mira las residencias de SSH y Stadswonen y las opciones que recomienda la propia universidad.',
        'Kralingen y el centro son las zonas más cómodas para ir al campus en bici.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Tras la Segunda Guerra Mundial, Róterdam se reconstruyó apostando por la arquitectura moderna, y eso se nota en cada esquina. Es una ciudad directa, trabajadora y con una escena gastronómica y nocturna muy potente.',
      highlights: [
        { title: 'Arquitectura', text: 'Las casas cubo, la Markthal y el puente Erasmus forman un skyline que no se parece a ninguna otra ciudad holandesa.' },
        { title: 'Puerto y empleo', text: 'El mayor puerto de Europa atrae a multinacionales y abre muchas opciones de prácticas en logística, finanzas y comercio.' },
        { title: 'Festivales', text: 'North Sea Jazz y el International Film Festival Rotterdam llenan la ciudad cada año.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en Róterdam como estudiante?', a: 'Calcula entre 1.125 y 1.360 € al mes aproximadamente, con una habitación de unos 750 € (media de Kamernet de finales de 2025).' },
      { q: '¿Qué estudiar en la Erasmus University Rotterdam?', a: 'Destaca en economía y negocios: International Business Administration (RSM), IBEB y Econometrics son sus grados en inglés más conocidos. También tiene comunicación, psicología y derecho.' },
      { q: '¿Es Róterdam buena para encontrar prácticas?', a: 'Sí. El puerto, las multinacionales y el sector financiero y logístico generan muchas oportunidades de prácticas y de trabajo al terminar.' },
    ],
  },

  'la-haya': {
    alquiler: 745,
    resumen:
      'La Haya (Den Haag) es la ciudad del derecho internacional, la diplomacia y las relaciones internacionales: aquí están la Corte Internacional de Justicia y la Corte Penal Internacional. Tiene un campus de la Universidad de Leiden y The Hague University of Applied Sciences, y la playa de Scheveningen a 15 minutos en tranvía. Una habitación ronda los 745 € al mes.',
    datos: [
      { label: 'Habitación (mediana)', value: '≈ 745 €/mes' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'Leiden (campus) · THUAS' },
      { label: 'Habitantes', value: '≈ 560.000' },
      { label: 'A Ámsterdam', value: '≈ 50 min en tren' },
    ],
    universidades: [
      {
        name: 'Leiden University – Campus The Hague',
        type: 'Universidad de investigación (WO)',
        text: 'La sede de Leiden en La Haya se centra en relaciones internacionales, gobernanza, seguridad y liberal arts.',
        ingles: 'Por ejemplo, International Studies, Security Studies y Leiden University College The Hague (liberal arts).',
        url: 'https://www.universiteitleiden.nl/en/the-hague',
      },
      {
        name: 'The Hague University of Applied Sciences (THUAS)',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Muy internacional, con enfoque práctico en negocios, derecho, estudios europeos y comunicación.',
        ingles: 'Por ejemplo, International Business, European Studies o International and European Law.',
        url: 'https://www.thuas.com',
      },
    ],
    alojamiento: {
      text: 'La Haya es una ciudad grande y extendida, así que hay más variedad de barrios que en Leiden o Delft, aunque los precios se acercan a los de Utrecht. Muchos estudiantes viven en el centro o cerca de la estación Hollands Spoor.',
      tips: [
        'Mira las residencias de DUWO y las opciones que ofrecen Leiden y THUAS a los alumnos internacionales.',
        'Delft y Leiden están a 10-15 minutos en tren y pueden ser una alternativa.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Es la sede del Gobierno holandés y de decenas de organismos internacionales, así que convives con diplomáticos, ONG y organizaciones internacionales. Esto se traduce en prácticas y en un ambiente muy internacional.',
      highlights: [
        { title: 'Playa en la ciudad', text: 'Scheveningen y Kijkduin: surf, chiringuitos y atardeceres a un trayecto de tranvía.' },
        { title: 'Ciudad internacional de la paz y la justicia', text: 'La Corte Internacional de Justicia, la Corte Penal Internacional y Europol tienen aquí su sede.' },
        { title: 'Arte', text: 'En el Mauritshuis está "La joven de la perla" de Vermeer.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en La Haya como estudiante?', a: 'Entre 1.120 y 1.355 € al mes aproximadamente: una habitación ronda los 745 € (mediana de Kamernet, 2026) y el resto se reparte entre comida, transporte y ocio.' },
      { q: '¿Qué se puede estudiar en inglés en La Haya?', a: 'Relaciones internacionales y seguridad en el campus de Leiden (International Studies, Security Studies, Leiden University College) y negocios, estudios europeos o derecho internacional y europeo en The Hague University of Applied Sciences.' },
      { q: '¿Es buena ciudad para estudiar derecho internacional?', a: 'Sí, es la capital mundial del derecho internacional: la Corte Internacional de Justicia, la Corte Penal Internacional y muchas organizaciones internacionales tienen aquí su sede y ofrecen prácticas.' },
    ],
  },

  leiden: {
    alquiler: 655,
    resumen:
      'Leiden es la ciudad universitaria más antigua de Holanda (1575): histórica, tranquila y muy estudiantil, entre Ámsterdam y La Haya. La Universiteit Leiden destaca en derecho, humanidades, arqueología y ciencias. Una habitación ronda los 655 € al mes.',
    datos: [
      { label: 'Habitación (media)', value: '≈ 655 €/mes*' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'Universiteit Leiden' },
      { label: 'Habitantes', value: '≈ 130.000' },
      { label: 'A Schiphol', value: '≈ 15-20 min en tren' },
    ],
    datosNota: '*Media de Kamernet del 4.º trimestre de 2025.',
    universidades: [
      {
        name: 'Universiteit Leiden',
        type: 'Universidad de investigación (WO)',
        text: 'La universidad más antigua del país y una de las más prestigiosas. En Leiden están las facultades de humanidades, ciencias, arqueología, psicología y derecho; en La Haya, las de relaciones internacionales y gobernanza.',
        ingles: 'En Leiden, grados en inglés como Psychology (international track), Archaeology o Linguistics. En su campus de La Haya: International Studies y Leiden University College.',
        url: 'https://www.universiteitleiden.nl/en',
      },
      {
        name: 'Hogeschool Leiden',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Enfocada en salud, educación, trabajo social y ciencias aplicadas. La mayoría de sus grados son en neerlandés.',
        ingles: 'Oferta en inglés muy limitada.',
        url: 'https://www.hsleiden.nl',
      },
    ],
    alojamiento: {
      text: 'Es una ciudad pequeña con mucho estudiante, así que la oferta es limitada y se mueve rápido. La ventaja es que La Haya, Delft y Haarlem están muy cerca en tren.',
      tips: [
        'Inscríbete en DUWO y revisa las opciones de alojamiento de la universidad para alumnos internacionales.',
        'Busca con tiempo: los meses de junio a agosto son los de más competencia.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Canales, almshouses (hofjes) escondidos y más de 20 museos en una ciudad que se recorre a pie. Aquí nació Rembrandt y aquí se plantaron los primeros tulipanes de Holanda, en el Hortus Botanicus.',
      highlights: [
        { title: 'Leidens Ontzet', text: 'Cada 3 de octubre la ciudad celebra el fin del asedio de 1574 con hutspot, arenques y fiesta en la calle.' },
        { title: 'Poemas en las paredes', text: 'Más de 100 poemas en decenas de idiomas pintados en las fachadas, algunos en español.' },
        { title: 'Playa cerca', text: 'Katwijk y Noordwijk están a unos 20 minutos en bici o autobús.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en Leiden como estudiante?', a: 'Entre 1.030 y 1.265 € al mes aproximadamente, con una habitación de unos 655 € (media de Kamernet de finales de 2025).' },
      { q: '¿La Universidad de Leiden tiene grados en inglés?', a: 'Sí, aunque muchos de los programas internacionales más demandados (International Studies, Leiden University College) están en el campus de La Haya. En Leiden hay grados en inglés en psicología, arqueología y lingüística, entre otros.' },
      { q: '¿Leiden o La Haya?', a: 'Leiden es más pequeña, histórica y estudiantil; La Haya es más grande, internacional y tiene playa. Depende sobre todo de dónde se imparta tu grado.' },
    ],
  },

  delft: {
    alquiler: 600,
    resumen:
      'Delft es la ciudad de la ingeniería: TU Delft es una de las mejores universidades técnicas del mundo y está entre las primeras en arquitectura según los rankings QS por materias. Es una ciudad pequeña y bonita, entre Róterdam y La Haya, y muy exigente académicamente. Una habitación ronda los 600 € al mes.',
    datos: [
      { label: 'Habitación (media)', value: '≈ 600 €/mes*' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidad', value: 'TU Delft' },
      { label: 'Habitantes', value: '≈ 105.000' },
      { label: 'A Róterdam / La Haya', value: '≈ 10-15 min en tren' },
    ],
    datosNota: '*Media de Kamernet del 4.º trimestre de 2025.',
    universidades: [
      {
        name: 'TU Delft',
        type: 'Universidad técnica (WO)',
        text: 'La universidad técnica más grande y antigua de Holanda (1842). Referente mundial en ingeniería aeroespacial, civil, arquitectura e informática.',
        ingles: 'Por ejemplo, Aerospace Engineering, Computer Science and Engineering, Nanobiology o Applied Earth Sciences. Muchos otros grados son en neerlandés, y los másters son en inglés.',
        url: 'https://www.tudelft.nl/en',
      },
    ],
    promoAero: true,
    admisionNota:
      'Ojo con los plazos: varios grados de TU Delft (Aerospace Engineering, Computer Science and Engineering, Nanobiology, Architecture…) tienen plazas limitadas (numerus fixus) y el plazo para solicitar plaza termina el 15 de enero.',
    alojamiento: {
      text: 'La oferta la gestiona en gran parte DUWO, y se agota rápido en verano. Como Delft está pegada a Róterdam y La Haya, muchos estudiantes viven allí y van en tren o bici.',
      tips: [
        'Inscríbete en DUWO en cuanto tengas la admisión (o antes, si lo permiten).',
        'Mira también Róterdam y La Haya: a 10-15 minutos en tren.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Delft es una ciudad de postal (canales, la plaza del mercado y el ayuntamiento renacentista), pero la vida gira alrededor del campus y de las asociaciones de estudiantes. Aquí se estudia en serio.',
      highlights: [
        { title: 'Delfts Blauw', text: 'La famosa cerámica azul y blanca se sigue fabricando a mano en Royal Delft.' },
        { title: 'Vermeer', text: 'El pintor de "La joven de la perla" nació y trabajó aquí; el Vermeer Centrum cuenta su historia.' },
        { title: 'Equipos de estudiantes', text: 'Los equipos de TU Delft diseñan coches solares, cohetes y drones que compiten en todo el mundo.' },
      ],
    },
    faq: [
      { q: '¿Es difícil entrar en TU Delft?', a: 'Los grados con numerus fixus (como Aerospace Engineering o Computer Science and Engineering) tienen proceso de selección y plazo el 15 de enero. Piden una buena base en matemáticas y física.' },
      { q: '¿Qué grados de TU Delft son en inglés?', a: 'Entre los grados en inglés están Aerospace Engineering, Computer Science and Engineering, Nanobiology y Applied Earth Sciences. El resto de grados suele ser en neerlandés; los másters son en inglés.' },
      { q: '¿Cómo prepararse para el examen de acceso de Aerospace Engineering?', a: 'La selección combina un test de aptitud académica y un examen de matemáticas, física y temas de primer curso en marzo. En Robin tenemos un curso preparatorio específico con un profesor exalumno de TU Delft y grupos de máximo 5 alumnos: 8 de los 16 alumnos que preparamos fueron admitidos, frente a una tasa general de entrada en torno al 15%.' },
      { q: '¿Cuánto cuesta vivir en Delft?', a: 'Entre 975 y 1.210 € al mes aproximadamente, con una habitación de unos 600 € (media de Kamernet de finales de 2025).' },
    ],
  },

  groningen: {
    alquiler: 565,
    resumen:
      'Groningen es la ciudad más estudiantil de Holanda: una de cada cuatro personas es estudiante. La Rijksuniversiteit Groningen (1614) tiene muchos grados en inglés, y Hanze aporta la parte más práctica. Está en el norte, lejos del Randstad, pero es más barata: una habitación ronda los 565 € al mes.',
    datos: [
      { label: 'Habitación (media)', value: '≈ 565 €/mes*' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'RUG · Hanze' },
      { label: 'Habitantes', value: '≈ 240.000' },
      { label: 'A Ámsterdam', value: '≈ 2 h en tren' },
    ],
    datosNota: '*Media de Kamernet del 4.º trimestre de 2025.',
    universidades: [
      {
        name: 'Rijksuniversiteit Groningen (RUG)',
        type: 'Universidad de investigación (WO)',
        text: 'Una de las universidades más antiguas y grandes del país, bien posicionada en los rankings internacionales. Oferta muy amplia en inglés.',
        ingles: 'Por ejemplo, International Business, Psychology, International Relations, Econometrics o University College Groningen.',
        url: 'https://www.rug.nl/?lang=en',
      },
      {
        name: 'Hanze University of Applied Sciences',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Formación práctica en negocios, comunicación, ingeniería, música y salud, con muchas prácticas en empresa.',
        ingles: 'Por ejemplo, International Business o International Communication.',
        url: 'https://www.hanze.nl/en',
      },
    ],
    alojamiento: {
      text: 'Durante años Groningen ha tenido falta de habitaciones al inicio del curso, y los precios han subido con fuerza. Algunos anuncios no aceptan estudiantes internacionales, así que conviene empezar pronto y apoyarse en las residencias.',
      tips: [
        'Mira las residencias de SSH y el portal de alojamiento de la universidad en cuanto te admitan.',
        'Intenta llegar con alojamiento cerrado: buscar en persona en agosto es mucho más difícil.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Con tanto estudiante, la ciudad vive a su ritmo: bares abiertos hasta tarde, asociaciones para todo y un centro en el que casi no entran coches. Todo está a 10 minutos en bici.',
      highlights: [
        { title: 'Ciudad sin coches', text: 'El centro está diseñado para bicis y peatones: es de las ciudades más ciclistas del mundo.' },
        { title: 'Noorderzon', text: 'Festival de teatro, música y arte cada agosto en el parque Noorderplantsoen.' },
        { title: 'Martinitoren', text: 'La torre símbolo de la ciudad, con vistas a toda la provincia.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en Groningen como estudiante?', a: 'Entre 940 y 1.175 € al mes aproximadamente, con una habitación de unos 565 € (media de Kamernet de finales de 2025). Es más barata que las ciudades del Randstad.' },
      { q: '¿La Universidad de Groningen tiene grados en inglés?', a: 'Sí, muchos: International Business, Psychology, International Relations, Econometrics o University College Groningen, entre otros.' },
      { q: '¿Es difícil encontrar habitación en Groningen?', a: 'Al inicio del curso hay mucha competencia y algunos propietarios no alquilan a internacionales. Lo mejor es empezar a buscar en primavera y apuntarse a las residencias.' },
    ],
  },

  maastricht: {
    alquiler: 550,
    resumen:
      'Maastricht es la ciudad más internacional para estudiar en Holanda: más de la mitad de los alumnos de la Universidad de Maastricht vienen de fuera, y se estudia con Problem-Based Learning en grupos pequeños. Está en la frontera con Bélgica y Alemania, y una habitación ronda los 550 € al mes. Aquí estudiamos los fundadores de Robin.',
    datos: [
      { label: 'Habitación (mediana)', value: '≈ 550 €/mes' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'UM · Zuyd' },
      { label: 'Habitantes', value: '≈ 120.000' },
      { label: 'A Lieja / Aquisgrán', value: '≈ 30 min' },
    ],
    universidades: [
      {
        name: 'Maastricht University (UM)',
        type: 'Universidad de investigación (WO)',
        text: 'Fundada en 1976, es de las universidades jóvenes mejor posicionadas del mundo. Todo el método gira en torno al Problem-Based Learning: pocas clases magistrales y mucho trabajo en grupos de unos 12-15 alumnos.',
        ingles: 'Por ejemplo, European Law School, International Business, European Studies, Psychology o University College Maastricht.',
        url: 'https://www.maastrichtuniversity.nl',
      },
      {
        name: 'Zuyd Hogeschool',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Formación práctica en hostelería, negocios, artes y salud, con sedes en Maastricht, Heerlen y Sittard.',
        ingles: 'Algunos programas en inglés, como Hotel Management.',
        url: 'https://www.zuyd.nl/en',
      },
    ],
    alojamiento: {
      text: 'El mercado es más pequeño que en el Randstad, pero en los últimos años los precios han subido más de un 15% y en agosto hay mucha competencia. La ventaja: todo está cerca y se llega a cualquier sitio en bici.',
      tips: [
        'Mira el Guesthouse y las opciones que ofrece la universidad para alumnos internacionales.',
        'Los barrios de Wyck, Céramique y el centro son los más cómodos para ir a clase.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Maastricht no parece Holanda: tiene colinas, cuestas, influencia belga y una forma de vivir más del sur. Terrazas, buena comida y un ambiente internacional en el que el inglés es la lengua de todos los días.',
      highlights: [
        { title: 'Carnaval', text: 'En febrero la ciudad se disfraza entera durante días. Es la gran fiesta del año.' },
        { title: 'Tres países en bici', text: 'Bélgica y Alemania están a un paseo en bici; Lieja, Aquisgrán y Colonia, a una excursión.' },
        { title: 'Dominicanen', text: 'Una librería dentro de una iglesia gótica del siglo XIII, parada obligatoria.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en Maastricht como estudiante?', a: 'Entre 925 y 1.160 € al mes aproximadamente: una habitación ronda los 550 € (mediana de Kamernet, 2026) y el resto se va en comida, transporte y ocio.' },
      { q: '¿Qué es el Problem-Based Learning de Maastricht?', a: 'Es el método de la Universidad de Maastricht: en lugar de clases magistrales, trabajas en grupos pequeños (tutorials) resolviendo casos reales, con un tutor que guía la discusión. Exige preparar mucho, pero se aprende a pensar y a trabajar en equipo.' },
      { q: '¿Qué estudiar en inglés en Maastricht?', a: 'Los grados más demandados por estudiantes españoles son European Law School, International Business, European Studies, Psychology y University College Maastricht.' },
      { q: '¿Por qué elegir Maastricht?', a: 'Porque es muy internacional, está bien situada en Europa y el método PBL prepara muy bien para el mundo laboral. Nosotros estudiamos allí y conocemos la ciudad de primera mano.' },
    ],
  },

  eindhoven: {
    alquiler: 540,
    resumen:
      'Eindhoven es la capital tecnológica de Holanda: TU Eindhoven, Fontys y Design Academy Eindhoven, en una región llena de empresas como ASML y Philips. Es perfecta para perfiles técnicos y de diseño con vistas a la industria. Una habitación ronda los 540 € al mes, aunque los precios suben rápido.',
    datos: [
      { label: 'Habitación (mediana)', value: '≈ 540 €/mes' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'TU/e · Fontys · DAE' },
      { label: 'Habitantes', value: '≈ 245.000' },
      { label: 'A Ámsterdam', value: '≈ 1 h 20 min en tren' },
    ],
    universidades: [
      {
        name: 'Eindhoven University of Technology (TU/e)',
        type: 'Universidad técnica (WO)',
        text: 'Universidad técnica con campus propio junto al centro, muy conectada con la industria de la región (Brainport).',
        ingles: 'La mayoría de sus grados son en inglés: Industrial Design, Mechanical Engineering, Electrical Engineering, Computer Science o Applied Physics, entre otros.',
        url: 'https://www.tue.nl/en',
      },
      {
        name: 'Fontys University of Applied Sciences',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Formación práctica en informática, ingeniería, negocios y artes, con mucha relación con empresas de la zona.',
        ingles: 'Programas en inglés en áreas como ICT e ingeniería.',
        url: 'https://fontys.edu',
      },
      {
        name: 'Design Academy Eindhoven',
        type: 'Escuela de diseño (HBO)',
        text: 'Una de las escuelas de diseño más reconocidas del mundo, con un enfoque muy conceptual y experimental.',
        ingles: 'Grado en inglés.',
        url: 'https://www.designacademy.nl',
      },
    ],
    alojamiento: {
      text: 'Eindhoven ha sido la ciudad donde más han subido los alquileres de habitaciones en el último año (más de un 20% según Kamernet), porque atrae a estudiantes y a trabajadores del sector tecnológico. Sigue siendo más barata que el Randstad, pero hay que moverse pronto.',
      tips: [
        'Inscríbete en Vestide, la principal organización de alojamiento estudiantil de la ciudad.',
        'Los barrios cercanos al campus de TU/e y al centro son los más prácticos.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'La ciudad creció alrededor de Philips y hoy es un laboratorio de tecnología y diseño. No es la más bonita de Holanda, pero sí de las más innovadoras, con antiguas fábricas convertidas en espacios creativos (Strijp-S).',
      highlights: [
        { title: 'GLOW', text: 'Cada noviembre la ciudad se llena de instalaciones de luz de artistas de todo el mundo.' },
        { title: 'Dutch Design Week', text: 'La mayor feria de diseño del norte de Europa, cada octubre.' },
        { title: 'Aeropuerto propio', text: 'Eindhoven Airport tiene vuelos directos a varias ciudades españolas.' },
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta vivir en Eindhoven como estudiante?', a: 'Entre 915 y 1.150 € al mes aproximadamente: una habitación ronda los 540 € (mediana de Kamernet, 2026), aunque los precios han subido mucho en el último año.' },
      { q: '¿TU Eindhoven enseña en inglés?', a: 'Sí, la mayoría de sus grados se imparten en inglés, sobre todo en ingeniería, informática, física y diseño industrial.' },
      { q: '¿Hay trabajo para ingenieros en Eindhoven?', a: 'Sí. La región Brainport, con empresas como ASML, Philips o NXP, es uno de los principales polos tecnológicos de Europa y busca perfiles técnicos constantemente.' },
    ],
  },

  twente: {
    alquiler: 390,
    resumen:
      'La Universidad de Twente, en Enschede, es de las pocas de Holanda con campus propio al estilo americano: residencias, deporte y facultades en el mismo recinto. Destaca en tecnología, ingeniería y ciencias sociales con un enfoque emprendedor. Es de las opciones más baratas: una habitación ronda los 390 € al mes.',
    datos: [
      { label: 'Habitación (mediana)', value: '≈ 390 €/mes' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'UT · Saxion' },
      { label: 'Habitantes (Enschede)', value: '≈ 160.000' },
      { label: 'A Ámsterdam', value: '≈ 2 h en tren' },
    ],
    universidades: [
      {
        name: 'University of Twente (UT)',
        type: 'Universidad técnica (WO)',
        text: 'Campus verde de unas 140 hectáreas con residencias, instalaciones deportivas y facultades. Mezcla tecnología con ciencias sociales y tiene fama de emprendedora: de aquí han salido cientos de startups.',
        ingles: 'Por ejemplo, Creative Technology, Advanced Technology, International Business Administration, Psychology o Technical Computer Science.',
        url: 'https://www.utwente.nl/en',
      },
      {
        name: 'Saxion University of Applied Sciences',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Formación práctica en negocios, tecnología, hostelería y salud, con sedes en Enschede, Deventer y Apeldoorn.',
        ingles: 'Algunos programas en inglés: revisa cada uno antes de decidir.',
        url: 'https://www.saxion.edu',
      },
    ],
    alojamiento: {
      text: 'Es de las ciudades más asequibles de Holanda y hay alojamiento en el propio campus de la universidad, algo poco habitual en el país. Aun así, los precios han subido más de un 10% en el último año.',
      tips: [
        'Pregunta por las residencias del campus de la UT en cuanto te admitan.',
        'El centro de Enschede está a unos 15 minutos en bici del campus.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'La vida gira alrededor del campus: decenas de asociaciones de estudiantes, deporte a dos pasos de casa y ambiente de comunidad. Alemania está al lado, y Münster o Düsseldorf quedan a una excursión.',
      highlights: [
        { title: 'Vida de campus', text: 'Vives, estudias y haces deporte en el mismo sitio, algo muy raro en Holanda.' },
        { title: 'Emprendimiento', text: 'La universidad tiene programas propios para montar tu startup desde el primer año.' },
        { title: 'Frontera alemana', text: 'Alemania está a pocos kilómetros: escapadas fáciles y compras más baratas.' },
      ],
    },
    faq: [
      { q: '¿Dónde está la Universidad de Twente?', a: 'En Enschede, al este de Holanda, muy cerca de la frontera con Alemania. Tiene un campus propio con residencias y facultades.' },
      { q: '¿Cuánto cuesta vivir en Enschede como estudiante?', a: 'Entre 765 y 1.000 € al mes aproximadamente: una habitación ronda los 390 € (mediana de Kamernet, 2026). Es de las ciudades más baratas para estudiar en Holanda.' },
      { q: '¿Qué grados en inglés tiene la Universidad de Twente?', a: 'Entre otros, Creative Technology, Advanced Technology, International Business Administration, Psychology y Technical Computer Science.' },
    ],
  },

  breda: {
    alquiler: 595,
    resumen:
      'Breda es una ciudad mediana, cercana y muy agradable en el sur de Holanda, sede de Breda University of Applied Sciences (BUas), referente en videojuegos, turismo, ocio, hostelería y logística. Está a unos 25 minutos de Róterdam y a unos 35 de Amberes. Una habitación ronda los 595 € al mes.',
    datos: [
      { label: 'Habitación (media)', value: '≈ 595 €/mes*' },
      { label: 'Matrícula UE 2026-27', value: '2.694 €/año' },
      { label: 'Universidades', value: 'BUas · Avans' },
      { label: 'Habitantes', value: '≈ 185.000' },
      { label: 'A Róterdam', value: '≈ 25 min en tren' },
    ],
    datosNota: '*Media de Kamernet del 1.er trimestre de 2026.',
    universidades: [
      {
        name: 'Breda University of Applied Sciences (BUas)',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Especializada en juegos, medios, turismo, ocio y eventos, hostelería, logística y entorno urbano. Muy práctica y muy internacional.',
        ingles: 'Por ejemplo, Creative Media and Game Technologies, Tourism o Leisure and Events Management.',
        url: 'https://www.buas.nl',
      },
      {
        name: 'Avans University of Applied Sciences',
        type: 'Universidad de ciencias aplicadas (HBO)',
        text: 'Formación práctica en negocios, tecnología y artes, con sedes en Breda, Den Bosch y Tilburg.',
        ingles: 'Algunos programas en inglés: revisa cada uno antes de decidir.',
        url: 'https://www.avans.nl/international',
      },
    ],
    alojamiento: {
      text: 'Hay más margen que en las grandes ciudades, aunque los precios siguen subiendo. El centro es compacto y casi todo queda a 10-15 minutos en bici del campus de BUas.',
      tips: [
        'Revisa las opciones que recomienda BUas a los alumnos internacionales en cuanto te admitan.',
        'Mira Kamernet y grupos de estudiantes: en ciudades medianas se mueve mucho el boca a boca.',
        'Nunca pagues fianza sin contrato firmado ni sin comprobar quién es el propietario.',
      ],
    },
    vida: {
      text: 'Breda tiene centro histórico con castillo, una iglesia gótica que se ve desde toda la ciudad (la Grote Kerk) y un ambiente del sur, más de terraza. Grande para no aburrirte, pequeña para sentirte en casa.',
      highlights: [
        { title: 'Carnaval', text: 'Durante el carnaval Breda pasa a llamarse "Kielegat" y la fiesta llena la ciudad durante días.' },
        { title: 'Bélgica al lado', text: 'Amberes está a unos 35 minutos en tren: escapadas de fin de semana muy fáciles.' },
        { title: 'Parques y castillo', text: 'El parque Valkenberg y el castillo de Breda están en pleno centro.' },
      ],
    },
    faq: [
      { q: '¿Qué se puede estudiar en Breda?', a: 'Breda University of Applied Sciences es referente en videojuegos (Creative Media and Game Technologies), turismo, ocio y eventos, hostelería y logística. Avans ofrece además negocios, tecnología y artes.' },
      { q: '¿Cuánto cuesta vivir en Breda como estudiante?', a: 'Entre 970 y 1.205 € al mes aproximadamente, con una habitación de unos 595 € (media de Kamernet del primer trimestre de 2026).' },
      { q: '¿Es Breda una buena ciudad para estudiantes?', a: 'Sí: es segura, manejable, con mucho ambiente y bien conectada con Róterdam y Amberes. Ideal si prefieres una ciudad mediana a una gran capital.' },
    ],
  },
};
