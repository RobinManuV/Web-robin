// ============================================================
// Datos generales de la web: menú, contacto, equipo, testimonios.
// Cambia aquí un texto y se actualiza en todas las páginas.
// ============================================================

export const SITE = {
  name: 'Project Robin',
  url: 'https://project-robin.com',
  slogan: 'The world is your campus',
  defaultDescription:
    'Te acompañamos para estudiar en Holanda: elección de universidad, admisión, alojamiento y trámites, con apoyo antes y durante tu llegada.',
  defaultImage: '/wp-content/uploads/2026/04/Robin-en-Bici.png',
  gtmId: 'GTM-WVLVH4GQ',
  logo: '/wp-content/uploads/2024/12/Estudia-en-holanda-project-robin-logo.png',
  logoLight: '/wp-content/uploads/2026/04/Copy-of-Logo-en-blanco-con-fondo-transparente.png',
  loginUrl: 'https://project-robin.com/login', // portal del alumno
};

export const CONTACT = {
  email: 'hello@project-robin.com',
  emailInfo: 'info@project-robin.com',
  phone: '+34 680 84 23 16',
  phone2: '+34 629 86 86 18',
  phoneColegios: '+34 629 86 86 18',
  city: 'Madrid, España',
  linkedin: 'https://www.linkedin.com/company/project-robin/',
};

// Ciudades de Holanda (orden del menú y del listado /destinos/)
export const CIUDADES = [
  { slug: 'twente', name: 'Twente' },
  { slug: 'breda', name: 'Breda' },
  { slug: 'leiden', name: 'Leiden' },
  { slug: 'groningen', name: 'Groningen' },
  { slug: 'amsterdam', name: 'Ámsterdam' },
  { slug: 'la-haya', name: 'La Haya' },
  { slug: 'utrecht', name: 'Utrecht' },
  { slug: 'rotterdam', name: 'Róterdam' },
  { slug: 'delft', name: 'Delft' },
  { slug: 'maastricht', name: 'Maastricht' },
  { slug: 'eindhoven', name: 'Eindhoven' },
];

export const NAV = [
  {
    label: 'Holanda',
    href: '/destinos/',
    children: [
      { label: 'Eindhoven', href: '/destinos/eindhoven/' },
      { label: 'Ámsterdam', href: '/destinos/amsterdam/' },
      { label: 'Maastricht', href: '/destinos/maastricht/' },
      { label: 'Róterdam', href: '/destinos/rotterdam/' },
      { label: 'Groningen', href: '/destinos/groningen/' },
      { label: 'Leiden', href: '/destinos/leiden/' },
      { label: 'La Haya', href: '/destinos/la-haya/' },
      { label: 'Utrecht', href: '/destinos/utrecht/' },
      { label: 'Delft', href: '/destinos/delft/' },
      { label: 'Breda', href: '/destinos/breda/' },
      { label: 'Twente', href: '/destinos/twente/' },
    ],
  },
  {
    label: 'España',
    href: '/estudiar-universidad-espana/',
    children: [
      { label: 'ESADE', href: '/universidades/esade/' },
      { label: 'IE University', href: '/universidades/ie-university/' },
      { label: 'Universidad Alfonso X el Sabio (UAX)', href: '/universidades/universidad-alfonso-x-el-sabio-uax/' },
      { label: 'Universidad Carlos III de Madrid (UC3M)', href: '/universidades/universidad-carlos-iii-de-madrid-uc3m/' },
      { label: 'Universidad Complutense de Madrid (UCM)', href: '/universidades/universidad-complutense-de-madrid-ucm/' },
      { label: 'Universidad de Deusto', href: '/universidades/universidad-de-deusto/' },
      { label: 'Universidad de Navarra (UNAV)', href: '/universidades/universidad-de-navarra-unav/' },
      { label: 'Universidad Politécnica de Madrid (UPM)', href: '/universidades/universidad-politecnica-de-madrid-upm/' },
      { label: 'Universidad Pontificia Comillas (ICAI / ICADE)', href: '/universidades/universidad-pontificia-comillas-icai-icade/' },
      { label: 'Universitat Politècnica de Catalunya (UPC)', href: '/universidades/universitat-politecnica-de-catalunya-upc/' },
    ],
  },
  {
    label: 'Multicampus',
    href: '/the-european-experience/',
    children: [
      { label: 'Albert School', href: '/universidades/albert-school/' },
      { label: 'Forward College', href: '/universidades/forward-college/' },
      { label: 'ESCP Business School', href: '/universidades/escp-business-school/' },
    ],
  },
  { label: 'Comunidad', href: '/comunidad/' },
  { label: 'Nosotros', href: '/sobre-nosotros/' },
  { label: 'Colegios', href: '/colegios/' },
];

