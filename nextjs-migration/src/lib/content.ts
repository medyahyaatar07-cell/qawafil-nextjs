// -*- coding: utf-8 -*-
/**
 * Site content for the Qawafil Al Khair official website — Arabic / French.
 *
 * This file is the single source of truth for every piece of text shown on
 * the site, kept entirely separate from components (JSX) and design
 * (CSS), so content can be updated later without touching the UI — same
 * rule the original Django project's pages/content.py followed, just typed.
 *
 * Strict rule carried over from the source project: this file contains no
 * invented beneficiary counts, statistics, success stories, testimonials or
 * partners. Every string here is either copied verbatim from the approved
 * spec, a faithful translation of it, or functional UI copy (buttons,
 * labels) that makes no factual claim.
 */
import type { Lang } from "./i18n";

export interface WorkAreaLocalized {
  title: string;
  summary: string;
  body: string;
  imageAlt: string;
}

export interface WorkAreaRaw {
  slug: string;
  number: string;
  image: string | null;
  imageFallback?: string;
  hasMedia: boolean;
  ar: WorkAreaLocalized;
  fr: WorkAreaLocalized;
}

export interface WorkArea extends WorkAreaLocalized {
  slug: string;
  number: string;
  image: string | null;
  imageFallback?: string;
  hasMedia: boolean;
}

