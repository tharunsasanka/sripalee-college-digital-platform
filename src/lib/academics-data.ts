export type AcademicStage = {
  title: string;
  grades: string;
  description: string;
  highlights: string[];
};

export type AcademicDepartment = {
  title: string;
  description: string;
  subjects: string[];
  icon: string;
};

export type AcademicPathway = {
  title: string;
  status: string;
  description: string;
  examples: string[];
};

export type AcademicResource = {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: string;
};

export const academicFacts = [
  {
    value: "1–13",
    label: "Grade range",
  },
  {
    value: "3",
    label: "Language support",
  },
  {
    value: "4",
    label: "Main learning stages",
  },
  {
    value: "8",
    label: "Department groups",
  },
];

export const academicStages: AcademicStage[] = [
  {
    title: "Primary Education",
    grades: "Grades 1–5",
    description:
      "The primary section builds literacy, numeracy, creativity, environmental awareness, social skills and strong learning habits.",
    highlights: [
      "Foundational language and communication",
      "Mathematics and environmental learning",
      "Creative and aesthetic activities",
      "Age-appropriate digital awareness",
    ],
  },
  {
    title: "Junior Secondary Education",
    grades: "Grades 6–9",
    description:
      "Students develop broader subject knowledge, independent learning skills and stronger academic, creative and social responsibility.",
    highlights: [
      "Languages, mathematics and science",
      "History, geography and civic learning",
      "ICT and practical subject exposure",
      "Sports, arts and co-curricular participation",
    ],
  },
  {
    title: "Ordinary Level Education",
    grades: "Grades 10–11",
    description:
      "The Ordinary Level section supports structured subject preparation, assessment, guidance and examination readiness.",
    highlights: [
      "Core and optional subject guidance",
      "Term examinations and progress monitoring",
      "Revision resources and past-paper support",
      "Academic and career orientation",
    ],
  },
  {
    title: "Advanced Level Education",
    grades: "Grades 12–13",
    description:
      "The Advanced Level section supports specialised subject pathways, higher education preparation and career development.",
    highlights: [
      "Stream and subject selection guidance",
      "Advanced subject resources",
      "University and career awareness",
      "Structured examination preparation",
    ],
  },
];

export const academicDepartments: AcademicDepartment[] = [
  {
    title: "Languages",
    description:
      "Language learning, communication, literature and multilingual understanding.",
    subjects: ["Sinhala", "English", "Tamil", "Literature"],
    icon: "languages",
  },
  {
    title: "Mathematics",
    description:
      "Numeracy, logical reasoning, problem solving and advanced mathematical study.",
    subjects: ["Mathematics", "Additional Mathematics", "Applied Mathematics"],
    icon: "mathematics",
  },
  {
    title: "Science",
    description:
      "Scientific inquiry, laboratory learning and understanding of the natural world.",
    subjects: ["Science", "Biology", "Chemistry", "Physics"],
    icon: "science",
  },
  {
    title: "Social Sciences",
    description:
      "Society, history, geography, citizenship and the human environment.",
    subjects: ["History", "Geography", "Civic Education", "Political Studies"],
    icon: "social",
  },
  {
    title: "Information Technology",
    description:
      "Digital literacy, computing, responsible technology use and technical problem solving.",
    subjects: ["ICT", "Computer Studies", "Digital Literacy"],
    icon: "technology",
  },
  {
    title: "Commerce and Management",
    description:
      "Business, accounting, economics, entrepreneurship and organisational awareness.",
    subjects: ["Commerce", "Accounting", "Business Studies", "Economics"],
    icon: "commerce",
  },
  {
    title: "Aesthetic Studies",
    description:
      "Creative expression through art, music, dance, drama and cultural education.",
    subjects: ["Art", "Music", "Dance", "Drama"],
    icon: "aesthetic",
  },
  {
    title: "Health and Physical Education",
    description:
      "Physical wellbeing, teamwork, healthy living and participation in sports.",
    subjects: ["Health", "Physical Education", "Sports Education"],
    icon: "health",
  },
];

