export type NoticeboardPriority =
  | "emergency"
  | "important"
  | "standard"
  | "celebration";

export type NoticeboardSlide = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  priority: NoticeboardPriority;
  audience: string;
  summary: string;
  details: string[];
  dateLabel: string;
  timeLabel: string;
  location: string;
  languages: string[];
  status: string;
  icon: string;
};

export const noticeboardFacts = [
  {
    value: "TV",
    label: "Full-screen mode",
  },
  {
    value: "Auto",
    label: "Slide rotation",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Priority",
    label: "Emergency display",
  },
];

export const noticeboardCategories = [
  "All Slides",
  "Emergency",
  "Important Notice",
  "Academic",
  "Examinations",
  "Events",
  "Achievements",
  "Administration",
];

export const noticeboardSlides: NoticeboardSlide[] = [
  {
    id: "emergency-message-template",
    title: "Emergency Announcement",
    subtitle: "Authorised urgent communication template",
    category: "Emergency",
    priority: "emergency",
    audience: "Entire School Community",
    summary:
      "This demonstration slide shows how an authorised emergency closure, safety instruction or urgent schedule change will appear.",
    details: [
      "Display the verified instruction clearly",
      "Record the publishing officer and time",
      "Provide approved language versions",
    ],
    dateLabel: "Official date and time required",
    timeLabel: "Immediate display when authorised",
    location: "All school screens and public website",
    languages: ["Sinhala", "English", "Tamil"],
    status: "Emergency approval required",
    icon: "emergency",
  },
  {
    id: "examination-reminder",
    title: "Term Examination Reminder",
    subtitle: "Check the approved timetable before attending",
    category: "Examinations",
    priority: "important",
    audience: "Students and Parents",
    summary:
      "Students should review their grade, subject, examination room and approved timetable before the examination period.",
    details: [
      "Bring the required school materials",
      "Arrive according to official instructions",
      "Check News and Notices for corrections",
    ],
    dateLabel: "Approved examination period required",
    timeLabel: "According to official timetable",
    location: "Assigned examination rooms",
    languages: ["Sinhala", "English"],
    status: "Academic approval required",
    icon: "examination",
  },
  {
    id: "parent-meeting",
    title: "Parent Consultation Meeting",
    subtitle: "Grade-specific meeting information",
    category: "Important Notice",
    priority: "important",
    audience: "Parents and Guardians",
    summary:
      "A proposed display for parent meetings, consultations and approved school-community discussions.",
    details: [
      "Confirm the relevant grade and class",
      "Check the assigned appointment time",
      "Private student matters remain confidential",
    ],
    dateLabel: "Official meeting date required",
    timeLabel: "Assigned time required",
    location: "Approved meeting area",
    languages: ["Sinhala", "English", "Tamil"],
    status: "Section-head approval required",
    icon: "parents",
  },
  {
    id: "academic-resource-update",
    title: "New Learning Resources",
    subtitle: "Approved revision and subject materials",
    category: "Academic",
    priority: "standard",
    audience: "Students",
    summary:
      "Approved learning materials can be accessed through the Resources section and future student portal.",
    details: [
      "Select the correct grade",
      "Confirm the subject and language",
      "Use only current approved versions",
    ],
    dateLabel: "Publication date required",
    timeLabel: "Available after approval",
    location: "Resources and Student Portal",
    languages: ["Sinhala", "English"],
    status: "Department approval required",
    icon: "academic",
  },
  {
    id: "sports-meet-countdown",
    title: "Annual Sports Meet",
    subtitle: "Inter-house athletics and school-community programme",
    category: "Events",
    priority: "standard",
    audience: "Entire School Community",
    summary:
      "This event slide can present the official sports programme, countdown, participation details and visitor guidance.",
    details: [
      "Approved event date and programme",
      "Participant and spectator guidance",
      "Health and safety instructions",
    ],
    dateLabel: "Official event date required",
    timeLabel: "Programme time pending",
    location: "School grounds",
    languages: ["Sinhala", "English"],
    status: "Sports committee approval required",
    icon: "sports",
  },
  {
    id: "cultural-programme",
    title: "Arts and Cultural Festival",
    subtitle: "Music, dance, drama and creative expression",
    category: "Events",
    priority: "standard",
    audience: "Entire School Community",
    summary:
      "A public display for approved performances, exhibitions, cultural activities and programme information.",
    details: [
      "Approved student performances",
      "Programme and venue information",
      "Photography permission controls",
    ],
    dateLabel: "Official event date required",
    timeLabel: "Programme time pending",
    location: "Approved performance venue",
    languages: ["Sinhala", "English", "Tamil"],
    status: "Cultural committee approval required",
    icon: "culture",
  },
  {
    id: "student-achievement",
    title: "Celebrating Student Achievement",
    subtitle: "Recognising verified excellence",
    category: "Achievements",
    priority: "celebration",
    audience: "Entire School Community",
    summary:
      "A celebratory display for verified academic, sporting, cultural and leadership achievements.",
    details: [
      "Verify names and competition details",
      "Publish only approved student information",
      "Confirm permission for photographs",
    ],
    dateLabel: "Verified achievement date required",
    timeLabel: "Feature period assigned by editor",
    location: "Public website and school displays",
    languages: ["Sinhala", "English"],
    status: "Achievement verification required",
    icon: "achievement",
  },
  {
    id: "administrative-reminder",
    title: "Administrative Reminder",
    subtitle: "Important school-office information",
    category: "Administration",
    priority: "standard",
    audience: "Students, Parents and Staff",
    summary:
      "A standard display for approved office hours, public-document deadlines and administrative instructions.",
    details: [
      "Confirm the responsible office",
      "Display the correct deadline",
      "Link to the approved form or resource",
    ],
    dateLabel: "Official publication date required",
    timeLabel: "Display during approved period",
    location: "School office and digital screens",
    languages: ["Sinhala", "English", "Tamil"],
    status: "Administrative approval required",
    icon: "administration",
  },
];