export const WORK_AREAS: WorkAreaRaw[] = [
  {
    slug: "poverty",
    number: "01",
    image: "/images/work-poverty-1.webp",
    imageFallback: "/images/work-poverty-1.jpg",
    hasMedia: true,
    ar: {
      title: "مساعدة الفقراء والمحتاجين",
      summary:
        "نسعى إلى الوقوف إلى جانب الأسر والأفراد الأكثر احتياجاً، وتقديم العون لهم بما يحفظ كرامتهم ويخفف من معاناتهم.",
      body: "تولي جمعية قوافل الخير عناية خاصة بالأسر والأفراد الأكثر احتياجاً، وتسعى إلى الوقوف إلى جانبهم بما يحفظ كرامتهم الإنسانية ويخفف من أعباء حياتهم اليومية، إيماناً منها بأن العطاء الكريم هو أول خطوة نحو مجتمع متكافل.",
      imageAlt: "أسرة وأطفال من المستفيدين من برامج جمعية قوافل الخير",
    },
    fr: {
      title: "Aide aux pauvres et aux nécessiteux",
      summary:
        "Nous œuvrons aux côtés des familles et des personnes les plus démunies, en leur apportant un soutien qui préserve leur dignité et allège leurs souffrances.",
      body: "L'association Qawafil Al Khair accorde une attention particulière aux familles et aux personnes les plus démunies, et s'efforce de se tenir à leurs côtés d'une manière qui préserve leur dignité humaine et allège les charges de leur vie quotidienne, convaincue qu'un don généreux est le premier pas vers une société solidaire.",
      imageAlt: "Famille et enfants bénéficiaires des programmes de l'association Qawafil Al Khair",
    },
  },
  {
    slug: "health",
    number: "02",
    image: null,
    hasMedia: false,
    ar: {
      title: "رعاية المرضى",
      summary:
        "نساند المرضى والمحتاجين إلى الرعاية والمساعدة، ونسعى إلى التخفيف من أعبائهم من خلال المبادرات الإنسانية المختلفة.",
      body: "نساند المرضى والمحتاجين إلى الرعاية والمساعدة، ونسعى إلى التخفيف من أعبائهم من خلال المبادرات الإنسانية المختلفة، انطلاقاً من إيماننا بأن الوقوف إلى جانب المريض جزء أصيل من رسالتنا الخيرية.",
      imageAlt: "",
    },
    fr: {
      title: "Prise en charge des malades",
      summary:
        "Nous soutenons les malades ayant besoin de soins et d'assistance, et œuvrons à alléger leurs charges à travers diverses initiatives humanitaires.",
      body: "Nous soutenons les malades ayant besoin de soins et d'assistance, et œuvrons à alléger leurs charges à travers diverses initiatives humanitaires, convaincus que se tenir aux côtés du malade fait partie intégrante de notre mission caritative.",
      imageAlt: "",
    },
  },
  {
    slug: "elderly-widows",
    number: "03",
    image: null,
    hasMedia: false,
    ar: {
      title: "رعاية كبار السن والأرامل",
      summary:
        "نولي عناية خاصة بكبار السن والأرامل، تقديراً لمكانتهم واحتياجاتهم، وحرصاً على أن يجدوا من يقف إلى جانبهم.",
      body: "نولي عناية خاصة بكبار السن والأرامل، تقديراً لمكانتهم واحتياجاتهم، وحرصاً على أن يجدوا من يقف إلى جانبهم في مختلف الظروف، ضمن رؤية الجمعية القائمة على الأخوة والتكافل الاجتماعي.",
      imageAlt: "",
    },
    fr: {
      title: "Prise en charge des personnes âgées et des veuves",
      summary:
        "Nous accordons une attention particulière aux personnes âgées et aux veuves, en reconnaissance de leur place et de leurs besoins, veillant à ce qu'elles trouvent toujours un soutien à leurs côtés.",
      body: "Nous accordons une attention particulière aux personnes âgées et aux veuves, en reconnaissance de leur place et de leurs besoins, veillant à ce qu'elles trouvent toujours un soutien à leurs côtés en toutes circonstances, dans le cadre de la vision de l'association fondée sur la fraternité et la solidarité sociale.",
      imageAlt: "",
    },
  },
  {
    slug: "water",
    number: "04",
    image: null,
    hasMedia: false,
    ar: {
      title: "سقيا الماء",
      summary:
        "نعمل على إيصال الماء إلى من يحتاجونه، والمساهمة في توفير مصادر المياه للمناطق والأسر التي تعاني من صعوبة الحصول عليه.",
      body: "نعمل على إيصال الماء إلى من يحتاجونه، والمساهمة في توفير مصادر المياه للمناطق والأسر التي تعاني من صعوبة الحصول عليه، إيماناً بأن سقيا الماء من أبواب الخير التي حث عليها ديننا الحنيف.",
      imageAlt: "",
    },
    fr: {
      title: "Approvisionnement en eau",
      summary:
        "Nous œuvrons à acheminer l'eau à ceux qui en ont besoin, et contribuons à fournir des sources d'eau aux régions et familles qui peinent à y accéder.",
      body: "Nous œuvrons à acheminer l'eau à ceux qui en ont besoin, et contribuons à fournir des sources d'eau aux régions et familles qui peinent à y accéder, convaincus que l'approvisionnement en eau est l'une des portes du bien que notre religion nous encourage à emprunter.",
      imageAlt: "",
    },
  },
  {
    slug: "mosques",
    number: "05",
    image: "/images/work-mosques-1.webp",
    imageFallback: "/images/work-mosques-1.jpg",
    hasMedia: true,
    ar: {
      title: "العناية بالمساجد",
      summary:
        "نساهم في خدمة بيوت الله والعناية بها، من خلال مبادرات تهدف إلى تحسين ظروفها والحفاظ على مكانتها في المجتمع.",
      body: "نساهم في خدمة بيوت الله والعناية بها، من خلال مبادرات تهدف إلى تحسين ظروفها والحفاظ على مكانتها في المجتمع، لما للمسجد من دور محوري في حياة الفرد والجماعة.",
      imageAlt: "مصلى داخل أحد الفضاءات التي تُعنى بها جمعية قوافل الخير",
    },
    fr: {
      title: "Entretien des mosquées",
      summary:
        "Nous contribuons au service et à l'entretien des maisons de Dieu, à travers des initiatives visant à améliorer leurs conditions et à préserver leur place dans la société.",
      body: "Nous contribuons au service et à l'entretien des maisons de Dieu, à travers des initiatives visant à améliorer leurs conditions et à préserver leur place centrale dans la vie de l'individu et de la communauté.",
      imageAlt: "Salle de prière au sein d'un des espaces pris en charge par l'association Qawafil Al Khair",
    },
  },
  {
    slug: "mahadhir",
    number: "06",
    image: "/images/work-mahadhir-1.webp",
    imageFallback: "/images/work-mahadhir-1.jpg",
    hasMedia: true,
    ar: {
      title: "دعم المحاظر والتعليم الشرعي",
      summary:
        "ندعم المحاظر والتعليم الشرعي، إيماناً بأهمية العلم في بناء الإنسان وترسيخ القيم والأخلاق والمعرفة في المجتمع.",
      body: "ندعم المحاظر والتعليم الشرعي، إيماناً بأهمية العلم في بناء الإنسان وترسيخ القيم والأخلاق والمعرفة في المجتمع، ومواصلةً لإرث علمي عريق تقوم عليه المحاظر الموريتانية.",
      imageAlt: "فعالية لتكريم طلاب إحدى المحاظر التي تدعمها جمعية قوافل الخير",
    },
    fr: {
      title: "Soutien aux mahadras et à l'enseignement religieux",
      summary:
        "Nous soutenons les mahadras (écoles coraniques traditionnelles) et l'enseignement religieux, convaincus de l'importance du savoir dans la construction de l'individu et l'ancrage des valeurs, de la morale et de la connaissance dans la société.",
      body: "Nous soutenons les mahadras et l'enseignement religieux, convaincus de l'importance du savoir dans la construction de l'individu et l'ancrage des valeurs, de la morale et de la connaissance dans la société, en continuité avec l'héritage scientifique ancestral des mahadras mauritaniennes.",
      imageAlt: "Cérémonie en l'honneur des élèves d'une mahadra soutenue par l'association Qawafil Al Khair",
    },
  },
  {
    slug: "initiatives",
    number: "07",
    image: "/images/work-initiatives-1.webp",
    imageFallback: "/images/work-initiatives-1.jpg",
    hasMedia: true,
    ar: {
      title: "المبادرات الخيرية والإنسانية",
      summary:
        "نطلق ونشارك في مبادرات تستجيب للحاجات الاجتماعية والإنسانية، ونسعى من خلالها إلى إيصال الخير إلى أكبر عدد ممكن من المستفيدين.",
      body: "نطلق ونشارك في مبادرات تستجيب للحاجات الاجتماعية والإنسانية، ونسعى من خلالها إلى إيصال الخير إلى أكبر عدد ممكن من المستفيدين، بما في ذلك مبادرات الإطعام والمساعدات الموسمية.",
      imageAlt: "وجبات غذائية مُعدّة ضمن إحدى مبادرات جمعية قوافل الخير الخيرية",
    },
    fr: {
      title: "Initiatives caritatives et humanitaires",
      summary:
        "Nous lançons et participons à des initiatives répondant aux besoins sociaux et humanitaires, cherchant à travers elles à faire parvenir le bien au plus grand nombre possible de bénéficiaires.",
      body: "Nous lançons et participons à des initiatives répondant aux besoins sociaux et humanitaires, cherchant à travers elles à faire parvenir le bien au plus grand nombre possible de bénéficiaires, y compris des initiatives de restauration et d'aide saisonnière.",
      imageAlt: "Repas préparés dans le cadre d'une initiative caritative de l'association Qawafil Al Khair",
    },
  },
];

