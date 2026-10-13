// Adapta un texto en portugués de Portugal (pt-PT, tratamiento "tu") a portugués de Brasil (pt-BR, "você").
// Se usa para generar src/i18n/br.json a partir de pt.json y como valor por defecto de `merge` cuando
// una frase nueva no trae traducción BR. Solo toca el texto, nunca las etiquetas HTML ni sus atributos.
// Las frases que la regla no resuelve bien van en src/i18n/br-overrides.json (clave = frase en español).

const cap = (from, to) => (/^[A-ZÀ-Ý]/.test(from) ? to.charAt(0).toUpperCase() + to.slice(1) : to);
const wb = (w) => new RegExp(`(?<![\\p{L}\\p{N}-])${w}(?![\\p{L}\\p{N}-])`, 'giu');

// --- 1. Frases hechas ---
const PHRASES = [
  [/\bronda os\b/g, 'custa cerca de'],
  [/\bronda\b/g, 'fica em torno de'],
  [/soa-te a cidade tua\?/gi, 'parece a cidade certa para você?'],
  [/\bSoa-te a cidade tua/gi, 'Parece a cidade certa para você'],
  [/A Rapariga com o Brinco de Pérola/g, 'A Moça com Brinco de Pérola'],
  [/\bestudar no estrangeiro\b/gi, (m) => cap(m, 'estudar no exterior')],
  [/\bno estrangeiro\b/gi, 'no exterior'],
  [/\bdo estrangeiro\b/gi, 'do exterior'],
  [/\bpara o estrangeiro\b/gi, 'para o exterior'],
  [/\bensino secundário\b/gi, (m) => cap(m, 'ensino médio')],
  [/(?<!ensino )\bsecundário\b/gi, (m) => cap(m, 'ensino médio')],
  [/\bdupla licenciatura\b/gi, (m) => cap(m, 'dupla graduação')],
  [/\bduplas licenciaturas\b/gi, (m) => cap(m, 'duplas graduações')],
  [/\bde comboio\b/gi, 'de trem'],
  [/\bde elétrico\b/gi, 'de bonde'],
  [/\bem breve\b/gi, 'em breve'],
  [/\bBrevemente\b/g, 'Em breve'],
  [/\bbrevemente\b/g, 'em breve'],
  [/\bcasas-cubo\b/gi, 'casas-cubo'],
  [/\bobtém\b/g, 'obtém'],
  [/\bnum só sítio\b/gi, 'num só lugar'],
  [/\bsem rodeios\b/gi, 'sem rodeios'],
  [/\bMãos à obra\b/g, 'Mãos à obra'],
  [/\bas rendas de quartos\b/gi, 'os aluguéis de quartos'],
  [/\buma renda barata\b/gi, 'um aluguel barato'],
  [/\brenda barata\b/gi, 'aluguel barato'],
  [/\bsenhorios\b/gi, 'proprietários'],
  [/\bnão arrendam a\b/gi, 'não alugam para'],
  [/\bAntes de te licenciares\b/gi, 'Antes de se formar'],
  [/\bao terminar o curso\b/gi, 'ao terminar o curso'],
];

// --- 2. Imperativos de "tu" (solo al principio de frase) → "você" ---
const IMP = {
  'acede': 'acesse', 'ajuda': 'ajude', 'altera': 'altere', 'aterra': 'aterrisse', 'calcula': 'calcule',
  'compara': 'compare', 'conhece': 'conheça', 'considera': 'considere', 'descobre': 'descubra',
  'desenha': 'desenhe', 'desfruta': 'desfrute', 'desliza': 'deslize', 'escolhe': 'escolha',
  'esclarece': 'esclareça', 'estuda': 'estude', 'evita': 'evite', 'explora': 'explore', 'fala': 'fale',
  'fica': 'fique', 'marca': 'agende', 'mede': 'meça', 'pede': 'peça', 'pergunta': 'pergunte',
  'procura': 'procure', 'reserva': 'reserve', 'resolve': 'resolva', 'recebe': 'receba',
  'subscreve': 'assine', 'sê': 'seja', 'tenta': 'tente', 'veste': 'vista', 'vê': 'veja', 'vive': 'viva',
  'dá': 'dê', 'começa': 'comece', 'chega': 'chegue', 'continua': 'continue', 'tira': 'tire', 'junta': 'junte', 'contacta': 'entre em contato com',
  'inscreve-te': 'inscreva-se', 'junta-te': 'junte-se', 'candidata-te': 'candidate-se', 'liga-te': 'conecte-se',
  'escreve-nos': 'escreva para nós', 'contacta-nos': 'entre em contato conosco', 'conta-nos': 'conte para nós',
  'deixa-nos': 'deixe-nos', 'avisem-me': 'me avisem', 'coloca-te': 'te coloca',
};
// Imperativos que también pueden aparecer tras "e", "ou" o una coma
const IMP_MID = ['descobre', 'escolhe', 'escreve-nos', 'contacta-nos', 'conta-nos', 'vê', 'inscreve-te', 'junta-te', 'tenta', 'pergunta', 'procura', 'compara', 'considera', 'torna-o'];
const IMP_MID_MAP = { ...IMP, 'torna-o': 'torne-o' };

