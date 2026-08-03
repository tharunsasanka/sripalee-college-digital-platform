export type PortalRoleId = "student" | "parent" | "staff";

export type PortalRole = {
  id: PortalRoleId;
  title: string;
  shortTitle: string;
  audience: string;
  description: string;
  icon: string;
  features: string[];
  accessStatus: string;
};

export type PortalFeature = {
  title: string;
  description: string;
  student: string;
  parent: string;
  staff: string;
};

export const portalFacts = [
  {
    value: "3",
    label: "Protected user roles",
  },
  {
    value: "2FA",
    label: "Important accounts",
  },
  {
    value: "RBAC",
    label: "Role-based permissions",
  },
  {
    value: "Audited",
    label: "Sensitive access",
  },
];

export const portalRoles: PortalRole[] = [
  {
    id: "student",
    title: "Student Portal",
    shortTitle: "Student",
    audience: "Registered students",
    description:
      "A protected workspace for approved academic records, attendance information, timetables, resources, activities and school communication.",
    icon: "student",
    features: [
      "View the authenticated student profile",
      "Access approved examination results",
      "Review attendance summaries",
      "Open grade and subject resources",
      "View personal timetables and events",
      "Receive relevant announcements",
    ],
    accessStatus: "Secure student backend required",
  },
  {
    id: "parent",
    title: "Parent and Guardian Portal",
    shortTitle: "Parent",
    audience: "Verified parents and legal guardians",
    description:
      "A protected account linked only to approved student records associated with the verified parent or guardian.",
    icon: "parent",
    features: [
      "View linked student profiles",
      "Review approved academic summaries",
      "Check attendance information",
      "Receive parent announcements",
      "View meetings and appointments",
      "Access approved documents",
    ],
    accessStatus: "Guardian verification and student linking required",
  },
  {
    id: "staff",
    title: "Staff Portal",
    shortTitle: "Staff",
    audience: "Authorised school employees",
    description:
      "A restricted administrative and academic workspace controlled according to staff duties and assigned permissions.",
    icon: "staff",
    features: [
      "Manage authorised academic information",
      "Review assigned publication tasks",
      "Access internal resources",
      "Manage approved events and notices",
      "View relevant student records",
      "Review audit and workflow information",
    ],
    accessStatus: "Staff identity and role approval required",
  },
];

export const portalFeatures: PortalFeature[] = [
  {
    title: "Profile information",
    description:
      "Approved identity, grade, class, contact and institutional information.",
    student: "Own profile",
    parent: "Linked students",
    staff: "Authorised records",
  },
  {
    title: "Examination results",
    description:
      "Approved results released according to academic and administrative controls.",
    student: "Own results",
    parent: "Linked students",
    staff: "Assigned access",
  },
  {
    title: "Attendance",
    description:
      "Attendance summaries and authorised attendance-management functions.",
    student: "Own summary",
    parent: "Linked students",
    staff: "Assigned classes",
  },
  {
    title: "Learning resources",
    description:
      "Protected grade, class, subject and department learning materials.",
    student: "Assigned resources",
    parent: "Approved resources",
    staff: "Upload and review",
  },
  {
    title: "Notices and events",
    description:
      "Announcements and calendar entries selected for each authenticated user.",
    student: "Relevant notices",
    parent: "Relevant notices",
    staff: "Create or review",
  },
  {
    title: "Administrative services",
    description:
      "Requests, document workflows and internal administrative operations.",
    student: "Limited requests",
    parent: "Limited requests",
    staff: "Role controlled",
  },
];

export const accountActivationSteps = [
  {
    step: "01",
    title: "Receive an official invitation",
    description:
      "The school provides an approved account-activation route to the verified student, parent or staff member.",
  },
  {
    step: "02",
    title: "Verify identity",
    description:
      "The user confirms required institutional information through a protected verification process.",
  },
  {
    step: "03",
    title: "Confirm contact method",
    description:
      "An approved email address or telephone number is verified before account activation.",
  },
  {
    step: "04",
    title: "Create secure credentials",
    description:
      "The user creates a strong password without sharing it with school staff or other users.",
  },
  {
    step: "05",
    title: "Enable additional protection",
    description:
      "Important accounts complete two-factor authentication or another approved security step.",
  },
  {
    step: "06",
    title: "Accept portal conditions",
    description:
      "The user reviews privacy, acceptable-use and account-security responsibilities.",
  },
  {
    step: "07",
    title: "Receive assigned access",
    description:
      "The system grants only the permissions appropriate to the verified role and relationship.",
  },
];

export const portalSecurityControls = [
  {
    title: "No public student search",
    description:
      "Student names, identification numbers, results and attendance must not be searchable through the public website.",
  },
  {
    title: "Role-based access",
    description:
      "Students, parents and staff receive different permissions based on verified roles and responsibilities.",
  },
  {
    title: "Guardian-student linking",
    description:
      "A parent account may access only the student records officially linked to that verified guardian.",
  },
  {
    title: "Secure authentication",
    description:
      "Passwords must be protected using approved password hashing and secure authentication controls.",
  },
  {
    title: "Two-factor authentication",
    description:
      "Administrative and other important accounts should use an additional authentication factor.",
  },
  {
    title: "Audit logging",
    description:
      "Sensitive record views, changes, exports and approval actions should create protected audit records.",
  },
  {
    title: "Session protection",
    description:
      "Sessions should expire safely and use secure cookies, inactivity controls and protection against session theft.",
  },
  {
    title: "Account recovery",
    description:
      "Recovery should verify identity without exposing passwords, student records or authentication codes.",
  },
];

export const portalSupportTopics = [
  {
    title: "Account activation",
    description:
      "Support for users who received an official invitation but cannot complete activation.",
  },
  {
    title: "Password recovery",
    description:
      "A protected recovery process using verified contact information.",
  },
  {
    title: "Incorrect student link",
    description:
      "Administrative review when a parent account is linked incorrectly or a relationship changes.",
  },
  {
    title: "Missing records",
    description:
      "A controlled request when authorised results, attendance or resources are unavailable.",
  },
  {
    title: "Suspicious activity",
    description:
      "Immediate reporting of unexpected logins, password resets or account changes.",
  },
  {
    title: "Accessibility support",
    description:
      "Assistance for users who face barriers when navigating or reading portal content.",
  },
];

export const portalAccessRules = [
  "The public website must not provide student-record searches by name or identification number.",
  "Users should access only records connected to their verified identity, role and responsibilities.",
  "Passwords and authentication codes must never be displayed to administrators or stored in readable form.",
  "Important administrative accounts should use two-factor authentication.",
  "Repeated failed login attempts should trigger rate limiting and appropriate security monitoring.",
  "Authentication responses should not reveal whether a specific student, parent or staff account exists.",
  "Sensitive exports and record changes should require appropriate permission and audit logging.",
  "Inactive accounts and expired relationships should be reviewed and disabled through an approved process.",
];