export type StaffProfile = {
  id: string;
  displayName: string;
  initials: string;
  position: string;
  department: string;
  subjects: string[];
  qualifications: string[];
  responsibilities: string[];
  introduction: string;
  photoStatus: "approved" | "pending" | "not-provided";
  profileStatus: "published" | "review" | "draft";
  publicVisible: boolean;
};

export const staffFacts = [
  {
    value: "8",
    label: "Proposed department groups",
  },
  {
    value: "3",
    label: "Supported website languages",
  },
  {
    value: "RBAC",
    label: "Role-based administration",
  },
  {
    value: "CRUD",
    label: "Managed staff records",
  },
];

export const staffDepartments = [
  "All Departments",
  "Administration",
  "Languages",
  "Mathematics",
  "Science",
  "Social Sciences",
  "Information Technology",
  "Commerce and Management",
  "Aesthetic Studies",
  "Health and Physical Education",
];

export const subjectOptions = [
  "All Subjects",
  "Sinhala",
  "English",
  "Tamil",
  "Mathematics",
  "Science",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "Geography",
  "ICT",
  "Accounting",
  "Business Studies",
  "Economics",
  "Art",
  "Music",
  "Dance",
  "Drama",
  "Health",
  "Physical Education",
];

export const staffProfiles: StaffProfile[] = [
  {
    id: "principal-profile",
    displayName: "Principal Profile",
    initials: "PR",
    position: "Principal",
    department: "Administration",
    subjects: [],
    qualifications: ["Official qualifications require school confirmation"],
    responsibilities: [
      "Institutional leadership",
      "Academic and administrative oversight",
      "Government and community coordination",
    ],
    introduction:
      "The approved principal’s name, photograph, qualifications and official message will be added after administrative confirmation.",
    photoStatus: "pending",
    profileStatus: "review",
    publicVisible: true,
  },
  {
    id: "languages-head",
    displayName: "Languages Department Profile",
    initials: "LA",
    position: "Head of Department",
    department: "Languages",
    subjects: ["Sinhala", "English", "Tamil"],
    qualifications: ["Approved qualifications to be added"],
    responsibilities: [
      "Department coordination",
      "Language programme development",
      "Learning-resource review",
    ],
    introduction:
      "This development record demonstrates how an approved departmental profile will appear in the public directory.",
    photoStatus: "not-provided",
    profileStatus: "draft",
    publicVisible: true,
  },
  {
    id: "mathematics-head",
    displayName: "Mathematics Department Profile",
    initials: "MA",
    position: "Head of Department",
    department: "Mathematics",
    subjects: ["Mathematics"],
    qualifications: ["Approved qualifications to be added"],
    responsibilities: [
      "Mathematics curriculum coordination",
      "Assessment planning",
      "Academic-resource supervision",
    ],
    introduction:
      "The final profile will contain only information approved for public display by the school.",
    photoStatus: "not-provided",
    profileStatus: "draft",
    publicVisible: true,
  },
  {
    id: "science-head",
    displayName: "Science Department Profile",
    initials: "SC",
    position: "Head of Department",
    department: "Science",
    subjects: ["Science", "Biology", "Chemistry", "Physics"],
    qualifications: ["Approved qualifications to be added"],
    responsibilities: [
      "Science teaching coordination",
      "Laboratory learning oversight",
      "Examination and resource planning",
    ],
    introduction:
      "This profile will later be replaced with verified staff information and an approved photograph where available.",
    photoStatus: "pending",
    profileStatus: "review",
    publicVisible: true,
  },
  {
    id: "ict-profile",
    displayName: "ICT Department Profile",
    initials: "IT",
    position: "Teacher in Charge",
    department: "Information Technology",
    subjects: ["ICT"],
    qualifications: ["Approved qualifications to be added"],
    responsibilities: [
      "ICT learning support",
      "Digital literacy activities",
      "Technology-related school programmes",
    ],
    introduction:
      "Public information will remain separate from private staff account, appointment and contact records.",
    photoStatus: "not-provided",
    profileStatus: "draft",
    publicVisible: true,
  },
  {
    id: "aesthetic-profile",
    displayName: "Aesthetic Studies Profile",
    initials: "AS",
    position: "Department Representative",
    department: "Aesthetic Studies",
    subjects: ["Art", "Music", "Dance", "Drama"],
    qualifications: ["Approved qualifications to be added"],
    responsibilities: [
      "Creative programme support",
      "Cultural activity coordination",
      "Student-performance guidance",
    ],
    introduction:
      "The final directory may include approved information about clubs, activities and cultural responsibilities.",
    photoStatus: "not-provided",
    profileStatus: "draft",
    publicVisible: true,
  },
];

export const publicStaffFields = [
  "Approved photograph",
  "Full name",
  "Position",
  "Department",
  "Subjects taught",
  "Approved qualifications",
  "Short professional introduction",
  "Clubs and activities supervised",
];

export const privateStaffFields = [
  "Internal staff ID",
  "Private telephone numbers",
  "Home address",
  "Identity-card information",
  "Personal email address",
  "Appointment documents",
  "System-account information",
  "Private administrative records",
];

export const staffCrudActions = [
  {
    title: "Create",
    description:
      "Add a new staff record with public and private fields kept clearly separated.",
  },
  {
    title: "Read",
    description:
      "Display information according to the current user’s role and permission.",
  },
  {
    title: "Update",
    description:
      "Edit approved profile information, subject assignments and responsibilities.",
  },
  {
    title: "Archive",
    description:
      "Remove transferred or retired staff from active listings without destroying records.",
  },
  {
    title: "Restore",
    description:
      "Return an archived record when authorised and retain its complete history.",
  },
];

export const staffApprovalWorkflow = [
  "Draft profile created",
  "Information checked by authorised staff",
  "Photograph and biography approval confirmed",
  "Content approver reviews public fields",
  "Profile published",
  "Future changes recorded in the audit history",
];

export const staffPublishingRules = [
  "Do not publish private telephone numbers, home addresses or identity information.",
  "Teacher photographs and biographies require appropriate approval.",
  "Public profiles should contain only current and verified information.",
  "Transferred and retired staff records should normally be archived rather than deleted.",
  "Subject and class assignments must be visible only to authorised users where appropriate.",
  "Every create, edit, archive and restore action should be recorded in an audit log.",
];