// --- 3. Formas de "tu" ---
// Presente de indicativo → "você" + 3.ª persona
const PRES = {
  adaptas: 'adapta', aplicas: 'aplica', avanças: 'avança', chegas: 'chega', confirmas: 'confirma', consegues: 'consegue',
  consideras: 'considera', convives: 'convive', dedicas: 'dedica', desenhas: 'desenha', desenvolves: 'desenvolve',
  deslocas: 'desloca', encaixas: 'encaixa', encontras: 'encontra', entras: 'entra', esperas: 'espera', estás: 'está',
  estudas: 'estuda', fazes: 'faz', gostas: 'gosta', inscreves: 'inscreve', pensas: 'pensa', percebes: 'percebe', podes: 'pode',
  precisas: 'precisa', preferes: 'prefere', procuras: 'procura', queres: 'quer', recebes: 'recebe', sabes: 'sabe',
  sonhas: 'sonha', trabalhas: 'trabalha', valorizas: 'valoriza', vives: 'vive', tens: 'tem', vais: 'vai', vês: 'vê',
  dás: 'dá', és: 'é', terás: 'terá', gostarias: 'gostaria', sentes: 'sente', repartes: 'reparte', vens: 'vem',
};
// Conjuntivo e imperativo negativo → 3.ª persona, sin "você"
const SUBJ = { chegues: 'chegue', pagues: 'pague', planeies: 'planeje', possas: 'possa', entres: 'entre', hesites: 'hesite' };
// Infinitivo pessoal / futuro de conjuntivo ("tiveres", "chegares") → forma de 3.ª persona
const IRREG = { tiveres: 'tiver', fores: 'for', quiseres: 'quiser', pores: 'puser', vires: 'vier', veres: 'ver', seres: 'ser', trazeres: 'trazer', estiveres: 'estiver', souberes: 'souber' };

const mapWords = (text, map, fn) =>
  text.replace(/(?<![\p{L}\p{N}-])[\p{L}]+(?![\p{L}\p{N}-])/gu, (w) => {
    const to = map[w.toLowerCase()];
    return to ? fn(w, to) : w;
  });

