export type AdmissionStatus = "planned" | "open" | "closed";

export type AdmissionPathway = {
  id: string;
  title: string;
  gradeRange: string;
  audience: string;
  description: string;
  requirements: string[];
  status: AdmissionStatus;
  statusMessage: string;
};

export const admissionFacts = [
  {
    value: "Secure",
    label: "Application handling",
  },
  {
    value: "3",
    label: "Supported languages",
  },
  {
    value: "Verified",
    label: "Document review",
  },
  {
    value: "Controlled",
    label: "Student-data access",
  },
];

export const admissionPathways: AdmissionPathway[] = [
  {
    id: "primary-admission",
    title: "Primary Grade Admission",
    gradeRange: "Primary grades",
    audience: "Parents and guardians",
    description:
      "Official information about primary-grade admission periods, application procedures and required supporting documents.",
    requirements: [
      "Official admission notice",
      "Approved application form",
      "Required supporting documents",
      "Submission deadline",
    ],
    status: "planned",
    statusMessage: "Official admission information required",
  },
  {
    id: "secondary-transfer",
    title: "Secondary Grade Transfer",
    gradeRange: "Secondary grades",
    audience: "Students and parents",
    description:
      "A controlled process for publishing approved vacancy, eligibility and transfer information.",
    requirements: [
      "Available grade confirmation",
      "Previous school information",
      "Academic documentation",
      "Administrative approval",
    ],
    status: "planned",
    statusMessage: "Vacancy and eligibility confirmation required",
  },
  {
    id: "advanced-level",
    title: "Advanced Level Admission",
    gradeRange: "Advanced Level",
    audience: "Eligible applicants",
    description:
      "Approved information about available subject streams, eligibility requirements and application dates.",
    requirements: [
      "Ordinary Level results",
      "Available subject streams",
      "Eligibility requirements",
      "Approved selection process",
    ],
    status: "planned",
    statusMessage: "Academic and administrative confirmation required",
  },
  {
    id: "activity-registration",
    title: "Student Activity Registration",
    gradeRange: "Current students",
    audience: "Students and parents",
    description:
      "A future protected registration process for approved clubs, societies, sports and school activities.",
    requirements: [
      "Authenticated student account",
      "Parent or guardian consent",
      "Activity eligibility",
      "Responsible teacher approval",
    ],
    status: "planned",
    statusMessage: "Available through the future student portal",
  },
];

export const admissionGrades = [
  "Select requested grade",
  "Primary grade",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Advanced Level",
  "Other approved programme",
];

export const preferredLanguages = [
  "Select preferred language",
  "Sinhala",
  "English",
  "Tamil",
];

export const applicantRelationships = [
  "Select relationship",
  "Parent",
  "Legal guardian",
  "Student applicant",
  "Authorised representative",
];

export const admissionWorkflow = [
  {
    step: "01",
    title: "Official announcement",
    description:
      "The school publishes the approved admission period, available grades, eligibility and submission deadline.",
  },
  {
    step: "02",
    title: "Create application",
    description:
      "The applicant enters only the information required by the approved application process.",
  },
  {
    step: "03",
    title: "Upload documents",
    description:
      "Approved documents are uploaded through a protected system using secure file validation.",
  },
  {
    step: "04",
    title: "Verify submission",
    description:
      "The system confirms that required fields and files have been received without confirming admission.",
  },
  {
    step: "05",
    title: "Administrative review",
    description:
      "Authorised staff review eligibility, documents and available capacity.",
  },
  {
    step: "06",
    title: "Official decision",
    description:
      "The applicant receives an authorised decision through the approved communication channel.",
  },
  {
    step: "07",
    title: "Student registration",
    description:
      "Approved students complete registration and receive an institutional student record.",
  },
];

export const documentGuidance = [
  {
    title: "Application form",
    description:
      "Use only the current form published for the relevant admission period.",
  },
  {
    title: "Identity and guardianship",
    description:
      "Provide only the officially requested documents through the protected application system.",
  },
  {
    title: "Academic records",
    description:
      "Submit verified reports or examination results only when required.",
  },
  {
    title: "Previous school information",
    description:
      "Transfer applicants may require approved records from their previous school.",
  },
  {
    title: "Supporting evidence",
    description:
      "Additional documents should be requested only when necessary for the approved process.",
  },
  {
    title: "Translations",
    description:
      "Documents in another language may require an approved translation.",
  },
];

export const admissionFaqs = [
  {
    question: "Can an application be submitted through this page now?",
    answer:
      "No. This development page currently provides information and browser validation only. Official submissions require the secure admissions backend.",
  },
  {
    question: "Does submitting an enquiry guarantee admission?",
    answer:
      "No. An enquiry does not create an application and does not guarantee eligibility, selection or placement.",
  },
  {
    question: "When will applications open?",
    answer:
      "Application periods must be announced officially by the school. Development examples should not be treated as active admission notices.",
  },
  {
    question: "Can student documents be sent by ordinary email?",
    answer:
      "Sensitive documents should be submitted only through the approved protected system or another officially confirmed process.",
  },
  {
    question: "How will applicants receive updates?",
    answer:
      "The final system should use verified contact details and an approved application reference number.",
  },
  {
    question: "Can application information be edited later?",
    answer:
      "The final platform should allow controlled corrections before the deadline while retaining an audit history.",
  },
];

export const admissionSecurityRules = [
  "Public enquiry forms should collect only the minimum information needed to route the enquiry.",
  "Birth certificates, identity documents and academic records must not be uploaded through an unprotected public form.",
  "Applicant information should be encrypted during transmission and storage.",
  "Only authorised admission staff should be allowed to access submitted applications.",
  "Every application view, update, approval and decision should be recorded in an audit log.",
  "Uploaded documents should be validated by extension, MIME type, file signature and malware scanning.",
  "Application reference numbers should not expose internal student identifiers.",
  "Rejected, incomplete and expired applications should follow an approved retention and deletion policy.",
];