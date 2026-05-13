export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  description: string;
  hebrew: string;
  french: string;
  spotifyEpisodeId: string;
  language: string;
  duration: string;
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'episode-01',
    episodeNumber: 1,
    title: 'Bienvenue dans Hebrew Time',
    description: 'Présentation du podcast et de Nadya. Introduction à la théorie d\'acquisition des langues de Stephen Krashen.',
    hebrew: `היי, שלום לכולם, וברוכים הבאים לפרק הראשון של הפודקאסט ״זמן עברית״. בפרק הזה אני אספר לכם קצת על עצמי ועל הפרויקט הזה. מוכנים? בואו נתחיל!
אז, קוראים לי נדיה, אני בת 25 ואני גרה בישראל. בעיר תל אביב שאותה אני בטוחה שאתם מכירים.

בפודקאסט הזה, כל שבוע יצא פרק באורך של בערך עשר דקות. בכל פרק אני אספר לכם על נושא מסוים בעברית מדוברת. עברית מדוברת זו העברית שישראלים מדברים באמת. בבית, ברחוב, בעבודה, עם חברים או עם המשפחה. אני אדבר קצת יותר לאט מאיך שישראלים מדברים ביניהם, כדי שאתם תוכלו להבין אותי בקלות.

יכול להיות שבעתיד הפרקים יהיו ארוכים יותר. אבל אני חושבת שבשביל ההתחלה, עשר דקות לפרק זה מספיק.

אז למי הפודקאסט הזה בעצם מתאים? אני יוצרת את הפודקאסט הזה בשביל אנשים שלומדים עברית ורוצים לשפר את היכולת שלהם להבין עברית, בעזרת שמיעה וקריאה. זאת אומרת שאם אתם כבר יכולים להבין ולקרוא בעברית, אבל עדיין קשה לכם לשמוע פודקאסטים רגילים, שדוברי העברית שומעים – אז הפודקאסט הזה הוא בדיוק בשבילכם.

לכל פרק של הפודקאסט יהיה תמליל. משמעות המילה תמליל בעברית היא טראנסקריפט. כלומר, הטקסט שאותו אני אומרת במהלך הפרק. את הטראנסקריפט אתם תוכלו למצוא באתר האינטרנט של הפודקאסט. את הקישור לאתר האינטרנט, אני אוסיף בתיאור של הפרק.

כדי ללמוד עברית בעזרת הפודקאסט הזה, אפשר לעשות כל מיני דברים. אני חושבת שהדרך הטובה ביותר היא קודם כל לשמוע את הפרק ולראות כמה אתם מצליחים להבין. אחר כך לקרוא את התמליל, את הטראנסקריפט, ולתרגם מילים קשות אם יש כאלה. ואחרי זה שוב לשמוע את הפרק.

אבל כמובן, שלא כולם חייבים לעשות את זה. כל אחד צריך למצוא את הדרך הכי נוחה, הכי מתאימה והכי מעניינת בשבילו כדי ללמוד. יכול להיות שתחליטו להקשיב לפודקאסט ולקרוא את הטראנסקריפט באותו הזמן. יכול להיות שאתם תרצו קודם כל לקרוא ורק אחר כך להקשיב. ויכול להיות שתרצו רק לשמוע את הפודקאסט, בלי לקרוא בכלל. כל אחד ומה שמתאים לו.

החלטתי לעשות את הפרויקט הזה כי אני חושבת שלמידת שפה צריכה להיות מעניינת. כי בשביל ללמוד שפה, כדאי מאוד ללמוד כל יום. ואם הלמידה היא לא מעניינת, אז קשה מאוד ללמוד כל יום. הרבה אנשים מתחילים ללמוד שפה: הם קונים ספר לימוד חדש, הם לומדים מילים והרבה מאוד חוקי דקדוק, אבל אם זה לא מעניין אותם, אז אחרי כמה זמן (אחרי פרק זמן מסוים) אין להם מוטיבציה והם פשוט מפסיקים ללמוד.

מצד השני, אם כיף לכם ללמוד, אז בכלל לא יהיה לכם קשה ללמוד קצת כל יום. אם אתם לומדים עם מורה טוב או מורה טובה, או (אם) אתם קוראים דברים מעניינים בעברית, (אם) אתם רואים סרטים או שומעים מוזיקה אז יהיה לכם מעניין ללמוד ותעשו את זה כל יום.

אני בעצמי אוהבת ללמוד שפות חדשות. אני מדברת עברית, רוסית ואנגלית, ועכשיו אני לומדת גרמנית, צרפתית ויפנית. בשביל ללמוד את השפות האלה אני שומעת בפודקסטים, רואה סרטונים ביוטיוב, קוראת כתבות בעיתון או בלוגים על דברים שמעניינים אותי. ככה אני לומדת קצת כל יום.

בנוסף לזה, הדרך הכי אפיקטיבית ללמוד שפה היא לצרוך תוכן מובן בשפה הזאת. זאת אומרת, לשמוע, לראות ולקרוא כמה שיותר דברים בעברית שאתם יכולים להבין.
אני לא זאת שחשבה על הרעיון הזה. מי שחשב על זה וחקר את זה היה אדם בשם סטיבן קראשן, שהיה פרופסור מפורסם לבלשנות באוניברסיטת דרום-קליפורניה, בארצות הברית. סטיבן קראשן פיתח תיאוריה מעניינת לגבי למידת שפות זרות. הוא בעצם רצה להבין, מה לאנשים מבוגרים הכי כדאי לעשות כשהם רוצים ללמוד שפה שנייה. כלומר, שפה שאותה הם לא למדו כשהם היו ילדים קטנים. על התיאוריה הזאת אני רוצה לספר לכם בקצרה היום בפרק.

הפרופ׳ סטיבן קראשן אמר שבלמידת שפה שנייה, הדבר הכי חשוב הוא להיות חשופים כמה שיותר לשפה החדשה. זאת אומרת, כמו שכבר אמרתי, לשמוע ולקרוא הרבה מאוד דברים בעברית.

חוץ מזה, לפי פרופסור קראשן, כשאתם שומעים או קוראים משהו בעברית, הדבר הכי חשוב הוא לשים לב לתוכן יותר באופן כללי, מאשר לפרטים הקטנים, כמו מילים ספציפיות או חוקי דקדוק. זאת אומרת שיותר חשוב לנסות להבין מה הסיפור, מה הנושא של מה שאתם שומעים או קוראים, גם אם אתם לא מצליחים להבין את כל המילים בנפרד.

חוץ מזה, פרופ׳ קראשן אמר שהתוכן לא צריך להיות פשוט מדי. כלומר, לא כזה שאתם מבינים ממש בקלות, בלי להתאמץ בכלל. עדיף שזה יהיה משהו שהוא קצת מעל הרמה שלכם עכשיו. אם אתם מצליחים להבין מעל חמישים אחוז, כלומר, יותר מחצי ממה שאתם שומעים או קוראים, זה מצוין.

לפי סטיבן קראשן, למידה פעילה של השפה, זאת אומרת למידת המילים וחוקי דקדוק או הצורות השונות של הפועל, היא רק חלק קטן מהתהליך. הדבר החשוב ביותר הוא לשמוע ולקרוא כמה שיותר דברים שונים בעברית שאתם יכולים להבין.

בעצם, זה אפילו די דומה לאופן שבו ילדים לומדים את שפת האם שלהם. ילדים כל הזמן מנסים להבין על מה המבוגרים מדברים, גם אם הם לא יודעים את כל המילים. הם רוצים לדעת מה הסיפור. הם מקשיבים כל הזמן ושואלים הרבה שאלות.

בנוסף לזה, חשוב מאוד שהצריכה של תוכן בעברית תייצר אצלכם חוויה חיובית ולא שלילית. כלומר, זה צריך להיות משהו מעניין וכיפי ולא משעמם או מלחיץ. לפי סטיבן קראשן, מוטיבציה, ביטחון עצמי וחשיבה חיובית כשאתם לומדים עברית עוזרת [עוזרים] מאוד ללמוד באופן אפקטיבי, בזמן שהתחושות השליליות של כעס או שעמום מייצרות מן מחסום רגשי שמפריע לכם ללמוד.

בגלל זה, אני מעודדת אתכם להקשיב לא רק לפודקאסט הזה, אלא ללכת ולמצוא עוד דברים בעברית שמעניינים אתכם. ככה כל יום תוכלו ללמוד קצת ולפתח את היכולת שלכם להבין עברית. כי זאת הדרך הכי טובה ללמוד שפה!

אם התיאוריה של סטיבן קראשן מעניינת אתכם, אני אשאיר לינק למידע נוסף עליה באנגלית. בנוסף, יכול להיות שבפרקים הבאים אני אספר עליה בהרחבה. זה הכל לפרק הזה. אם יש לכם שאלות, בקשות או רעיונות לפודקאסט, אתם יכולים ליצור איתי קשר דרך אתר האינטרנט של הפודקאסט. אני מקווה שנהנתם מהפרק הזה ונשתמע בפעם הבאה. יאללה ביי!`,
    french: `Salut, bonjour à tous, et bienvenue au premier épisode du podcast « Hebrew Time ». Dans cet épisode, je vais vous parler un peu de moi et de ce projet. Vous êtes prêts ? Allons-y !

Donc, je m'appelle Nadya, j'ai 25 ans et j'habite en Israël. Dans la ville de Tel-Aviv que je suis sûre que vous connaissez.

Dans ce podcast, chaque semaine sort un épisode d'environ dix minutes. À chaque épisode, je vous parlerai d'un sujet particulier en hébreu parlé. L'hébreu parlé, c'est l'hébreu que les Israéliens parlent vraiment. À la maison, dans la rue, au travail, avec des amis ou en famille. Je parlerai un peu plus lentement que la façon dont les Israéliens se parlent entre eux, pour que vous puissiez me comprendre facilement.

Il se peut qu'à l'avenir, les épisodes soient plus longs. Mais je pense que pour commencer, dix minutes par épisode, c'est suffisant.

Alors, à qui ce podcast est adapté ? Je crée ce podcast pour les gens qui apprennent l'hébreu et veulent améliorer leur capacité à comprendre l'hébreu, grâce à l'écoute et la lecture. C'est-à-dire que si vous pouvez déjà comprendre et lire l'hébreu, mais que c'est encore difficile pour vous d'écouter des podcasts ordinaires, que les locuteurs d'hébreu écoutent – alors ce podcast est exactement pour vous.

Chaque épisode du podcast aura une transcription. Le mot transcription en hébreu signifie transcript. C'est-à-dire le texte que je dis pendant l'épisode. Vous pourrez trouver la transcription sur le site Internet du podcast. Le lien vers le site Internet, je l'ajouterai dans la description de l'épisode.

Pour apprendre l'hébreu avec ce podcast, vous pouvez faire plein de choses. Je pense que la meilleure façon est d'abord d'écouter l'épisode et de voir combien vous parvenez à comprendre. Ensuite, lisez la transcription et traduisez les mots difficiles s'il y en a. Et après ça, écoutez à nouveau l'épisode.

Mais bien sûr, tout le monde ne doit pas faire ça. Chacun doit trouver la façon la plus confortable, la plus adaptée et la plus intéressante pour lui d'apprendre. Il se peut que vous décidiez d'écouter le podcast et de lire la transcription en même temps. Il se peut que vous vouliez d'abord lire et seulement après écouter. Et il se peut que vous vouliez seulement écouter le podcast, sans lire du tout. Chacun et ce qui lui convient.

J'ai décidé de faire ce projet parce que je pense que l'apprentissage des langues doit être intéressant. Parce que pour apprendre une langue, c'est très utile d'apprendre chaque jour. Et si l'apprentissage n'est pas intéressant, c'est très difficile d'apprendre chaque jour. Beaucoup de gens commencent à apprendre une langue : ils achètent un nouveau livre d'apprentissage, ils apprennent des mots et beaucoup de règles de grammaire, mais si ça ne les intéresse pas, alors après un certain temps (après une période), ils n'ont pas de motivation et ils arrêtent simplement d'apprendre.

D'un autre côté, si vous aimez apprendre, alors ce ne sera pas difficile du tout d'apprendre un peu chaque jour. Si vous apprenez avec un bon professeur ou une bonne professeure, ou si vous lisez des choses intéressantes en hébreu, si vous regardez des films ou écoutez de la musique, alors ce sera intéressant pour vous d'apprendre et vous le ferez chaque jour.

Moi-même, j'aime apprendre de nouvelles langues. Je parle hébreu, russe et anglais, et maintenant j'apprends l'allemand, le français et le japonais. Pour apprendre ces langues, j'écoute des podcasts, je regarde des vidéos sur YouTube, je lis des articles dans les journaux ou sur des blogs sur des choses qui m'intéressent. C'est comme ça que j'apprends un peu chaque jour.

En plus de ça, la façon la plus efficace d'apprendre une langue est de consommer du contenu compréhensible dans cette langue. C'est-à-dire d'écouter, de regarder et de lire autant de choses en hébreu que vous pouvez comprendre.

Ce n'est pas moi qui ai pensé à cette idée. C'est quelqu'un nommé Stephen Krashen qui a pensé à ça et l'a étudié. C'était un professeur célèbre de linguistique à l'Université de Californie du Sud, aux États-Unis. Stephen Krashen a développé une théorie intéressante sur l'apprentissage des langues étrangères. Il voulait en fait comprendre, qu'est-ce qui est le mieux pour les adultes à faire quand ils veulent apprendre une deuxième langue. C'est-à-dire une langue qu'ils n'ont pas apprise quand ils étaient petits. Je veux vous parler brièvement de cette théorie aujourd'hui dans cet épisode.

Le Professeur Stephen Krashen a dit que dans l'apprentissage d'une deuxième langue, la chose la plus importante est d'être exposé autant que possible à la nouvelle langue. C'est-à-dire, comme je l'ai déjà dit, d'écouter et de lire beaucoup de choses en hébreu.

En plus de ça, selon le Professeur Krashen, quand vous écoutez ou lisez quelque chose en hébreu, la chose la plus importante est de faire attention au contenu de manière générale, plutôt qu'aux petits détails, comme des mots spécifiques ou des règles de grammaire. C'est-à-dire qu'il est plus important d'essayer de comprendre quelle est l'histoire, quel est le sujet de ce que vous écoutez ou lisez, même si vous ne parvenez pas à comprendre tous les mots individuellement.

En plus de ça, le Professeur Krashen a dit que le contenu ne doit pas être trop simple. C'est-à-dire pas quelque chose que vous comprenez très facilement, sans faire d'effort du tout. C'est mieux que ce soit quelque chose qui soit un peu au-dessus de votre niveau maintenant. Si vous parvenez à comprendre plus de cinquante pour cent, c'est-à-dire plus de la moitié de ce que vous écoutez ou lisez, c'est excellent.

Selon Stephen Krashen, l'apprentissage actif de la langue, c'est-à-dire l'apprentissage des mots et des règles de grammaire ou les différentes formes du verbe, c'est seulement une petite partie du processus. La chose la plus importante est d'écouter et de lire autant de choses différentes en hébreu que vous pouvez comprendre.

En fait, c'est même assez similaire à la façon dont les enfants apprennent leur langue maternelle. Les enfants essaient tout le temps de comprendre de quoi parlent les adultes, même s'ils ne connaissent pas tous les mots. Ils veulent savoir ce qu'est l'histoire. Ils écoutent tout le temps et posent beaucoup de questions.

En plus de ça, il est très important que la consommation de contenu en hébreu crée chez vous une expérience positive et non négative. C'est-à-dire que ça doit être quelque chose d'intéressant et amusant et non ennuyeux ou stressant. Selon Stephen Krashen, la motivation, la confiance en soi et la pensée positive quand vous apprenez l'hébreu aident beaucoup à apprendre de manière efficace, tandis que les sentiments négatifs de colère ou d'ennui créent un blocage émotionnel qui vous empêche d'apprendre.

Pour cette raison, je vous encourage à écouter non seulement ce podcast, mais aussi à aller trouver d'autres choses en hébreu qui vous intéressent. De cette façon, chaque jour, vous pourrez apprendre un peu et développer votre capacité à comprendre l'hébreu. Parce que c'est la meilleure façon d'apprendre une langue !

Si la théorie de Stephen Krashen vous intéresse, je vais laisser un lien pour plus d'informations à ce sujet en anglais. En plus, il se peut que dans les épisodes suivants, je vous en parle plus en détail. C'est tout pour cet épisode. Si vous avez des questions, des demandes ou des idées pour le podcast, vous pouvez me contacter via le site Internet du podcast. J'espère que vous avez aimé cet épisode et on se reparle la prochaine fois. À bientôt !`,
    spotifyEpisodeId: '5bo1jbf7Hp28CbMeAZP9rY',
    language: 'hebrew',
    duration: '10 min'
  }
];

export const getPodcastsByLanguage = (language: string): PodcastEpisode[] => {
  return podcastEpisodes.filter((episode) => episode.language === language);
};