// --- 4. Léxico PT → BR ---
const LEX = [
  ['equipas', 'equipes'], ['equipa', 'equipe'], ['telemóveis', 'celulares'], ['telemóvel', 'celular'],
  ['comboios', 'trens'], ['comboio', 'trem'], ['autocarros', 'ônibus'], ['autocarro', 'ônibus'],
  ['licenciaturas', 'graduações'], ['licenciatura', 'graduação'], ['licenciados', 'graduados'], ['licenciado', 'graduado'],
  ['licenciadas', 'graduadas'], ['licenciada', 'graduada'], ['propinas', 'anuidades'], ['propina', 'anuidade'],
  ['alojamento', 'moradia'], ['alojamentos', 'moradias'],
  ['contactos', 'contatos'], ['contacto', 'contato'], ['contactar', 'entrar em contato'], ['contactamos', 'entramos em contato'],
  ['facto', 'fato'], ['factos', 'fatos'], ['académicos', 'acadêmicos'], ['académico', 'acadêmico'], ['académicas', 'acadêmicas'], ['académica', 'acadêmica'],
  ['económicos', 'econômicos'], ['económico', 'econômico'], ['económicas', 'econômicas'], ['económica', 'econômica'],
  ['economia', 'economia'], ['desporto', 'esporte'], ['desportos', 'esportes'], ['desportivas', 'esportivas'], ['desportivos', 'esportivos'], ['desportivo', 'esportivo'], ['desportiva', 'esportiva'],
  ['registar', 'registrar'], ['registo', 'registro'], ['registos', 'registros'], ['registares', 'registrar'],
  ['gerir', 'gerenciar'], ['gerida', 'gerenciada'], ['gerido', 'gerenciado'], ['gestão', 'gestão'],
  ['subscrever', 'assinar'], ['subscrição', 'assinatura'], ['sítios', 'lugares'], ['sítio', 'lugar'],
  ['autocolantes', 'adesivos'], ['autocolante', 'adesivo'], ['sweatshirts', 'moletons'], ['sweatshirt', 'moletom'],
  ['T-shirts', 'camisetas'], ['T-shirt', 'camiseta'], ['Hoodie', 'Moletom'], ['hoodie', 'moletom'],
  ['perspetiva', 'perspectiva'], ['perspetivas', 'perspectivas'], ['aspeto', 'aspecto'], ['aspetos', 'aspectos'],
  ['receção', 'recepção'], ['perceção', 'percepção'], ['concetual', 'conceitual'], ['excecional', 'excepcional'],
  ['eletrónico', 'eletrônico'], ['eletrónicos', 'eletrônicos'], ['multimédia', 'multimídia'], ['carácter', 'caráter'],
  ['Amesterdão', 'Amsterdã'], ['Roterdão', 'Roterdã'], ['Bilbau', 'Bilbao'], ['São Sebastião', 'San Sebastián'], ['Colónia', 'Colônia'],
  ['utilizadores', 'usuários'], ['utilizador', 'usuário'], ['ecrã', 'tela'], ['ficheiros', 'arquivos'], ['ficheiro', 'arquivo'],
  ['miúdos', 'crianças'], ['arrendar', 'alugar'], ['arrendamento', 'aluguel'], ['pequeno-almoço', 'café da manhã'],
  ['casa de banho', 'banheiro'], ['esplanadas', 'terraços'], ['esplanada', 'terraço'], ['bonde', 'bonde'],
  ['propriedade', 'propriedade'], ['telefonar', 'ligar'], ['gerais', 'gerais'], ['Obrigada', 'Obrigada'],
  ['tarifas', 'tarifas'], ['rapariga', 'moça'], ['raparigas', 'moças'], ['fixe', 'legal'], ['bué', 'muito'],
  ['quartos partilhados', 'quartos compartilhados'], ['partilhado', 'compartilhado'], ['partilhada', 'compartilhada'], ['partilhamos', 'compartilhamos'], ['partilhar', 'compartilhar'],
  ['actualmente', 'atualmente'], ['recibos', 'recibos'], ['grelha', 'grade'], ['velocidade', 'velocidade'],
  ['Hogeschool', 'Hogeschool'],
];

// "estar a + infinitivo" → gerúndio
const GER = (inf) => {
  const irreg = { pôr: 'pondo', ver: 'vendo', vir: 'vindo', ler: 'lendo', ter: 'tendo', ser: 'sendo' };
  if (irreg[inf]) return irreg[inf];
  return inf.replace(/ar$/, 'ando').replace(/er$/, 'endo').replace(/ir$/, 'indo');
};

// Verbos que al inicio de frase pueden ser descriptivos ("Fica a 25 minutos", "Continua a ser…", "Chega de…")
const AMBIG = (w, rest) => /^(fica|continua|chega|dá|tira|junta|marca)$/i.test(w) && /^\s+(a\s+(cerca|ser|\d|pouco|uns|\p{Ll}+ minutos)|de\s|em\s|\d)/iu.test(rest);