export const noticeboardZones = [
  {
    title: "Main Feature Zone",
    position: "Primary screen area",
    description:
      "Displays the current emergency, important, event or achievement announcement.",
  },
  {
    title: "Daily Notices Zone",
    position: "Supporting information area",
    description:
      "Shows approved daily reminders, academic information and administrative notices.",
  },
  {
    title: "Upcoming Events Zone",
    position: "Calendar and countdown area",
    description:
      "Presents approved dates, event countdowns, locations and programme times.",
  },
  {
    title: "Achievement Zone",
    position: "Celebration area",
    description:
      "Highlights verified student, staff, school and past-pupil achievements.",
  },
  {
    title: "Information Ticker",
    position: "Lower screen area",
    description:
      "Rotates short approved messages without displaying sensitive information.",
  },
  {
    title: "Status and Language Zone",
    position: "Screen header or footer",
    description:
      "Shows publication status, language selection and last-approved update information.",
  },
];

export const noticeboardWorkflow = [
  {
    step: "01",
    title: "Create display",
    description:
      "An authorised editor enters the title, category, audience, language, display period and screen content.",
  },
  {
    step: "02",
    title: "Review accuracy",
    description:
      "Names, dates, instructions, translations, images and destination links are checked.",
  },
  {
    step: "03",
    title: "Approve",
    description:
      "The responsible officer confirms that the slide is suitable for the selected screens.",
  },
  {
    step: "04",
    title: "Schedule",
    description:
      "The approved start time, expiry time, rotation order and screen locations are assigned.",
  },
  {
    step: "05",
    title: "Publish",
    description:
      "The display becomes active on approved school screens and associated website areas.",
  },
  {
    step: "06",
    title: "Monitor",
    description:
      "Staff confirm that the correct slide is visible and that emergency priority works correctly.",
  },
  {
    step: "07",
    title: "Expire or archive",
    description:
      "Completed displays leave the active rotation while retaining their approved publication history.",
  },
];

export const noticeboardSecurityRules = [
  "Student results, attendance, identification numbers and private contact details must never appear on public screens.",
  "Emergency displays should require an authorised priority-approval process.",
  "Every slide should include a publication period and automatic expiry time.",
  "Images of students and staff require appropriate publication permission.",
  "Only approved website links and files should be opened from display content.",
  "Display devices should use restricted accounts without access to the administration dashboard.",
  "Kiosk or TV devices should block unauthorised navigation, downloads and browser settings.",
  "All publication, correction, approval and removal actions should create audit records.",
];