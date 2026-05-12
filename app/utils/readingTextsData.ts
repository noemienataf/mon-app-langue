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
];

export const getReadingTextsByLanguage = (language: string): ReadingText[] => {
  return readingTexts.filter(text => text.language === language);
};