function adaptText(text, atStart) {
  let t = text;
  for (const [re, to] of PHRASES) t = t.replace(re, to);

  // imperativos al comienzo de frase
  if (atStart) {
    t = t.replace(/^(\s*)([\p{L}]+(?:-[\p{L}]+)?)/u, (m, sp, w) => {
      const to = IMP[w.toLowerCase()];
      return to && !AMBIG(w, t.slice(sp.length + w.length)) ? sp + cap(w, to) : m;
    });
  }
  t = t.replace(/([.!?:—»]\s+|\n)([\p{L}]+(?:-[\p{L}]+)?)/gu, (m, pre, w) => {
    const to = IMP[w.toLowerCase()];
    return to ? pre + cap(w, to) : m;
  });
  // imperativos tras "e", "ou" o coma
  t = t.replace(/((?:\b[eE]|\bou|,)\s+)([\p{L}]+(?:-[\p{L}]+)?)/gu, (m, pre, w) => {
    const k = w.toLowerCase();
    return IMP_MID.includes(k) ? pre + IMP_MID_MAP[k] : m;
  });

  // formas verbales de "tu"
  t = t.replace(/\b([\p{L}]+)es(-te)\b/giu, (m, a, b) => m); // (reservado)
  t = t.replace(/(?<![\p{L}\p{N}-])([\p{L}]+(?:ar|er|ir))es-te(?![\p{L}\p{N}-])/gu, 'se $1');
  t = t.replace(/(?<![\p{L}\p{N}-])([\p{L}]+(?:ar|er|ir))-te(?![\p{L}\p{N}-])/gu, 'se $1');
  t = t.replace(/(?<![\p{L}\p{N}-])([\p{L}]+)-te(?![\p{L}\p{N}-])/gu, (m, host) => {
    const k = host.toLowerCase();
    if (PRES[k]) return `você se ${PRES[k]}`;
    if (/^(inscrever|mover|candidatar|candidatares|licenciar|preocupar|esforçar|sentir|adaptar|organizar|reunir|preparar|apresentar|inscrever)$/.test(k)) {
      return `se ${k === 'candidatares' ? 'candidatar' : k}`;
    }
    return cap(host, `te ${host.toLowerCase()}`);
  });
  t = t.replace(/(?<![\p{L}\p{N}-])([\p{L}]+)-nos(?![\p{L}\p{N}-])/gu, (m, host) => {
    if (/^adaptamo$/i.test(host)) return cap(host, 'nos adaptamos');
    return cap(host, `nos ${host.toLowerCase()}`);
  });
  t = t.replace(/(?<![\p{L}\p{N}-])([\p{L}]+)-me(?![\p{L}\p{N}-])/gu, (m, host) => cap(host, `me ${host.toLowerCase()}`));
  t = t.replace(/\bSabemo-lo\b/g, 'Sabemos disso').replace(/\bsabemo-lo\b/g, 'sabemos disso');
  t = t.replace(/\bcontar-tas\b/g, 'te contar');

  t = t.replace(/(?<![\p{L}\p{N}-])te (deslocas|adaptas|inscreves|encaixas|dedicas|sentes|preocupas)(?![\p{L}\p{N}-])/giu, (m, v) => `você se ${PRES[v.toLowerCase()]}`);
  t = t.replace(/(?<![\p{L}\p{N}-])te (queres|podes|tens|vais|precisas|preferes)(?![\p{L}\p{N}-])/giu, (m, v) => `você ${PRES[v.toLowerCase()]}`);
  t = t.replace(/\bse não te (\p{L}+(?:ar|er|ir))(es)?\b/gu, 'se você não se $1');
  t = t.replace(/(?<![\p{L}\p{N}-])te ([\p{L}]+(?:ar|er|ir))(es)?(?![\p{L}\p{N}-])/gu, (m, inf) => (/^(deixar|fazer|ajudar|permitir|interessar|levar|dar|oferecer|orientar|acompanhar|apoiar|conhecer|dizer|explicar|contar|aconselhar|motivar|atrair)/.test(inf) ? m : `se ${inf}`));
  t = t.replace(/(?<![\p{L}\p{N}-])se não te ([\p{L}]+)/gu, 'se você não se $1').replace(/\bte vai ([\p{L}]+)/gu, 'vai te $1').replace(/\bnão você (\p{L}+)/gu, 'você não $1');
  t = mapWords(t, PRES, (w, to) => `${/^[A-ZÀ-Ý]/.test(w) ? 'Você' : 'você'} ${to}`);
  t = mapWords(t, SUBJ, (w, to) => to);
  t = mapWords(t, IRREG, (w, to) => to);
  // infinitivo pessoal regular: chegares → chegar
  t = t.replace(/(?<![\p{L}\p{N}-])([\p{L}]{3,}(?:ar|er|ir))es(?![\p{L}\p{N}-])/gu, (m, stem) => (/^(mulh|sen|ser|ver|ger|qual|outr|vez|parc|mês|and|pês|prim|cin|sal)/i.test(m) ? m : stem));
  t = t.replace(/(?<![\p{L}\p{N}-])(?:[Nn]ão) você /g, (m) => m);
  t = t.replace(/\b(\p{L}+) não você ([\p{L}]+)/gu, '$1 você não $2');

  t = t.replace(/(?<![\p{L}\p{N}-])(tu|Tu) (?=você)/gu, '').replace(/\b(você|Você) você\b/g, '$1');
  t = t.replace(/(\p{L}+)ámos\b/gu, '$1amos');
  // pronombres y posesivos
  t = t.replace(/\bcontigo\b/gi, (m) => cap(m, 'com você'));
  t = t.replace(/\b(para|de|a|por|em|sobre|com) ti\b/gi, (m, p) => `${p} você`);
  t = t.replace(/(?<![\p{L}\p{N}-])(tu|Tu)(?![\p{L}\p{N}-])/gu, (m) => cap(m, 'você'));
  t = mapWords(t, { teu: 'seu', tua: 'sua', teus: 'seus', tuas: 'suas' }, (w, to) => cap(w, to));

  // progresivos: estar a + infinitivo
  t = t.replace(/\b(estou|estás|está|estamos|estão|estava|estavam|estar|estive|continuamos|continua|continuam|ficamos|fica|vamos)\s+a\s+([\p{L}]+(?:ar|er|ir|pôr))\b/giu, (m, aux, inf) =>
    /^(vamos|ficamos|fica)$/i.test(aux) ? m : `${aux} ${GER(inf.toLowerCase())}`);
  t = t.replace(/\bpara te\b/g, 'para te');

  // concordância de gênero tras mudar alojamento (m.) → moradia (f.)
  t = t.replace(/\b(garantir-vos|garantir) o alojamento/gi, '$1 a moradia');
  t = t.replace(/\b(o|do|no|ao|um|pelo|este|esse|todo) alojamento/gi, (m, d) => ({ o: 'a', do: 'da', no: 'na', ao: 'à', um: 'uma', pelo: 'pela', este: 'esta', esse: 'essa', todo: 'toda' })[d.toLowerCase()] + ' moradia');
  t = t.replace(/\b(os|dos|nos|aos|uns|pelos) alojamentos/gi, (m, d) => ({ os: 'as', dos: 'das', nos: 'nas', aos: 'às', uns: 'umas', pelos: 'pelas' })[d.toLowerCase()] + ' moradias');
  t = t.replace(/\bvossos\b/gi, (m) => cap(m, 'seus')).replace(/\bvossas\b/gi, (m) => cap(m, 'suas')).replace(/\bvosso\b/gi, (m) => cap(m, 'seu')).replace(/\bvossa\b/gi, (m) => cap(m, 'sua'));
  t = t.replace(/\bpara vos orientar\b/g, 'para orientar vocês').replace(/\bgarantir-vos\b/g, 'garantir para vocês');
  t = t.replace(/\bnão você (\p{L}+)/gu, 'você não $1');
  // léxico
  for (const [from, to] of LEX) {
    t = t.replace(wb(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), (m) => (m === m.toUpperCase() && m.length > 3 ? to.toUpperCase() : cap(m, to)));
  }
  // "de a" → "da" etc. no hace falta; limpiar dobles espacios
  return t.replace(/ {2,}/g, ' ');
}

export function adaptPtBr(html) {
  const parts = html.split(/(<[^>]+>)/);
  let atStart = true;
  return parts
    .map((p) => {
      if (p.startsWith('<')) {
        if (/^<br\b/i.test(p)) atStart = true;
        return p;
      }
      if (!p.trim()) return p;
      const out = adaptText(p, atStart);
      atStart = /[.!?:—»]\s*$/.test(p) || /^\s*,\s*$/.test(p);
      return out;
    })
    .join('');
}
