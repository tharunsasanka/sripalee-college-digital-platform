export type ContactChannel = {
  title: string;
  purpose: string;
  value: string;
  availability: string;
  icon: string;
  href: string | null;
  status: string;
};

export type DepartmentContact = {
  title: string;
  audience: string;
  description: string;
  contactStatus: string;
  icon: string;
};

export const contactFacts = [
  {
    value: "Horana",
    label: "School location",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Secure",
    label: "Enquiry handling",
  },
  {
    value: "Verified",
    label: "Contact publication",
  },
];

export const contactChannels: ContactChannel[] = [
  {
    title: "General School Office",
    purpose:
      "General public enquiries, school information and administrative guidance.",
    value: "Official telephone number pending",
    availability: "Official office hours required",
    icon: "office",
    href: null,
    status: "School confirmation required",
  },
  {
    title: "Official Email",
    purpose:
      "Formal written enquiries that do not include sensitive student information.",
    value: "Official school email pending",
    availability: "Response schedule requires confirmation",
    icon: "email",
    href: null,
    status: "Approved mailbox required",
  },
  {
    title: "Academic Enquiries",
    purpose:
      "General questions about grades, departments, subjects and academic information.",
    value: "Academic contact route pending",
    availability: "Handled during approved school hours",
    icon: "academic",
    href: null,
    status: "Academic-office confirmation required",
  },
  {
    title: "Website Support",
    purpose:
      "Report website accessibility, technical or public-information problems.",
    value: "Technical support route pending",
    availability: "Development support channel",
    icon: "technical",
    href: null,
    status: "Support mailbox required",
  },
];

export const departmentContacts: DepartmentContact[] = [
  {
    title: "Administration",
    audience: "General public, parents and official visitors",
    description:
      "General school administration, document guidance, official appointments and public enquiries.",
    contactStatus: "Official administrative contact required",
    icon: "administration",
  },
  {
    title: "Admissions and Applications",
    audience: "Applicants and parents",
    description:
      "Approved admission periods, application procedures, supporting documents and submission guidance.",
    contactStatus: "Use only during an approved application period",
    icon: "admissions",
  },
  {
    title: "Academic Office",
    audience: "Students and parents",
    description:
      "General academic programmes, grade sections, subjects, examinations and approved academic guidance.",
    contactStatus: "Private student records require authentication",
    icon: "academic",
  },
  {
    title: "Activities and Events",
    audience: "Students, parents and community participants",
    description:
      "Approved sports, societies, cultural activities, events and participation information.",
    contactStatus: "Responsible coordinator required",
    icon: "events",
  },
  {
    title: "Heritage Archive",
    audience: "Researchers, past pupils and contributors",
    description:
      "Historical enquiries, archive contributions, photograph identification and permission information.",
    contactStatus: "Archive review and source verification required",
    icon: "heritage",
  },
  {
    title: "Digital Platform Support",
    audience: "Website and portal users",
    description:
      "Accessibility problems, broken links, account-support routing and technical issue reporting.",
    contactStatus: "Do not submit passwords or authentication codes",
    icon: "technical",
  },
];

export const officeHours = [
  {
    day: "Monday to Friday",
    hours: "Official school-office hours pending",
    availability: "Normal administrative enquiries",
  },
  {
    day: "Weekends",
    hours: "Office availability requires confirmation",
    availability: "Visits should not be assumed without approval",
  },
  {
    day: "Public and school holidays",
    hours: "Office normally unavailable unless officially announced",
    availability: "Check News and Notices before travelling",
  },
];

export const visitGuidelines = [
  {
    step: "01",
    title: "Check official information",
    description:
      "Review current notices, school holidays, office availability and visitor instructions.",
  },
  {
    step: "02",
    title: "Request an appointment",
    description:
      "Contact the relevant office before visiting for formal meetings, records or administrative matters.",
  },
  {
    step: "03",
    title: "Bring required documents",
    description:
      "Carry the approved identification, reference numbers and documents relevant to the enquiry.",
  },
  {
    step: "04",
    title: "Report to the authorised entrance",
    description:
      "Follow school security, visitor registration and access-control procedures.",
  },
  {
    step: "05",
    title: "Protect student privacy",
    description:
      "Do not photograph, record or approach students without appropriate school permission.",
  },
];

export const contactAudiences = [
  "Select audience",
  "Student",
  "Parent or guardian",
  "Applicant",
  "Teacher or staff member",
  "Past pupil",
  "Researcher",
  "Community member",
  "Other visitor",
];

export const inquirySubjects = [
  "Select enquiry subject",
  "General school information",
  "Admissions and applications",
  "Academic information",
  "Examinations",
  "Events and activities",
  "Resources and documents",
  "Heritage archive",
  "Website accessibility",
  "Technical issue",
  "Other enquiry",
];

export const contactPublishingRules = [
  "Only officially confirmed telephone numbers, email addresses and office hours should be published.",
  "Public contact forms must not request passwords, authentication codes or unnecessary identity information.",
  "Student results, attendance and personal records should be handled only through authenticated systems.",
  "Enquiries should be routed according to department, audience and information sensitivity.",
  "Uploaded attachments should be restricted, validated and scanned before staff access them.",
  "Contact-form submissions should use encryption, access controls and an approved retention period.",
  "Spam protection and rate limiting should be applied without creating unnecessary accessibility barriers.",
  "Every published change to official contact details should record the editor and approving officer.",
];