const QURAN_HADITH_AR = [
  { text: "وتعاونوا على البر والتقوى", source: "[المائدة: 2]" },
  { text: "ويطعمون الطعام على حبه مسكيناً ويتيماً وأسيراً", source: "[الإنسان: 8]" },
  { text: "إنما نطعمكم لوجه الله لا نريد منكم جزاء ولا شكوراً", source: "[الإنسان: 9]" },
];

const HADITH_AR =
  "من نفّس عن مؤمن كربة من كرب الدنيا نفّس الله عنه كربة من كرب يوم القيامة، " +
  "ومن يسّر على معسر يسّر الله عليه في الدنيا والآخرة، ومن ستر مسلماً ستره الله " +
  "في الدنيا والآخرة، والله في عون العبد ما كان العبد في عون أخيه.";

const QURAN_HADITH_FR = [
  {
    text: "« Entraidez-vous dans l'accomplissement des bonnes œuvres et de la piété. »",
    source: "[Sourate Al-Mâ'idah, verset 2]",
  },
  {
    text: "« Ils donnent la nourriture, malgré leur propre attachement pour elle, au pauvre, à l'orphelin et au prisonnier. »",
    source: "[Sourate Al-Insân, verset 8]",
  },
  {
    text: "« Nous ne vous nourrissons que pour le visage d'Allah ; nous ne voulons de vous ni récompense ni gratitude. »",
    source: "[Sourate Al-Insân, verset 9]",
  },
];

