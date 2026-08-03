export type LanguageCode = "en" | "si" | "ta";

const englishTranslations = {
  languageLabel: "Language",
  selectLanguage: "Select language",
  english: "English",
  sinhala: "Sinhala",
  tamil: "Tamil",
  currentLanguage: "Current language",
  preferenceSaved: "Language preference saved on this device.",
  openLanguageCentre: "Language information",
  closeLanguageSelector: "Close language selector",
  centreEyebrow: "Language Access",
  centreTitle: "Choose the language that works best for you.",
  centreDescription:
    "The Sripalee College digital platform is being prepared to provide important public information in English, Sinhala and Tamil.",
  currentSelection: "Current selection",
  supportedLanguages: "Supported languages",
  translationStatus: "Translation status",
  translationStatusDescription:
    "Official translations require review and approval before publication.",
  englishStatus: "English",
  englishStatusText:
    "The current development content is primarily available in English.",
  sinhalaStatus: "Sinhala",
  sinhalaStatusText:
    "Approved Sinhala translations will be added progressively.",
  tamilStatus: "Tamil",
  tamilStatusText:
    "Approved Tamil translations will be added progressively.",
  languagePrinciples: "Language publishing principles",
  principleOneTitle: "Approved translations",
  principleOneDescription:
    "Important notices and instructions should be reviewed by an authorised language editor.",
  principleTwoTitle: "Consistent meaning",
  principleTwoDescription:
    "Translated versions should communicate the same dates, instructions, warnings and requirements.",
  principleThreeTitle: "Accessible language",
  principleThreeDescription:
    "Public information should use clear wording that students, families and visitors can understand.",
  principleFourTitle: "Version control",
  principleFourDescription:
    "When one language version changes, the related translations should be reviewed and updated.",
  reportTranslationIssue: "Report a translation issue",
  returnHome: "Return to homepage",
  developmentNotice:
    "Selecting a language currently changes the global language preference and multilingual interface components.",
} as const;

export type TranslationKey = keyof typeof englishTranslations;

export const translations: Record<
  LanguageCode,
  Record<TranslationKey, string>
