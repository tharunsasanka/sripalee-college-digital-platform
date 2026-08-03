export type NewsPriority = "urgent" | "high" | "standard";

export type NewsNotice = {
  id: string;
  title: string;
  category: string;
  audience: string;
  priority: NewsPriority;
  status: string;
  publishedDate: string;
  expiresDate: string;
  summary: string;
  details: string[];
  attachmentLabel: string | null;
  languages: string[];
  featured: boolean;
  approvalStatus: string;
};

export const newsFacts = [
  {
    value: "7",
    label: "Notice categories",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Priority",
    label: "Urgent announcement support",
  },
  {
    value: "Controlled",
    label: "Publication workflow",
  },
];

export const newsCategories = [
  "All Categories",
  "Important Notice",
  "Academic",
  "Examination",
  "Events",
  "Administration",
  "Achievements",
  "Emergency",
];

export const newsAudiences = [
  "All Audiences",
  "Entire School Community",
  "Students",
  "Parents",
  "Teachers",
  "Applicants",
  "Past Pupils",
];

export const newsNotices: NewsNotice[] = [
  {
    id: "emergency-announcement-template",
    title: "Emergency Announcement Template",
    category: "Emergency",
    audience: "Entire School Community",
    priority: "urgent",
    status: "Development example",
    publishedDate: "Publication date pending",
    expiresDate: "Expiry date pending",
    summary:
      "This template demonstrates how urgent school closures, safety instructions or emergency changes can be displayed prominently.",
    details: [
      "Emergency notices should appear above regular website content.",
      "The responsible officer and publication time must be recorded.",
      "The announcement should be available in all approved languages.",
    ],
    attachmentLabel: null,
    languages: ["Sinhala", "English", "Tamil"],
    featured: true,
    approvalStatus: "Authorised emergency approval required",
  },
  {
    id: "term-examination-timetable",
    title: "Term Examination Timetable Notice",
    category: "Examination",
    audience: "Students",
    priority: "high",
    status: "Development example",
    publishedDate: "Official date required",
    expiresDate: "After examination period",
    summary:
      "A proposed notice layout for publishing approved examination schedules, instructions and timetable changes.",
    details: [
      "Grade and class information must be clearly identified.",
      "The approved timetable should be attached as a downloadable file.",
      "Corrections should display the updated publication time.",
    ],
    attachmentLabel: "Examination timetable PDF",
    languages: ["Sinhala", "English"],
    featured: true,
    approvalStatus: "Academic approval required",
  },
  {
    id: "parent-meeting-notice",
    title: "Parent Meeting Announcement",
    category: "Important Notice",
    audience: "Parents",
    priority: "high",
    status: "Development example",
    publishedDate: "Official date required",
    expiresDate: "After meeting date",
    summary:
      "A proposed announcement format for grade meetings, parent consultations and school-community discussions.",
    details: [
      "The relevant grade or section should be stated.",
      "The location and starting time require confirmation.",
      "Private student matters must not appear publicly.",
    ],
    attachmentLabel: null,
    languages: ["Sinhala", "English", "Tamil"],
    featured: true,
    approvalStatus: "Section-head approval required",
  },
  {
    id: "academic-resource-update",
    title: "New Academic Resources Available",
    category: "Academic",
    audience: "Students",
    priority: "standard",
    status: "Development example",
    publishedDate: "Publication date pending",
    expiresDate: "No expiry assigned",
    summary:
      "A standard notice showing how approved worksheets, lesson materials and revision resources may be announced.",
    details: [
      "Resources must be reviewed by the responsible department.",
      "Copyright and reuse permissions must be confirmed.",
      "Files should use accessible formats and clear names.",
    ],
    attachmentLabel: "Learning resources",
    languages: ["Sinhala", "English"],
    featured: false,
    approvalStatus: "Department approval required",
  },
  {
    id: "school-event-announcement",
    title: "School Event Announcement",
    category: "Events",
    audience: "Entire School Community",
    priority: "standard",
    status: "Development example",
    publishedDate: "Event date required",
    expiresDate: "After event completion",
    summary:
      "A proposed event notice containing the approved date, venue, participation information and organiser details.",
    details: [
      "The event title and organiser must be verified.",
      "Student participation instructions should remain clear.",
      "Photographs require the relevant publication permission.",
    ],
    attachmentLabel: "Event programme",
    languages: ["Sinhala", "English"],
    featured: false,
    approvalStatus: "Event coordinator approval required",
  },
  {
    id: "administrative-circular",
    title: "Administrative Circular",
    category: "Administration",
    audience: "Teachers",
    priority: "standard",
    status: "Development example",
    publishedDate: "Circular date required",
    expiresDate: "Archive after replacement",
    summary:
      "A controlled format for publishing approved public circulars without exposing private internal instructions.",
    details: [
      "The circular reference number should be displayed.",
      "Restricted documents must remain inside authorised systems.",
      "Replaced versions should be archived with revision history.",
    ],
    attachmentLabel: "Approved public circular",
    languages: ["Sinhala", "English"],
    featured: false,
    approvalStatus: "Administrative approval required",
  },
  {
    id: "student-achievement",
    title: "Student Achievement Recognition",
    category: "Achievements",
    audience: "Entire School Community",
    priority: "standard",
    status: "Development example",
    publishedDate: "Verified result date required",
    expiresDate: "Archive after feature period",
    summary:
      "A proposed announcement format for verified academic, sporting, cultural and leadership achievements.",
    details: [
      "Names, results, dates and competition levels must be verified.",
      "Student information should be limited to approved public details.",
      "Supporting photographs require appropriate permission.",
    ],
    attachmentLabel: null,
    languages: ["Sinhala", "English"],
    featured: false,
    approvalStatus: "Achievement verification required",
  },
];

