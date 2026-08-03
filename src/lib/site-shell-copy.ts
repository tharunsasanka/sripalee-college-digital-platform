import type { LanguageCode } from "@/lib/language";

type LocalizedText = Record<LanguageCode, string>;

export type SiteNavigationItem = {
  href: string;
  label: LocalizedText;
  keywords: LocalizedText;
  primary: boolean;
};

export const siteNavigation: SiteNavigationItem[] = [
  {
    href: "/",
    label: {
      en: "Home",
      si: "මුල් පිටුව",
      ta: "முகப்பு",
    },
    keywords: {
      en: "home welcome school",
      si: "මුල් පිටුව පාසල",
      ta: "முகப்பு பாடசாலை",
    },
    primary: true,
  },
  {
    href: "/about",
    label: {
      en: "Our School",
      si: "අපේ පාසල",
      ta: "எங்கள் பாடசாலை",
    },
    keywords: {
      en: "about school profile vision mission principal",
      si: "පාසල දැක්ම මෙහෙවර විදුහල්පති",
      ta: "பாடசாலை நோக்கம் பணி அதிபர்",
    },
    primary: true,
  },
  {
    href: "/academics",
    label: {
      en: "Academics",
      si: "අධ්‍යයන",
      ta: "கல்வி",
    },
    keywords: {
      en: "academics subjects grades departments examinations",
      si: "අධ්‍යයන විෂය ශ්‍රේණි විභාග",
      ta: "கல்வி பாடங்கள் வகுப்புகள் பரீட்சைகள்",
    },
    primary: true,
  },
  {
    href: "/staff",
    label: {
      en: "Staff",
      si: "කාර්ය මණ්ඩලය",
      ta: "பணியாளர்கள்",
    },
    keywords: {
      en: "staff teachers principal administration",
      si: "ගුරුවරු කාර්ය මණ්ඩලය පරිපාලනය",
      ta: "ஆசிரியர்கள் பணியாளர்கள் நிர்வாகம்",
    },
    primary: true,
  },
  {
    href: "/school-life",
    label: {
      en: "School Life",
      si: "පාසල් ජීවිතය",
      ta: "பாடசாலை வாழ்க்கை",
    },
    keywords: {
      en: "sports clubs societies culture activities",
      si: "ක්‍රීඩා සංගම් සංස්කෘතිය ක්‍රියාකාරකම්",
      ta: "விளையாட்டு கழகங்கள் கலாசாரம் செயல்பாடுகள்",
    },
    primary: true,
  },
  {
    href: "/news",
    label: {
      en: "News",
      si: "පුවත්",
      ta: "செய்திகள்",
    },
    keywords: {
      en: "news notices announcements updates",
      si: "පුවත් නිවේදන යාවත්කාලීන",
      ta: "செய்திகள் அறிவிப்புகள் புதுப்பிப்புகள்",
    },
    primary: true,
  },
  {
    href: "/heritage",
    label: {
      en: "Heritage",
      si: "උරුමය",
      ta: "பாரம்பரியம்",
    },
    keywords: {
      en: "heritage history archive museum photographs",
      si: "උරුමය ඉතිහාසය ලේඛනාගාරය ඡායාරූප",
      ta: "பாரம்பரியம் வரலாறு காப்பகம் புகைப்படங்கள்",
    },
    primary: true,
  },
  {
    href: "/resources",
    label: {
      en: "Resources",
      si: "සම්පත්",
      ta: "வளங்கள்",
    },
    keywords: {
      en: "resources downloads forms documents calendar",
      si: "සම්පත් බාගත කිරීම් පෝරම ලේඛන",
      ta: "வளங்கள் பதிவிறக்கங்கள் படிவங்கள் ஆவணங்கள்",
    },
    primary: true,
  },
  {
    href: "/contact",
    label: {
      en: "Contact",
      si: "සම්බන්ධ වන්න",
      ta: "தொடர்பு",
    },
    keywords: {
      en: "contact telephone email location enquiry",
      si: "සම්බන්ධ දුරකථන ඊමේල් ස්ථානය",
      ta: "தொடர்பு தொலைபேசி மின்னஞ்சல் இடம்",
    },
    primary: true,
  },
  {
    href: "/events",
    label: {
      en: "Events",
      si: "උත්සව",
      ta: "நிகழ்வுகள்",
    },
    keywords: {
      en: "events calendar sports meetings programmes",
      si: "උත්සව දින දර්ශනය ක්‍රීඩා රැස්වීම්",
      ta: "நிகழ்வுகள் நாட்காட்டி விளையாட்டு கூட்டங்கள்",
    },
    primary: false,
  },
  {
    href: "/admissions",
    label: {
      en: "Admissions",
      si: "ඇතුළත් කිරීම්",
      ta: "சேர்க்கை",
    },
    keywords: {
      en: "admissions applications registration students",
      si: "ඇතුළත් කිරීම් අයදුම්පත් ලියාපදිංචිය",
      ta: "சேர்க்கை விண்ணப்பங்கள் பதிவு",
    },
    primary: false,
  },
  {
    href: "/noticeboard",
    label: {
      en: "Digital Noticeboard",
      si: "ඩිජිටල් දැන්වීම් පුවරුව",
      ta: "டிஜிட்டல் அறிவிப்புப் பலகை",
    },
    keywords: {
      en: "digital noticeboard television announcements display",
      si: "ඩිජිටල් දැන්වීම් පුවරුව නිවේදන",
      ta: "டிஜிட்டல் அறிவிப்புப் பலகை திரை",
    },
    primary: false,
  },
  {
    href: "/portal",
    label: {
      en: "Digital Portal",
      si: "ඩිජිටල් ද්වාරය",
      ta: "டிஜிட்டல் தளம்",
    },
    keywords: {
      en: "portal student parent staff login",
      si: "ද්වාරය ශිෂ්‍ය දෙමාපිය කාර්ය මණ්ඩලය",
      ta: "தளம் மாணவர் பெற்றோர் பணியாளர்",
    },
    primary: false,
  },
  {
    href: "/accessibility",
    label: {
      en: "Accessibility",
      si: "ප්‍රවේශවීම",
      ta: "அணுகல்தன்மை",
    },
    keywords: {
      en: "accessibility reading keyboard contrast support",
      si: "ප්‍රවේශවීම කියවීම යතුරුපුවරුව",
      ta: "அணுகல்தன்மை வாசிப்பு விசைப்பலகை",
    },
    primary: false,
  },
  {
    href: "/language",
    label: {
      en: "Language Access",
      si: "භාෂා ප්‍රවේශය",
      ta: "மொழி அணுகல்",
    },
    keywords: {
      en: "language english sinhala tamil translation",
      si: "භාෂාව ඉංග්‍රීසි සිංහල දෙමළ",
      ta: "மொழி ஆங்கிலம் சிங்களம் தமிழ்",
    },
    primary: false,
  },
];

