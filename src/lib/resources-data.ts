export type ResourceStatus = "available" | "pending" | "archived";

export type SchoolResource = {
  id: string;
  title: string;
  category: string;
  audience: string;
  fileType: string;
  sizeLabel: string;
  updatedLabel: string;
  summary: string;
  details: string[];
  languages: string[];
  status: ResourceStatus;
  featured: boolean;
  downloadPath: string | null;
  approvalStatus: string;
};

export const resourceFacts = [
  {
    value: "7",
    label: "Resource categories",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Secure",
    label: "File validation",
  },
  {
    value: "Archived",
    label: "Version history",
  },
];

export const resourceCategories = [
  "All Categories",
  "Academic",
  "Examinations",
  "Forms",
  "Circulars",
  "Policies",
  "Calendars",
  "Heritage",
];

export const resourceAudiences = [
  "All Audiences",
  "Entire School Community",
  "Students",
  "Parents",
  "Teachers",
  "Applicants",
  "Past Pupils",
];

export const resourceFileTypes = [
  "All File Types",
  "PDF",
  "Document",
  "Spreadsheet",
  "Presentation",
  "Image",
  "Audio",
];

export const schoolResources: SchoolResource[] = [
  {
    id: "academic-calendar",
    title: "Academic Calendar",
    category: "Calendars",
    audience: "Entire School Community",
    fileType: "PDF",
    sizeLabel: "Approved file pending",
    updatedLabel: "Official publication date required",
    summary:
      "The official academic calendar will provide approved term dates, holidays, examinations and important school activities.",
    details: [
      "Academic-term dates",
      "School holidays",
      "Examination periods",
      "Important administrative dates",
    ],
    languages: ["Sinhala", "English", "Tamil"],
    status: "pending",
    featured: true,
    downloadPath: null,
    approvalStatus: "Administrative approval required",
  },
  {
    id: "examination-timetable",
    title: "Examination Timetable",
    category: "Examinations",
    audience: "Students",
    fileType: "PDF",
    sizeLabel: "Approved file pending",
    updatedLabel: "Examination period required",
    summary:
      "Approved grade and class examination timetables will be published with clear version and update information.",
    details: [
      "Grade-specific schedules",
      "Subject dates and times",
      "Examination instructions",
      "Correction and revision information",
    ],
    languages: ["Sinhala", "English"],
    status: "pending",
    featured: true,
    downloadPath: null,
    approvalStatus: "Academic approval required",
  },
  {
    id: "student-application-form",
    title: "Student Application Form",
    category: "Forms",
    audience: "Applicants",
    fileType: "PDF",
    sizeLabel: "Approved file pending",
    updatedLabel: "Admission period required",
    summary:
      "A public application form may be provided when the school formally opens an approved application process.",
    details: [
      "Applicant instructions",
      "Required supporting documents",
      "Submission process",
      "Official deadline",
    ],
    languages: ["Sinhala", "English", "Tamil"],
    status: "pending",
    featured: true,
    downloadPath: null,
    approvalStatus: "Admission approval required",
  },
  {
    id: "learning-resource-pack",
    title: "Approved Learning Resource Pack",
    category: "Academic",
    audience: "Students",
    fileType: "Document",
    sizeLabel: "Department file pending",
    updatedLabel: "Department review required",
    summary:
      "Approved worksheets, revision guides and learning materials may be grouped according to grade, subject and language.",
    details: [
      "Grade and subject classification",
      "Teacher or department approval",
      "Copyright review",
      "Accessible document format",
    ],
    languages: ["Sinhala", "English"],
    status: "pending",
    featured: false,
    downloadPath: null,
    approvalStatus: "Department approval required",
  },
  {
    id: "public-circular",
    title: "Approved Public Circular",
    category: "Circulars",
    audience: "Entire School Community",
    fileType: "PDF",
    sizeLabel: "Circular file pending",
    updatedLabel: "Circular reference required",
    summary:
      "Public circulars can be released with their official reference number, date, responsible authority and version.",
    details: [
      "Official reference number",
      "Publication date",
      "Responsible authority",
      "Replacement and archive history",
    ],
    languages: ["Sinhala", "English"],
    status: "pending",
    featured: false,
    downloadPath: null,
    approvalStatus: "Administrative approval required",
  },
  {
    id: "privacy-policy",
    title: "Website Privacy Policy",
    category: "Policies",
    audience: "Entire School Community",
    fileType: "PDF",
    sizeLabel: "Policy document pending",
    updatedLabel: "Legal and administrative review required",
    summary:
      "The privacy policy will explain how the platform handles public information, account data, student records and user rights.",
    details: [
      "Public and private information",
      "Data retention",
      "Account and access controls",
      "Contact and complaint process",
    ],
    languages: ["Sinhala", "English", "Tamil"],
    status: "pending",
    featured: false,
    downloadPath: null,
    approvalStatus: "Policy approval required",
  },
  {
    id: "heritage-catalogue",
    title: "Heritage Archive Catalogue",
    category: "Heritage",
    audience: "Entire School Community",
    fileType: "PDF",
    sizeLabel: "Catalogue export pending",
    updatedLabel: "Archive review required",
    summary:
      "An approved public catalogue may provide references to historical records, photographs, documents and oral-history collections.",
    details: [
      "Archive reference numbers",
      "Record descriptions",
      "Source and permission information",
      "Public access status",
    ],
    languages: ["Sinhala", "English"],
    status: "pending",
    featured: false,
    downloadPath: null,
    approvalStatus: "Heritage committee approval required",
  },
  {
    id: "superseded-timetable",
    title: "Previous Examination Timetable",
    category: "Examinations",
    audience: "Students",
    fileType: "PDF",
    sizeLabel: "Archived file",
    updatedLabel: "Superseded version",
    summary:
      "Previous timetable versions remain in the protected archive to preserve publication and correction history.",
    details: [
      "Original publication date",
      "Replacement date",
      "Reason for correction",
      "Approving officer",
    ],
    languages: ["Sinhala", "English"],
    status: "archived",
    featured: false,
    downloadPath: null,
    approvalStatus: "Archive access controlled",
  },
];

