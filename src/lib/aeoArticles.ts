import type { AeoArticle } from './seo'

const mads = { name: 'Mads Budolfsen', role: 'AutoMind Hjørring' }

export const kontaktPage: AeoArticle = {
  slug: 'kontakt',
  path: '/kontakt/',
  title: 'Skriv til AutoMind Hjørring',
  description:
    'Skriv til mads@automind.dk om et elbilkursus eller teknisk support. Fortæl, om det gælder et forløb eller en konkret bil.',
  intro:
    'Kontaktsiden er der, I skriver. En mail til mads@automind.dk starter en faglig dialog om værkstedets opgave.',
  kind: 'contact',
  sections: [
    {
      question: 'Hvem skriver jeg til?',
      answer: 'Skriv til Mads Budolfsen på mads@automind.dk.',
      paragraphs: [
        'AutoMind Hjørring tager imod henvendelser om elbilkurser og teknisk support. Den samme adresse gælder begge dele. Skriv i emnelinjen, om mailen handler om et kursus eller en bil, der allerede står på værkstedet.',
      ],
      list: [
        'Navn og værksted',
        'Om det gælder et kursus eller en konkret bil',
        'Hvad I allerede ved om opgaven',
      ],
    },
    {
      question: 'Hvad skal mailen indeholde, når det er et kursus?',
      answer: 'Skriv, hvad værkstedet vil blive bedre til.',
      paragraphs: [
        'Dato og pris står ikke som en fast liste. De aftales i dialogen, sammen med forløb og indhold. Fortæl, hvilke mekanikere der skal med, og om I vil i gang med højvolt, BMS, diagnostik eller PicoScope.',
      ],
    },
    {
      question: 'Hvad skal mailen indeholde, når det er support?',
      answer: 'Beskriv symptomerne og den fejlfinding, I allerede har lavet.',
      paragraphs: [
        'Support handler om den bil, I står med. En fejlkode er et spor. Næste skridt bliver tydeligere, når mailen også har jeres observationer og det, I er i tvivl om.',
      ],
      list: [
        'Bilens symptomer',
        'Fejlkoder som spor, ikke som facit',
        'Hvad I har målt eller prøvet',
        'Det næste skridt, I er i tvivl om',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'En henvendelse starter med en faglig dialog om værkstedets opgave. Det kan være et kursus, I vil høre nærmere om, eller en elbil der driller.',
  },
  faq: [
    {
      question: 'Skriver jeg til den samme adresse om kursus og support?',
      answer:
        'Ja. Skriv til mads@automind.dk. Skriv i emnelinjen, om det gælder et kursus eller en konkret opgave.',
    },
    {
      question: 'Står datoer og priser på siden?',
      answer: 'Nej. Aktuelle forløb, datoer og priser aftales i dialogen. De står ikke som en fast liste.',
    },
    {
      question: 'Kan jeg skrive om både et kursus og en bil, der driller?',
      answer: 'Ja. Beskriv begge dele, så samtalen kan starte der, hvor værkstedet har brug for hjælp.',
    },
  ],
  links: [
    { href: '/emner/kontakt/', label: 'Sådan foregår tilmelding og en support-henvendelse' },
    { href: '/kurser/', label: 'Se elbilkurserne' },
    { href: '/teknisk-support/', label: 'Læs om teknisk support' },
  ],
}

export const supportPage: AeoArticle = {
  slug: 'teknisk-support',
  path: '/teknisk-support/',
  title: 'Teknisk support til værksteder',
  description:
    'Teknisk support fra AutoMind Hjørring er faglig sparring, når elbilen kræver mere end en fejlkode. Samtalen starter i symptomer og den fejlfinding, I allerede har gjort.',
  intro:
    'Når elbilen kræver mere end en fejlkode, er teknisk support faglig sparring til værkstedet. Den handler om den sag, I står med nu.',
  kind: 'service',
  sections: [
    {
      question: 'Hvad er teknisk support hos AutoMind Hjørring?',
      answer: 'Teknisk support er faglig sparring, når elbilen kræver mere end en fejlkode.',
      paragraphs: [
        'Den er til værksteder, der arbejder med elbiler. Samtalen tager fat i elbilens systemer, diagnostik og den fejlfinding, der allerede er gjort. Formålet er et tydeligt næste skridt, ikke at gentage en fejlkode.',
      ],
    },
    {
      question: 'Hvordan går en sag fra symptomer til næste skridt?',
      answer: 'Samtalen starter i symptomer, observationer og det, værkstedet allerede har prøvet.',
      paragraphs: [
        'Derfra lægges det næste skridt. Supporten erstatter ikke værkstedets egen fejlfinding. Den bruger det, I allerede ved, så den næste kontrol kan be- eller afkræfte sporet.',
      ],
      list: [
        'Symptomet, som bilen viser det',
        'Jeres observationer',
        'Det, I allerede har prøvet',
        'Det, I er i tvivl om',
      ],
    },
    {
      question: 'Hvordan ser en typisk sag ud?',
      answer: 'En typisk sag er en elbil, der afbryder ladningen, hvor fejlkoden peger på ladesystemet.',
      paragraphs: [
        'Batteristyringen kan være en del af samme sag. Sparringen bruges til at skille de to spor ad, før næste måling lægges. Eksemplet er anonymt. Det beskriver opgavens type, ikke et navngivet værksted og ikke et resultat.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'En fejlkode er et spor, ikke hele svaret. Næste skridt kommer af symptomer, observationer og det, værkstedet allerede har prøvet.',
  },
  faq: [
    {
      question: 'Erstatter supporten værkstedets egen fejlfinding?',
      answer: 'Nej. Den tager udgangspunkt i det, I allerede har gjort, og hjælper med næste skridt.',
    },
    {
      question: 'Hvad skal jeg have klar?',
      answer: 'Symptomer, observationer og den fejlfinding, der allerede er udført.',
    },
    {
      question: 'Er support det samme som et kursus?',
      answer:
        'Nej. Kurset giver viden, I kan bruge på den næste opgave. Supporten handler om den sag, I står med nu.',
    },
  ],
  links: [
    { href: '/emner/teknisk-support/', label: 'Læs emnet om teknisk support' },
    { href: '/kontakt/', label: 'Skriv om en konkret sag' },
    { href: '/guides/fra-fejlkode-til-naeste-skridt/', label: 'Fra fejlkode til næste skridt' },
  ],
}

export const kontaktTopic: AeoArticle = {
  slug: 'kontakt',
  path: '/emner/kontakt/',
  title: 'Tilmelding og support-henvendelse',
  description:
    'Tilmelding hos AutoMind Hjørring handler om et kursusforløb. En support-henvendelse handler om den elbil, der allerede står på værkstedet.',
  intro:
    'Der er to slags henvendelser. Den ene gælder et kursus. Den anden gælder en bil, I allerede arbejder på.',
  kind: 'topic',
  sections: [
    {
      question: 'Hvad er forskellen på tilmelding og en support-henvendelse?',
      answer: 'Tilmelding handler om et kursusforløb. En support-henvendelse handler om en konkret elbil.',
      paragraphs: [
        'Kurset er til mekanikerne, der skal blive bedre til elbiler. Supporten er til den sag, der driller nu. Begge starter med en mail, men indholdet i mailen er ikke det samme.',
      ],
      list: [
        'Kursus: hvem skal med, og hvad I vil blive bedre til',
        'Support: symptomer, observationer og det, I har prøvet',
        'Begge dele: skriv til mads@automind.dk',
      ],
    },
    {
      question: 'Hvordan foregår tilmelding til et kursus?',
      answer: 'I skriver, hvad I vil blive bedre til, og AutoMind lægger forløbet efter det.',
      paragraphs: [
        'Niveau, ønsker og hvilke mekanikere der skal med, hører med i samtalen. Dato og pris aftales der. De står ikke som en fast liste på siden. Invitation til det aktuelle PicoScope-kursus ligger på siden med kommende kurser.',
      ],
    },
    {
      question: 'Hvordan starter en sag om teknisk support?',
      answer: 'I beskriver symptomer, observationer og den fejlfinding, der allerede er gjort.',
      paragraphs: [
        'Målet er et tydeligt næste skridt på den sag. Skriv det, I allerede har udelukket, så dialogen ikke starter forfra.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'Forløb og indhold aftales ud fra det, værkstedet har brug for. Datoer og priser hører med i den samtale.',
  },
  faq: [
    {
      question: 'Skal jeg bruge kontaktsiden eller denne side?',
      answer:
        'Kontaktsiden er der, I skriver. Denne side forklarer forskellen på tilmelding og en support-henvendelse.',
    },
    {
      question: 'Aftales indholdet på forhånd?',
      answer: 'Ja. Forløb og indhold aftales ud fra det, værkstedet har brug for.',
    },
    {
      question: 'Hvor ligger invitationen til PicoScope-kurset?',
      answer: 'Invitation og tilmelding til det kommende kursus ligger på siden med kommende kurser.',
    },
  ],
  links: [
    { href: '/kontakt/', label: 'Skriv til AutoMind Hjørring' },
    { href: '/kommende-kurser/', label: 'Se kommende kurser' },
    { href: '/teknisk-support/', label: 'Læs om teknisk support' },
  ],
}

export const picoscopeTopic: AeoArticle = {
  slug: 'picoscope',
  path: '/emner/picoscope/',
  title: 'Avanceret PicoScope-kursus',
  description:
    'Det avancerede PicoScope-kursus hos AutoMind Hjørring er to dage med Klaus Schmidt og Mads Budolfsen. Dato, pris og pladser aftales. Invitationen ligger på kommende kurser.',
  intro:
    'Kurset er to dage med måling i praksis. Klaus Schmidt og Mads Budolfsen underviser, og tempoet er lagt an på værkstedets hverdag.',
  kind: 'topic',
  sections: [
    {
      question: 'Hvad er det avancerede PicoScope-kursus?',
      answer: 'Det er to dage hos AutoMind Hjørring med Klaus Schmidt og Mads Budolfsen.',
      paragraphs: [
        'Undervisningen ligger tæt på den fejlfinding, mekanikeren laver med måleudstyr. Kurset er praktisk, med plads til fordybelse, og det holdes i et fagligt tempo.',
      ],
      list: [
        'To dage',
        'Fremmøde hos AutoMind i Hjørring',
        'Måling tæt på fejlfinding',
        'Undervisere: Klaus Schmidt og Mads Budolfsen',
      ],
    },
    {
      question: 'Hvem er PicoScope-kurset til?',
      answer: 'Kurset er til mekanikere, der vil bruge måleudstyr i et højt, praktisk tempo.',
      paragraphs: [
        'Det er lagt an på tricks, der skal gøre hverdagen på værkstedet lettere. I skriver, hvis I vil høre, om forløbet passer til de mekanikere, der skal med.',
      ],
    },
    {
      question: 'Hvor finder jeg dato, pris og tilmelding?',
      answer: 'Dato, pris og ledige pladser aftales. De står ikke som en fast liste på denne side.',
      paragraphs: [
        'Skriv til Mads Budolfsen på mads@automind.dk eller til Klaus Schmidt. Invitationen kan downloades på siden med kommende kurser.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'Kurset er lagt an på et højt tempo, med tricks der skal gøre hverdagen på værkstedet lettere.',
  },
  faq: [
    {
      question: 'Er PicoScope-kurset online?',
      answer: 'Nej. Det er to dage med fremmøde hos AutoMind i Hjørring.',
    },
    {
      question: 'Står datoen fast på denne side?',
      answer: 'Nej. Dato, pris og pladser får I ved at skrive. Invitationen ligger på siden med kommende kurser.',
    },
    {
      question: 'Hvem underviser?',
      answer: 'Klaus Schmidt og Mads Budolfsen.',
    },
  ],
  links: [
    { href: '/kommende-kurser/', label: 'Hent invitationen på kommende kurser' },
    { href: '/kontakt/', label: 'Skriv om kurset' },
  ],
}

const fejlfindingGuide: AeoArticle = {
  slug: 'fra-fejlkode-til-naeste-skridt',
  path: '/guides/fra-fejlkode-til-naeste-skridt/',
  title: 'Fra fejlkode til næste skridt',
  description:
    'En fejlkode er et spor. AutoMind Hjørring lægger næste skridt ud fra symptomer, observationer og den fejlfinding, værkstedet allerede har gjort.',
  intro:
    'En fejlkode fortæller ikke, hvad værkstedet skal gøre bagefter. Guiden er den rækkefølge, AutoMind Hjørring bruger i undervisning og sparring.',
  kind: 'guide',
  sections: [
    {
      question: 'Hvad gør værkstedet, når fejlkoden ikke er svaret?',
      answer: 'En fejlkode er et spor. Næste skridt kommer af symptomer, observationer og det, I allerede har prøvet.',
      paragraphs: [
        'Diagnostik hos AutoMind handler om mere end koden på skærmen. Koden kan pege et sted hen. Den afgør ikke, om det spor holder, før I har holdt det op mod det, bilen faktisk gør.',
      ],
    },
    {
      question: 'Hvordan lægges næste skridt?',
      answer: 'Vælg den ene kontrol, der kan be- eller afkræfte sporet.',
      paragraphs: [
        'Skriv symptomet ned, som føreren eller mekanikeren oplever det. Sammenhold det med det, I har målt. Spring ikke til en ny fejlkode, før den kontrol er lagt.',
      ],
      list: [
        'Symptomet med værkstedets egne ord',
        'Hvad der allerede er prøvet',
        'Hvilken måling der skiller sporene',
        'Hvornår sagen skal have sparring',
      ],
    },
    {
      question: 'Hvornår er det tid til teknisk support?',
      answer: 'Når næste skridt ikke er tydeligt ud fra det, I allerede har gjort.',
      paragraphs: [
        'Skriv symptomer, observationer og den fejlfinding, der er udført. Så starter samtalen der, ikke ved en gentagelse af fejlkoden.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'En fejlkode er et spor, ikke hele svaret. AutoMind tager udgangspunkt i bilens symptomer, dine observationer og det, værkstedet allerede har prøvet.',
  },
  faq: [
    {
      question: 'Er en fejlkode nok til at lukke sagen?',
      answer: 'Nej. Den er et spor. Næste skridt kræver symptomet og det, værkstedet allerede har prøvet.',
    },
    {
      question: 'Hører den her rækkefølge også til kurserne?',
      answer: 'Ja. Den samme tilgang bruges på kurserne og i den tekniske sparring.',
    },
    {
      question: 'Hvor skriver jeg, hvis sagen sidder fast?',
      answer: 'Skriv til mads@automind.dk, og beskriv symptomerne og den fejlfinding, I allerede har lavet.',
    },
  ],
  links: [
    { href: '/emner/diagnostik/', label: 'Diagnostik og systematisk fejlfinding' },
    { href: '/teknisk-support/', label: 'Teknisk support' },
    { href: '/kontakt/', label: 'Skriv om sagen' },
  ],
}

const hoejvoltGuide: AeoArticle = {
  slug: 'foer-hoejvoltsarbejde',
  path: '/guides/foer-hoejvoltsarbejde/',
  title: 'Før højvoltsarbejde',
  description:
    'Før arbejde på elbilens højvoltssystem afklarer værkstedet, om opgaven kan gøres sikkert, og om mekanikeren har den viden, sagen kræver. AutoMind Hjørring underviser i det.',
  intro:
    'Højvoltssikkerhed handler om det, mekanikeren skal tage stilling til, før der arbejdes på systemet. Guiden er de spørgsmål, kurset i Hjørring tager udgangspunkt i.',
  kind: 'guide',
  sections: [
    {
      question: 'Hvad skal være afklaret, før der arbejdes på højvolt?',
      answer: 'Om systemet er sikkert at arbejde på, og om mekanikeren har den viden, opgaven kræver.',
      paragraphs: [
        'Højvoltssikkerhed i praksis hos AutoMind Hjørring er ikke en gennemgang, der slipper opgaven på værkstedet. Viden om højvolt skal kunne bruges, når bilen står der.',
      ],
    },
    {
      question: 'Hvilke spørgsmål hører med før arbejdet?',
      answer: 'Spørgsmålene handler om sikkerhed, opgavens omfang og værkstedets eget niveau.',
      paragraphs: [
        'Kurset lægger forløbet efter de situationer, værkstedet møder. Det erstatter ikke værkstedets egne procedurer. Det gør det tydeligere, hvad mekanikeren skal kunne tage stilling til.',
      ],
      list: [
        'Er opgaven på højvoltssystemet, eller kan den løses uden?',
        'Har mekanikeren den viden, netop denne sag kræver?',
        'Hvad er allerede afklaret, før nogen arbejder på systemet?',
        'Skal værkstedet have et kursusforløb, før den type opgaver bliver hverdag?',
      ],
    },
    {
      question: 'Hvor lærer mekanikeren det i praksis?',
      answer: 'På et kursus hos AutoMind i Hjørring, lagt efter værkstedets behov.',
      paragraphs: [
        'Indhold, datoer og priser aftales i dialogen. Skriv, hvad I vil blive bedre til, så forløbet passer til de mekanikere, der skal på kursus.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'Viden om højvolt skal kunne bruges, når bilen står på værkstedet. Derfor ligger undervisningen tæt på hverdagen.',
  },
  faq: [
    {
      question: 'Er det her en arbejdsprocedure for højvolt?',
      answer:
        'Nej. Det er de spørgsmål, værkstedet afklarer, før arbejdet. Selve sikkerhedsarbejdet hører til kurset og værkstedets egne procedurer.',
    },
    {
      question: 'Kan kurset lægges efter vores opgaver?',
      answer: 'Ja. AutoMind lægger forløbet efter jeres niveau og de situationer, værkstedet møder.',
    },
    {
      question: 'Hvor skriver vi om et højvoltskursus?',
      answer: 'Skriv til mads@automind.dk, og fortæl hvad I vil blive bedre til.',
    },
  ],
  links: [
    { href: '/emner/hoejvoltssikkerhed/', label: 'Højvoltssikkerhed i praksis' },
    { href: '/kurser/', label: 'Se kurserne' },
    { href: '/kontakt/', label: 'Skriv om et forløb' },
  ],
}

const ladningGuide: AeoArticle = {
  slug: 'naar-ladning-eller-batteri-driller',
  path: '/guides/naar-ladning-eller-batteri-driller/',
  title: 'Når ladning eller batteri driller',
  description:
    'Når en elbil ikke lader, som den skal, hører ladning og batteristyring sammen. AutoMind Hjørring underviser i BMS, ladesystemer og den fejlfinding, der skiller sporene ad.',
  intro:
    'BMS er bilens styring af batteriet. Sammen med ladesystemet er det en del af opgaven, når ladningen eller batteriet driller.',
  kind: 'guide',
  sections: [
    {
      question: 'Hvad betyder det, når elbilen ikke lader, som den skal?',
      answer: 'Ladning og batteristyring kan være én sag, selv om fejlkoden kun nævner den ene.',
      paragraphs: [
        'En afbrudt ladning kan pege på ladesystemet. Batteristyringen kan stadig være en del af samme opgave. Derfor starter fejlfinding med symptomet, ikke med den første kode alene.',
      ],
    },
    {
      question: 'Hvad kigger værkstedet efter først?',
      answer: 'Hvordan ladningen opfører sig, og hvad I allerede har udelukket.',
      paragraphs: [
        'Skriv, om bilen slet ikke lader, om ladningen afbryder, eller om rækkevidden er uventet. Hold det op mod fejlkoden og de kontroller, I allerede har lavet, før næste måling lægges.',
      ],
      list: [
        'Lader bilen ikke, afbryder den, eller er rækkevidden uventet?',
        'Peger fejlkoden på ladning, batteri eller begge?',
        'Hvad er allerede prøvet?',
        'Skal sagen have sparring, før næste måling?',
      ],
    },
    {
      question: 'Hvor får mekanikeren den forståelse?',
      answer: 'På kurset i BMS og ladesystemer hos AutoMind i Hjørring, og i sparringen når sagen sidder fast.',
      paragraphs: [
        'Kurset kobler batteristyring og ladning til systematisk fejlfinding. Supporten tager den konkrete bil. Skriv, hvad I vil blive bedre til, eller hvad bilen gør.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'BMS er bilens styring af batteriet. Sammen med ladesystemet er det en del af den viden, mekanikeren bruger, når en elbil skal fejlsøges.',
  },
  faq: [
    {
      question: 'Er en ladefejl altid ladesystemet?',
      answer: 'Nej. Batteristyringen kan være en del af samme sag. Symptomet og det, I har udelukket, skal med, før næste skridt lægges.',
    },
    {
      question: 'Underviser AutoMind i BMS?',
      answer: 'Ja. Forløbet i Hjørring handler om batteristyring, ladning og den fejlfinding, der hører til.',
    },
    {
      question: 'Kan jeg få sparring på en aktuel bil?',
      answer: 'Ja. Skriv til mads@automind.dk med symptomer og den fejlfinding, I allerede har lavet.',
    },
  ],
  links: [
    { href: '/emner/bms-og-ladesystemer/', label: 'BMS og ladesystemer' },
    { href: '/guides/fra-fejlkode-til-naeste-skridt/', label: 'Fra fejlkode til næste skridt' },
    { href: '/kontakt/', label: 'Skriv om opgaven' },
  ],
}

const jlrGuide: AeoArticle = {
  slug: 'jaguar-land-rover',
  path: '/guides/jaguar-land-rover/',
  title: 'Jaguar Land Rover-kurser',
  description:
    'AutoMind underviser Jaguar Land Rover-teknikere i elbiler. Mads Budolfsen er approved JLR trainer fra Jaguar Land Rover Academy UK og har holdt både elbilkursus og assessment.',
  intro:
    'Jaguar Land Rover-kurserne hos AutoMind er undervisning og assessment for mærkets teknikere. De er ikke værkstedsservice på kunders biler.',
  kind: 'guide',
  sections: [
    {
      question: 'Holder AutoMind kurser for Jaguar Land Rover?',
      answer: 'Ja. Mads Budolfsen har undervist JLR-teknikere i elbiler, og han er approved JLR trainer fra Jaguar Land Rover Academy UK.',
      paragraphs: [
        'På LinkedIn står uddannelsen som approved JLR trainer ved Jaguar Land Rover Academy UK. I 2013 blev han certificeret Range Rover-hybridtekniker. Før AutoMind var han teknisk træner for Jaguar Land Rover i Skandinavien hos Autobranchens Udviklingscenter.',
      ],
      list: [
        'Approved JLR trainer, Jaguar Land Rover Academy UK',
        'Certificeret Range Rover-hybridtekniker, 2013',
        'Teknisk træner for Jaguar Land Rover i Skandinavien, 2009-2019',
        'Elbilkursus for JLR-teknikere, 2023',
        'Assessment for JLR og online undervisning for Skandinavien, 2026',
      ],
    },
    {
      question: 'Hvad gik elbilkurset i 2023 ud på?',
      answer: 'Et hold teknikere fra JLR var på elbilundervisning, rettet efter det, Scandinavian Helpdesk ser, de sidder med.',
      paragraphs: [
        'Mads Budolfsen skrev på LinkedIn, at kurset blev lagt efter den sparring, helpdesken allerede giver. Det er undervisning for teknikere fra mærket, ikke en åben prisliste.',
      ],
    },
    {
      question: 'Laver AutoMind også assessment for Jaguar Land Rover?',
      answer: 'Ja. I 2026 lagde han to dage med assessment for JLR og en dag med online undervisning for hele Skandinavien.',
      paragraphs: [
        'Det står i et LinkedIn-opslag fra august 2026. Assessmentens sted er ikke nævnt der. Den online dag var for Skandinavien.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'Today we will welcome a group of great technicians from JLR to a round electric vehicle training. … we have aimed the course towards, what we can see they are struggling with.',
    source: {
      label: 'LinkedIn, 25. september 2023',
      href: 'https://www.linkedin.com/posts/mads-budolfsen-046523a4_electricvehicletraining-evtraining-picoautomotive-activity-7111932415555555328-ZHS1',
    },
  },
  faq: [
    {
      question: 'Reparerer AutoMind Jaguar og Land Rover for private kunder?',
      answer: 'Det står ikke i kilderne. Det, der er beskrevet, er undervisning og assessment for mærkets teknikere.',
    },
    {
      question: 'Er underviseren godkendt af Jaguar Land Rover?',
      answer: 'Ja. LinkedIn angiver ham som approved JLR trainer ved Jaguar Land Rover Academy UK, herunder certificeret Range Rover-hybridtekniker i 2013.',
    },
    {
      question: 'Hvor skriver et værksted, der vil høre om et forløb?',
      answer: 'Skriv til mads@automind.dk. Dato og pris aftales i dialogen.',
    },
  ],
  links: [
    { href: '/guides/hvem-underviser/', label: 'Hvem underviser' },
    { href: '/guides/byd-kurser/', label: 'BYD-kurser' },
    { href: '/kontakt/', label: 'Skriv om et forløb' },
  ],
}

const bydGuide: AeoArticle = {
  slug: 'byd-kurser',
  path: '/guides/byd-kurser/',
  title: 'BYD-kurser',
  description:
    'AutoMind i Hjørring underviser BYD-teknikere, blandt andet på New Service Shop. BYD Europe i Holland har uddannet og testet Mads Budolfsen, før han underviser de danske teknikere.',
  intro:
    'BYD-kurserne er for mærkets teknikere. Motor Magasinet beskrev holdet i Hjørring, og LinkedIn beskriver de dage, der fulgte med ADAS, højspænding og Pico.',
  kind: 'guide',
  sections: [
    {
      question: 'Underviser AutoMind BYD-teknikere?',
      answer: 'Ja. AutoMind i Hjørring har undervist teknikere fra BYD-værksteder, blandt andet på kurset New Service Shop.',
      paragraphs: [
        'Motor Magasinet skrev 23. april 2025, at teknikere blev undervist i produktkendskab og fejlsøgning. Nye BYD-teknikere kommer på introkurset, før de begynder at arbejde med bilerne.',
      ],
    },
    {
      question: 'Hvad er New Service Shop?',
      answer: 'Det er introkurset, hvor de systemer, der skal bruges for at servicere bilerne, bliver gennemgået.',
      paragraphs: [
        'Artiklen beskriver det som starten på et længere forløb. Morten Mikkelsen fra BYD var med to dage i Hjørring, så teknikerne kunne lære den tekniske afdeling at kende.',
      ],
      list: [
        'New Service Shop for nye BYD-teknikere',
        'Produktkendskab og fejlsøgning',
        'Undervisning i Hjørring',
        'Kontakt til BYDs tekniske afdeling',
      ],
    },
    {
      question: 'Hvad har holdene ellers været igennem?',
      answer: 'I september 2025 havde et hold BYD-teknikere fire dage med ADAS, højspænding og fejlfinding med Pico.',
      paragraphs: [
        'Mads Budolfsen skrev, at dagene startede med ADAS, og at holdet derefter gik til højspændingsdelen og flere fejlfindingsmetoder.',
      ],
    },
    {
      question: 'Hvem har uddannet underviseren til BYD?',
      answer: 'BYDs europæiske hovedkontor i Holland har uddannet og testet ham, før han underviser de danske teknikere.',
      paragraphs: [
        'Motor Magasinet citerer ham for, at undervisningen krævede en praktisk prøve og en teoretisk test. Fabrikken leverer materiale, som tilpasses de danske teknikere og bilmodeller.',
      ],
    },
  ],
  quote: {
    ...mads,
    text: 'Det er en rigtig spændende rejse, og den er kun lige begyndt.',
    source: {
      label: 'Motor Magasinet, 23. april 2025',
      href: 'https://www.motormagasinet.dk/article/view/1159434/teknikere_krob_helt_ind_under_huden_pa_bydbilerne',
    },
  },
  faq: [
    {
      question: 'Er BYD-kurset åbent for alle værksteder?',
      answer: 'Artiklen beskriver teknikere på BYD-værksteder og nye BYD-teknikere. Skriv til AutoMind, hvis I vil høre, om et forløb er relevant.',
    },
    {
      question: 'Står dato og pris på siden?',
      answer: 'Nej. Dato og pris aftales i dialogen.',
    },
    {
      question: 'Laver AutoMind service på kunders BYD?',
      answer: 'Kilderne beskriver undervisning af teknikere, ikke værkstedsreparation for private kunder.',
    },
  ],
  links: [
    { href: '/guides/hvem-underviser/', label: 'Hvem underviser' },
    { href: '/guides/jaguar-land-rover/', label: 'Jaguar Land Rover-kurser' },
    { href: '/kontakt/', label: 'Skriv om et forløb' },
  ],
}

const underviserGuide: AeoArticle = {
  slug: 'hvem-underviser',
  path: '/guides/hvem-underviser/',
  title: 'Hvem underviser',
  description:
    'Mads Budolfsen er træner hos AutoMind siden 2019, automekaniker, approved JLR trainer og testet af BYD Europe, før han underviser danske teknikere.',
  intro:
    'Uddannelsen bag kurserne kan læses på LinkedIn og i Motor Magasinet. Der står ingen placering som bedst i landet.',
  kind: 'guide',
  sections: [
    {
      question: 'Hvem underviser hos AutoMind Hjørring?',
      answer: 'Mads Budolfsen. Han er træner hos AutoMind siden august 2019 og udlært automekaniker.',
      paragraphs: [
        'Automekanikeruddannelsen er fra EUC Nord. LinkedIn angiver ham som træner hos AutoMind i Hjørring Kommune.',
      ],
    },
    {
      question: 'Hvilken uddannelse ligger bag Jaguar Land Rover?',
      answer: 'Han er approved JLR trainer ved Jaguar Land Rover Academy UK.',
      paragraphs: [
        'I 2013 blev han certificeret Range Rover-hybridtekniker. Fra 2009 til 2019 var han teknisk træner hos Autobranchens Udviklingscenter, herunder for Jaguar Land Rover i Skandinavien.',
      ],
      list: [
        'Approved JLR trainer, Jaguar Land Rover Academy UK',
        'Certificeret Range Rover-hybridtekniker, 2013',
        'Teknisk træner, Autobranchens Udviklingscenter, 2009-2019',
        'Pædagogikum, Metropol, 2010-2012',
        'Automekaniker, EUC Nord',
      ],
    },
    {
      question: 'Hvilken uddannelse ligger bag BYD?',
      answer: 'BYDs europæiske hovedkontor i Holland har uddannet ham og testet både undervisningen og teorien.',
      paragraphs: [
        'Motor Magasinet skrev, at en praktisk prøve i at undervise og en teoretisk test skulle bestås, før undervisningen af de danske teknikere gik i gang.',
      ],
    },
    {
      question: 'Har han en uddannelse i at undervise voksne?',
      answer: 'Ja. Pædagogikum på Metropol fra 2010 til 2012, med fokus på undervisning af voksne.',
    },
  ],
  quote: {
    ...mads,
    text: 'Jeg skulle vise, hvordan jeg underviser med en praktisk prøve, men også en lang teoretisk test skulle bestås for, at vi kunne komme i gang.',
    source: {
      label: 'Motor Magasinet, 23. april 2025',
      href: 'https://www.motormagasinet.dk/article/view/1159434/teknikere_krob_helt_ind_under_huden_pa_bydbilerne',
    },
  },
  faq: [
    {
      question: 'Er AutoMind Danmarks bedst uddannede?',
      answer: 'Den placering står ikke i kilderne. Det, der står, er godkendelserne: JLR Academy, BYD-testen i Holland, pædagogikum og automekanikeruddannelsen.',
    },
    {
      question: 'Hvor længe har han undervist?',
      answer: 'LinkedIn angiver træner hos AutoMind siden august 2019 og teknisk træner hos Autobranchens Udviklingscenter fra 2009 til 2019.',
    },
    {
      question: 'Hvor skriver jeg?',
      answer: 'Skriv til mads@automind.dk om et kursus eller en konkret opgave.',
    },
  ],
  links: [
    { href: '/guides/jaguar-land-rover/', label: 'Jaguar Land Rover-kurser' },
    { href: '/guides/byd-kurser/', label: 'BYD-kurser' },
    { href: '/kurser/', label: 'Se de øvrige kurser' },
  ],
}

export const brandGuides = [jlrGuide, bydGuide, underviserGuide]

export const guides = [fejlfindingGuide, hoejvoltGuide, ladningGuide, ...brandGuides]

export const topicArticles: Record<string, AeoArticle> = {
  kontakt: kontaktTopic,
  picoscope: picoscopeTopic,
}

export function articleLines(article: AeoArticle, origin = 'https://automind.dk') {
  const url = new URL(article.path.replace(/^\//, ''), `${origin}/`).href
  return [
    `### ${article.title}`,
    '',
    url,
    '',
    article.intro,
    '',
    ...article.sections.flatMap((section) => [
      `#### ${section.question}`,
      '',
      section.answer,
      '',
      ...(section.paragraphs ?? []).flatMap((paragraph) => [paragraph, '']),
      ...(section.list ? [...section.list.map((item) => `- ${item}`), ''] : []),
    ]),
    `> ${article.quote.text}`,
    '',
    `${article.quote.name}, ${article.quote.role}`,
    ...(article.quote.source
      ? [`Kilde: ${article.quote.source.label}${article.quote.source.href ? ` (${article.quote.source.href})` : ''}`, '']
      : ['']),
    ...article.faq.flatMap((entry) => [`##### ${entry.question}`, '', entry.answer, '']),
  ]
}