export const advancedLevelPathways: AcademicPathway[] = [
  {
    title: "Arts Pathway",
    status: "School confirmation required",
    description:
      "A flexible pathway supporting languages, humanities, social sciences and cultural studies.",
    examples: [
      "Languages and literature",
      "History and geography",
      "Political and social studies",
      "Aesthetic subjects",
    ],
  },
  {
    title: "Commerce Pathway",
    status: "School confirmation required",
    description:
      "A pathway focused on business, finance, economics and organisational understanding.",
    examples: [
      "Accounting",
      "Business Studies",
      "Economics",
      "Business-related ICT",
    ],
  },
  {
    title: "Science Pathway",
    status: "School confirmation required",
    description:
      "A specialised pathway supporting scientific study, laboratory learning and higher education preparation.",
    examples: [
      "Biology",
      "Chemistry",
      "Physics",
      "Combined Mathematics",
    ],
  },
  {
    title: "Technology Pathway",
    status: "School confirmation required",
    description:
      "A practical and technical pathway connecting science, engineering concepts and information technology.",
    examples: [
      "Engineering Technology",
      "Bio Systems Technology",
      "Science for Technology",
      "Information and Communication Technology",
    ],
  },
];

export const examinationProcess = [
  {
    step: "01",
    title: "Examination planning",
    description:
      "Authorised administrators define the academic year, term, grade, classes, subjects and examination period.",
  },
  {
    step: "02",
    title: "Timetable publication",
    description:
      "Approved examination schedules are published through the website, portal, downloads and digital noticeboard.",
  },
  {
    step: "03",
    title: "Mark entry",
    description:
      "Assigned subject teachers enter results only for their authorised subjects, grades and classes.",
  },
  {
    step: "04",
    title: "Review and approval",
    description:
      "Subject heads, section heads or authorised academic officers review marks before publication.",
  },
  {
    step: "05",
    title: "Secure publication",
    description:
      "Approved results become available only to the relevant student, parent and authorised staff.",
  },
];

export const academicCalendarItems = [
  {
    period: "Term 1",
    title: "Academic opening and foundational assessment",
    description:
      "Opening activities, class organisation, learning plans and approved assessment schedules.",
  },
  {
    period: "Term 2",
    title: "Academic development and co-curricular activity",
    description:
      "Continued classroom learning, projects, school activities and progress reviews.",
  },
  {
    period: "Term 3",
    title: "Final assessment and progression",
    description:
      "End-of-year examinations, reporting, progression and preparation for the following academic year.",
  },
];

export const academicResources: AcademicResource[] = [
  {
    title: "Academic Calendar",
    description:
      "Official term dates, school holidays, examinations and important academic activities.",
    action: "View calendar",
    href: "/events",
    icon: "calendar",
  },
  {
    title: "Examination Notices",
    description:
      "Approved examination dates, instructions, timetable updates and related announcements.",
    action: "View notices",
    href: "/news",
    icon: "notice",
  },
  {
    title: "Learning Resources",
    description:
      "Approved worksheets, lesson materials, revision content and subject resources.",
    action: "Open resources",
    href: "/resources",
    icon: "resources",
  },
  {
    title: "Downloads",
    description:
      "Timetables, forms, circulars, academic documents and approved public files.",
    action: "Browse downloads",
    href: "/resources",
    icon: "downloads",
  },
];

export const academicPublishingRules = [
  "Subjects, streams and grade arrangements must be confirmed by the school before official publication.",
  "Examination notices must include an authorised publication date and responsible officer.",
  "Private results must never be displayed through public website pages.",
  "Learning resources must be reviewed for accuracy, copyright and student suitability.",
  "Expired examination timetables and notices should be archived rather than permanently deleted.",
  "Sinhala, English and Tamil translations should be reviewed before publication.",
];