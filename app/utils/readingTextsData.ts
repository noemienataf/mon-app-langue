export interface ReadingText {
  id: string;
  title: string;
  theme: string;
  hebrew: string;
  french: string;
  language: string;
}

export const readingTexts: ReadingText[] = [
  {
    id: 'travel-1',
    title: 'Un voyage à Tel-Aviv',
    theme: 'Transport et voyage',
    hebrew: `בְּחֹדֶשׁ שֶׁעָבַר הֶחְלַטְתִּי לָצֵאת לְחֻפְשָׁה קְצָרָה בְּתֵל אָבִיב.
הִזְמַנְתִּי כַּרְטִיס טִיסָה בָּאִינְטֶרְנֶט שְׁבוּעַיִם לִפְנֵי הַנְּסִיעָה, וְהַמְּחִיר הָיָה סָבִיר לְמַדַּי.
בְּיוֹם הַיְצִיאָה הִגַּעְתִּי לִשְׂדֵה הַתְּעוּפָה שָׁלוֹשׁ שָׁעוֹת מֻקְדָּם, מִשּׁוּם שֶׁבִּדִּיקוֹת הַבִּטָּחוֹן בְּיִשְׂרָאֵל יְכוֹלוֹת לִקַּחַת זְמַן רַב.
הַטִּיסָה עַצְמָהּ אָרְכָה אַרְבַּע שָׁעוֹת וַחֲצִי, וְהִצְלַחְתִּי אֲפִלּוּ לִישֹׁן קְצָת.
כְּשֶׁנָּחַתְתִּי, לָקַחְתִּי רַכֶּבֶת מִשְּׂדֵה הַתְּעוּפָה יָשָׁר לְמֶרְכַּז הָעִיר.
הַמְּלוֹן שֶׁלִּי הָיָה קָרוֹב לַחוֹף, וְהַחֶדֶר שֶׁלִּי הָיָה בַּקּוֹמָה הָעֲשִׂירִית עִם נוֹף לַיָּם.
בַּיּוֹם הָרִאשׁוֹן הִשְׂכַּרְתִּי אוֹפַנַּיִם וְרָכַבְתִּי לְאֹרֶךְ הַטַּיֶּלֶת.
הָאַוְוִירָה בָּעִיר הָיְתָה תּוֹסֶסֶת מְאוֹד, וּפָגַשְׁתִּי תַּיָּרִים מִכָּל הָעוֹלָם.
בַּיּוֹם הַשֵּׁנִי נָסַעְתִּי בְּאוֹטוֹבּוּס לִירוּשָׁלַיִם כְּדֵי לְבַקֵּר אֶת הָעִיר הָעַתִּיקָה.
הַנְּסִיעָה אָרְכָה כְּשָׁעָה, וְהַנּוֹף בַּדֶּרֶךְ הָיָה מַרְהִיב.
חָזַרְתִּי בָּעֶרֶב בְּמוֹנִית מְשֻׁתֶּפֶת, מַה שֶּׁקּוֹרְאִים בְּעִבְרִית "שֵׁרוּת".
בַּיּוֹם הָאַחֲרוֹן טִיַּלְתִּי בָּרֶגֶל בִּשְׁכוּנַת נְוֵה צֶדֶק וְצִלַּמְתִּי הַרְבֵּה תְּמוּנוֹת.
לִפְנֵי הַחֲזָרָה, קָנִיתִי מַתָּנוֹת קְטַנּוֹת בַּשּׁוּק לְמִשְׁפַּחְתִּי.
הַטִּיסָה חֲזָרָה הִתְעַכְּבָה בְּשָׁעָה וָחֵצִי, אֲבָל לֹא הִתְעַצְבַּנְתִּי.
חָזַרְתִּי הַבַּיְתָה עָיֵף אַךְ מְרֻצֶּה, עִם הַרְבֵּה זִכְרוֹנוֹת וְחָוָיוֹת חֲדָשׁוֹת.`,
    french: `Le mois dernier, j'ai décidé de partir pour un court séjour à Tel-Aviv.
J'ai réservé un billet d'avion sur internet deux semaines avant le départ, et le prix était plutôt raisonnable.
Le jour du départ, je suis arrivé à l'aéroport trois heures en avance, car les contrôles de sécurité en Israël peuvent prendre beaucoup de temps.
Le vol lui-même a duré quatre heures et demie, et j'ai même réussi à dormir un peu.
Quand j'ai atterri, j'ai pris le train depuis l'aéroport directement jusqu'au centre-ville.
Mon hôtel était proche de la plage, et ma chambre se trouvait au dixième étage avec vue sur la mer.
Le premier jour, j'ai loué un vélo et j'ai roulé le long de la promenade.
L'ambiance dans la ville était très animée, et j'ai rencontré des touristes du monde entier.
Le deuxième jour, j'ai pris le bus pour Jérusalem afin de visiter la vieille ville.
Le trajet a duré environ une heure, et le paysage en route était magnifique.
Je suis rentré le soir en taxi collectif, ce qu'on appelle en hébreu un « shérout ».
Le dernier jour, je me suis promené à pied dans le quartier de Neve Tzedek et j'ai pris beaucoup de photos.
Avant le retour, j'ai acheté de petits cadeaux au marché pour ma famille.
Le vol retour a été retardé d'une heure et demie, mais je ne me suis pas énervé.
Je suis rentré à la maison fatigué mais satisfait, avec beaucoup de souvenirs et d'expériences nouvelles.`,
    language: 'hebrew',
  },
  {
    id: 'body-food-1',
    title: 'Corps et nourriture',
    theme: 'Corps et nourriture',
    hebrew: `אַחֲרֵי שָׁבוּעַ עָמוּס בָּעֲבוֹדָה, הֶחְלַטְתִּי לָלֶכֶת לְחֶדֶר הַכּוֹשֶׁר בַּשַּׁבָּת בַּבֹּקֶר.
הִתְאַמַּנְתִּי כִּמְעַט שָׁעָה, וּבְסוֹף הָאִמּוּן הָרַגְלַיִם שֶׁלִּי כָּאֲבוּ מְאוֹד.
הַגָּב שֶׁלִּי הָיָה תָּפוּס וְהַכְּתֵפַיִם הִרְגִּישׁוּ כְּבֵדוֹת.
לָקַחְתִּי מִקְלַחַת אֲרֻכָּה, וְהַמַּיִם הַחַמִּים הִרְגִּיעוּ אֶת הַשְּׁרִירִים שֶׁלִּי.
לְאַחַר מִכֵּן הִרְגַּשְׁתִּי רָעָב נוֹרָאִי, וְהֶחְלַטְתִּי לְהָכִין לְעַצְמִי אֲרוּחַת צָהֳרַיִם בְּרִיאָה.
פָּתַחְתִּי אֶת הַמְּקָרֵר וּמָצָאתִי יְרָקוֹת טְרִיִּים: עַגְבָנִיּוֹת, מְלָפְפוֹנִים, גֶּזֶר וְפִלְפֵּל אָדֹם.
הִכַנְתִּי סָלָט גָּדוֹל עִם שֶׁמֶן זַיִת, מִיץ לִימוֹן וּמְעַט מֶלַח.
לְצִדּוֹ הִכַנְתִּי חֲבִיתָה עִם בְּצָלִים וּגְבִינָה צְהֻבָּה.
לֹא הָיָה לִי לֶחֶם טָרִי, אָז קָלִיתִי שְׁתֵּי פְּרוּסוֹת לֶחֶם מָלֵא בַּטּוֹסְטֶר.
שָׁתִיתִי כּוֹס גְּדוֹלָה שֶׁל מַיִם עִם נַעֲנָע, כִּי הָיִיתִי צָמֵא מְאוֹד.
לְקִנּוּחַ אָכַלְתִּי יוֹגוּרְט עִם דְּבַשׁ, אֱגוֹזִים וְחֲתִיכוֹת בָּנָנָה.
תּוֹךְ כְּדֵי הָאֲרוּחָה הִרְגַּשְׁתִּי שֶׁהַגּוּף שֶׁלִּי מְקַבֵּל בְּדִיּוּק מַה שֶּׁהוּא צָרִיךְ.
הַבֶּטֶן הִתְמַלְּאָה לְאַט, וְהָאֵנֶרְגְּיָה חָזְרָה אֵלַי.
אַחֲרֵי הָאֲרוּחָה, נִשְׁכַּבְתִּי עַל הַסַּפָּה וְעָצַמְתִּי אֶת הָעֵינַיִם לְכַמָּה דַּקּוֹת.
חָשַׁבְתִּי לְעַצְמִי: לְטַפֵּל בַּגּוּף וְלֶאֱכֹל טוֹב זֶה אֶחָד הָעוֹנֶג הָאֲמִתִּי שֶׁל הַחַיִּים.`,
    french: `Après une semaine chargée au travail, j'ai décidé d'aller à la salle de sport samedi matin.
Je me suis entraîné pendant presque une heure, et à la fin de l'entraînement mes jambes me faisaient très mal.
Mon dos était contracté et mes épaules me semblaient lourdes.
J'ai pris une longue douche, et l'eau chaude a détendu mes muscles.
Ensuite, j'ai ressenti une faim terrible, et j'ai décidé de me préparer un déjeuner sain.
J'ai ouvert le réfrigérateur et j'ai trouvé des légumes frais : tomates, concombres, carottes et poivron rouge.
J'ai préparé une grande salade avec de l'huile d'olive, du jus de citron et un peu de sel.
À côté, j'ai fait une omelette aux oignons et au fromage jaune.
Je n'avais pas de pain frais, alors j'ai grillé deux tranches de pain complet au grille-pain.
J'ai bu un grand verre d'eau à la menthe, car j'avais très soif.
En dessert, j'ai mangé un yaourt avec du miel, des noix et des morceaux de banane.
Pendant le repas, j'ai senti que mon corps recevait exactement ce dont il avait besoin.
Mon ventre s'est rempli lentement, et l'énergie est revenue.
Après le repas, je me suis allongé sur le canapé et j'ai fermé les yeux quelques minutes.
Je me suis dit : prendre soin de son corps et bien manger, c'est l'un des vrais plaisirs de la vie.`,
    language: 'hebrew',
  },
  {
    id: 'emotions-1',
    title: 'Émotions',
    theme: 'Émotions',
    hebrew: `הַיּוֹם הָיָה יוֹם מְיֻחָד מְאוֹד בִּשְׁבִילִי.
בַּבֹּקֶר הִתְעוֹרַרְתִּי וְהָיִיתִי שָׂמֵחַ מְאוֹד כִּי הַשֶּׁמֶשׁ זָרְחָה.
אֲבָל אַחֲרֵי כֵן, אִמָּא שֶׁלִּי אָמְרָה לִי שֶׁהַכֶּלֶב שֶׁלָּנוּ חוֹלֶה, וְהִרְגַּשְׁתִּי עָצוּב.
בְּבֵית הַסֵּפֶר, הַמּוֹרָה נָתְנָה לִי מִבְחָן קָשֶׁה וְהָיִיתִי מְפֻחָד.
חָבֵר שֶׁלִּי רָאָה אוֹתִי וְשָׁאַל: "אַתָּה בְּסֵדֶר? אַתָּה נִרְאֶה דּוֹאֵג."
עָנִיתִי לוֹ שֶׁאֲנִי לָחוּץ מְאוֹד.
הוּא חִיֵּךְ וְאָמַר לִי מִלִּים יָפוֹת, וְהִתְחַלְתִּי לְהַרְגִּישׁ יוֹתֵר טוֹב.
אַחֲרֵי הַמִּבְחָן, הָיִיתִי גֵּאֶה כִּי הִצְלַחְתִּי לַעֲנוֹת עַל כָּל הַשְּׁאֵלוֹת.
בַּהַפְסָקָה, יֶלֶד אֶחָד צָחַק עָלַי וְהִרְגַּשְׁתִּי כַּעַס גָּדוֹל.
נָשַׁמְתִּי עָמֹק וְנִרְגַּעְתִּי.
כְּשֶׁחָזַרְתִּי הַבַּיְתָה, גִּלִּיתִי שֶׁהַכֶּלֶב מַרְגִּישׁ יוֹתֵר טוֹב, וְהָיִיתִי מַמָּשׁ מְאֻשָּׁר.
אִמָּא חִבְּקָה אוֹתִי וְאָמְרָה: "אֲנִי אוֹהֶבֶת אוֹתְךָ."
הִרְגַּשְׁתִּי אָהוּב וּבָטוּחַ.
בָּעֶרֶב, חָשַׁבְתִּי עַל הַיּוֹם וְהֵבַנְתִּי שֶׁהַחַיִּים מְלֵאִים בְּרְגָשׁוֹת שׁוֹנִים.
לִפְעָמִים אֲנַחְנוּ עֲצוּבִים, וְלִפְעָמִים שְׂמֵחִים, וְזֶה בְּסֵדֶר גָּמוּר.`,
    french: `Aujourd'hui était une journée très spéciale pour moi.
Le matin, je me suis réveillé et j'étais très heureux parce que le soleil brillait.
Mais ensuite, ma mère m'a dit que notre chien était malade, et je me suis senti triste.
À l'école, la maîtresse m'a donné un examen difficile et j'avais peur.
Mon ami m'a vu et m'a demandé : « Tu vas bien ? Tu as l'air inquiet. »
Je lui ai répondu que j'étais très stressé.
Il a souri et m'a dit de belles paroles, et j'ai commencé à me sentir mieux.
Après l'examen, j'étais fier parce que j'avais réussi à répondre à toutes les questions.
Pendant la récréation, un enfant s'est moqué de moi et j'ai ressenti une grande colère.
J'ai respiré profondément et je me suis calmé.
Quand je suis rentré à la maison, j'ai découvert que le chien allait mieux, et j'étais vraiment ravi.
Maman m'a serré dans ses bras et m'a dit : « Je t'aime. »
Je me suis senti aimé et en sécurité.
Le soir, j'ai repensé à la journée et j'ai compris que la vie est pleine d'émotions différentes.
Parfois nous sommes tristes, parfois joyeux, et c'est tout à fait normal.`,
    language: 'hebrew',
  },
  {
    id: 'family-dinner-1',
    title: 'La famille et la maison : Le dîner du vendredi soir',
    theme: 'La famille et la maison',
    hebrew: `יוֹם שִׁשִּׁי בָּעֶרֶב הוּא הַזְּמַן הָאָהוּב עָלַי בַּשָּׁבוּעַ.
כָּל הַמִּשְׁפָּחָה מִתְאַסֶּפֶת בַּבַּיִת שֶׁל סָבְתָא וְסַבָּא.
אִמָּא נִכְנֶסֶת לַמִּטְבָּח וּמְבַשֶּׁלֶת מָרָק עוֹף עִם יְרָקוֹת.
אַבָּא מְסַדֵּר אֶת הַשֻּׁלְחָן בַּסָּלוֹן עִם מַפָּה לְבָנָה וְנֵרוֹת.
אֲחוֹתִי הַקְּטַנָּה רָצָה בַּמִּסְדְּרוֹן וְצוֹחֶקֶת.
אָחִי הַגָּדוֹל יוֹשֵׁב עַל הַסַּפָּה וְקוֹרֵא סֵפֶר.
סָבְתָא שׁוֹאֶלֶת אוֹתִי: "אֵיךְ הָיָה הַשָּׁבוּעַ שֶׁלְּךָ בְּבֵית הַסֵּפֶר?"
אֲנִי עוֹנֶה: "טוֹב מְאוֹד, סָבְתָא, לָמַדְתִּי דְּבָרִים חֲדָשִׁים."
סַבָּא נִכְנָס לַחֲדַר הָאֹכֶל וְאוֹמֵר: "בּוֹאוּ לֶאֱכֹל, הָאֹכֶל מוּכָן!"
כֻּלָּנוּ יוֹשְׁבִים סְבִיב הַשֻּׁלְחָן.
עַל הַשֻּׁלְחָן יֵשׁ לֶחֶם טָרִי, סָלָט, דָּגִים וְיַיִן.
דּוֹדָה שָׂרָה מְסַפֶּרֶת סִפּוּר עַל הַיַּלְדוּת שֶׁלָּהּ.
הַדּוֹד דָּוִד מְצַחֵק אֶת כֻּלָּם עִם הַבְּדִיחוֹת שֶׁלּוֹ.
בֶּן הַדּוֹד שֶׁלִּי מַרְאֶה לִי מִשְׂחָק חָדָשׁ בַּטֵּלֵפוֹן.
אַחֲרֵי הָאֹכֶל, אִמָּא וְדוֹדָה שׁוֹטְפוֹת אֶת הַכֵּלִים בַּמִּטְבָּח.
הָאֲנָשִׁים שֶׁאֲנִי הֲכִי אוֹהֵב נִמְצָאִים כֻּלָּם בְּחֶדֶר אֶחָד, וְזֶה הָאֹשֶׁר הָאֲמִתִּי.`,
    french: `Le vendredi soir est mon moment préféré de la semaine.
Toute la famille se réunit dans la maison de grand-mère et grand-père.
Maman entre dans la cuisine et prépare une soupe de poulet aux légumes.
Papa met la table dans le salon avec une nappe blanche et des bougies.
Ma petite sœur court dans le couloir et rit.
Mon grand frère est assis sur le canapé et lit un livre.
Grand-mère me demande : « Comment s'est passée ta semaine à l'école ? »
Je réponds : « Très bien, grand-mère, j'ai appris des choses nouvelles. »
Grand-père entre dans la salle à manger et dit : « Venez manger, le repas est prêt ! »
Nous nous asseyons tous autour de la table.
Sur la table il y a du pain frais, de la salade, du poisson et du vin.
Tante Sarah raconte une histoire de son enfance.
L'oncle David fait rire tout le monde avec ses blagues.
Mon cousin me montre un nouveau jeu sur le téléphone.
Après le repas, maman et tante font la vaisselle dans la cuisine.
Les gens que j'aime le plus sont tous dans une même pièce, et c'est le vrai bonheur.`,
    language: 'hebrew',
  },
];

export const getReadingTextsByLanguage = (language: string): ReadingText[] => {
  return readingTexts.filter(text => text.language === language);
};