const HADITH_FR =
  "« Quiconque soulage un croyant d'une détresse de ce bas monde, Allah le soulagera " +
  "d'une détresse du Jour de la Résurrection ; quiconque facilite les choses à une " +
  "personne en difficulté, Allah lui facilitera les choses ici-bas et dans l'au-delà ; " +
  "quiconque couvre les fautes d'un musulman, Allah couvrira les siennes ici-bas et dans " +
  "l'au-delà ; et Allah ne cesse de secourir Son serviteur tant que celui-ci secourt son frère. »";

export interface SiteContent {
  dir: "rtl" | "ltr";
  langCode: Lang;
  meta: { siteTitle: string; siteDescription: string };
  nav: {
    home: string;
    about: string;
    work: string;
    donate: string;
    contact: string;
    ctaDonate: string;
    skipToContent: string;
    langSwitchLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    btnPrimary: string;
    btnSecondary: string;
    skipIntro: string;
  };
  about: {
    title: string;
    intro: string;
    body2: string;
    body3: string;
    body4: string;
    cards: { label: string; text: string }[];
  };
  vision: { title: string; text: string; highlight: string };
  mission: {
    title: string;
    text: string;
    verses: { text: string; source: string }[];
    hadith: string;
    hadithSource: string;
  };
  chairwoman: { title: string; paragraphs: string[]; signature: string };
  work: {
    title: string;
    subtitle: string;
    backToList: string;
    readMore: string;
    noMediaNote: string;
    mediaTitle: string;
  };
  spread: { title: string; text: string; tagline: string };
  donate: {
    title: string;
    text: string;
    methodsTitle: string;
    numberLabel: string;
    visualOnlyNote: string;
    securityNote: string;
  };
  contact: {
    title: string;
    text: string;
    labels: {
      address: string;
      phone: string;
      whatsapp: string;
      email: string;
      facebook: string;
      facebookValue: string;
    };
  };
  whatsappFabLabel: string;
  footer: { tagline: string; linksTitle: string; contactTitle: string; rights: string };
  notFound: { title: string; text: string; back: string };
}

