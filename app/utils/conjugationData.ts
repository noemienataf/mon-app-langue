export interface ConjugationExample {
  person: string;
  hebrew: string;
  transliteration: string;
  french: string;
}

export interface ConjugationExercise {
  id: string;
  question: string;
  options: string[];
  correct: number;
  type: 'conjugation' | 'concept';
}

export interface ConjugationLesson {
  id: string;
  title: string;
  description: string;
  explanation: string;
  examples: ConjugationExample[];
  exercises: ConjugationExercise[];
}

export const conjugationLessons: ConjugationLesson[] = [
  {
    id: 'present-tense',
    title: 'Conjugaison au Présent',
    description: 'Apprendre à conjuguer les verbes au temps présent (Hové)',
    explanation: "Le présent en hébreu (Hové) s'utilise pour parler des actions qui se déroulent maintenant. Les verbes réguliers au présent changent selon le sujet (personne et genre).\n\n**Structure générale**: Le verbe change sa forme selon qui l'effectue:\n- 1ère personne singulier/pluriel\n- 2ème personne singulier/pluriel (avec distinction masculin/féminin)\n- 3ème personne singulier/pluriel (avec distinction masculin/féminin)\n\n**Exemple avec \"étudier\" (limad)**: Les formes changent complètement pour chaque personne, ce qui est différent du français.",
    examples: [
      {
        person: 'Je (masculin)',
        hebrew: 'אני לומד',
        transliteration: 'ani lomèd',
        french: 'Je suis en train d\'étudier'
      },
      {
        person: 'Tu (féminin)',
        hebrew: 'את לומדת',
        transliteration: 'at lomédet',
        french: 'Tu es en train d\'étudier'
      },
      {
        person: 'Il',
        hebrew: 'הוא לומד',
        transliteration: 'hou lomèd',
        french: 'Il est en train d\'étudier'
      },
      {
        person: 'Elle',
        hebrew: 'היא לומדת',
        transliteration: 'hi lomédet',
        french: 'Elle est en train d\'étudier'
      },
      {
        person: 'Nous',
        hebrew: 'אנחנו לומדים',
        transliteration: 'anakhnú lomédim',
        french: 'Nous sommes en train d\'étudier'
      },
      {
        person: 'Vous (pluriel)',
        hebrew: 'אתם לומדים',
        transliteration: 'atém lomédim',
        french: 'Vous êtes en train d\'étudier'
      },
      {
        person: 'Ils',
        hebrew: 'הם לומדים',
        transliteration: 'hém lomédim',
        french: 'Ils sont en train d\'étudier'
      },
      {
        person: 'Elles',
        hebrew: 'הן לומדות',
        transliteration: 'hén lomedót',
        french: 'Elles sont en train d\'étudier'
      }
    ],
    exercises: [
      {
        id: 'concept-1',
        question: 'Qu\'est-ce que le présent (Hové) en hébreu?',
        options: ['Une action qui se déroule maintenant', 'Une action qui s\'est déroulée', 'Une action qui aura lieu', 'Un souhait ou une condition'],
        correct: 0,
        type: 'concept'
      },
      {
        id: 'conj-1',
        question: 'Conjugue "parler" (medaber) pour "Il parle":',
        options: ['הוא מדברת', 'הוא מדבר', 'היא מדברת', 'הם מדברים'],
        correct: 1,
        type: 'conjugation'
      },
      {
        id: 'conj-2',
        question: 'Conjugue "manger" (okhel) pour "Vous (pluriel) mangez":',
        options: ['אתם אוכלים', 'אתה אוכל', 'היא אוכלת', 'אתן אוכלות'],
        correct: 0,
        type: 'conjugation'
      },
      {
        id: 'conj-3',
        question: 'Conjugue "lire" (kore) pour "Elles lisent":',
        options: ['היא קוראת', 'הם קוראים', 'הן קוראות', 'הוא קורא'],
        correct: 2,
        type: 'conjugation'
      }
    ]
  },
  {
    id: 'past-tense',
    title: 'Conjugaison au Passé',
    description: 'Apprendre à conjuguer les verbes au temps passé (Avar)',
    explanation: "Le passé en hébreu (Avar) s'utilise pour parler des actions qui sont déjà terminées. La conjugaison au passé est généralement plus régulière que celle du présent.\n\n**Caractéristiques du passé**:\n- Les suffixes s'ajoutent à la racine du verbe\n- Le passé change selon la personne et le genre\n- Pour les verbes réguliers, on ajoute des suffixes standardisés\n\n**Exemple avec \"parler\" (diber)**: La racine \"d-b-r\" reçoit des suffixes selon le sujet.",
    examples: [
      {
        person: 'Je',
        hebrew: 'אני דברתי',
        transliteration: 'ani dibárti',
        french: 'J\'ai parlé'
      },
      {
        person: 'Tu (masculin)',
        hebrew: 'אתה דברת',
        transliteration: 'atá dibárta',
        french: 'Tu as parlé'
      },
      {
        person: 'Tu (féminin)',
        hebrew: 'את דברת',
        transliteration: 'at dibárta',
        french: 'Tu as parlé'
      },
      {
        person: 'Il',
        hebrew: 'הוא דיבר',
        transliteration: 'hou dibér',
        french: 'Il a parlé'
      },
      {
        person: 'Elle',
        hebrew: 'היא דיברה',
        transliteration: 'hi dibra',
        french: 'Elle a parlé'
      },
      {
        person: 'Nous',
        hebrew: 'אנחנו דיברנו',
        transliteration: 'anakhnú dibarnu',
        french: 'Nous avons parlé'
      },
      {
        person: 'Vous (pluriel)',
        hebrew: 'אתם דיברתם',
        transliteration: 'atém dibártem',
        french: 'Vous avez parlé'
      },
      {
        person: 'Ils/Elles',
        hebrew: 'הם/הן דיברו',
        transliteration: 'hém/hén dibru',
        french: 'Ils/Elles ont parlé'
      }
    ],
    exercises: [
      {
        id: 'concept-1',
        question: 'Quel est le temps du passé en hébreu?',
        options: ['Hové', 'Avar', 'Atid', 'Hové Tamir'],
        correct: 1,
        type: 'concept'
      },
      {
        id: 'conj-1',
        question: 'Conjugue "manger" (akhal) pour "J\'ai mangé":',
        options: ['אני אכלתי', 'אני אוכל', 'אתה אכלת', 'היא אכלה'],
        correct: 0,
        type: 'conjugation'
      },
      {
        id: 'conj-2',
        question: 'Conjugue "donner" (natan) pour "Elle a donné":',
        options: ['הוא נתן', 'היא נתנה', 'הם נתנו', 'אני נתתי'],
        correct: 1,
        type: 'conjugation'
      },
      {
        id: 'conj-3',
        question: 'Conjugue "voir" (ra) pour "Nous avons vu":',
        options: ['אני ראיתי', 'הוא ראה', 'אנחנו ראינו', 'הם ראו'],
        correct: 2,
        type: 'conjugation'
      }
    ]
  },
  {
    id: 'future-tense',
    title: 'Conjugaison au Futur',
    description: 'Apprendre à conjuguer les verbes au temps futur (Atid)',
    explanation: "Le futur en hébreu (Atid) s'utilise pour parler des actions qui n'ont pas encore eu lieu.\n\n**Caractéristiques du futur**:\n- Utilise des préfixes (prépositions attachées au verbe)\n- Change selon la personne et le genre\n- Les formes sont souvent différentes du présent\n\n**Préfixes du futur**:\n- י (y) pour 3ème personne masculine\n- ת (t) pour 2ème personne et 3ème personne féminine\n- א (a) pour 1ère personne\n- נ (n) pour 1ère personne pluriel",
    examples: [
      {
        person: 'Je',
        hebrew: 'אני אלמד',
        transliteration: 'ani almèd',
        french: 'J\'étudierai'
      },
      {
        person: 'Tu (masculin)',
        hebrew: 'אתה תלמד',
        transliteration: 'atá talmèd',
        french: 'Tu étudiera'
      },
      {
        person: 'Tu (féminin)',
        hebrew: 'את תלמדי',
        transliteration: 'at talmdi',
        french: 'Tu étudieras'
      },
      {
        person: 'Il',
        hebrew: 'הוא ילמד',
        transliteration: 'hou yalmèd',
        french: 'Il étudiera'
      },
      {
        person: 'Elle',
        hebrew: 'היא תלמד',
        transliteration: 'hi talmèd',
        french: 'Elle étudiera'
      },
      {
        person: 'Nous',
        hebrew: 'אנחנו נלמד',
        transliteration: 'anakhnú nalmèd',
        french: 'Nous étudierons'
      },
      {
        person: 'Vous (pluriel)',
        hebrew: 'אתם תלמדו',
        transliteration: 'atém talmédu',
        french: 'Vous étudierez'
      },
      {
        person: 'Ils/Elles',
        hebrew: 'הם/הן ילמדו',
        transliteration: 'hém/hén yalmédu',
        french: 'Ils/Elles étudieront'
      }
    ],
    exercises: [
      {
        id: 'concept-1',
        question: 'Quel est le nom du futur en hébreu?',
        options: ['Hové', 'Avar', 'Atid', 'Binyan'],
        correct: 2,
        type: 'concept'
      },
      {
        id: 'conj-1',
        question: 'Conjugue "aller" (halakh) pour "Il ira":',
        options: ['אני אלך', 'הוא ילך', 'אתה תלך', 'היא תלכי'],
        correct: 1,
        type: 'conjugation'
      },
      {
        id: 'conj-2',
        question: 'Conjugue "venir" (ba) pour "Je viendrai":',
        options: ['אני אבוא', 'אתה תבוא', 'היא תבואי', 'הוא יבוא'],
        correct: 0,
        type: 'conjugation'
      },
      {
        id: 'conj-3',
        question: 'Conjugue "prendre" (lakach) pour "Vous (pluriel) prendrez":',
        options: ['אני אקח', 'הוא יקח', 'אתם תקחו', 'היא תקח'],
        correct: 2,
        type: 'conjugation'
      }
    ]
  },
  {
    id: 'binyanim',
    title: 'Les Binyanim (Structures verbales)',
    description: 'Comprendre les différentes structures de verbes en hébreu',
    explanation: "Les binyanim (binyan = structure/forme) sont des modèles de conjugaison qui donnent au verbe différentes nuances de sens.\n\n**Les 7 binyanim principaux**:\n1. **Kal** (simple): La forme la plus basique. Exemple: דברו (parler)\n2. **Nifal** (passif simple): Forme passive ou réfléchie. Exemple: נשמר (être gardé)\n3. **Piel** (intensif): Renforce ou répète l'action. Exemple: דרך (écraser vs. presser)\n4. **Pual** (passif piel): Passif du piel. Exemple: מדוד (être mesuré)\n5. **Hifil** (causatif): \"Faire faire\" quelque chose. Exemple: השמיע (faire écouter)\n6. **Hofal** (passif hifil): Passif du hifil. Exemple: השמד (être fait connaître)\n7. **Hitpael** (réfléchi): Réfléchi ou réciprocal. Exemple: התדברו (se parler)\n\nChaque binyan change le sens et le comportement du verbe.",
    examples: [
      {
        person: 'Kal (simple)',
        hebrew: 'שמר',
        transliteration: 'shamar',
        french: 'Garder'
      },
      {
        person: 'Nifal (passif)',
        hebrew: 'נשמר',
        transliteration: 'nishmar',
        french: 'Être gardé/Se garder'
      },
      {
        person: 'Piel (intensif)',
        hebrew: 'שימר',
        transliteration: 'shimer',
        french: 'Préserver (intensif)'
      },
      {
        person: 'Hifil (causatif)',
        hebrew: 'השמיר',
        transliteration: 'hishmír',
        french: 'Faire garder/Confier'
      },
      {
        person: 'Hitpael (réfléchi)',
        hebrew: 'השתמר',
        transliteration: 'hishtamar',
        french: 'Se garder/Faire attention'
      },
      {
        person: 'Exemple: Kal',
        hebrew: 'קרא (lire)',
        transliteration: 'kara',
        french: 'Lire'
      },
      {
        person: 'Exemple: Nifal',
        hebrew: 'נקרא (être appelé)',
        transliteration: 'nikra',
        french: 'Être appelé'
      },
      {
        person: 'Exemple: Piel',
        hebrew: 'קירא (lire régulièrement)',
        transliteration: 'kira',
        french: 'Lire (régulièrement/répétition)'
      }
    ],
    exercises: [
      {
        id: 'concept-1',
        question: 'Quel binyan donne une nuance causative (faire faire)?',
        options: ['Kal', 'Piel', 'Hifil', 'Nifal'],
        correct: 2,
        type: 'concept'
      },
      {
        id: 'conj-1',
        question: 'Quel binyan correspond à: "נשמר" (être gardé)?',
        options: ['Kal', 'Nifal', 'Piel', 'Hifil'],
        correct: 1,
        type: 'conjugation'
      },
      {
        id: 'conj-2',
        question: 'Quel binyan a généralement une forme causative?',
        options: ['Kal', 'Nifal', 'Hifil', 'Hitpael'],
        correct: 2,
        type: 'conjugation'
      },
      {
        id: 'conj-3',
        question: 'Quel binyan est utilisé pour la forme réfléchie "Se parler"?',
        options: ['Piel', 'Hifil', 'Nifal', 'Hitpael'],
        correct: 3,
        type: 'conjugation'
      }
    ]
  },
  {
    id: 'verb-groups',
    title: 'Groupes de Verbes',
    description: 'Connaître les différentes catégories de verbes en hébreu',
    explanation: "En hébreu, les verbes sont classifiés en groupes selon le type de racine et les lettres qu'ils contiennent.\n\n**Groupes de verbes**:\n1. **Verbes réguliers (Sholem)**: Trois racines consonantiques régulières. Exemple: שמר (garder)\n2. **Verbes avec gutturales (Guttural)**: Contiennent ה, ע, ח, ר. Ces lettres changent les voyelles. Exemple: עזר (aider)\n3. **Verbes faibles (Weak)**: Contiennent י, ו, נ. Changent ou disparaissent. Exemple: יהב (donner)\n4. **Verbes doublés (Doubled)**: Deux racines identiques. Exemple: סבב (tourner)\n5. **Verbes géminés**: Les deux dernières consonnes sont identiques. Exemple: קרר (refroidir)\n\nComprendre le groupe aide à anticiper les modifications de conjugaison.",
    examples: [
      {
        person: 'Régulier',
        hebrew: 'שמר',
        transliteration: 'shamar',
        french: 'Garder'
      },
      {
        person: 'Avec guttural',
        hebrew: 'עזר',
        transliteration: 'azar',
        french: 'Aider'
      },
      {
        person: 'Faible (י)',
        hebrew: 'יתר',
        transliteration: 'yatar',
        french: 'Dépasser'
      },
      {
        person: 'Faible (ו)',
        hebrew: 'ובד',
        transliteration: 'vad',
        french: 'Travailler'
      },
      {
        person: 'Doublé',
        hebrew: 'סבב',
        transliteration: 'savav',
        french: 'Tourner/Environner'
      },
      {
        person: 'Geminé',
        hebrew: 'קרר',
        transliteration: 'karar',
        french: 'Refroidir'
      },
      {
        person: 'Exemple changement: אכל',
        hebrew: 'אכל (manger) → יאכל (il mangera)',
        transliteration: 'et tu → ye\'ékhel',
        french: 'Changement pour verbes faibles'
      },
      {
        person: 'Exemple changement: עוד',
        hebrew: 'עוד (rester) → נשאר (il restera)',
        transliteration: 'od → nishar',
        french: 'Verbe avec guttural'
      }
    ],
    exercises: [
      {
        id: 'concept-1',
        question: 'Quel groupe contient les verbes avec ה, ע, ח, ר?',
        options: ['Verbes réguliers', 'Verbes avec gutturales', 'Verbes faibles', 'Verbes doublés'],
        correct: 1,
        type: 'concept'
      },
      {
        id: 'conj-1',
        question: 'À quel groupe appartient le verbe "עזר" (aider)?',
        options: ['Régulier', 'Avec guttural', 'Faible', 'Doublé'],
        correct: 1,
        type: 'conjugation'
      },
      {
        id: 'conj-2',
        question: 'Quel groupe de verbes change ou perd la lettre י ou ו?',
        options: ['Régulier', 'Guttural', 'Faible', 'Doublé'],
        correct: 2,
        type: 'conjugation'
      },
      {
        id: 'conj-3',
        question: 'À quel groupe appartient "סבב" (tourner)?',
        options: ['Régulier', 'Faible', 'Doublé', 'Guttural'],
        correct: 2,
        type: 'conjugation'
      }
    ]
  }
];
