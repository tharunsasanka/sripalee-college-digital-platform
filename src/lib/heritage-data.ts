export type HeritageRecord = {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  significance: string;
  sourceStatus: string;
  keywords: string[];
};

export type HeritageFigure = {
  name: string;
  role: string;
  period: string;
  summary: string;
  publicationStatus: string;
};

export const heritageFacts = [
  {
    value: "1934",
    label: "Foundation year",
  },
  {
    value: "8",
    label: "Proposed archive categories",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Source-led",
    label: "Publication model",
  },
];

export const heritageCategories = [
  "All Records",
  "Founding History",
  "People",
  "Buildings",
  "Documents",
  "Photographs",
  "Traditions",
  "Oral History",
];

export const heritageRecords: HeritageRecord[] = [
  {
    id: "foundation-stone-1934",
    title: "Foundation Stone Ceremony",
    year: "1934",
    category: "Founding History",
    summary:
      "A central record documenting the establishment of Sripalee College and its connection with the school’s founding educational vision.",
    significance:
      "This event provides the principal chronological reference for the school’s formal beginning.",
    sourceStatus: "Authoritative source identified",
    keywords: [
      "foundation",
      "ceremony",
      "1934",
      "school opening",
      "history",
    ],
  },
  {
    id: "wilmot-a-perera",
    title: "Wilmot A. Perera and the Founding Vision",
    year: "Founding era",
    category: "People",
    summary:
      "A biographical archive section presenting the founder’s educational vision, public service and contribution to Sripalee College.",
    significance:
      "The founder’s work provides important context for the school’s cultural and educational identity.",
    sourceStatus: "Detailed source review required",
    keywords: [
      "Wilmot A. Perera",
      "founder",
      "education",
      "public service",
      "vision",
    ],
  },
  {
    id: "rabindranath-tagore",
    title: "Rabindranath Tagore and Sripalee College",
    year: "1934",
    category: "People",
    summary:
      "A historical section explaining Rabindranath Tagore’s documented connection with the foundation of Sripalee College.",
    significance:
      "The connection reflects the school’s long-standing relationship with education, art and cultural learning.",
    sourceStatus: "Authoritative source identified",
    keywords: [
      "Rabindranath Tagore",
      "Tagore",
      "1934",
      "culture",
      "education",
    ],
  },
  {
    id: "early-campus",
    title: "Early Campus Development",
    year: "Early period",
    category: "Buildings",
    summary:
      "A proposed collection of records showing the early development of classrooms, cultural spaces and school facilities.",
    significance:
      "Campus-development records help explain how the school expanded over time.",
    sourceStatus: "School archive confirmation required",
    keywords: [
      "campus",
      "buildings",
      "classrooms",
      "development",
      "architecture",
    ],
  },
  {
    id: "rabindra-memorial",
    title: "Rabindra Memorial Library and Hall",
    year: "Historical landmark",
    category: "Buildings",
    summary:
      "An archive entry for the historically significant library and hall associated with the school’s cultural identity.",
    significance:
      "The site represents the relationship between learning, heritage, performance and community activity.",
    sourceStatus: "Historical details require verification",
    keywords: [
      "Rabindra Memorial",
      "library",
      "hall",
      "building",
      "heritage",
    ],
  },
  {
    id: "official-registers",
    title: "Official Registers and Institutional Records",
    year: "Multiple periods",
    category: "Documents",
    summary:
      "A controlled collection of approved registers, reports, programmes, publications and institutional documents.",
    significance:
      "Official documents provide evidence for dates, appointments, events and school development.",
    sourceStatus: "Access and publication approval required",
    keywords: [
      "registers",
      "documents",
      "reports",
      "records",
      "publications",
    ],
  },
  {
    id: "historical-photographs",
    title: "Historical Photograph Collection",
    year: "Multiple periods",
    category: "Photographs",
    summary:
      "A curated collection of approved photographs showing school buildings, events, staff, students and community life.",
    significance:
      "Photographs help preserve visual evidence of school life across different periods.",
    sourceStatus: "Dates, identities and permissions required",
    keywords: [
      "photographs",
      "gallery",
      "students",
      "staff",
      "events",
    ],
  },
  {
    id: "school-traditions",
    title: "School Traditions and Ceremonies",
    year: "Continuing history",
    category: "Traditions",
    summary:
      "A collection explaining approved ceremonies, annual activities, school customs and long-standing community practices.",
    significance:
      "Traditions demonstrate how the school’s values and identity continue across generations.",
    sourceStatus: "Official descriptions required",
    keywords: [
      "traditions",
      "ceremonies",
      "customs",
      "annual events",
      "identity",
    ],
  },
  {
    id: "oral-history",
    title: "Oral History Collection",
    year: "Recorded memories",
    category: "Oral History",
    summary:
      "Approved interviews and recollections from former principals, teachers, students, staff and community members.",
    significance:
      "Oral history can preserve experiences that may not appear in formal documents.",
    sourceStatus: "Consent and editorial review required",
    keywords: [
      "oral history",
      "interviews",
      "memories",
      "past pupils",
      "teachers",
    ],
  },
];

