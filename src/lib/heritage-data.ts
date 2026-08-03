export type HeritageRecord = {
  id: string;
  reference: string;
  title: string;
  year: string;
  category: string;
  collection: string;
  evidenceType: string;
  summary: string;
  significance: string;
  sourceStatus: string;
  keywords: string[];
};

export type HeritageFigure = {
  name: string;
  initials: string;
  role: string;
  period: string;
  summary: string;
  focus: string[];
  publicationStatus: string;
};

export const heritageFacts = [
  {
    value: "1934",
    label: "Foundation year",
  },
  {
    value: "8",
    label: "Archive categories",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Verified",
    label: "Publication standard",
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
    reference: "SC-FA-1934-001",
    title: "Foundation Stone Ceremony",
    year: "1934",
    category: "Founding History",
    collection: "Founding Archive",
    evidenceType: "Historical record",
    summary:
      "A central archival record documenting the formal beginning of Sripalee College and its connection with an educational vision shaped by culture, learning and public service.",
    significance:
      "The ceremony provides the principal chronological reference for the establishment of the school.",
    sourceStatus: "Authoritative historical source identified",
    keywords: [
      "foundation",
      "ceremony",
      "1934",
      "Rabindranath Tagore",
      "Wilmot A. Perera",
    ],
  },
  {
    id: "wilmot-a-perera",
    reference: "SC-BIO-FND-001",
    title: "Wilmot A. Perera and the Founding Vision",
    year: "Founding era",
    category: "People",
    collection: "Biographical Archive",
    evidenceType: "Biographical record",
    summary:
      "A proposed evidence-based biography presenting the founder’s educational vision, public service and contribution to the establishment of Sripalee College.",
    significance:
      "The founder’s work provides essential context for understanding the school’s educational and cultural identity.",
    sourceStatus: "Detailed source confirmation required",
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
    reference: "SC-BIO-TAG-1934",
    title: "Rabindranath Tagore and Sripalee College",
    year: "1934",
    category: "People",
    collection: "Biographical Archive",
    evidenceType: "Historical biography",
    summary:
      "A historical record explaining Rabindranath Tagore’s documented connection with the foundation of Sripalee College.",
    significance:
      "The connection represents the school’s historic relationship with education, literature, art and cultural learning.",
    sourceStatus: "Authoritative historical source identified",
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
    reference: "SC-ARC-CAM-001",
    title: "Early Campus Development",
    year: "Early period",
    category: "Buildings",
    collection: "Campus Archive",
    evidenceType: "Architectural record",
    summary:
      "A proposed collection showing the development of early classrooms, learning areas, cultural spaces and institutional facilities.",
    significance:
      "Campus records demonstrate how the physical school environment developed across different periods.",
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
    reference: "SC-ARC-BLD-002",
    title: "Rabindra Memorial Library and Hall",
    year: "Historic landmark",
    category: "Buildings",
    collection: "Built Heritage Collection",
    evidenceType: "Building history",
    summary:
      "An archival entry presenting the historically significant library and hall associated with the school’s educational and cultural identity.",
    significance:
      "The site represents the relationship between learning, heritage, performance and community activity.",
    sourceStatus: "Detailed historical verification required",
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
    reference: "SC-DOC-REG-001",
    title: "Official Registers and Institutional Records",
    year: "Multiple periods",
    category: "Documents",
    collection: "Institutional Records",
    evidenceType: "Primary document",
    summary:
      "A controlled collection of approved registers, reports, programmes, publications and institutional documents.",
    significance:
      "Official documents provide evidence for dates, appointments, events, academic development and administrative history.",
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
    reference: "SC-PHO-COL-001",
    title: "Historical Photograph Collection",
    year: "Multiple periods",
    category: "Photographs",
    collection: "Photographic Archive",
    evidenceType: "Visual record",
    summary:
      "A curated collection of approved photographs showing school buildings, events, staff, students and community life.",
    significance:
      "Photographs preserve visual evidence of institutional identity and school life across generations.",
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
    reference: "SC-TRD-COL-001",
    title: "School Traditions and Ceremonies",
    year: "Continuing history",
    category: "Traditions",
    collection: "Living Heritage Collection",
    evidenceType: "Cultural record",
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
    reference: "SC-ORL-COL-001",
    title: "Oral History Collection",
    year: "Recorded memories",
    category: "Oral History",
    collection: "Recorded Memory Archive",
    evidenceType: "Audio testimony",
    summary:
      "Approved interviews and recollections from former principals, teachers, students, staff and community members.",
    significance:
      "Oral history can preserve personal experiences and institutional memories that may not appear in formal documents.",
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
    initials: "WP",
    role: "Founder",
    period: "Founding era",
    summary:
      "The archive will present an evidence-based biography, educational vision and documented contribution to the establishment of Sripalee College.",
    focus: [
      "Educational vision",
      "Public service",
      "Founding history",
      "Cultural learning",
    ],
    publicationStatus:
      "Biography, dates and photographs require source confirmation",
  },
  {
    name: "Rabindranath Tagore",
    initials: "RT",
    role: "Historical figure connected with the foundation",
    period: "1934",
    summary:
      "The archive will explain Tagore’s documented connection with the school while identifying the source supporting each historical statement.",
    focus: [
      "Foundation ceremony",
      "Education and culture",
      "Literature and the arts",
      "Historical relationship",
    ],
    publicationStatus:
      "Use only approved historical sources and authorised media",
  },
  {
    name: "Former Principals",
    initials: "FP",
    role: "Institutional leadership archive",
    period: "Multiple periods",
    summary:
      "A chronological directory can preserve approved names, periods of service, photographs and major institutional developments.",
    focus: [
      "Periods of service",
      "Institutional development",
      "Leadership records",
      "Approved photographs",
    ],
    publicationStatus: "Official appointment records required",
  },
];

