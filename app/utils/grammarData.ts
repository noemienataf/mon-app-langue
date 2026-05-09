export interface Example {
  hebrew: string;
  french: string;
  transliteration?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  description: string;
  explanation: string;
  examples: Example[];
  exercises?: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
  }>;
}

export const grammarLessons: GrammarLesson[] = [
  {
    id: 'pronouns-subjects',
    title: 'Pronoms sujets',
    description: 'Je, tu, il, elle, nous, vous, ils, elles',
    explanation: 'Les pronoms sujets s\'accordent en genre et nombre avec le contexte.\n\nEn hébreu moderne, le pronom est souvent FACULTATIF au présent car le verbe s\'accorde déjà avec le sujet. Tu peux dire juste "holekh la-bayit" (littéralement "va à la maison") et le contexte indique qui agit.\n\nÀ l\'oral courant, on garde souvent le pronom pour clarifier et éviter les ambiguïtés. C\'est particulièrement vrai à la 3e personne (il/elle) où la distinction est importante.',
    examples: [
      { hebrew: 'אני', transliteration: 'ani', french: 'je (m/f)' },
      { hebrew: 'אתה', transliteration: 'ata', french: 'tu (m) - formel' },
      { hebrew: 'את', transliteration: 'at', french: 'tu (f) - formel' },
      { hebrew: 'הוא', transliteration: 'hu', french: 'il' },
      { hebrew: 'היא', transliteration: 'hi', french: 'elle' },
      { hebrew: 'אנחנו', transliteration: 'anakhnu', french: 'nous' },
      { hebrew: 'אתם', transliteration: 'atem', french: 'vous (m/mixte)' },
      { hebrew: 'אתן', transliteration: 'atén', french: 'vous (f)' },
      { hebrew: 'הם', transliteration: 'hem', french: 'ils (m/mixte)' },
      { hebrew: 'הן', transliteration: 'hén', french: 'elles (f)' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Quel pronom sujet se traduit par "tu (féminin)"?',
        options: ['אתה', 'את', 'היא', 'אתם'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Quel pronom se traduit par "ils" (mixte)?',
        options: ['הם', 'הן', 'אתם', 'הוא'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'En hébreu moderne au présent, le pronom est souvent...',
        options: ['obligatoire', 'facultatif', 'interdit', 'optionnel sauf à la 3e personne'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Combien de formes différentes pour "vous" existe-t-il?',
        options: ['1', '2', '3', '4'],
        correct: 1
      }
    ],
  },
  {
    id: 'pronouns-objects',
    title: 'Pronoms objets directs',
    description: 'Me, te, le, la, nous, vous, les',
    explanation: 'En hébreu, quand tu utilises un complément d\'objet direct DÉFINI (une personne ou une chose spécifique), tu dois ajouter את (et) avant le nom.\n\nLa fusion את + pronom crée des formes courtes :\n• oti (me) • otcha/otakh (te) • oto/ota (le/la) • otánu (nous) • etkhém (vous m) • otam (les m)\n\nImportant : cette fusion n\'arrive que avec את — pas avec d\'autres prépositions.\n\nExemple : « je te regarde » = ani roé otcha (littéralement : je vois toi).\n\nSans את, on ne met pas de pronom objet : « je vois » = ani roé (le verbe inclut déjà le sujet).',
    examples: [
      { hebrew: 'אותי', transliteration: 'oti', french: 'me (complément d\'objet direct)' },
      { hebrew: 'אותך', transliteration: 'otkha', french: 'te (m) — Ani rotze otkha = Je te veux' },
      { hebrew: 'אותך', transliteration: 'otakh', french: 'te (f) — Hu notén otakh sefer = Il te donne un livre' },
      { hebrew: 'אותו', transliteration: 'oto', french: 'le — Ra\'iti oto ha-boker = Je l\'ai vu ce matin' },
      { hebrew: 'אותה', transliteration: 'ota', french: 'la — Ani rotze ota = Je la veux' },
      { hebrew: 'אותנו', transliteration: 'otánu', french: 'nous — Hu rotze otanu = Il nous veut' },
      { hebrew: 'אתכם', transliteration: 'etkhém', french: 'vous (m) — Ani ohev etkhem = Je vous aime' },
      { hebrew: 'אותם', transliteration: 'otam', french: 'les (m) — Hu rotze otam = Il les veut' },
      { hebrew: 'אותן', transliteration: 'otán', french: 'les (f) — Ani ahuvá otán = Je les aime (f)' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Comment dit-on "me" avec את?',
        options: ['oti', 'otcha', 'oto', 'otanu'],
        correct: 0
      },
      {
        id: 'q2',
        question: 'Quelle particule est nécessaire pour les objets directs définis?',
        options: ['ל', 'ב', 'את', 'מ'],
        correct: 2
      },
      {
        id: 'q3',
        question: 'Que signifie "Ani rotze otcha"?',
        options: ['Je te veux', 'Je le veux', 'Je vous veux', 'Je la veux'],
        correct: 0
      },
      {
        id: 'q4',
        question: 'Quelle est la forme pour "vous (masc)" en objet direct?',
        options: ['otam', 'otanu', 'etkhém', 'otán'],
        correct: 2
      },
      {
        id: 'q5',
        question: 'Cette fusion avec את s\'applique-t-elle aussi aux autres prépositions?',
        options: ['Oui, toujours', 'Non, seulement avec את', 'Oui, avec ב et ל aussi', 'C\'est variable'],
        correct: 1
      }
    ],
  },
  {
    id: 'pronouns-possessive',
    title: 'Pronoms possessifs',
    description: 'Mon, ton, son, notre, votre, leur',
    explanation: 'Il y a deux façons d\'exprimer la possession en hébreu.\n\n**La forme שלי (« de ») est la plus courante et la plus simple :**\nStructure : nom + shéli/shelkha/sheló, etc.\n• ספר שלי = mon livre (littéralement « livre de-moi »)\n• bayit sheló = sa maison (littéralement « maison de-lui »)\n\n**Alternative : les suffixes possessifs directs:**\nS\'attachent au nom (sefarí = mon livre), mais changent la forme du nom et nécessitent l\'état construit. Plus complexe.\n\nLa forme שלי est préférée dans la conversation courante pour sa CLARTÉ et sa simplicité.',
    examples: [
      { hebrew: 'שלי', transliteration: 'shéli', french: 'mon/ma/mes — Esto et shéli = C\'est à moi' },
      { hebrew: 'שלך', transliteration: 'shelkha', french: 'ton/ta/tes (m) — Ha-bayit shelkha gadol = Ta maison est grande' },
      { hebrew: 'שלך', transliteration: 'shelakh', french: 'ton/ta/tes (f) — Ha-kelev shelakh katan = Ton chien est petit' },
      { hebrew: 'שלו', transliteration: 'sheló', french: 'son/sa (à lui) — Ha-iyulet sheló yesh et ha-kélev = Son ami a un chien' },
      { hebrew: 'שלה', transliteration: 'shela', french: 'son/sa (à elle) — Ha-kitve shela eina kan = Son stylo n\'est pas ici' },
      { hebrew: 'שלנו', transliteration: 'shelanu', french: 'notre — Ha-bayit shelanu qaton = Notre maison est petite' },
      { hebrew: 'שלכם', transliteration: 'shelkhém', french: 'votre (m) — Ha-misrad shelkhém gavoha = Votre bureau est haut' },
      { hebrew: 'שלהן', transliteration: 'shelhén', french: 'leur (f) — Ha-tapuach shelhén adom = Leur pomme est rouge' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Quelle forme possessive est la plus courante?',
        options: ['Les suffixes directs', 'La forme שלי', 'Les deux également', 'Les suffixes directs à l\'oral'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Comment dit-on "son" (à lui)?',
        options: ['shelakh', 'shela', 'sheló', 'shelanu'],
        correct: 2
      },
      {
        id: 'q3',
        question: 'Que signifie littéralement "ספר שלי"?',
        options: ['Livre pour moi', 'Livre de-moi', 'Mon beau livre', 'Livre à partager'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'La forme שלי change-t-elle selon le genre/nombre du nom?',
        options: ['Oui, elle s\'accorde', 'Non, elle reste la même', 'Seulement au pluriel', 'Seulement avec objets définis'],
        correct: 1
      }
    ],
  },
  {
    id: 'prepositions-basic',
    title: 'Prépositions de base',
    description: 'À, de, avec, pour, dans, sur, sous',
    explanation: 'Les trois prépositions les plus importantes (ב, ל, מ) s\'attachent DIRECTEMENT au mot sans espace.\n\n**Les trois principales :**\n• ב (be-) = « dans/à »\n• ל (le-) = « à/pour »\n• מ (me-) = « de/depuis »\n\nLes autres (et, al, takhat) sont indépendantes et demandent un espace.\n\n**Changements grammaticaux :**\nCes prépositions causent parfois des fusions avec l\'article défini ha-.\n• « la maison » = ha-bayit\n• « à la maison » = BA-bayit (fusion de be + ha)\n• « de la maison » = ME-ha-bayit\n\nAprès be- et le-, le mot peut être à l\'état absolu ou construit selon le contexte.',
    examples: [
      { hebrew: 'ב', transliteration: 'be-', french: 'dans, à — Be-gan = Dans le jardin' },
      { hebrew: 'ל', transliteration: 'le-', french: 'à, pour — Lhiyot = Être (littéralement « pour-être »)' },
      { hebrew: 'מ', transliteration: 'me-', french: 'de, depuis — Me-zahav = D\'or' },
      { hebrew: 'את', transliteration: 'et', french: 'avec — Ani holekh im Sarah = Je vais avec Sarah' },
      { hebrew: 'על', transliteration: 'al', french: 'sur — Ha-sefer al ha-shulhan = Le livre sur la table' },
      { hebrew: 'תחת', transliteration: 'takhat', french: 'sous — Ha-kelev takhat ha-etz = Le chien sous l\'arbre' },
      { hebrew: 'ביד', transliteration: 'bevid', french: 'dans la main — Ha-tapuach bevid-i = La pomme dans ma main' },
      { hebrew: 'לבית', transliteration: 'la-bayit', french: 'à la maison — Ba-bayit (fusion) = À la maison' },
      { hebrew: 'מהבית', transliteration: 'me-ha-bayit', french: 'de la maison — Me-ha-bayit = De la maison' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'La préposition ב s\'attache au mot comment?',
        options: ['Avec un espace', 'Directement sans espace', 'Selon le cas', 'Jamais'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Que signifie "ba-bayit"?',
        options: ['Chez la maison', 'À la maison (fusion)', 'De la maison', 'Pour la maison'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Laquelle de ces prépositions signifie "de/depuis"?',
        options: ['ב', 'ל', 'מ', 'על'],
        correct: 2
      },
      {
        id: 'q4',
        question: 'Les trois prépositions principales sont...',
        options: ['ב, ל, ע', 'ב, ל, מ', 'ל, מ, על', 'ב, את, ל'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Comment dit-on "de la maison"?',
        options: ['me-bayit', 'me-ha-bayit', 'ba-bayit', 'le-ha-bayit'],
        correct: 1
      }
    ],
  },
  {
    id: 'constructed-state',
    title: 'État construit (סמיכות)',
    description: 'Relier deux noms sans préposition: "X de Y"',
    explanation: 'L\'état construit (smikhout) unit deux noms pour indiquer une relation. C\'est très courant en hébreu.\n\n**Structure :**\nnom-construit + nom-défini\n\nSEUL le DERNIER nom peut avoir l\'article ha-.\n\n**Règles principales :**\n1. Le PREMIER nom perd l\'article\n2. La fusion est OBLIGATOIRE : pas d\'espace, pas d\'article de\n3. Certains noms changent de forme (ex: bet → beit dans « beit sefer »)\n4. S\'il y a 3+ noms, seul le dernier est défini\n\n**Exemple complexe :**\nbeit safra shel ha-minha = le bureau de secrétariat du ministère\n(maison + secrétariat + de + le + ministère)\n\nC\'est un concept FONDAMENTAL en hébreu moderne.',
    examples: [
      { hebrew: 'בית ספר', transliteration: 'beit sefer', french: 'école (littéralement : maison-de-livre)' },
      { hebrew: 'בית חולים', transliteration: 'beit kholim', french: 'hôpital (maison-de-malades)' },
      { hebrew: 'בית קפה', transliteration: 'beit kafé', french: 'café (maison-de-café)' },
      { hebrew: 'חדר שינה', transliteration: 'chédar shéna', french: 'chambre à coucher (chambre-de-sommeil)' },
      { hebrew: 'דלת הבית', transliteration: 'dalet ha-bayit', french: 'la porte de la maison (porte-définie de-la-maison)' },
      { hebrew: 'שולחן הבית', transliteration: 'shulhan ha-bayit', french: 'la table de la maison' },
      { hebrew: 'ספר המשפחה', transliteration: 'sefer ha-mishpakha', french: 'le livre de la famille' },
      { hebrew: 'תלמידי בית ספר', transliteration: 'talmidé beit sefer', french: 'élèves d\'école (étudiants-de-maison-livres)' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Dans l\'état construit, seul quel nom peut avoir l\'article?',
        options: ['Le premier', 'Le dernier', 'Les deux', 'Aucun'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Que signifie "beit sefer"?',
        options: ['Une grande maison', 'Une école (maison-de-livre)', 'Une bibliothèque', 'Une maison de study'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Comment fonctionne la fusion dans l\'état construit?',
        options: ['Avec un espace et "de"', 'Sans espace, pas d\'article', 'Avec un tiret', 'Aucune fusion'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Que signifie littéralement "beit kholim"?',
        options: ['Un lieu de santé', 'Maison-de-malades', 'Une clinique', 'Un centre médical'],
        correct: 1
      }
    ],
  },
  {
    id: 'logical-connectors',
    title: 'Connecteurs logiques',
    description: 'Et, ou, mais, parce que, donc, aussi',
    explanation: 'Les connecteurs joignent des mots ou des phrases entières.\n\n**Les principaux :**\n• ו (ve-) = « et » — s\'attache DIRECTEMENT au mot (pas d\'espace). Le plus courant en hébreu!\n• או (o) = « ou » — exclusif (pas « et/ou »)\n• אבל (aval) = « mais » — introduit une contradiction\n• כי (ki) = « parce que » ou « que » — aussi introducteur de subordonnée\n• לכן (lakhén) = « donc, c\'est pourquoi » — logique causale\n• גם (gam) = « aussi, même » — peut être renforcé : gam... gam = « à la fois... et »\n\n**Important :**\nLe ו (ve-) est LE connecteur principal en hébreu — il est PARTOUT.\n\nLes connecteurs peuvent aussi relier des PHRASES ENTIÈRES :\nStructure : [phrase 1] + [connecteur] + [phrase 2]',
    examples: [
      { hebrew: 'ו', transliteration: 've-', french: 'et — Ani ve-Sarah holkhim = Moi et Sarah allons' },
      { hebrew: 'או', transliteration: 'o', french: 'ou — Tapuach o tapuach zahav? = Une pomme ou une orange?' },
      { hebrew: 'אבל', transliteration: 'aval', french: 'mais — Ha-lekach katan, aval yafe = Le jouet est petit, mais beau' },
      { hebrew: 'כי', transliteration: 'ki', french: 'parce que — Ani rotze yalda ki hu yafe = Je veux un garçon parce qu\'il est beau' },
      { hebrew: 'לכן', transliteration: 'lakhén', french: 'donc — Hu lo kan, lakhén ani lo rotze = Il n\'est pas là, donc je ne veux pas' },
      { hebrew: 'גם', transliteration: 'gam', french: 'aussi — Ani gam rotze = Moi aussi je veux' },
      { hebrew: 'גם...גם', transliteration: 'gam...gam', french: 'à la fois...et — Gam ani gam hu rotze = Lui et moi voulons tous les deux' },
      { hebrew: 'אך', transliteration: 'akh', french: 'cependant, seulement — Ha-lekach yafe, akh yakar = Le jouet est beau, cependant cher' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Le connecteur ו (ve-) signifie...',
        options: ['mais', 'et', 'ou', 'donc'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Comment ו s\'attache-t-il au mot?',
        options: ['Avec un espace', 'Directement', 'Avec un tiret', 'Variable'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Que signifie "ani ve-sarah holkhim"?',
        options: ['Je vais voir Sarah', 'Moi et Sarah allons', 'Sarah va avec moi', 'Sarah me va'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Quel connecteur introduit une cause?',
        options: ['אבל', 'או', 'כי', 'לכן'],
        correct: 2
      },
      {
        id: 'q5',
        question: 'Que signifie "gam...gam"?',
        options: ['Ou...ou', 'Mais...mais', 'À la fois...et', 'Si...alors'],
        correct: 2
      }
    ],
  },
  {
    id: 'definite-article',
    title: 'L\'article défini (ה)',
    description: 'Le, la, les',
    explanation: 'L\'article défini ה (ha-) s\'ajoute AU DÉBUT du nom pour indiquer une chose spécifique.\n\n**Règles de base :**\n• ה + nom = ha- + nom (« le/la/les »)\n• Exemples : ha-bayit (la maison), ha-kelev (le chien), ha-sefarim (les livres)\n\n**Fusion avec les prépositions :**\nC\'est ICI que ça devient intéressant ! Quand une préposition (ב, ל, מ) rencontre l\'article défini, ils se FUSIONNENT :\n• ב + ה = BA- (ba-bayit = à la maison, pas be-ha-bayit)\n• ל + ה = LA- (la-bayit = à la maison, pas le-ha-bayit)\n• מ + ה = ME- (me-ha-bayit = de la maison, pas mi-ha-bayit)\n\n**Important :**\n• Les noms indéfinis (sans ה) sont généraux : bayit = une maison / une maison\n• Les noms définis (avec ה) sont spécifiques : ha-bayit = LA maison\n• L\'article défini est PARTOUT en hébreu — tu vasa l\'utiliser constamment.',
    examples: [
      { hebrew: 'ה', transliteration: 'ha-', french: 'le, la, les — Ha-kelev = Le chien' },
      { hebrew: 'הבית', transliteration: 'ha-bayit', french: 'la maison — Ha-bayit gadol = La maison est grande' },
      { hebrew: 'הספר', transliteration: 'ha-sefer', french: 'le livre — Ha-sefer al ha-shulhan = Le livre sur la table' },
      { hebrew: 'הילדים', transliteration: 'ha-yeladim', french: 'les enfants — Ha-yeladim katanim = Les enfants sont petits' },
      { hebrew: 'בבית', transliteration: 'ba-bayit', french: 'à la maison (fusion) — Ani ba-bayit = Je suis à la maison' },
      { hebrew: 'לבית', transliteration: 'la-bayit', french: 'à la maison — Ani holekh la-bayit = Je vais à la maison' },
      { hebrew: 'מהבית', transliteration: 'me-ha-bayit', french: 'de la maison — Ani ba me-ha-bayit = Je viens de la maison' },
      { hebrew: 'הילדה', transliteration: 'ha-yalda', french: 'la fille — Ha-yalda yafa = La fille est belle' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'L\'article défini ה se traduit par...',
        options: ['un/une', 'le/la/les', 'un peu', 'le article'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Que signifie "ha-bayit"?',
        options: ['Une maison', 'Des maisons', 'La maison', 'La maison grande'],
        correct: 2
      },
      {
        id: 'q3',
        question: 'Qu\'est-ce que "ba-bayit"?',
        options: ['ב + ה + bayit (fusion)', 'be + ha-bayit', 'Une maison blanche', 'Pour la maison'],
        correct: 0
      },
      {
        id: 'q4',
        question: 'Qu\'est-ce que la fusion ל + ה?',
        options: ['lo', 'la', 'li', 'le-ha'],
        correct: 1
      }
    ],
  },
  {
    id: 'negation',
    title: 'La négation (לא, אין)',
    description: 'Ne...pas, n\'existe pas',
    explanation: 'Il y a plusieurs façons de faire des phrases négatives en hébreu.\n\n**1. לא (lo) = « ne...pas » pour les verbes :**\nStructure : לא + verbe / לא + nom au présent\n• Ani lo rotze = Je ne veux pas\n• Ha-bayit lo gadol = La maison n\'est pas grande\n\nLe לא se place AVANT le verbe ou l\'adjectif. C\'est le négatif le plus courant.\n\n**2. אין (ein) = « il n\'existe pas / ne...pas » :**\nUtilisé pour l\'existence ou la possession :\n• Ein li kelev = Je n\'ai pas de chien (littéralement : « n\'existe pas à-moi chien »)\n• Ein bayit = Il n\'existe pas de maison\n\nLe אין s\'utilise aussi avec la préposition ל (le) pour exprimer la possession :\n• Ein li = Je n\'ai pas\n• Ein lakh = Tu n\'as pas\n\n**3. Avec les objets définis :**\nQuand on négate un objet défini, on utilise לא + את :\n• Lo rotze oto = Je ne le veux pas (pas « lo rotze oto »)\n\n**Attention :**\n• לא = négation du verbe/adjectif\n• אין = négation de l\'existence ou possession\n• Les deux NE sont PAS interchangeables !',
    examples: [
      { hebrew: 'לא', transliteration: 'lo', french: 'ne...pas — Lo rotze = Je ne veux pas' },
      { hebrew: 'לא גדול', transliteration: 'lo gadol', french: 'n\'est pas grand — Ha-bayit lo gadol = La maison n\'est pas grande' },
      { hebrew: 'אין', transliteration: 'ein', french: 'n\'existe pas — Ein li kelev = Je n\'ai pas de chien' },
      { hebrew: 'אין בית', transliteration: 'ein bayit', french: 'il n\'existe pas de maison — Ein bayit kan = Il n\'existe pas de maison ici' },
      { hebrew: 'לא כאן', transliteration: 'lo kan', french: 'n\'est pas ici — Ha-kelev lo kan = Le chien n\'est pas ici' },
      { hebrew: 'אין לי', transliteration: 'ein li', french: 'je n\'ai pas — Ein li sefer = Je n\'ai pas de livre' },
      { hebrew: 'אין לך', transliteration: 'ein lakh', french: 'tu n\'as pas — Ein lakh oto = Tu ne l\'as pas' },
      { hebrew: 'לא יפה', transliteration: 'lo yafe', french: 'n\'est pas beau — Ha-lekach lo yafe = Le jouet n\'est pas beau' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Comment dit-on "je ne veux pas"?',
        options: ['Ein rotze', 'Lo rotze', 'Lo ani rotze', 'Ein ani rotze'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Que signifie "ein li kelev"?',
        options: ['Je veux un chien', 'Je n\'ai pas de chien', 'Mon chien n\'est pas ici', 'C\'est un chien'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Quelle est la différence entre לא et אין?',
        options: ['Aucune, c\'est la même', 'לא pour verbes, אין pour existence', 'אין pour verbes, לא pour nouns', 'C\'est une question de région'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Comment structure-t-on une phrase avec לא?',
        options: ['לא + verbe', 'verbe + לא', 'לא + verbe + objet', 'Variable selon le verbe'],
        correct: 0
      },
      {
        id: 'q5',
        question: 'Que signifie "ein bayit"?',
        options: ['une maison', 'pas une maison', 'il n\'existe pas de maison', 'une petite maison'],
        correct: 2
      }
    ],
  },
  {
    id: 'adjectives-agreement',
    title: 'Les adjectifs et leur accord',
    description: 'Beau, grand, petit : accord avec le nom',
    explanation: 'Les adjectifs en hébreu S\'ACCORDENT TOUJOURS avec le nom en GENRE et NOMBRE.\n\n**Règles d\'accord :**\n• Masculin singulier : -aucune terminaison (ou -ה final)\n• Féminin singulier : -ה ou -ית (yafe → yafa, gadol → gdola)\n• Masculin pluriel : -ים (-im)\n• Féminin pluriel : -ות (-ot)\n\n**Exemple avec « yafe » (beau) :**\n• Yafe (m.sg) = beau\n• Yafa (f.sg) = belle\n• Yafim (m.pl) = beaux\n• Yafot (f.pl) = belles\n\n**Position dans la phrase :**\nL\'adjectif se place APRÈS le nom (contrairement au français) :\n• Ha-bayit gadol = La maison grande (mot à mot : la-maison grande)\n• Ha-yalda yafa = La fille belle\n\n**Avec l\'article défini :**\nSI le nom a l\'article défini (ה), l\'adjectif DOIT aussi avoir l\'article :\n• Ha-bayit ha-gadol = La grande maison (CORRECT)\n• Ha-bayit gadol = La maison grand (INCORRECT)\n\n**Sans l\'article :**\nSi le nom est indéfini, l\'adjectif est aussi indéfini :\n• Bayit gadol = Une maison grande',
    examples: [
      { hebrew: 'יפה / יפה / יפים / יפות', transliteration: 'yafe/yafa/yafim/yafot', french: 'beau/belle/beaux/belles' },
      { hebrew: 'הבית הגדול', transliteration: 'ha-bayit ha-gadol', french: 'la grande maison — Ha-bayit ha-gadol kan = La grande maison est ici' },
      { hebrew: 'הילדה היפה', transliteration: 'ha-yalda ha-yafa', french: 'la belle fille — Ha-yalda ha-yafa rotze = La belle fille veut' },
      { hebrew: 'הילדים הקטנים', transliteration: 'ha-yeladim ha-ktanim', french: 'les petits enfants — Ha-yeladim ha-ktanim kan = Les petits enfants sont ici' },
      { hebrew: 'בית קטן', transliteration: 'bayit katan', french: 'une petite maison — Bayit katan ve-yafe = Une petite maison belle' },
      { hebrew: 'כלב גדול', transliteration: 'kelev gadol', french: 'un grand chien — Kelev gadol kan = Un grand chien est ici' },
      { hebrew: 'הספרים החדשים', transliteration: 'ha-sefarim ha-khadashim', french: 'les nouveaux livres — Ha-sefarim ha-khadashim yafim = Les nouveaux livres sont beaux' },
      { hebrew: 'הילדות היפות', transliteration: 'ha-yeladot ha-yafot', french: 'les belles filles — Ha-yeladot ha-yafot kan = Les belles filles sont ici' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Où se place l\'adjectif dans une phrase hébraïque?',
        options: ['Avant le nom', 'Après le nom', 'Variable', 'Au début de la phrase'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Comment écrit-on "belle" (féminin singulier) de "yafe"?',
        options: ['yafe', 'yafa', 'yafim', 'yafot'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Si le nom a l\'article défini, l\'adjectif doit...',
        options: ['Aussi avoir l\'article', 'Ne pas avoir l\'article', 'Être facultatif', 'Être avant le nom'],
        correct: 0
      },
      {
        id: 'q4',
        question: 'Que signifie "ha-bayit ha-gadol"?',
        options: ['La maison grande (incorrect)', 'La grande maison (correct)', 'Une grande maison', 'Grand et la maison'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Quel est le pluriel féminin de "yafe"?',
        options: ['yafim', 'yafot', 'yafa', 'yafim-ot'],
        correct: 1
      }
    ],
  },
  {
    id: 'singular-plural',
    title: 'Singulier et Pluriel',
    description: 'Un, plusieurs : formation et accords',
    explanation: 'La formation du pluriel en hébreu suit des règles de base, mais avec des exceptions.\n\n**Pluriel masculin : ajouter -ים (-im) :**\n• Kelev → Kelavim (chien → chiens)\n• Sefer → Sefarim (livre → livres)\n• Yeled → Yeladim (enfant → enfants)\n\n**Pluriel féminin : ajouter -ות (-ot) :**\n• Yalda → Yeladot (fille → filles)\n• Tapa → Tapot (pomme → pommes)\n• Yesha → Yeshot (repos → repos, au pluriel)\n\n**Pluriels irréguliers :**\nComme en français, il y a des exceptions :\n• Ish (homme) → Anashim (hommes) — complètement différent!\n• Bayit (maison) → Batim (maisons)\n• Yad (main) → Yadayim (mains)\n\n**Accord au pluriel :**\n• Articles : ha- + pluriel = ha-sefarim (les livres)\n• Adjectifs : DOIVENT s\'accorder au pluriel\n  - Ha-sefarim ha-gadolim (les grands livres — pluriel m.)\n  - Ha-yeladot ha-yafot (les belles filles — pluriel f.)\n• Verbes : changent aussi de forme au pluriel\n\n**Attention :**\n• Le pluriel CHANGE le genre : un nom peut être masculin au singulier et avoir une forme féminine au pluriel\n• Exemple : Kelev (m.sg) → Kelavim (m.pl, mais avec terminaison -im)\n• Les adjectifs et articles DOIVENT s\'accorder avec le pluriel.',
    examples: [
      { hebrew: 'הספר → הספרים', transliteration: 'ha-sefer → ha-sefarim', french: 'le livre → les livres' },
      { hebrew: 'הילד → הילדים', transliteration: 'ha-yeled → ha-yeladim', french: 'l\'enfant (m) → les enfants (m)' },
      { hebrew: 'הילדה → הילדות', transliteration: 'ha-yalda → ha-yeladot', french: 'l\'enfant (f) → les enfants (f)' },
      { hebrew: 'הכלב → הכלבים', transliteration: 'ha-kelev → ha-kelavim', french: 'le chien → les chiens' },
      { hebrew: 'הבית → הבתים', transliteration: 'ha-bayit → ha-batim', french: 'la maison → les maisons' },
      { hebrew: 'התפוח → התפוחים', transliteration: 'ha-tapuach → ha-tapuchim', french: 'la pomme (m) → les pommes (m)' },
      { hebrew: 'הספרים הגדולים', transliteration: 'ha-sefarim ha-gadolim', french: 'les grands livres — accord pluriel' },
      { hebrew: 'הילדות היפות', transliteration: 'ha-yeladot ha-yafot', french: 'les belles filles — accord pluriel' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Comment forme-t-on le pluriel masculin?',
        options: ['Ajouter -ה', 'Ajouter -ים', 'Ajouter -ות', 'Variable'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Quel est le pluriel de "ha-yalda"?',
        options: ['ha-yaldim', 'ha-yeladot', 'ha-yaldot', 'ha-yala'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Que signifie "kelavim"?',
        options: ['Un chien', 'Les chiens', 'Des chiens', 'Chiens (pluriel)'],
        correct: 3
      },
      {
        id: 'q4',
        question: 'Quelle est la forme plurielle régulière pour "tapuach"?',
        options: ['tapuchim', 'tapuchot', 'tapuachim', 'tapoach'],
        correct: 0
      },
      {
        id: 'q5',
        question: 'Au pluriel, comment change la forme "ish" (homme)?',
        options: ['isham', 'ishim', 'anashim', 'ishot'],
        correct: 2
      }
    ],
  },
  {
    id: 'indirect-objects',
    title: 'Pronoms indirects / Objets indirects',
    description: 'À moi, à toi, pour moi, pour toi',
    explanation: 'Les pronoms indirects s\'utilisent pour indiquer « à qui » ou « pour qui » quelque chose est fait.\n\n**En hébreu, la structure est :**\nLa préposition ל (le- = « à/pour ») + pronom possessif\n\n**Les formes :**\n• Li = à moi, pour moi\n• Lekha = à toi (m), pour toi\n• Lakh = à toi (f), pour toi\n• Lo = à lui, pour lui\n• La = à elle, pour elle\n• Lanu = à nous, pour nous\n• Lakhem = à vous (m), pour vous\n• Lahen = à vous (f), pour vous\n• Lahem = à eux, pour eux\n• Lahen = à elles, pour elles\n\n**Exemples d\'utilisation :**\n• Hu noten li sefer = Il me donne un livre (littéralement : il donne à-moi un livre)\n• Ani rotze lekha = Je te veux (je veux pour-toi)\n• Hu ohev la = Il l\'aime (il aime pour-elle = il aime elle)\n\n**Différence avec את (objets directs) :**\n• את = objet direct (accusatif) : Ani rotze otcha = Je te veux (toi-même)\n• ל = objet indirect : Ani rotze lekha = Je veux pour toi / Je te le donne\n\n**C\'est une distinction subtile mais IMPORTANTE en hébreu** — l\'une met l\'accent sur la personne elle-même, l\'autre sur l\'action envers cette personne.',
    examples: [
      { hebrew: 'לי', transliteration: 'li', french: 'à moi, pour moi — Hu noten li sefer = Il me donne un livre' },
      { hebrew: 'לך', transliteration: 'lekha/lakh', french: 'à toi (m/f), pour toi — Ani rotze lekha = Je te veux' },
      { hebrew: 'לו', transliteration: 'lo', french: 'à lui, pour lui — Ha-sefer hu lo = Le livre est pour lui' },
      { hebrew: 'לה', transliteration: 'la', french: 'à elle, pour elle — Hu rotze la = Il la veut' },
      { hebrew: 'לנו', transliteration: 'lanu', french: 'à nous, pour nous — Zeh lanu = C\'est pour nous' },
      { hebrew: 'לכם', transliteration: 'lakhem', french: 'à vous (m), pour vous — Ze lakhem = C\'est pour vous' },
      { hebrew: 'להם', transliteration: 'lahem', french: 'à eux, pour eux — Ani noten lahem = Je leur donne' },
      { hebrew: 'הוא נותן לי', transliteration: 'hu noten li', french: 'il me donne — Hu noten li hadag = Il me donne un poisson' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'Comment dit-on "à moi" avec la préposition ל?',
        options: ['lekha', 'li', 'lo', 'lanu'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Que signifie "hu noten li sefer"?',
        options: ['Je lui donne un livre', 'Il me donne un livre', 'Je veux un livre', 'Il a un livre pour moi'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Quelle est la différence entre "otcha" et "lekha"?',
        options: ['Aucune', 'otcha = objet direct, lekha = objet indirect', 'lekha est plus formel', 'C\'est régional'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Comment dit-on "à eux" pour les hommes/mixte?',
        options: ['lahen', 'lahem', 'lo', 'lanu'],
        correct: 1
      }
    ],
  },
  {
    id: 'questions',
    title: 'Les questions (היא, מה, איפה)',
    description: 'Poser des questions : oui/non, quoi, où, etc.',
    explanation: 'Il y a plusieurs façons de poser des questions en hébreu.\n\n**1. Questions oui/non (Ha...) :**\nOn utilise la particule ה (ha) au début de la phrase. En hébreu écrit, c\'est important ; à l\'oral, c\'est l\'intonation qui compte.\n• Ha-ani rotze? = Est-ce que je veux? (littéralement : est-ce que-je veux?)\n• Ha-hu kan? = Est-il ici?\n\n**2. Mots interrogatifs :**\n• מה (ma) = quoi, qu\'est-ce que\n• איפה (eifo) = où\n• מי (mi) = qui\n• איזה (eize) = quel, lequel\n• למה / מדוע (lama/madua) = pourquoi\n• כמה (kama) = combien\n• מתי (matai) = quand\n\n**3. Structure des questions :**\nLe mot interrogatif se place en DÉBUT de phrase :\n• Mah Otze? = Qu\'est-ce que tu veux? (quoi tu-veux?)\n• Eifo ha-bayit? = Où est la maison?\n• Mi ota? = Qui la veut?\n• Kama yeladim? = Combien d\'enfants?\n\n**4. Intonation à l\'oral :**\nÀ l\'oral, les questions oui/non se marquent SURTOUT par l\'intonation — tu montes la voix à la fin de la phrase, comme en français.\n\n**Important :**\nLe sujet (pronom ou nom) PEUT être omis en hébreu, mais dans les questions, la structure est claire grâce au mot interrogatif au début.',
    examples: [
      { hebrew: 'האני פה?', transliteration: 'ha-ani po?', french: 'Est-ce que je suis ici?' },
      { hebrew: 'הוא כאן?', transliteration: 'hu kan?', french: 'Est-il ici?' },
      { hebrew: 'מה אתה רוצה?', transliteration: 'ma ata rotze?', french: 'Qu\'est-ce que tu veux?' },
      { hebrew: 'איפה הבית?', transliteration: 'eifo ha-bayit?', french: 'Où est la maison?' },
      { hebrew: 'מי זה?', transliteration: 'mi ze?', french: 'Qui est-ce?' },
      { hebrew: 'כמה ילדים?', transliteration: 'kama yeladim?', french: 'Combien d\'enfants?' },
      { hebrew: 'למה לא?', transliteration: 'lama lo?', french: 'Pourquoi pas?' },
      { hebrew: 'איזה ספר?', transliteration: 'eize sefer?', french: 'Quel livre?' },
    ],
    exercises: [
      {
        id: 'q1',
        question: 'La particule ה pour les questions oui/non se place...',
        options: ['À la fin', 'Au début', 'Avant le verbe', 'N\'importe où'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Quel mot interrogatif signifie "où"?',
        options: ['mi', 'eifo', 'ma', 'kama'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Que signifie "mi ze?"',
        options: ['C\'est quoi?', 'Où est-ce?', 'Qui est-ce?', 'C\'est où?'],
        correct: 2
      },
      {
        id: 'q4',
        question: 'Comment demande-t-on "Combien d\'enfants?"?',
        options: ['Kama yeladim?', 'Eifo yeladim?', 'Mi yeladim?', 'Mah yeladim?'],
        correct: 0
      },
      {
        id: 'q5',
        question: 'Le mot interrogatif se place généralement où dans la phrase?',
        options: ['À la fin', 'Au début', 'Après le verbe', 'Avant le nom'],
        correct: 1
      }
    ],
  },
];
