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
    description: 'Les 7 moules de conjugaison qui créent différents sens à partir d\'une même racine',
    explanation: "**Le concept fondamental**: En hébreu, presque tous les verbes sont construits sur une racine de 3 lettres consonnes. Cette racine porte le sens général, et on l'\"habille\" dans différents moules (binyanim) pour créer différents verbes avec des nuances de sens.\n\nExemple avec ל-מ-ד (l-m-d = apprendre):\n- **לָמַד** (lamad) = il a appris\n- **לִמֵּד** (limed) = il a enseigné (= fait apprendre)\n- **הִתְלַמֵּד** (hitlamed) = il a fait un apprentissage / s'est formé\n\n**Les binyanim vont par paires actif/passif**: Pa'al↔Nif'al, Pi'el↔Pu'al, Hif'il↔Huf'al. Hitpa'el est à part (réflexif).\n\n**Reconnaissance rapide** - Tu peux identifier un binyan juste en regardant les préfixes/voyelles:\n- **Voyelles a-a, aucun préfixe** = Pa'al (passé)\n- **Préfixe נ־** = Nif'al\n- **Voyelles i-e + dagesh au milieu** = Pi'el\n- **Voyelles u-a** = Pu'al\n- **Préfixe הִ + voyelle i** = Hif'il\n- **Préfixe הֻ** = Huf'al\n- **Préfixe הִתְ / מִתְ / לְהִתְ** = Hitpa'el",
    examples: [
      {
        person: '1. Pa\'al (Qal) - ACTIF SIMPLE',
        hebrew: 'כָּתַב (katav) - il a écrit',
        transliteration: 'Signature: voyelles a-a au passé, forme la plus basique',
        french: 'Autres: לָמַד (lamad = apprendre), אָכַל (akhal = manger), יָשַׁב (yashav = s\'asseoir)'
      },
      {
        person: '2. Nif\'al - PASSIF/RÉFLEXIF du Pa\'al',
        hebrew: 'נִכְתַּב (nikhtav) - il a été écrit',
        transliteration: 'Signature: préfixe ni- au passé, préfixe hi- à l\'infinitif',
        french: 'Autres: נִכְנַס (nikhnas = entrer), נִפְגַּש (nifgash = se rencontrer), נִשְׁבַּר (nishbar = se casser)'
      },
      {
        person: '3. Pi\'el - ACTIF INTENSIF',
        hebrew: 'כִּתֵּב (kitve) - il a dicté (action intensive)',
        transliteration: 'Signature: dagesh (point) dans la 2ème lettre, voyelles i-e au passé',
        french: 'Autres: דִּבֵּר (diber = parler), לִמֵּד (limed = enseigner), בִּקֵּש (bikesh = demander), סִפֵּר (siper = raconter)'
      },
      {
        person: '4. Pu\'al - PASSIF du Pi\'el (RARE à l\'oral)',
        hebrew: 'כֻּתַּב (kutav) - il a été dicté',
        transliteration: 'Signature: voyelles u-a. Surtout au présent et passé, pas d\'infinitif',
        french: 'Exemple: דֻּבַּר (dubar = on a parlé de lui)'
      },
      {
        person: '5. Hif\'il - CAUSATIF (\"faire faire\")',
        hebrew: 'הִכְתִּיב (hikhtiv) - il a dicté (= fait écrire)',
        transliteration: 'Signature: préfixe הִ (hi-) au passé, voyelle i entre 2ème et 3ème lettre',
        french: 'Autres: הִכְנִיס (hikhnis = faire entrer), הִלְבִּישׁ (hilbish = habiller = faire porter), הִרְגִּישׁ (hirgish = ressentir)'
      },
      {
        person: '6. Huf\'al - PASSIF du Hif\'il',
        hebrew: 'הֻכְתַּב (hukhtav) - il a été dicté',
        transliteration: 'Signature: préfixe הֻ (hu-), voyelle a. Rare à l\'oral moderne',
        french: 'Exemple: הֻסְבַּר (husbar = il a été expliqué)'
      },
      {
        person: '7. Hitpa\'el - RÉFLEXIF / RÉCIPROCAL',
        hebrew: 'הִתְכַּתֵּב (hitkatev) - il a correspondu (s\'est écrit)',
        transliteration: 'Signature: préfixe הִתְ (hit-). Peut aussi être מִתְ au présent ou לְהִתְ à l\'infinitif',
        french: 'Autres: הִתְלַבֵּשׁ (hitlabesh = s\'habiller), הִתְרַחֵץ (hitrahets = se laver), הִתְרַגֵּשׁ (hitragesh = s\'émouvoir)'
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
    title: 'Groupes de Verbes (Gizra)',
    description: 'Classification des verbes selon leur racine - comprendre comment cela affecte la conjugaison',
    explanation: "**Gizra** (גִּזְרָה = groupe/classification) - Les verbes sont classifiés selon le type de lettres dans leur racine.\n\n**Importance**: Certaines lettres \"faibles\" (י, ו, נ) ou \"gutturales\" (ה, ע, ח, ר) changent les voyelles ou se comportent différemment en conjugaison. Comprendre le groupe d'un verbe aide à prévoir ses modifications.\n\n**Les principaux groupes**:\n\n1. **Verbes réguliers (Sholem/Shaleim)** - Trois consonnes \"fortes\"\n   - Pas de modifications en conjugaison\n   - Exemple: שׁמר (shamar = garder), דבר (davar = parler), קטל (katal = tuer)\n\n2. **Verbes avec gutturales** - Contiennent ה, ע, ח, ר\n   - Ces lettres \"mangent\" les voyelles muettes ou les changent\n   - Exemple: עזר (azar = aider), שׁאל (shaal = demander), רחץ (rahatz = laver)\n   - Changement typique: les voyelles seront légèrement modifiées\n\n3. **Verbes faibles (אָ, י, ו, נ)** - Une des lettres se transforme ou disparaît\n   - **אָ-faibles**: נתן (natan = donner) - le alef disparaît en conjugaison\n   - **י-faibles**: יתר (yatar = rester) - le yud peut se transformer\n   - **ו-faibles**: ובד (vad = travailler) - le vav peut disparaître\n   - **נ-faibles**: נשׁר (nashar = tomber) - le nun peut se transformer\n   - Changement typique: la lettre faible change d'aspect selon le temps\n\n4. **Verbes doublés (Gemination)** - Deux racines identiques (P=L)\n   - Exemple: סבב (savav = tourner), לקק (lakak = lécher), קלל (kalal = maudire)\n   - Changement typique: au présent et futur, la lettre peut se diviser ou se transformer\n\n5. **Verbes très faibles** - Plusieurs lettres faibles ou combinaisons complexes\n   - Exemple: בוא (bo = venir), יאכל (ya'akhal = manger avec א et י)\n   - Changements importants selon le binyan et le temps",
    examples: [
      {
        person: 'RÉGULIER - שׁמר',
        hebrew: 'Passé: שׁמרתי (shamarti = j\'ai gardé)',
        transliteration: 'Présent: שׁומר (shomer = gardien)',
        french: 'Futur: אשׁמור (ashmor = je garderai) - formes régulières'
      },
      {
        person: 'RÉGULIER - דבר',
        hebrew: 'Passé: דברתי (dabarti = j\'ai parlé)',
        transliteration: 'Présent: מדבר (medaber = parleur)',
        french: 'Futur: אדבור (adabor = je parlerai) - conjugaison normale'
      },
      {
        person: 'GUTTURALE - עזר',
        hebrew: 'Passé: עזרתי (azarti = j\'ai aidé)',
        transliteration: 'Présent: עוזר (ozer = aidant)',
        french: 'Les voyelles changent légèrement par rapport aux réguliers'
      },
      {
        person: 'GUTTURALE - שׁאל',
        hebrew: 'Passé: שׁאלתי (shaalti = j\'ai demandé)',
        transliteration: 'Présent: שׁואל (shoal = demandant)',
        french: 'Futur: אשׁאל (isha\'al = je demanderai) - voyelles modifiées'
      },
      {
        person: 'ALEF-FAIBLE - נתן',
        hebrew: 'Passé: נתתי (natati = j\'ai donné)',
        transliteration: 'Présent: נותן (noten = donnant)',
        french: 'L\'alef disparaît! Au passé il redevient: נ-ת-ן'
      },
      {
        person: 'YOD-FAIBLE - יתר',
        hebrew: 'Passé: יתרתי (yatarti = j\'ai dépassé)',
        transliteration: 'Présent: יתור (yatur = dépassant)',
        french: 'Le yod se transforme selon le temps et le binyan'
      },
      {
        person: 'VAV-FAIBLE - בוא (venir)',
        hebrew: 'Passé: באתי (bati = je suis venu)',
        transliteration: 'Présent: בא (ba = venant)',
        french: 'Le vav disparaît presque complètement au futur: אבוא'
      },
      {
        person: 'DOUBLÉ - סבב',
        hebrew: 'Passé: סבבתי (saavti = j\'ai tourné)',
        transliteration: 'Présent: סובב (sovev = tournant)',
        french: 'Au présent/futur: סבב → סובב (la lettre se divise avec voyelle entre)'
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