export const FOOTER = {
  tagline: 'Tu Futuro Empieza Aquí.',
  subtitle: 'Asesoramiento experto para estudiar, vivir y triunfar en los Países Bajos.',
  columns: [
    {
      title: 'Explorar',
      links: [
        { label: 'Sobre Nosotros', href: '/sobre-nosotros/' },
        { label: 'Blog', href: '/blog/' },
        { label: 'Destinos', href: '/destinos/' },
        { label: 'Servicios', href: '/servicios/' },
        { label: 'Contacto', href: '/contacto/' },
      ],
    },
    {
      title: 'Servicios',
      links: [
        { label: 'Asesoramiento Completo', href: '/servicios/asesoramiento-completo/' },
        { label: 'Erasmus', href: '/servicios/erasmus/' },
        { label: 'Mentoría', href: '/servicios/mentoria/' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Aviso legal', href: '/aviso-legal/' },
        { label: 'Política de Cookies', href: '/politica-de-cookies/' },
        { label: 'Política de Privacidad', href: '/politica-de-privacidad/' },
      ],
    },
  ],
};

export const EQUIPO = [
  {
    name: 'Noel Cortés',
    role: 'Co-fundador · Holanda',
    bio: 'Graduado en Economics and Business Economics en la Universidad de Maastricht. Actualmente trabajando en el departamento de M&A en Deloitte.',
    linkedin: 'https://es.linkedin.com/in/noelcorteslink',
  },
  {
    name: 'María Gavira',
    role: 'Co-fundadora · Comunidad',
    bio: 'Graduada en International Business en la Universidad de Maastricht. Actualmente trabajando como Associate en AlphaSights en Londres.',
    linkedin: 'https://uk.linkedin.com/in/maria-gavira-martinez-170638259',
  },
  {
    name: 'Manuel Fernández',
    role: 'Co-fundador · Multicampus',
    bio: 'Graduado en Economics and Business Economics en la Universidad de Maastricht. Actualmente cursando un Master in Management en ESCP Business School.',
    linkedin: 'https://nl.linkedin.com/in/manuel-fernandez-prieto',
  },
];

export const TESTIMONIOS = [
  {
    name: 'Mónica (Tenerife)',
    program: 'European Law, Maastricht.',
    photo: '/wp-content/uploads/2024/12/Testimonios-de-estudiar-en-HOlanda-project-robin-4-300x300.jpg',
    text: 'Estudiar y vivir en Maastricht sin duda ha sido una de las experiencias más enriquecedoras de mi vida. La ciudad está llena de lugares fascinantes y gente increíble, ofreciendo una mezcla de oportunidades culturales y académicas. Personalmente, estoy cursando la carrera de Derecho Europeo, un programa altamente estimulante que ofrece una perspectiva comparativa de los sistemas legales y cómo funciona el sistema de Derecho Europeo. Aunque el trabajo del curso puede ser exigente, con dedicación se saca. Me encanta absolutamente todo sobre Maastricht: la gente, el ambiente y la ciudad en sí.',
  },
  {
    name: 'Lucía (Sevilla)',
    program: 'International Business Maastricht',
    photo: '/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-21-at-14.50.47-1-283x300.jpeg',
    text: 'Lo que más me impresionó al venir a estudiar a Maastricht fue cómo aquí te impulsan a ser independiente y a superar tus límites. La diversidad internacional te enriquece, y estar rodeada de personas así te desafía y motiva constantemente. Mi mentor dijo que estudiar fuera es como hacer un doble grado, y ahora veo que es así. Me impactó darme cuenta de que, muchas veces, me sentía la más “tonta” de la clase, pero eso me hizo comprender que solo así, en cualquier situación, encuentras el mayor potencial de crecimiento. Además, ver lo rápido que avanzas es increíble, tanto a nivel personal como profesional.',
  },
  {
    name: 'Duco (Madrid)',
    program: 'Economics and Business Economics, Groningen.',
    photo: '/wp-content/uploads/2024/12/Testimonios-de-estudiar-en-HOlanda-project-robin-1-300x300.jpg',
    text: 'Mi trabajo junto a mis estudios universitarios ha sido extremadamente gratificante. Aplicar la teoría en el campo de la economía empresarial me hace sentir mucho más cómodo en los nuevos cursos. Mientras planees bien tu tiempo para estudiar y para tus distintas ocupaciones, ¡la carga de trabajo es mucho menor de lo que esperas!',
  },
  {
    name: 'Candela (Madrid)',
    program: 'Economics and Business Economics, Maastricht.',
    photo: '/wp-content/uploads/2024/12/Testimonios-de-estudiar-en-HOlanda-project-robin-2-300x300.jpg',
    text: 'Estudiar en Holanda está siendo una de las experiencias de mi vida. Holanda es como un parque de atracciones para estudiantes. Si bien es cierto que la universidad es exigente, todo el tiempo que no dediques a estudiar es para ti. Vivir en una residencia rodeado de tus amigos y del ambiente estudiantil es algo que recomiendo a todo el mundo. Gracias Project Robin por traerme aquí!',
  },
];

// Cifras de la home. Se escriben en el HTML (Google y las IAs las leen)
// y la animación solo cuenta hasta ellas.
export const CIFRAS = [
  { value: 15, suffix: '+', label: 'Universidades a elegir' },
  { value: 300, suffix: '+', label: 'Grados disponibles' },
  { value: 98, suffix: '%', label: 'Alumnos aceptados' },
  { value: 11, suffix: '', label: 'Ciudades NL' },
];