> = {
  en: englishTranslations,
  si: {
    languageLabel: "භාෂාව",
    selectLanguage: "භාෂාව තෝරන්න",
    english: "ඉංග්‍රීසි",
    sinhala: "සිංහල",
    tamil: "දෙමළ",
    currentLanguage: "වත්මන් භාෂාව",
    preferenceSaved: "භාෂා තේරීම මෙම උපාංගයේ සුරැකිණි.",
    openLanguageCentre: "භාෂා තොරතුරු",
    closeLanguageSelector: "භාෂා තේරීම වසන්න",
    centreEyebrow: "භාෂා ප්‍රවේශය",
    centreTitle: "ඔබට වඩාත් සුදුසු භාෂාව තෝරන්න.",
    centreDescription:
      "ශ්‍රීපාලී විද්‍යාලයේ ඩිජිටල් වේදිකාව වැදගත් පොදු තොරතුරු ඉංග්‍රීසි, සිංහල සහ දෙමළ භාෂාවලින් ලබාදීමට සකස් කරමින් පවතී.",
    currentSelection: "වත්මන් තේරීම",
    supportedLanguages: "සහාය දක්වන භාෂා",
    translationStatus: "පරිවර්තන තත්ත්වය",
    translationStatusDescription:
      "නිල පරිවර්තන ප්‍රකාශයට පෙර සමාලෝචනය කර අනුමත කළ යුතුය.",
    englishStatus: "ඉංග්‍රීසි",
    englishStatusText:
      "වත්මන් සංවර්ධන අන්තර්ගතය ප්‍රධාන වශයෙන් ඉංග්‍රීසි භාෂාවෙන් ලබා ගත හැක.",
    sinhalaStatus: "සිංහල",
    sinhalaStatusText:
      "අනුමත සිංහල පරිවර්තන අදියරෙන් අදියර එක් කරනු ඇත.",
    tamilStatus: "දෙමළ",
    tamilStatusText:
      "අනුමත දෙමළ පරිවර්තන අදියරෙන් අදියර එක් කරනු ඇත.",
    languagePrinciples: "භාෂා ප්‍රකාශන මූලධර්ම",
    principleOneTitle: "අනුමත පරිවර්තන",
    principleOneDescription:
      "වැදගත් නිවේදන සහ උපදෙස් බලයලත් භාෂා සංස්කාරකයෙකු විසින් සමාලෝචනය කළ යුතුය.",
    principleTwoTitle: "එකම අර්ථය",
    principleTwoDescription:
      "සියලු පරිවර්තනවල එකම දිනයන්, උපදෙස්, අවවාද සහ අවශ්‍යතා සඳහන් විය යුතුය.",
    principleThreeTitle: "පහසුවෙන් තේරුම් ගත හැකි භාෂාව",
    principleThreeDescription:
      "පොදු තොරතුරු සිසුන්ට, පවුල්වලට සහ අමුත්තන්ට පහසුවෙන් තේරුම් ගත හැකි විය යුතුය.",
    principleFourTitle: "අනුවාද පාලනය",
    principleFourDescription:
      "එක් භාෂා අනුවාදයක් වෙනස් වූ විට අනෙකුත් පරිවර්තනද සමාලෝචනය කර යාවත්කාලීන කළ යුතුය.",
    reportTranslationIssue: "පරිවර්තන ගැටලුවක් වාර්තා කරන්න",
    returnHome: "මුල් පිටුවට යන්න",
    developmentNotice:
      "භාෂාවක් තේරීමෙන් දැනට ගෝලීය භාෂා තේරීම සහ බහුභාෂා අතුරුමුහුණත් කොටස් වෙනස් වේ.",
  },
  ta: {
    languageLabel: "மொழி",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    english: "ஆங்கிலம்",
    sinhala: "சிங்களம்",
    tamil: "தமிழ்",
    currentLanguage: "தற்போதைய மொழி",
    preferenceSaved: "மொழித் தேர்வு இந்தச் சாதனத்தில் சேமிக்கப்பட்டது.",
    openLanguageCentre: "மொழித் தகவல்",
    closeLanguageSelector: "மொழித் தேர்வை மூடவும்",
    centreEyebrow: "மொழி அணுகல்",
    centreTitle: "உங்களுக்கு மிகவும் பொருத்தமான மொழியைத் தேர்ந்தெடுக்கவும்.",
    centreDescription:
      "ஸ்ரீபாலி கல்லூரியின் டிஜிட்டல் தளம் முக்கிய பொதுத் தகவல்களை ஆங்கிலம், சிங்களம் மற்றும் தமிழ் மொழிகளில் வழங்கத் தயாராக்கப்படுகிறது.",
    currentSelection: "தற்போதைய தேர்வு",
    supportedLanguages: "ஆதரிக்கப்படும் மொழிகள்",
    translationStatus: "மொழிபெயர்ப்பு நிலை",
    translationStatusDescription:
      "அதிகாரப்பூர்வ மொழிபெயர்ப்புகள் வெளியீட்டிற்கு முன் பரிசீலிக்கப்பட்டு அங்கீகரிக்கப்பட வேண்டும்.",
    englishStatus: "ஆங்கிலம்",
    englishStatusText:
      "தற்போதைய மேம்பாட்டு உள்ளடக்கம் பெரும்பாலும் ஆங்கிலத்தில் கிடைக்கிறது.",
    sinhalaStatus: "சிங்களம்",
    sinhalaStatusText:
      "அங்கீகரிக்கப்பட்ட சிங்கள மொழிபெயர்ப்புகள் படிப்படியாக சேர்க்கப்படும்.",
    tamilStatus: "தமிழ்",
    tamilStatusText:
      "அங்கீகரிக்கப்பட்ட தமிழ் மொழிபெயர்ப்புகள் படிப்படியாக சேர்க்கப்படும்.",
    languagePrinciples: "மொழி வெளியீட்டு கொள்கைகள்",
    principleOneTitle: "அங்கீகரிக்கப்பட்ட மொழிபெயர்ப்புகள்",
    principleOneDescription:
      "முக்கிய அறிவிப்புகள் மற்றும் வழிமுறைகள் அங்கீகரிக்கப்பட்ட மொழி ஆசிரியரால் பரிசீலிக்கப்பட வேண்டும்.",
    principleTwoTitle: "ஒரே பொருள்",
    principleTwoDescription:
      "அனைத்து மொழிப் பதிப்புகளும் ஒரே தேதிகள், வழிமுறைகள், எச்சரிக்கைகள் மற்றும் தேவைகளை வழங்க வேண்டும்.",
    principleThreeTitle: "தெளிவான மொழி",
    principleThreeDescription:
      "பொதுத் தகவல் மாணவர்கள், குடும்பங்கள் மற்றும் பார்வையாளர்களுக்கு புரியும் வகையில் எழுதப்பட வேண்டும்.",
    principleFourTitle: "பதிப்பு கட்டுப்பாடு",
    principleFourDescription:
      "ஒரு மொழிப் பதிப்பு மாறும்போது தொடர்புடைய மொழிபெயர்ப்புகளும் பரிசீலிக்கப்பட்டு புதுப்பிக்கப்பட வேண்டும்.",
    reportTranslationIssue: "மொழிபெயர்ப்பு சிக்கலைப் புகாரளிக்கவும்",
    returnHome: "முகப்புப் பக்கத்திற்குத் திரும்பவும்",
    developmentNotice:
      "ஒரு மொழியைத் தேர்ந்தெடுப்பது தற்போது உலகளாவிய மொழி விருப்பத்தையும் பல்மொழி இடைமுகப் பகுதிகளையும் மாற்றும்.",
  },
};

export const languageOptions: {
  code: LanguageCode;
  nativeName: string;
  shortLabel: string;
}[] = [
  {
    code: "en",
    nativeName: "English",
    shortLabel: "EN",
  },
  {
    code: "si",
    nativeName: "සිංහල",
    shortLabel: "සිං",
  },
  {
    code: "ta",
    nativeName: "தமிழ்",
    shortLabel: "த",
  },
];

export function getTranslation(
  language: LanguageCode,
  key: TranslationKey,
) {
  return translations[language][key] ?? translations.en[key];
}

export function isLanguageCode(value: string): value is LanguageCode {
  return value === "en" || value === "si" || value === "ta";
}