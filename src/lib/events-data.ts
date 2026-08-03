export type EventStatus =
  | "upcoming"
  | "registration"
  | "completed"
  | "postponed";

export type SchoolEvent = {
  id: string;
  title: string;
  category: string;
  audience: string;
  month: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  summary: string;
  details: string[];
  status: EventStatus;
  featured: boolean;
  registrationRequired: boolean;
  registrationStatus: string;
  languages: string[];
  approvalStatus: string;
};

export const eventFacts = [
  {
    value: "7",
    label: "Event categories",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Controlled",
    label: "Registration process",
  },
  {
    value: "Verified",
    label: "Publication standard",
  },
];

export const eventCategories = [
  "All Categories",
  "Academic",
  "Examination",
  "Sports",
  "Arts and Culture",
  "School Community",
  "Administration",
  "Commemorations",
];

export const eventAudiences = [
  "All Audiences",
  "Entire School Community",
  "Students",
  "Parents",
  "Teachers",
  "Applicants",
  "Past Pupils",
];

export const eventMonths = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const schoolEvents: SchoolEvent[] = [
  {
    id: "academic-year-opening",
    title: "Academic Year Opening Programme",
    category: "Academic",
    audience: "Entire School Community",
    month: "January",
    dateLabel: "Official date pending",
    timeLabel: "Time pending",
    venue: "Main school premises",
    summary:
      "A proposed calendar entry for the formal opening of the academic year, student orientation and important administrative information.",
    details: [
      "Grade and section arrangements",
      "Student and parent guidance",
      "Academic-year announcements",
    ],
    status: "upcoming",
    featured: true,
    registrationRequired: false,
    registrationStatus: "No public registration required",
    languages: ["Sinhala", "English", "Tamil"],
    approvalStatus: "Administrative confirmation required",
  },
  {
    id: "term-examination-period",
    title: "Term Examination Period",
    category: "Examination",
    audience: "Students",
    month: "March",
    dateLabel: "Approved timetable required",
    timeLabel: "According to examination timetable",
    venue: "Assigned examination rooms",
    summary:
      "A proposed event entry linking students and parents to approved examination dates, instructions and timetable documents.",
    details: [
      "Grade-specific schedules",
      "Examination instructions",
      "Approved timetable downloads",
    ],
    status: "upcoming",
    featured: true,
    registrationRequired: false,
    registrationStatus: "Student eligibility managed internally",
    languages: ["Sinhala", "English"],
    approvalStatus: "Academic approval required",
  },
  {
    id: "annual-sports-meet",
    title: "Annual Inter-House Sports Meet",
    category: "Sports",
    audience: "Entire School Community",
    month: "February",
    dateLabel: "Official date pending",
    timeLabel: "Programme time pending",
    venue: "School grounds",
    summary:
      "A proposed event page for athletics, house competitions, participation instructions and approved spectator information.",
    details: [
      "House and team participation",
      "Sports programme",
      "Health and safety instructions",
    ],
    status: "registration",
    featured: true,
    registrationRequired: true,
    registrationStatus: "Student participation approval required",
    languages: ["Sinhala", "English"],
    approvalStatus: "Sports committee approval required",
  },
  {
    id: "cultural-festival",
    title: "Arts and Cultural Festival",
    category: "Arts and Culture",
    audience: "Entire School Community",
    month: "June",
    dateLabel: "Official date pending",
    timeLabel: "Programme time pending",
    venue: "Approved performance venue",
    summary:
      "A proposed event presenting approved music, dance, drama, art and cultural activities organised by the school.",
    details: [
      "Student performances",
      "Art and creative displays",
      "Approved photography arrangements",
    ],
    status: "registration",
    featured: false,
    registrationRequired: true,
    registrationStatus: "Participant registration required",
    languages: ["Sinhala", "English", "Tamil"],
    approvalStatus: "Cultural committee approval required",
  },
  {
    id: "parent-consultation",
    title: "Parent Consultation Meeting",
    category: "School Community",
    audience: "Parents",
    month: "May",
    dateLabel: "Grade-specific date required",
    timeLabel: "Assigned time slot required",
    venue: "Relevant classroom or meeting area",
    summary:
      "A controlled event entry for parent meetings, academic progress discussions and approved school-community communication.",
    details: [
      "Grade and class information",
      "Meeting schedule",
      "Private discussions handled securely",
    ],
    status: "upcoming",
    featured: false,
    registrationRequired: true,
    registrationStatus: "Parent appointment process required",
    languages: ["Sinhala", "English", "Tamil"],
    approvalStatus: "Section-head approval required",
  },
  {
    id: "teacher-development",
    title: "Teacher Professional Development Programme",
    category: "Administration",
    audience: "Teachers",
    month: "August",
    dateLabel: "Official date pending",
    timeLabel: "Internal schedule required",
    venue: "Assigned training venue",
    summary:
      "A proposed calendar entry for approved teacher training, professional development and academic-planning activities.",
    details: [
      "Training programme",
      "Assigned participants",
      "Internal resources and instructions",
    ],
    status: "upcoming",
    featured: false,
    registrationRequired: false,
    registrationStatus: "Participation assigned internally",
    languages: ["Sinhala", "English"],
    approvalStatus: "Administrative approval required",
  },
  {
    id: "founders-commemoration",
    title: "Founding Heritage Commemoration",
    category: "Commemorations",
    audience: "Entire School Community",
    month: "September",
    dateLabel: "Historical date confirmation required",
    timeLabel: "Programme time pending",
    venue: "School heritage area",
    summary:
      "A proposed commemorative programme connecting the school community with approved historical records and institutional heritage.",
    details: [
      "Historical presentation",
      "Approved commemorative activities",
      "Heritage archive exhibition",
    ],
    status: "upcoming",
    featured: false,
    registrationRequired: false,
    registrationStatus: "Public participation details pending",
    languages: ["Sinhala", "English", "Tamil"],
    approvalStatus: "Heritage committee approval required",
  },
  {
    id: "past-pupils-gathering",
    title: "Past Pupils Community Gathering",
    category: "School Community",
    audience: "Past Pupils",
    month: "December",
    dateLabel: "Official date pending",
    timeLabel: "Programme time pending",
    venue: "Approved school venue",
    summary:
      "A proposed event supporting approved engagement between the school and its past-pupil community.",
    details: [
      "Registration and identity verification",
      "Approved programme",
      "School access and security procedures",
    ],
    status: "registration",
    featured: false,
    registrationRequired: true,
    registrationStatus: "Verified registration required",
    languages: ["Sinhala", "English"],
    approvalStatus: "Administrative approval required",
  },
];

