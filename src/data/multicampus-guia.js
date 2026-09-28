// ============================================================
// Guía ampliada de las universidades multicampus (/universidades/<slug>/).
// Secciones: resumen, datos clave, programa, costes, admisión y FAQ (schema FAQPage).
// Datos revisados en septiembre de 2026 en las webs oficiales:
//   ESCP:     escp.eu/programmes/bachelor-in-management-BSc
//   Albert:   albertschool.com (fees, International BBA, brochure 2026)
//   Forward:  forward-college.eu (FAQ, tuition fees) y lse.ac.uk (teaching centre)
// Las cifras de colocación y salario son las que publica cada escuela.
// ============================================================

export const MULTICAMPUS_ACTUALIZADO = { iso: '2026-09-28', texto: 'septiembre de 2026' };

export const MULTICAMPUS_GUIA = {
  'escp-business-school': {
    resumen:
      'ESCP Business School, fundada en París en 1819, es la escuela de negocios más antigua del mundo. Su Bachelor in Management (BSc) dura 3 años y se estudia en 3 países distintos, entre Berlín, Londres, Madrid, París y Turín, en inglés. Es una escuela privada: la matrícula para estudiantes europeos es de 20.800 € al año (curso 2027-28). Encaja si quieres management con prestigio internacional y te ves cambiando de país cada año.',
    datos: [
      { label: 'Matrícula UE (2027-28)', value: '20.800 €/año' },
      { label: 'Duración', value: '3 años · 180 ECTS' },
      { label: 'Campus', value: 'Berlín · Londres · Madrid · París · Turín' },
      { label: 'Idioma', value: 'Inglés' },
      { label: 'Tipo', value: 'Escuela de negocios privada' },
    ],
    programa: {
      titulo: '3 años en 3 países',
      texto:
        'Cada año estudias en un campus distinto. El primer año puedes empezar en Berlín, Londres, París o Turín, y los siguientes los repartes entre los cinco campus. La asignación final combina tus preferencias con las plazas disponibles.',
      puntos: [
        'Bachelor of Science in Management (BSc), 180 ECTS.',
        'Clases en inglés (alguna asignatura en francés) y cursos de español, italiano, francés, alemán o chino.',
        'Más de 3 oportunidades de prácticas internacionales durante el grado.',
        'Estudiantes de más de 80 nacionalidades y una red de más de 95.000 alumni en 190 países.',
        'Según ESCP, el 98% de sus graduados tiene trabajo o sigue estudiando al terminar.',
      ],
    },
    costes: {
      filas: [
        { label: 'Matrícula', value: '17.900 €/año' },
        { label: 'Tasas adicionales', value: '2.900 €/año' },
        { label: 'Total estudiantes UE', value: '20.800 €/año', total: true },
        { label: 'Tasa de solicitud', value: '80 € (una vez)' },
        { label: 'Depósito para reservar plaza', value: '3.500 €' },
      ],
      nota: 'Tarifas oficiales para el curso 2027-28. A esto súmale el alojamiento y la vida en cada ciudad, que cambia mucho entre Londres o París y Turín o Berlín.',
    },
    admision: {
      pasos: [
        { title: 'Solicitud online', text: 'Directamente en la web de ESCP o a través de Parcoursup, UCAS o Common App.' },
        { title: 'Entrevista personal', text: 'Con profesorado de la escuela: quieren conocer tu motivación y tu encaje con un grado internacional y exigente.' },
        { title: 'Resultado', text: 'Recibes una oferta condicional (a falta de tus notas finales) o incondicional.' },
        { title: 'Matrícula', text: 'Confirmas tu plaza con un depósito de 3.500 €.' },
      ],
      requisitos: [
        'Buen expediente de Bachillerato, IB, A-Levels o equivalente.',
        'Nivel de inglés acreditado (IELTS, TOEFL o equivalente).',
        'Conviene aplicar pronto: las plazas por campus son limitadas.',
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta el Bachelor in Management de ESCP?', a: 'Para estudiantes de la Unión Europea, 20.800 € al año en el curso 2027-28 (17.900 € de matrícula más 2.900 € de tasas adicionales). Además hay una tasa de solicitud de 80 € y un depósito de 3.500 € para reservar la plaza.' },
      { q: '¿En qué ciudades se estudia el bachelor de ESCP?', a: 'En tres de sus cinco campus: Berlín, Londres, Madrid, París y Turín. El primer año puede ser en Berlín, Londres, París o Turín, y cada año cambias de país.' },
      { q: '¿El bachelor de ESCP es en inglés?', a: 'Sí, se imparte en inglés, con alguna asignatura en francés. Además puedes estudiar español, italiano, francés, alemán o chino.' },
      { q: '¿Cómo es la admisión en ESCP?', a: 'Solicitud online (directa o por Parcoursup, UCAS o Common App), entrevista personal con profesorado y oferta condicional o incondicional. Para confirmar la plaza se paga un depósito de 3.500 €.' },
      { q: '¿ESCP es una universidad pública o privada?', a: 'Es una escuela de negocios privada, con una de las redes de alumni más grandes de Europa.' },
    ],
  },

  'albert-school': {
    resumen:
      'Albert School es una escuela de negocios, datos e inteligencia artificial fundada en París en 2022. Su bachelor dura 3 años y da un título conjunto con Mines Paris – PSL (grado de Licence, 180 ECTS). La versión International BBA se estudia en inglés en 3 países, entre sus campus de Francia, Italia, Suiza y España. Es una escuela privada: la matrícula para estudiantes de la UE es de 14.900 € al año.',
    datos: [
      { label: 'Matrícula UE', value: '14.900 €/año' },
      { label: 'Duración', value: '3 años · 180 ECTS' },
      { label: 'Campus', value: 'París · Marsella · Milán · Ginebra · Madrid' },
      { label: 'Título', value: 'Conjunto con Mines Paris – PSL' },
      { label: 'Tipo', value: 'Escuela privada (desde 2022)' },
    ],
    programa: {
      titulo: 'Negocio, datos e IA en 3 países',
      texto:
        'El International BBA Business, Data & AI se imparte en inglés y cada año puedes elegir campus entre Francia, Italia, Suiza y España. También hay versiones del bachelor en francés, italiano o español según el campus.',
      puntos: [
        'Título conjunto Albert School × Mines Paris – PSL, con grado de Licence reconocido por el Estado francés (180 ECTS).',
        'Unas 30 horas de clase a la semana, con opción de año de gap (4 años en total).',
        'Más de 50 empresas colaboradoras, como LVMH, BCG, Carrefour o BlackRock.',
        'Según Albert School, el 70% de sus graduados encuentra trabajo en 3 meses y el 80% es contratado por la empresa donde hizo su alternancia.',
      ],
    },
    costes: {
      filas: [
        { label: 'París, Marsella, Madrid y Milán (UE)', value: '14.900 €/año', total: true },
        { label: 'Ginebra (UE)', value: '20.900 CHF/año' },
        { label: 'Becas', value: 'Según ingresos, y becas de empresas de hasta el 50% de la matrícula' },
      ],
      nota: 'Tarifas oficiales publicadas por Albert School. A esto súmale el alojamiento y la vida en cada ciudad.',
    },
    admision: {
      pasos: [
        { title: 'Test de razonamiento', text: 'Prueba de lógica y razonamiento de unos 40 minutos.' },
        { title: 'Solicitud online', text: 'Con tus notas y una carta de motivación.' },
        { title: 'Entrevista', text: 'Unos 30 minutos, con un brainteaser (un problema de lógica para ver cómo piensas).' },
      ],
      requisitos: [
        'Estar terminando Bachillerato o equivalente.',
        'Afinidad con las matemáticas y el análisis de datos.',
        'Admisión continua: para septiembre de 2027 no hay fecha de cierre, pero las plazas se van llenando.',
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta estudiar en Albert School?', a: 'Para estudiantes de la UE, 14.900 € al año en los campus de París, Marsella, Madrid y Milán, y 20.900 CHF en Ginebra. Hay becas según ingresos y becas de empresas que cubren hasta el 50% de la matrícula.' },
      { q: '¿El título de Albert School es oficial?', a: 'Sí. El bachelor da un título conjunto con Mines Paris – PSL con grado de Licence reconocido por el Estado francés, con 180 ECTS.' },
      { q: '¿Albert School tiene campus en España?', a: 'Sí, en Madrid. Además tiene campus en París, Marsella, Milán y Ginebra, y el International BBA permite estudiar en 3 países.' },
      { q: '¿Cómo es la admisión en Albert School?', a: 'Un test de razonamiento de unos 40 minutos, una solicitud online con notas y carta de motivación, y una entrevista de unos 30 minutos con un brainteaser. La admisión es continua.' },
      { q: '¿Para quién es Albert School?', a: 'Para perfiles que quieren unir negocio, datos e inteligencia artificial y se sienten cómodos con las matemáticas. No es un bachelor de negocios clásico.' },
    ],
  },

  'forward-college': {
    resumen:
      'Forward College es un centro reconocido por la University of London que ofrece grados diseñados bajo la dirección académica de la LSE y King’s College London. Se estudia el primer año en Lisboa, el segundo en París y el tercero en Berlín, todo en inglés y en grupos de unos 15 alumnos. Es privada: la matrícula para estudiantes europeos es de 19.500 € al año (grados propios, 2026-27) o 21.850 € (grados de la University of London, 2027-28).',
    datos: [
      { label: 'Matrícula UE', value: 'Desde 19.500 €/año' },
      { label: 'Ruta', value: 'Lisboa → París → Berlín' },
      { label: 'Tamaño de grupo', value: '≈ 15 alumnos' },
      { label: 'Idioma', value: 'Inglés (IELTS 6.5)' },
      { label: 'Títulos', value: 'University of London (LSE/KCL) y propios' },
    ],
    programa: {
      titulo: '3 años, 3 ciudades, siempre el mismo grupo',
      texto:
        'Todo el grupo se mueve junto: primer año en Lisboa, segundo en París y tercero en Berlín. En cada ciudad tienes plaza reservada en una residencia de estudiantes.',
      puntos: [
        'Grados de la University of London con currículo de la LSE o King’s College London: Business & Management, Data Science & Business Analytics, Economics, Economics & Management, Economics & Politics, Politics & International Relations y Psychology.',
        'Grados propios de Forward College, como el Open Bachelor’s o Philosophy, Politics & Economics (PPE).',
        'En los grados de la University of London, los exámenes los evalúan la LSE o King’s College.',
        'Grupos de unos 15 alumnos y unos 280 estudiantes en total, así que el trato es muy cercano.',
      ],
    },
    costes: {
      filas: [
        { label: 'Grados Forward College (UE, 2026-27)', value: '19.500 €/año', total: true },
        { label: 'Grados University of London (UE, 2027-28)', value: '21.850 €/año' },
        { label: 'Alojamiento en Lisboa (1.er año)', value: '9.880–13.520 €/año' },
        { label: 'Alojamiento en París (2.º año)', value: '10.660–15.600 €/año' },
        { label: 'Alojamiento en Berlín (3.er año)', value: '7.150–15.600 €/año' },
      ],
      nota: 'Tarifas y estimaciones oficiales de Forward College. Los grados de la University of London tienen además una tasa de registro única de unos 70 €. Hay becas y préstamos al 0%.',
    },
    admision: {
      pasos: [
        { title: 'Solicitud online', text: 'Sin tasa de solicitud.' },
        { title: 'Charla con un estudiante', text: 'Una conversación informal con alguien que ya estudia allí.' },
        { title: 'Evaluación', text: 'El equipo de admisiones revisa tu perfil.' },
        { title: 'Entrevista formal', text: 'Para confirmar tu encaje con el programa.' },
      ],
      requisitos: [
        'Inglés: IELTS 6.5 o equivalente (TOEFL 95, PTE 67, Duolingo 110-120, Cambridge CAE 180).',
        'Bachillerato o equivalente con buen expediente.',
        'Ganas de cambiar de país cada año: es la esencia del programa.',
      ],
    },
    faq: [
      { q: '¿Cuánto cuesta Forward College?', a: 'Para estudiantes europeos, 19.500 € al año en los grados propios de Forward College (2026-27) y 21.850 € en los grados de la University of London (2027-28). El alojamiento va aparte: por ejemplo, entre 9.880 y 13.520 € al año en Lisboa.' },
      { q: '¿El título de Forward College es de la LSE?', a: 'No exactamente. Forward College es un centro reconocido por la University of London, y sus grados siguen el currículo diseñado por la LSE o King’s College London, que también evalúan los exámenes. El título lo emite la University of London. Además, Forward College tiene grados propios.' },
      { q: '¿En qué ciudades se estudia?', a: 'El primer año en Lisboa, el segundo en París y el tercero en Berlín. Todo el grupo se mueve junto y tienes residencia reservada en cada ciudad.' },
      { q: '¿Qué nivel de inglés piden?', a: 'IELTS 6.5 o equivalente: TOEFL 95, PTE 67, Duolingo 110-120 o Cambridge CAE 180.' },
      { q: '¿Cómo es la admisión?', a: 'Solicitud online sin coste, una charla informal con un estudiante actual, evaluación del equipo de admisiones y una entrevista formal.' },
    ],
  },
};