export const heritageFigures: HeritageFigure[] = [
  {
    name: "Wilmot A. Perera",
    role: "Founder",
    period: "Founding era",
    summary:
      "The final archive will present an evidence-based biography, educational vision and documented contribution to the establishment of Sripalee College.",
    publicationStatus: "Biography and photographs require source confirmation",
  },
  {
    name: "Rabindranath Tagore",
    role: "Historical figure connected with the foundation",
    period: "1934",
    summary:
      "The archive will explain Tagore’s documented connection with the school while clearly identifying the sources supporting each historical statement.",
    publicationStatus: "Use approved historical sources and media",
  },
  {
    name: "Former Principals",
    role: "Institutional leadership archive",
    period: "Multiple periods",
    summary:
      "A chronological directory can preserve approved names, periods of service, photographs and major institutional developments.",
    publicationStatus: "Official appointment records required",
  },
];

export const archiveCollectionTypes = [
  {
    title: "Documents",
    icon: "documents",
    description:
      "Reports, registers, programmes, publications, letters and approved administrative records.",
  },
  {
    title: "Photographs",
    icon: "photographs",
    description:
      "Historic buildings, events, staff, students, ceremonies and school activities.",
  },
  {
    title: "Audio and Interviews",
    icon: "audio",
    description:
      "Approved oral-history recordings, speeches and historical recollections.",
  },
  {
    title: "Historical Timeline",
    icon: "timeline",
    description:
      "Source-backed milestones arranged by year, period and institutional significance.",
  },
  {
    title: "People",
    icon: "people",
    description:
      "Founders, principals, teachers, past pupils and approved community contributors.",
  },
  {
    title: "Buildings and Places",
    icon: "buildings",
    description:
      "Campus spaces, historical buildings, architectural records and location histories.",
  },
];

export const preservationProcess = [
  {
    step: "01",
    title: "Collect",
    description:
      "Receive documents, photographs, recordings and historical information from approved sources.",
  },
  {
    step: "02",
    title: "Assess",
    description:
      "Check condition, relevance, ownership, permissions and possible privacy concerns.",
  },
  {
    step: "03",
    title: "Digitise",
    description:
      "Create appropriate digital copies while protecting the original material.",
  },
  {
    step: "04",
    title: "Describe",
    description:
      "Record title, date, creator, source, people, location, category and contextual information.",
  },
  {
    step: "05",
    title: "Verify",
    description:
      "Compare important claims against official records and other reliable evidence.",
  },
  {
    step: "06",
    title: "Approve",
    description:
      "Obtain the necessary administrative, privacy and copyright approval.",
  },
  {
    step: "07",
    title: "Publish",
    description:
      "Release the approved public version while retaining protected archival information.",
  },
  {
    step: "08",
    title: "Preserve",
    description:
      "Maintain backups, file-integrity checks, access logs and long-term archive formats.",
  },
];

export const heritagePublishingRules = [
  "Every archive item should include a title, date or period, category, source and verification status.",
  "Historical claims should be separated from personal recollections and unverified interpretations.",
  "Student and staff photographs require appropriate publication permission.",
  "Private registers and personal records must not be published through the public archive.",
  "Copyright ownership and reuse permission should be recorded for every uploaded item.",
  "Original files should be preserved separately from compressed public copies.",
  "Archived material should use secure backups and file-integrity monitoring.",
  "Corrections must retain an audit history showing what changed and who approved the change.",
];