export const archiveCollectionTypes = [
  {
    title: "Documents",
    code: "DOC",
    icon: "documents",
    description:
      "Registers, reports, programmes, publications, letters and approved administrative records.",
  },
  {
    title: "Photographs",
    code: "PHO",
    icon: "photographs",
    description:
      "Historical buildings, events, staff, students, ceremonies and school activities.",
  },
  {
    title: "Audio and Interviews",
    code: "ORL",
    icon: "audio",
    description:
      "Approved oral-history recordings, speeches, interviews and historical recollections.",
  },
  {
    title: "Historical Timeline",
    code: "TIM",
    icon: "timeline",
    description:
      "Source-backed milestones arranged according to year, period and institutional significance.",
  },
  {
    title: "People",
    code: "BIO",
    icon: "people",
    description:
      "Founders, principals, teachers, past pupils and approved community contributors.",
  },
  {
    title: "Buildings and Places",
    code: "BLD",
    icon: "buildings",
    description:
      "Campus spaces, historic buildings, architectural records and location histories.",
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
      "Create appropriate digital copies while protecting original archival material.",
  },
  {
    step: "04",
    title: "Describe",
    description:
      "Record title, date, creator, source, people, location and contextual information.",
  },
  {
    step: "05",
    title: "Verify",
    description:
      "Compare important historical claims against official records and reliable evidence.",
  },
  {
    step: "06",
    title: "Approve",
    description:
      "Obtain administrative, privacy, consent and copyright approval.",
  },
  {
    step: "07",
    title: "Publish",
    description:
      "Release an approved public version while retaining protected archival information.",
  },
  {
    step: "08",
    title: "Preserve",
    description:
      "Maintain backups, integrity checks, access logs and suitable long-term file formats.",
  },
];

export const heritagePublishingRules = [
  "Every archive item should include a title, date or period, category, source and verification status.",
  "Historical claims should be separated from personal recollections and unverified interpretation.",
  "Student and staff photographs require appropriate publication permission.",
  "Private registers and personal records must not be published through the public archive.",
  "Copyright ownership and reuse permission should be recorded for every uploaded item.",
  "Original files should be preserved separately from compressed public copies.",
  "Archived material should use secure backups and file-integrity monitoring.",
  "Corrections must retain an audit history showing what changed and who approved the change.",
];