export const shellCopy: Record<
  LanguageCode,
  {
    schoolName: string;
    location: string;
    menu: string;
    closeMenu: string;
    search: string;
    closeSearch: string;
    searchTitle: string;
    searchDescription: string;
    searchPlaceholder: string;
    searchResults: string;
    noResults: string;
    noResultsDescription: string;
    portal: string;
    noticeLabel: string;
    noticeMessage: string;
    viewNotices: string;
    quickLinks: string;
    officialContact: string;
    contactPending: string;
    platformDescription: string;
    privacyAccessibility: string;
    developmentProject: string;
    developmentStatus: string;
    languageCentre: string;
    accessibility: string;
    copyright: string;
  }
> = {
  en: {
    schoolName: "Sripalee College",
    location: "Horana, Sri Lanka",
    menu: "Open navigation",
    closeMenu: "Close navigation",
    search: "Search the platform",
    closeSearch: "Close search",
    searchTitle: "Search Sripalee College",
    searchDescription:
      "Search pages, services, notices, resources and digital features.",
    searchPlaceholder: "Search the website",
    searchResults: "Search results",
    noResults: "No matching pages",
    noResultsDescription:
      "Try another word such as notices, events, resources or portal.",
    portal: "Portal",
    noticeLabel: "School notices",
    noticeMessage:
      "Check approved announcements, events and important school information.",
    viewNotices: "View notices",
    quickLinks: "Quick Links",
    officialContact: "Official Contact",
    contactPending: "Pending school confirmation",
    platformDescription:
      "A secure, multilingual and accessible government-school digital platform preserving the identity and heritage of Sripalee College.",
    privacyAccessibility:
      "Privacy, accessibility and security by design",
    developmentProject: "Digital platform development project",
    developmentStatus:
      "Development preview · Not yet an official school service",
    languageCentre: "Language Access",
    accessibility: "Accessibility",
    copyright: "Sripalee College Digital Platform",
  },
  si: {
    schoolName: "ශ්‍රීපාලී විද්‍යාලය",
    location: "හොරණ, ශ්‍රී ලංකාව",
    menu: "සංචාලනය විවෘත කරන්න",
    closeMenu: "සංචාලනය වසන්න",
    search: "වේදිකාව සොයන්න",
    closeSearch: "සෙවීම වසන්න",
    searchTitle: "ශ්‍රීපාලී විද්‍යාලය සොයන්න",
    searchDescription:
      "පිටු, සේවා, නිවේදන, සම්පත් සහ ඩිජිටල් පහසුකම් සොයන්න.",
    searchPlaceholder: "වෙබ් අඩවිය සොයන්න",
    searchResults: "සෙවුම් ප්‍රතිඵල",
    noResults: "ගැළපෙන පිටු නොමැත",
    noResultsDescription:
      "නිවේදන, උත්සව, සම්පත් හෝ ද්වාරය වැනි වෙනත් වචනයක් භාවිත කරන්න.",
    portal: "ද්වාරය",
    noticeLabel: "පාසල් නිවේදන",
    noticeMessage:
      "අනුමත නිවේදන, උත්සව සහ වැදගත් පාසල් තොරතුරු පරීක්ෂා කරන්න.",
    viewNotices: "නිවේදන බලන්න",
    quickLinks: "ඉක්මන් සබැඳි",
    officialContact: "නිල සම්බන්ධතා",
    contactPending: "පාසල් තහවුරු කිරීම අපේක්ෂිතයි",
    platformDescription:
      "ශ්‍රීපාලී විද්‍යාලයේ අනන්‍යතාවය සහ උරුමය සුරකින ආරක්ෂිත, බහුභාෂා සහ ප්‍රවේශවිය හැකි රජයේ පාසල් ඩිජිටල් වේදිකාවක්.",
    privacyAccessibility:
      "පෞද්ගලිකත්වය, ප්‍රවේශවීම සහ ආරක්ෂාව මූලික කරගත් නිර්මාණය",
    developmentProject: "ඩිජිටල් වේදිකා සංවර්ධන ව්‍යාපෘතිය",
    developmentStatus:
      "සංවර්ධන පෙරදසුන · මෙය තවමත් නිල පාසල් සේවාවක් නොවේ",
    languageCentre: "භාෂා ප්‍රවේශය",
    accessibility: "ප්‍රවේශවීම",
    copyright: "ශ්‍රීපාලී විද්‍යාලය ඩිජිටල් වේදිකාව",
  },
  ta: {
    schoolName: "ஸ்ரீபாலி கல்லூரி",
    location: "ஹொரணை, இலங்கை",
    menu: "வழிசெலுத்தலைத் திறக்கவும்",
    closeMenu: "வழிசெலுத்தலை மூடவும்",
    search: "தளத்தைத் தேடவும்",
    closeSearch: "தேடலை மூடவும்",
    searchTitle: "ஸ்ரீபாலி கல்லூரியைத் தேடவும்",
    searchDescription:
      "பக்கங்கள், சேவைகள், அறிவிப்புகள், வளங்கள் மற்றும் டிஜிட்டல் அம்சங்களைத் தேடவும்.",
    searchPlaceholder: "இணையதளத்தைத் தேடவும்",
    searchResults: "தேடல் முடிவுகள்",
    noResults: "பொருந்தும் பக்கங்கள் இல்லை",
    noResultsDescription:
      "அறிவிப்புகள், நிகழ்வுகள், வளங்கள் அல்லது தளம் போன்ற வேறு சொல்லை முயற்சிக்கவும்.",
    portal: "தளம்",
    noticeLabel: "பாடசாலை அறிவிப்புகள்",
    noticeMessage:
      "அங்கீகரிக்கப்பட்ட அறிவிப்புகள், நிகழ்வுகள் மற்றும் முக்கிய பாடசாலைத் தகவல்களைப் பார்க்கவும்.",
    viewNotices: "அறிவிப்புகளைப் பார்க்கவும்",
    quickLinks: "விரைவு இணைப்புகள்",
    officialContact: "அதிகாரப்பூர்வ தொடர்பு",
    contactPending: "பாடசாலை உறுதிப்படுத்தல் நிலுவையில் உள்ளது",
    platformDescription:
      "ஸ்ரீபாலி கல்லூரியின் அடையாளத்தையும் பாரம்பரியத்தையும் பாதுகாக்கும் பாதுகாப்பான, பல்மொழி மற்றும் அணுகக்கூடிய அரச பாடசாலை டிஜிட்டல் தளம்.",
    privacyAccessibility:
      "தனியுரிமை, அணுகல்தன்மை மற்றும் பாதுகாப்பை மையமாகக் கொண்ட வடிவமைப்பு",
    developmentProject: "டிஜிட்டல் தள மேம்பாட்டுத் திட்டம்",
    developmentStatus:
      "மேம்பாட்டு முன்னோட்டம் · இது இன்னும் அதிகாரப்பூர்வ பாடசாலைச் சேவை அல்ல",
    languageCentre: "மொழி அணுகல்",
    accessibility: "அணுகல்தன்மை",
    copyright: "ஸ்ரீபாலி கல்லூரி டிஜிட்டல் தளம்",
  },
};