export const CONTENT: Record<Lang, SiteContent> = {
  ar: {
    dir: "rtl",
    langCode: "ar",
    meta: {
      siteTitle: "جمعية قوافل الخير | جمعية خيرية تنموية موريتانية",
      siteDescription:
        "جمعية قوافل الخير جمعية خيرية تنموية موريتانية تسعى إلى مساعدة الفقراء والمحتاجين والمرضى وكبار السن والأرامل، وسقيا الماء والعناية بالمساجد والمحاظر ودعم التعليم الشرعي في مختلف أنحاء موريتانيا.",
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      work: "مجالات العمل",
      donate: "التبرع",
      contact: "تواصل معنا",
      ctaDonate: "تبرع الآن",
      skipToContent: "تخطَّ إلى المحتوى",
      langSwitchLabel: "Français",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
    },
    hero: {
      eyebrow: "جمعية قوافل الخير",
      title: "قوافل الخير... نحو مجتمع أكثر تكافلاً",
      text: "جمعية خيرية تنموية موريتانية، نسعى إلى إيصال الخير إلى المحتاجين، وخدمة الإنسان والمجتمع، والوصول بخيرنا إلى مختلف ربوع الوطن.",
      btnPrimary: "تعرف علينا",
      btnSecondary: "ساهم في الخير",
      skipIntro: "تخطَّ المقدمة",
    },
    about: {
      title: "من نحن",
      intro:
        "جمعية قوافل الخير جمعية خيرية تنموية موريتانية، تأسست في مدينة أطار بولاية أدرار بتاريخ 6 أبريل 2016م، الموافق لـ 28 جمادى الآخرة 1438هـ، وانطلقت برسالة تقوم على الأخوة والتكافل والإيثار وخدمة الإنسان.",
      body2:
        "تعمل الجمعية على مساعدة الفقراء والمحتاجين والمرضى وكبار السن والأرامل، وتسهم في سقيا الماء والعناية بالمساجد والمحاظر ودعم التعليم الشرعي، إيماناً منها بأن بناء المجتمع يبدأ بالوقوف إلى جانب الإنسان.",
      body3:
        "وتطمح الجمعية إلى التخفيف من معاناة المحتاجين في مختلف أنحاء موريتانيا، والوصول بخيرها إلى جميع ولايات الوطن وربوعه.",
      body4:
        "وتتمتع الجمعية بإطار قانوني مرخص من وزارة الداخلية واللامركزية، وتتخذ من نواكشوط مقراً لها.",
      cards: [
        { label: "التأسيس", text: "أطار، ولاية أدرار — 6 أبريل 2016م / 28 جمادى الآخرة 1438هـ" },
        { label: "الرسالة", text: "الأخوة، التكافل، الإيثار، وخدمة الإنسان" },
        {
          label: "مجالات الخدمة",
          text: "الفقراء، المرضى، كبار السن والأرامل، سقيا الماء، المساجد والمحاظر",
        },
        { label: "الطموح", text: "الوصول بالخير إلى جميع ولايات الوطن وربوعه" },
        { label: "الإطار القانوني", text: "مرخّصة من وزارة الداخلية واللامركزية — المقر: نواكشوط" },
      ],
    },
    vision: {
      title: "رؤيتنا",
      text: "تطمح جمعية قوافل الخير إلى التخفيف من معاناة الفقراء والمحتاجين في جميع أنحاء الوطن، والوصول بخيرها إلى مختلف الولايات والربوع، وأن تكون سنداً موثوقاً لكل محتاج، وأن يستفيد من برامجها أكبر عدد ممكن من المحتاجين.",
      highlight: "نحو خيرٍ يصل إلى كل ربوع الوطن.",
    },
    mission: {
      title: "مبدأنا",
      text: "نستمد رسالتنا من قيم الأخوة والتكافل والإيثار والإنفاق والإحسان، ونسعى إلى جعل العمل الخيري وسيلة لخدمة الإنسان وتعمير المجتمع.",
      verses: QURAN_HADITH_AR,
      hadith: HADITH_AR,
      hadithSource: "رواه مسلم",
    },
    chairwoman: {
      title: "كلمة رئيسة الجمعية",
      paragraphs: [
        "إن العمل الخيري ليس مجرد تقديم مساعدة عابرة، وإنما هو رسالة إنسانية وقيمة مجتمعية تقوم على الأخوة والتراحم والتكافل، وتسعى إلى أن يكون كل فرد قادراً على أن يمد يده لأخيه، وأن يسهم بما يستطيع في تخفيف معاناة المحتاجين وخدمة مجتمعه.",
        "ومن هذا المنطلق، انطلقت جمعية قوافل الخير حاملةً رسالة تقوم على مساعدة الفقراء والمحتاجين، والوقوف إلى جانب المرضى وكبار السن والأرامل، وسقيا الماء، والعناية بالمساجد والمحاظر، ودعم التعليم الشرعي.",
        "ونؤمن أن الإنفاق في سبيل الخير باب من أبواب البر والإحسان، وأن ما يقدمه الإنسان من مال أو وقت أو جهد أو خبرة يمكن أن يصنع أثراً حقيقياً في حياة الآخرين.",
        "كما نؤمن بأن تعمير المجتمع مسؤولية مشتركة، لا تتحقق بجهد فرد أو مؤسسة واحدة، وإنما بتعاون الجميع: أفراداً ومؤسسات، وفاعلين في المجتمع المدني، ومتطوعين ومحسنين، كلٌّ بحسب قدرته ومجاله.",
        "ومن هنا، نؤكد على أهمية المجتمع المدني والعمل التطوعي والخيري في بناء مجتمع متماسك، قادر على مواجهة حاجاته ورعاية فئاته الأكثر احتياجاً.",
        "وإن طموحنا في جمعية قوافل الخير أن تمتد قوافل العطاء إلى مختلف ربوع موريتانيا، وأن نصل إلى أكبر عدد ممكن من المحتاجين، وأن نكون جسراً موثوقاً بين أهل الخير ومن يستحقونه.",
      ],
      signature: "رئيسة جمعية قوافل الخير",
    },
    work: {
      title: "مجالات العمل الخيري",
      subtitle: "المحور الرئيسي لعمل الجمعية على أرض الواقع",
      backToList: "العودة إلى مجالات العمل",
      readMore: "اطّلع على التفاصيل",
      noMediaNote: "الصور والفيديوهات الخاصة بهذا المجال ستُضاف قريباً.",
      mediaTitle: "من أرض الميدان",
    },
    spread: {
      title: "قوافل الخير... في كل ربوع الوطن",
      text: "نطمح إلى أن تصل قوافل العطاء إلى مختلف أنحاء موريتانيا، وأن نكون سنداً للمحتاجين أينما كانوا، انطلاقاً من إيماننا بأن الخير لا تحدّه المسافات.",
      tagline: "من هنا ينطلق الخير... وإلى كل ربوع الوطن يصل.",
    },
    donate: {
      title: "تبرعك يصنع أثراً",
      text: "في جمعية قوافل الخير، نؤمن أن العطاء مهما كان حجمه يمكن أن يصنع فرقاً في حياة إنسان.\nيمكنكم دعم أعمال الجمعية والتبرع لمبادراتها الخيرية عبر التطبيقات البنكية المتاحة.",
      methodsTitle: "طرق التبرع",
      numberLabel: "رقم التبرع",
      visualOnlyNote: "أيقونات للعرض والتعريف فقط — لا تُستخدم كأزرار دفع إلكتروني.",
      securityNote:
        "الموقع تعريفي ولا يحتوي على نظام دفع إلكتروني، ولا يطلب كلمات مرور أو حسابات مستخدمين أو بيانات بطاقات مصرفية. تعتمد طرق التبرع فقط على المعلومات المنشورة من الجمعية.",
    },
    contact: {
      title: "تواصل معنا",
      text: "قوافل الخير... قلوب قريبة، وأبواب مفتوحة.\nنؤمن أن الخير يبدأ بالتواصل، وأن كل مبادرة قد تكون سبباً في تغيير حياة إنسان.",
      labels: {
        address: "المقر",
        phone: "الهاتف",
        whatsapp: "واتساب",
        email: "البريد الإلكتروني",
        facebook: "فيسبوك",
        facebookValue: "صفحة جمعية قوافل الخير",
      },
    },
    whatsappFabLabel: "تواصل معنا عبر واتساب",
    footer: {
      tagline: "قوافل الخير... نحو مجتمع أكثر تكافلاً.",
      linksTitle: "روابط الموقع",
      contactTitle: "تواصل معنا",
      rights: "جميع الحقوق محفوظة",
    },
    notFound: {
      title: "الصفحة غير موجودة",
      text: "الصفحة التي تبحث عنها غير متوفرة. يمكنك العودة إلى الصفحة الرئيسية.",
      back: "العودة إلى الرئيسية",
    },
  },
  fr: {
    dir: "ltr",
    langCode: "fr",
    meta: {
      siteTitle: "Association Qawafil Al Khair | Association caritative et de développement mauritanienne",
      siteDescription:
        "L'association Qawafil Al Khair est une association caritative et de développement mauritanienne qui œuvre pour aider les pauvres, les nécessiteux, les malades, les personnes âgées et les veuves, et contribue à l'approvisionnement en eau, à l'entretien des mosquées et des mahadras, et au soutien de l'enseignement religieux dans toute la Mauritanie.",
    },
    nav: {
      home: "Accueil",
      about: "Qui sommes-nous",
      work: "Domaines d'action",
      donate: "Faire un don",
      contact: "Contact",
      ctaDonate: "Faire un don",
      skipToContent: "Aller au contenu",
      langSwitchLabel: "العربية",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    hero: {
      eyebrow: "Association Qawafil Al Khair",
      title: "Qawafil Al Khair... vers une société plus solidaire",
      text: "Une association caritative et de développement mauritanienne, œuvrant à faire parvenir le bien aux nécessiteux, à servir l'être humain et la société, et à porter notre bien aux quatre coins du pays.",
      btnPrimary: "Découvrir l'association",
      btnSecondary: "Contribuer au bien",
      skipIntro: "Passer l'introduction",
    },
    about: {
      title: "Qui sommes-nous",
      intro:
        "Qawafil Al Khair est une association caritative et de développement mauritanienne, fondée dans la ville d'Atar, wilaya de l'Adrar, le 6 avril 2016 (correspondant au 28 Joumada al-Akhira 1438H), avec pour mission la fraternité, la solidarité, l'altruisme et le service de l'être humain.",
      body2:
        "L'association œuvre à venir en aide aux pauvres, aux nécessiteux, aux malades, aux personnes âgées et aux veuves, et contribue à l'approvisionnement en eau, à l'entretien des mosquées et des mahadras, ainsi qu'au soutien de l'enseignement religieux, convaincue que la construction de la société commence par le soutien à l'être humain.",
      body3:
        "L'association aspire à alléger les souffrances des nécessiteux dans toute la Mauritanie, et à porter son bien vers toutes les wilayas et régions du pays.",
      body4:
        "L'association dispose d'un cadre juridique agréé par le Ministère de l'Intérieur et de la Décentralisation, et a établi son siège à Nouakchott.",
      cards: [
        { label: "Fondation", text: "Atar, wilaya de l'Adrar — 6 avril 2016 / 28 Joumada al-Akhira 1438H" },
        { label: "Mission", text: "Fraternité, solidarité, altruisme et service de l'être humain" },
        {
          label: "Domaines de service",
          text: "Pauvres, malades, personnes âgées et veuves, eau, mosquées et mahadras",
        },
        { label: "Ambition", text: "Porter le bien vers toutes les wilayas et régions du pays" },
        {
          label: "Cadre juridique",
          text: "Agréée par le Ministère de l'Intérieur et de la Décentralisation — Siège : Nouakchott",
        },
      ],
    },
    vision: {
      title: "Notre vision",
      text: "L'association Qawafil Al Khair aspire à alléger les souffrances des pauvres et des nécessiteux dans tout le pays, à porter son bien vers les différentes wilayas et régions, à être un soutien fiable pour chaque personne dans le besoin, et à ce que ses programmes bénéficient au plus grand nombre possible de nécessiteux.",
      highlight: "Vers un bien qui atteint chaque coin du pays.",
    },
    mission: {
      title: "Notre principe",
      text: "Nous puisons notre mission dans les valeurs de fraternité, de solidarité, d'altruisme, de générosité et de bienfaisance, et nous œuvrons à faire de l'action caritative un moyen de servir l'être humain et de bâtir la société.",
      verses: QURAN_HADITH_FR,
      hadith: HADITH_FR,
      hadithSource: "Rapporté par Muslim",
    },
    chairwoman: {
      title: "Mot de la présidente de l'association",
      paragraphs: [
        "L'action caritative n'est pas une simple aide passagère ; c'est un message humain et une valeur sociétale fondée sur la fraternité, la compassion et la solidarité, qui aspire à ce que chaque individu soit capable de tendre la main à son prochain et de contribuer, selon ses moyens, à alléger la souffrance des nécessiteux et à servir sa communauté.",
        "C'est dans cet esprit qu'est née l'association Qawafil Al Khair, porteuse d'une mission fondée sur l'aide aux pauvres et aux nécessiteux, le soutien aux malades, aux personnes âgées et aux veuves, l'approvisionnement en eau, l'entretien des mosquées et des mahadras, et le soutien de l'enseignement religieux.",
        "Nous croyons que dépenser pour le bien est l'une des portes de la piété et de la bienfaisance, et que ce que l'être humain offre — argent, temps, effort ou expertise — peut avoir un impact réel sur la vie des autres.",
        "Nous croyons également que la construction de la société est une responsabilité partagée, qui ne se réalise pas par l'effort d'un seul individu ou d'une seule institution, mais par la coopération de tous : individus, institutions, acteurs de la société civile, bénévoles et bienfaiteurs, chacun selon ses capacités et son domaine.",
        "C'est pourquoi nous soulignons l'importance de la société civile et de l'action bénévole et caritative dans la construction d'une société soudée, capable de répondre à ses besoins et de prendre soin de ses catégories les plus vulnérables.",
        "Notre ambition, au sein de l'association Qawafil Al Khair, est que les caravanes du bien s'étendent aux quatre coins de la Mauritanie, que nous atteignions le plus grand nombre possible de nécessiteux, et que nous soyons un pont de confiance entre les bienfaiteurs et ceux qui le méritent.",
      ],
      signature: "La présidente de l'association Qawafil Al Khair",
    },
    work: {
      title: "Domaines de l'action caritative",
      subtitle: "L'axe principal de l'action de l'association sur le terrain",
      backToList: "Retour aux domaines d'action",
      readMore: "Voir les détails",
      noMediaNote: "Les photos et vidéos de ce domaine seront ajoutées prochainement.",
      mediaTitle: "Depuis le terrain",
    },
    spread: {
      title: "Qawafil Al Khair... aux quatre coins du pays",
      text: "Nous aspirons à ce que les caravanes du don parviennent à toutes les régions de la Mauritanie, et à être un soutien pour les nécessiteux où qu'ils se trouvent, convaincus que le bien ne connaît pas de distance.",
      tagline: "C'est d'ici que part le bien... et il parvient à chaque coin du pays.",
    },
    donate: {
      title: "Votre don crée un impact",
      text: "À l'association Qawafil Al Khair, nous croyons que tout don, quelle que soit son ampleur, peut changer la vie d'une personne.\nVous pouvez soutenir les actions de l'association et faire un don à ses initiatives caritatives via les applications bancaires disponibles.",
      methodsTitle: "Moyens de don",
      numberLabel: "Numéro de don",
      visualOnlyNote: "Logos présentés à titre informatif uniquement — ne constituent pas des boutons de paiement.",
      securityNote:
        "Ce site est un site de présentation et ne comporte aucun système de paiement électronique ; il ne demande ni mot de passe, ni compte utilisateur, ni données de carte bancaire. Les moyens de don reposent uniquement sur les informations publiées par l'association.",
    },
    contact: {
      title: "Contactez-nous",
      text: "Qawafil Al Khair... des cœurs proches, des portes ouvertes.\nNous croyons que le bien commence par le contact, et que chaque initiative peut changer la vie d'une personne.",
      labels: {
        address: "Siège",
        phone: "Téléphone",
        whatsapp: "WhatsApp",
        email: "E-mail",
        facebook: "Facebook",
        facebookValue: "Page de l'association Qawafil Al Khair",
      },
    },
    whatsappFabLabel: "Contactez-nous sur WhatsApp",
    footer: {
      tagline: "Qawafil Al Khair... vers une société plus solidaire.",
      linksTitle: "Liens du site",
      contactTitle: "Contact",
      rights: "Tous droits réservés",
    },
    notFound: {
      title: "Page introuvable",
      text: "La page que vous cherchez n'est pas disponible. Vous pouvez retourner à l'accueil.",
      back: "Retour à l'accueil",
    },
  },
};

export function getContent(lang: Lang): SiteContent {
  return CONTENT[lang] ?? CONTENT.ar;
}

function localize(area: WorkAreaRaw, lang: Lang): WorkArea {
  const localized = area[lang] ?? area.ar;
  return {
    slug: area.slug,
    number: area.number,
    image: area.image,
    imageFallback: area.imageFallback,
    hasMedia: area.hasMedia,
    title: localized.title,
    summary: localized.summary,
    body: localized.body,
    imageAlt: localized.imageAlt ?? "",
  };
}

export function getWorkAreas(lang: Lang): WorkArea[] {
  return WORK_AREAS.map((area) => localize(area, lang));
}

export function getWorkArea(lang: Lang, slug: string): WorkArea | null {
  const area = WORK_AREAS.find((a) => a.slug === slug);
  return area ? localize(area, lang) : null;
}