export const resourceAccessModels = [
  {
    title: "Public Downloads",
    description:
      "Approved calendars, forms, policies, circulars and general learning materials available to all visitors.",
  },
  {
    title: "Student Resources",
    description:
      "Grade, class, subject and examination files available only to authenticated students.",
  },
  {
    title: "Parent Resources",
    description:
      "Approved documents linked to the parent’s verified student account.",
  },
  {
    title: "Staff Resources",
    description:
      "Restricted teaching, administrative and internal documents available only to authorised staff.",
  },
];

export const resourceWorkflow = [
  {
    step: "01",
    title: "Upload",
    description:
      "An authorised editor uploads the file and enters its title, category, audience, language and description.",
  },
  {
    step: "02",
    title: "Validate",
    description:
      "The system checks file type, file size, extension, content signature and possible malware.",
  },
  {
    step: "03",
    title: "Review",
    description:
      "The responsible officer reviews accuracy, copyright, privacy, accessibility and publication suitability.",
  },
  {
    step: "04",
    title: "Approve",
    description:
      "The assigned approver confirms the file, audience, publication period and access level.",
  },
  {
    step: "05",
    title: "Publish",
    description:
      "The approved resource becomes available through the public website or protected portal.",
  },
  {
    step: "06",
    title: "Replace",
    description:
      "Updated files create a new version while retaining the previous approved record.",
  },
  {
    step: "07",
    title: "Archive",
    description:
      "Expired or replaced resources are removed from active listings without destroying their history.",
  },
];

export const resourcePublishingRules = [
  "Only approved file types should be accepted by the resource-management system.",
  "Uploaded files should be checked using extension, MIME type, file signature and malware scanning.",
  "File names should not reveal private student, staff or administrative information.",
  "Private learning and examination resources must remain inside authenticated portals.",
  "Copyright ownership and permission should be recorded before publication.",
  "Important documents should be provided in accessible and clearly named formats.",
  "Replacement files should create a new version rather than silently overwriting the previous record.",
  "Archived resources should retain the uploader, approver, publication date and reason for replacement.",
];