export const publicationWorkflow = [
  {
    step: "01",
    title: "Create draft",
    description:
      "An authorised editor enters the title, category, audience, language, content and proposed publication period.",
  },
  {
    step: "02",
    title: "Review information",
    description:
      "Dates, names, files, translations and instructions are checked for accuracy.",
  },
  {
    step: "03",
    title: "Approve",
    description:
      "The assigned content approver confirms that the notice is suitable for publication.",
  },
  {
    step: "04",
    title: "Publish",
    description:
      "The approved notice becomes visible on the website, noticeboard and relevant portal.",
  },
  {
    step: "05",
    title: "Update responsibly",
    description:
      "Corrections retain the original publication information and record the reason for change.",
  },
  {
    step: "06",
    title: "Expire or archive",
    description:
      "The notice is removed from active listings after its expiry date while remaining available in the archive.",
  },
];

export const multilingualRequirements = [
  {
    title: "Sinhala",
    description:
      "Primary public notices should be available in accurate and approved Sinhala.",
  },
  {
    title: "English",
    description:
      "English versions should preserve the same meaning, dates and instructions.",
  },
  {
    title: "Tamil",
    description:
      "Important and emergency announcements should include an approved Tamil version.",
  },
];

export const noticeChannels = [
  {
    title: "Public website",
    description:
      "General announcements, public notices, achievements and approved downloads.",
  },
  {
    title: "Digital noticeboard",
    description:
      "Important daily announcements, event countdowns and emergency information.",
  },
  {
    title: "Student and parent portal",
    description:
      "Private class, examination, attendance and student-related communication.",
  },
  {
    title: "Staff dashboard",
    description:
      "Internal announcements, review tasks and restricted administrative communication.",
  },
];

export const newsPublishingRules = [
  "Every notice should include a category, audience, publication date, responsible officer and approval status.",
  "Emergency announcements require a clearly defined authorised approval process.",
  "Private student, parent and staff information must not appear in public notices.",
  "Attached files should be checked for malware, accessibility, accuracy and appropriate publication permission.",
  "Important notices should be available in the languages required by the intended audience.",
  "Expired notices should be archived rather than permanently deleted.",
  "Corrections must retain the previous version, reason for change, editor and approver.",
  "Scheduled publication and expiry should use the school’s official local date and time.",
];