export const calendarViews = [
  {
    title: "Public Calendar",
    description:
      "Approved academic, sporting, cultural and community events visible to all visitors.",
  },
  {
    title: "Student Calendar",
    description:
      "Class, examination and activity information linked to the authenticated student.",
  },
  {
    title: "Parent Calendar",
    description:
      "Approved meetings, deadlines and events relevant to the parent’s verified student account.",
  },
  {
    title: "Staff Calendar",
    description:
      "Restricted meetings, duties, training and administrative activities for authorised staff.",
  },
];

export const eventWorkflow = [
  {
    step: "01",
    title: "Create event",
    description:
      "An authorised organiser enters the title, category, audience, date, time, venue and event information.",
  },
  {
    step: "02",
    title: "Review details",
    description:
      "Schedules, venues, organisers, attachments, translations and safety requirements are checked.",
  },
  {
    step: "03",
    title: "Approve",
    description:
      "The assigned approving officer confirms that the event can be published.",
  },
  {
    step: "04",
    title: "Publish",
    description:
      "The approved event becomes visible through the relevant public or protected calendar.",
  },
  {
    step: "05",
    title: "Manage participation",
    description:
      "Registrations, eligibility, capacity and participant approvals are handled securely.",
  },
  {
    step: "06",
    title: "Update or postpone",
    description:
      "Changes are published with the reason, editor, approval and updated time.",
  },
  {
    step: "07",
    title: "Archive",
    description:
      "Completed events move to the archive with approved photographs and outcome information.",
  },
];

export const eventPublishingRules = [
  "Every event should include an approved title, date, time, venue, organiser and intended audience.",
  "Events must not be published before the assigned officer has approved the information.",
  "Private student registrations and participant lists must not appear publicly.",
  "Event capacity, eligibility and attendance information should remain inside authorised systems.",
  "Photographs and recordings require appropriate permission before public publication.",
  "Postponed and cancelled events should display the update time and responsible authority.",
  "Emergency changes should also appear through the priority notice system.",
  "Completed events should be archived rather than permanently deleted.",
];