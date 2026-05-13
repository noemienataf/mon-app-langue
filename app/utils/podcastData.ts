export interface PodcastEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  description: string;
  hebrew: string;
  french: string;
  spotifyEpisodeId: string;
  spotifyLink: string;
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
    spotifyLink: 'https://open.spotify.com/episode/5bo1jbf7Hp28CbMeAZP9rY?si=c9247e87256a439c',
    language: 'hebrew',
    duration: '10 min'
  }
];

  {
    id: 'episode-02',
    episodeNumber: 2,
    title: 'Comment la crise du coronavirus a changé ma vie',
    description: 'Nadya raconte comment la pandémie de COVID-19 a transformé son parcours professionnel et l\'a inspirée à devenir professeur d\'hébreu.',
    hebrew: `שלום לכולם, וברוכים הבאים לפרק השני של הפודקאסט זמן עברית, פודקאסט לתלמידי עברית ברמה בינונית. לי קוראים נדיה, ובפרק הזה אני אספר לכם איך משבר הקורונה השפיע על החיים שלי. מוכנים? בואו נתחיל!

אז כמו שכולכם יודעים כמובן, השנה הזאת שינתה להרבה מאוד אנשים את התכניות לעתיד. כשאני אומרת שנה, אני מתכוונת ממרץ של שנת 2020. אז, בתחילת מרץ, התחילו בישראל לדבר על נגיף הקורונה. נגיף, זו המילה העברית לוירוס. מהר מאוד אנשים הבינו שזה משהו רציני ומסוכן ומקומות עבודה התחילו להיסגר. בהתחלה נסגרו המלונות, אחר כך המסעדות ובסוף החנויות, בתי הספר והמשרדים.

הרבה מאוד אנשים הפסיקו לעבוד וכולם נכנסו לסגר. סגר זה המצב שבו אנשים צריכים לשבת בבית ואסור להם לצאת החוצה, חוץ מאשר לקניות בסופר או טיול קצר עם הכלב. בעקבות זאת, הרבה אנשים נאלצו להתחיל לחיות בצורה אחרת. הרבה אנשים התחילו לחשוב מחדש על החיים שלהם, לזנוח תכניות ישנות ולחשוב על דברים חדשים שהם יכולים לעשות. וזה מה שקרה גם במקרה שלי.

בשנים שלפני הקורונה, למדתי באוניברסיטה. עשיתי תואר ראשון, זאת אומרת B.A. תואר ראשון נקרא ככה כי זה הדבר הראשון שאפשר ללמוד באוניברסיטה. אני למדתי ריפוי בעיסוק. ריפוי בעיסוק הוא מקצוע טיפולי, זאת אומרת שמרפאה בעיסוק עובדת עם אנשים שיש להם בעיה כלשהי. המטרה של הטיפול היא לעזור לאדם עם הבעיה לעשות דברים שחשובים לו בחיים. זה יכול להיות משהו פיזי או משהו מנטלי. לדוגמא: אם יש אישה מובגרת שנפלה ושברה את הרגל, אז המרפאה בעיסוק תעזור לה להבין איך הכי טוב להתלבש או להתקלח. היא תבדוק ביחד עם האישה מה היא יכולה לעשות ומה קשה לה ואיך אפשר לעזור לה. זו הגרסה העברית למקצוע "occupational therapy". כשלמדתי באוניברסיטה חשבתי שזה יהיה המקצוע שבו אעבוד אחרי סיום הלימודים.

חוץ מזה בישראל, רוב הסטודנטים עובדים בזמן הלימודים שלהם כדי לממן את החיים שלהם: זאת אומרת לשלם על דירה, על אוכל, על כל ההוצאות היום-יומיות. אז בזמן הלימודים אני עבדתי בבית מלון. בית מלון הוא המקום שבו אנשים ישנים כשהם יוצאים לחופשה בעיר או במדינה אחרת. כאשר רוב האנשים שומעים את המילה מלון הם מדמיינים בניין גדול עם הרבה מאוד חדרים, חדר אוכל גדול והרבה עובדים. אבל המלון שאני עבדתי בו היה מלון בוטיק, כלומר, מלון קטן. במלון הזה היו בערך שלושים חדרים. אני עבדתי בקבלה, שזה המקום בכניסה למלון שבו מקבלים את המפתח לחדר.

אחרי שסיימתי את הלימודים בפברואר 2020, החלטתי להמשיך לעבוד קצת במלון, אבל זה לא נמשך הרבה זמן: בערך חודש לאחר מכן הגיעה הקורונה. המלון נסגר באופן זמני, ואני נשארתי בבית. בחודשים הראשונים, כמו רוב האנשים, חיכיתי שהתקופה הזמנית תסתיים ויהיה אפשרי לחזור לעבודה. אבל כמו שאתם יודעים, המצב לא השתפר בהרבה מאז. המלון שעבדתי בו לא נפתח עד היום.

בזמן שישבתי בבית עשיתי הרבה דברים נחמדים: קראתי, ראיתי סרטים וגם המשכתי ללמוד גרמנית וצרפתית. במהלך הזמן הזה הכרתי אתר שנקרא italki. זה אתר שיש בו תלמידים ומורים לשפות שונות. התלמידים יכולים להזמין שיעור אונליין עם אחד המורים. הרבה אנשים משתמשים באתר הזה כדי לתרגל שיחה: זאת אומרת הם פשוט מדברים עם המורים שלהם על דברים שמעניינים אותם. המורים מקשיבים, מתקנים טעויות ועוזרים לתלמידים שלהם לדבר טוב יותר. אז בזמן הסגר התחלתי לקחת שיעורים ב Italki וזה היה מצוין. לכן, אחרי תקופה מסויימת החלטתי לנסות בעצמי לעבוד בתור מורה לעברית ב-italki, וזה מה שאני עושה עד היום.

זו אחת הסיבות שהתחלתי לעשות את הפודקאסט הזה. בתור מורה, ראיתי איך לסטודנטים שלי אין מספיק מקורות טובים ללמוד מהם. רוב חומרי הלימוד כתובים בשפה מיושנת, שלא רלוונטית לעברית מודרנית, ומשתמשים בשיטות לא מספיק מעניינות להוראה. מצד שני, המדיה הישראלית, שבה מדברים בעברית עכשווית, היא קשה מדי להבנה לתלמידי עברית ברמה בינונית. ראיתי גם שאין הרבה פודקאסטים או סרטונים שמתאימים לתלמידים האלה, שרוצים לשפר את ההבנה שלהם, אז החלטתי לנסות לעשות משהו כזה בעצמי.

אז, כמו שסיפרתי לכם בהתחלה, לפני משבר הקורונה למדתי ריפוי בעיסוק ועבדתי במלון. בתקופה הזאת, חשבתי שזה מה שאמשיך לעשות גם בשנים הבאות. עכשיו אני כבר לא כל כך בטוחה בזה. גיליתי שאני מאוד נהנית ללמד אנשים עברית ובינתיים אני רוצה להמשיך לעשות את זה.

ומה לגביכם? איך הקורונה שינתה את החיים שלכם? אני מזמינה אתכם לכתוב את הסיפור שלכם ולשלוח לי אותו דרך אתר האינטרנט של הפודקאסט. הלינק לאתר האינטרנט נמצא בתיאור של הפרק. זה הכל לפרק הזה. תודה רבה שהקשבתם, ונשתמע בפעם הבאה. יאללה ביי!`,
    french: `Bonjour à tous, et bienvenue au deuxième épisode du podcast Hebrew Time, un podcast pour les étudiants en hébreu de niveau intermédiaire. Je m'appelle Nadya, et dans cet épisode, je vais vous parler de comment la crise du coronavirus a affecté ma vie. Vous êtes prêts ? Allons-y !

Alors, comme vous le savez bien sûr, cette année a changé les plans pour beaucoup de gens. Quand je dis « cette année », je veux dire depuis mars 2020. Donc, au début de mars, on a commencé à parler en Israël du virus du coronavirus. Un virus, c'est le mot hébreu pour virus. Très rapidement, les gens ont compris que c'était quelque chose de grave et de dangereux, et les lieux de travail ont commencé à fermer. D'abord, les hôtels ont fermé, puis les restaurants, et finalement les magasins, les écoles et les bureaux.

Beaucoup de gens ont arrêté de travailler et tout le monde est entré en confinement. Le confinement, c'est la situation où les gens doivent rester à la maison et n'ont pas le droit de sortir, sauf pour faire des courses au supermarché ou une courte promenade avec le chien. En conséquence, beaucoup de gens ont dû commencer à vivre différemment. Beaucoup de gens ont commencé à repenser leur vie, à abandonner les anciens plans et à penser à de nouvelles choses qu'ils pourraient faire. Et c'est ce qui m'est aussi arrivé.

Dans les années avant le coronavirus, j'étudiais à l'université. J'ai obtenu un diplôme de premier cycle, c'est-à-dire un B.A. Un diplôme de premier cycle s'appelle comme ça parce que c'est la première chose qu'on peut étudier à l'université. J'ai étudié l'ergothérapie. L'ergothérapie est une profession thérapeutique, c'est-à-dire qu'un ergothérapeute travaille avec des gens qui ont un problème quelconque. L'objectif du traitement est d'aider la personne avec le problème à faire des choses qui sont importantes pour elle dans sa vie. Cela peut être quelque chose de physique ou quelque chose de mental. Par exemple : si une femme adulte tombe et se casse la jambe, alors l'ergothérapeute l'aidera à comprendre comment mieux s'habiller ou prendre une douche. Elle vérifierait avec la femme ce qu'elle peut faire et ce qui est difficile pour elle, et comment on peut l'aider. C'est la version française de la profession « occupational therapy ». Quand j'étudiais à l'université, je pensais que ce serait la profession dans laquelle je travaillerais après mes études.

De plus, en Israël, la plupart des étudiants travaillent pendant leurs études pour financer leur vie : c'est-à-dire payer un appartement, de la nourriture, toutes les dépenses quotidiennes. Alors pendant mes études, j'ai travaillé dans un hôtel. Un hôtel est l'endroit où les gens dorment quand ils sortent en vacances dans une autre ville ou un autre pays. Quand la plupart des gens entendent le mot hôtel, ils imaginent un grand bâtiment avec beaucoup de chambres, une grande salle à manger et beaucoup d'employés. Mais l'hôtel où j'ai travaillé était un hôtel-boutique, c'est-à-dire un petit hôtel. Cet hôtel avait environ trente chambres. J'ai travaillé à la réception, c'est l'endroit à l'entrée de l'hôtel où on reçoit la clé de la chambre.

Après avoir terminé mes études en février 2020, j'ai décidé de continuer à travailler un peu à l'hôtel, mais cela n'a pas duré longtemps : environ un mois plus tard, le coronavirus est arrivé. L'hôtel a fermé temporairement, et je me suis retrouvée à la maison. Au cours des premiers mois, comme la plupart des gens, j'attendais que la période temporaire se termine et qu'il soit possible de retourner au travail. Mais comme vous le savez, la situation ne s'est pas beaucoup améliorée depuis. L'hôtel où j'ai travaillé n'a pas rouvert jusqu'à aujourd'hui.

Pendant que j'étais à la maison, j'ai fait beaucoup de choses sympas : j'ai lu, regardé des films et j'ai aussi continué à apprendre l'allemand et le français. Pendant cette période, j'ai découvert un site appelé Italki. C'est un site où il y a des étudiants et des professeurs pour différentes langues. Les étudiants peuvent réserver une leçon en ligne avec l'un des professeurs. Beaucoup de gens utilisent ce site pour pratiquer la conversation : c'est-à-dire qu'ils parlent simplement avec leurs professeurs de choses qui les intéressent. Les professeurs écoutent, corrigent les erreurs et aident leurs étudiants à mieux parler. Donc pendant le confinement, j'ai commencé à prendre des cours sur Italki et c'était excellent. Par conséquent, après une certaine période, j'ai décidé d'essayer moi-même de travailler comme professeur d'hébreu sur Italki, et c'est ce que je fais jusqu'à aujourd'hui.

C'est l'une des raisons pour lesquelles j'ai commencé à faire ce podcast. En tant que professeur, j'ai vu comment mes étudiants n'avaient pas assez de bonnes ressources pour apprendre. La plupart du matériel d'enseignement est écrit dans une langue dépassée, qui n'est pas pertinente pour l'hébreu moderne, et utilise des méthodes insuffisamment intéressantes pour l'enseignement. D'un autre côté, les médias israéliens, où on parle l'hébreu contemporain, sont trop difficiles à comprendre pour les étudiants en hébreu de niveau intermédiaire. J'ai aussi vu qu'il n'y a pas beaucoup de podcasts ou de vidéos qui conviennent à ces étudiants, qui veulent améliorer leur compréhension, alors j'ai décidé d'essayer de faire quelque chose comme ça moi-même.

Donc, comme je vous l'ai raconté au début, avant la crise du coronavirus, j'étudiais l'ergothérapie et je travaillais dans un hôtel. Pendant cette période, je pensais que c'est ce que je continuerais à faire au cours des années suivantes. Maintenant, je ne suis plus si sûre de cela. J'ai découvert que j'aime beaucoup enseigner l'hébreu aux gens et pour l'instant, je veux continuer à le faire.

Et vous ? Comment le coronavirus a-t-il changé votre vie ? Je vous invite à écrire votre histoire et à me l'envoyer via le site Internet du podcast. Le lien vers le site Internet se trouve dans la description de l'épisode. C'est tout pour cet épisode. Merci beaucoup de m'avoir écoutée, et on se reparle la prochaine fois. À bientôt !`,
    spotifyEpisodeId: '3vkPFd0kcxNHizl3q34JKV',
    spotifyLink: 'https://open.spotify.com/episode/3vkPFd0kcxNHizl3q34JKV?si=1bb5a99f06f44eb3',
    language: 'hebrew',
    duration: '18 min'
  }
];

export const getPodcastsByLanguage = (language: string): PodcastEpisode[] => {
  return podcastEpisodes.filter((episode) => episode.language === language);
};
